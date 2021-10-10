<template>
    <v-card id='questions' flat class='mb-10 pb-5'>
        <div v-if='!mcqs' class='d-flex justify-center align-center content-loading'>
            <v-card outlined class='d-flex justify-center align-center content-loading'>
                <v-progress-circular :size='50' color='primary' indeterminate></v-progress-circular>
            </v-card>
        </div>
        <v-card rounded='lg' elevation='1' class='sticky white'>
            <v-container v-if="mode === 'exam'">
                <div class='pa-4 mx-2 d-flex justify-space-between' style='border: 2px solid dodgerblue;border-radius: 20px'>
                    <div style='width: 100%' class='mr-4'>
                        <div class='d-flex justify-space-between'>
                            <div>{{ total_tried }}/{{ mcqs.length }}</div>
                            <div class='d-flex'>
                                <v-icon class='mx-2 mb-1' color='blue'>mdi-clock-outline</v-icon>
                                <vue-countdown-timer
                                    :start-time='start_time'
                                    :end-time='end_time'
                                    :interval='1000'
                                    :end-text="'Time over!'"
                                    :hour-txt="' :'"
                                    :minutes-txt="' :'"
                                    :seconds-txt="' :'"
                                    @start_callback='startCallBack()'
                                    @end_callback='endCallBack()'>
                                    <template slot='countdown' slot-scope='scope'>
                                        <span>{{ scope.props.hours }}</span><b>{{ scope.props.hourTxt }}</b>
                                        <span>{{ scope.props.minutes }}</span><b>{{ scope.props.minutesTxt }}</b>
                                        <span>{{ scope.props.seconds }}</span>
                                    </template>

                                    <template slot='end-text' slot-scope='scope'>
                                        <span style='color: red'>{{ scope.props.endText }}</span>
                                    </template>

                                </vue-countdown-timer>
                            </div>
                        </div>
                        <v-progress-linear height='5' rounded :value='bar'></v-progress-linear>

                        <div v-if='timerMessage' class='text-center' style='color: red; margin-top: 6px;'>
                            {{ timerMessage }}
                        </div>
                    </div>
                    <v-btn
                        v-if="mode === 'exam'"
                        max-width='200'
                        :loading='disabled'
                        :disabled='disabled'
                        shaped
                        text
                        color='success'
                        class='font-weight-bold'
                        style='border: 2px solid limegreen'
                        @click='submitAnswer'
                    >
                        Submit
                    </v-btn>
                </div>
            </v-container>
            <exam-result v-if="mode==='result' && mcqs && !!result" :answer-available-at='answerAvailableAt'
                         :is-answer-available='isAnswerAvailable'
                         :exam_report='result'
                         :exam_id='exam.id'
                         :show-result='exam.showResult'
            ></exam-result>
        </v-card>
        <v-card flat style='height: 80vh; overflow: auto;'>
            <v-card-text>
                <div v-for='(mcq,index) in mcqs' :key='mcq.id'>
                    <exam-mcq
                        v-model='mcq.user_answer'
                        :mcq='mcq'
                        :mode='mode'
                        :index='index'
                        :is-answer-available='isAnswerAvailable'
                    ></exam-mcq>
                </div>
            </v-card-text>
        </v-card>
    </v-card>
</template>
<script>
import moment from 'moment'

export default {
    // eslint-disable-next-line vue/require-prop-types
    props: {
        exam: {
            type: Object,
            required: true
        },
        videoExam: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tab: null,
            loading: false,
            selectedSectionId: '',
            finished: false,
            mcqs: this.exam.mcqs,
            mode: '',
            allSections: [],
            sections: [],
            disabled: false,
            timer: 1,
            token: '',
            start_time: '',
            end_time: '',
            alertTime: '',
            timerMessage: '',
            currentTime: moment(),
            showTimerNotification: true
        }
    },
    computed: {
        answerAvailableAt() {
            return moment(this.exam.ends_at).format('D MMM [at] hh:mm a')
        },
        selectedSections() {
            return this.sections.length ? this.exam.sections.filter(section => this.sections.includes(section.id)) : []
        },
        selectedMcqs() {
            if (this.exam && this.exam.sections) {
                const selectedSection = this.exam.sections.filter(section => section.id === this.selectedSectionId)[0]
                const mcqs = selectedSection.mcqs
                if (mcqs) {
                    return mcqs.map(({ id }) => id)
                } else return []
            } else
                return []
        },
        bar() {
            if (this.strict) {
                const duration = moment(this.exam.ends_at).diff(moment(), 'seconds')
                return (this.timer * 100) / (duration)
            } else
                return (this.timer * 100) / (this.exam.duration * 60)
        },
        total_tried() {
            const total = this.mcqs.filter((mcq) => {
                return mcq.user_answer || mcq.exam_answers.length
            })
            return total.length
        },
        marks() {
            let obtainedMarks = 0
            this.mcqs.forEach((mcq) => {
                if (mcq.user_answer && (mcq.answer === mcq[mcq.user_answer])) {
                    obtainedMarks += this.exam.per_question_mark
                }
                if (mcq.user_answer && (mcq.answer !== mcq[mcq.user_answer])) {
                    obtainedMarks -= this.exam.negative_mark
                }
            })
            return obtainedMarks
        },
        isAnswerAvailable() {
            return this.exam.ends_at ? moment(this.exam.ends_at).isBefore(moment()) : true
        },
        expired() {
            if (this.strict) {
                return this.exam.ends_at ? moment(this.exam.ends_at).isBefore(moment()) : false
            } else {
                if (this.exam.result && this.exam.result.entered_at) {
                    return moment(this.exam.result.entered_at).add(this.exam.duration, 'm').isBefore(moment())
                }
                return false
            }
        },
        result() {
            return this.exam.result
        },
        strict() {
            return !!this.exam.strict
        }
    },
    watch: {
        tab() {
            document.getElementById('questions').scrollTo(0, 0)
        },
        mcqs: {
            handler() {
                this.submitAnswerSilently()
            },
            deep: true
        },
        exam: {
            handler() {
                if (this.exam.result) {
                    this.mode = this.exam.result.final_submit ? 'result' : 'exam'
                } else this.mode = 'exam'
            },
            deep: true
        },
        currentTime(newVal) {
            if (moment(newVal).isAfter(this.alertTime) && moment(newVal).isBefore(this.end_time)) {
                let left = moment(this.end_time).subtract(newVal).format('mm:ss')
                this.timerMessage = 'You have  ' + left + ' minutes left to complete the exam.'
                if (this.showTimerNotification) {
                    this.displayTimerNotification()
                }
            }
        }
    },
    mounted() {
        this.initialize()
        setInterval(() => {
            this.currentTime = moment()
            this.timer++
        }, 1000)
    },
    methods: {
        displayTimerNotification() {
            this.showTimerNotification = false
            this.$notifier.showMessage({ content: 'You Have 5 minutes to complete the exam', color: 'error' })
        },
        initialize() {
            this.disabled = false
            this.start_time = moment()
            this.end_time = this.strict ? moment(this.exam.ends_at).toDate() : this.exam.result ? moment(this.exam.result.entered_at).add(this.exam.duration, 'm') : moment().add(this.exam.duration, 'm')
            this.alertTime = moment(this.end_time).subtract(5, 'minutes')
            const finalSubmit = this.result ? this.result.final_submit : 0
            if (this.expired || finalSubmit) {
                this.mode = 'result'
            } else {
                this.mode = 'exam'
            }
            if (!this.videoExam) {
                if (this.exam.mode === 'exam' && !this.expired && !finalSubmit) {
                    this.submitAnswerSilently()
                }
            }
        },
        submitAnswer() {
            this.disabled = true
            const link = 'exam-reports'
            const mcqs = this.mcqs
            mcqs.forEach((mcq) => {
                if (mcq.exam_answers.length) {
                    mcq.user_answer = mcq.exam_answers[0].user_answer
                }
            })
            const data = {
                exam_id: this.exam.id,
                total_marks: this.mcqs.length * this.exam.per_question_mark,
                obtained_marks: this.marks,
                mcqs,
                duration: this.timer,
                sections: this.sections,
                final_submit: 1
            }
            this.$axios.$post(link, data).then(() => {
                this.$emit('submitted')
                this.mode = 'result'
                this.disabled = false
                document.getElementById('questions').scrollTo(0, 0)
                if (!this.isAnswerAvailable) {
                    this.hideQuestion = true
                }
            }).then(() => {
                this.initialize()
            }).catch(() => {
                this.disabled = false
            })
        },
        submitAnswerSilently() {
            if (!this.expired && !(this.result && this.result.final_submit)) {
                const link = 'exam-reports'
                const mcqs = this.mcqs
                mcqs.forEach((mcq) => {
                    if (mcq.exam_answers.length) {
                        mcq.user_answer = mcq.exam_answers[0].user_answer
                    }
                })
                const data = {
                    exam_id: this.exam.id,
                    total_marks: this.mcqs.length * this.exam.per_question_mark,
                    obtained_marks: this.marks,
                    mcqs,
                    duration: this.timer,
                    sections: this.sections
                }
                this.$axios.$post(link, data)
            }
        },
        startCallBack() {
        },
        endCallBack() {
            if (this.mode === 'exam') {
                this.submitAnswer()
            }
        }
    }
}
</script>
<style scoped lang='scss'>
.fixed {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
}

.sticky {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
}
</style>
