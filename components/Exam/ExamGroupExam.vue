<template>
    <v-card id='questions' flat class='mb-10 pb-5'>
        <div v-if='!mcqs && started' class='d-flex justify-center align-center content-loading'>
            <v-card outlined class='d-flex justify-center align-center content-loading'>
                <v-progress-circular :size='50' color='primary' indeterminate></v-progress-circular>
            </v-card>
        </div>
        <v-card v-if='!started && !loading && !exam.attended' class='my-10 py-14'>
            <v-card-title class='justify-center'>Select {{ exam.total_section }} Subjects</v-card-title>
            <v-card-text>
                <v-row justify='center'>
                    <div
                        v-for='section in allSections' :key='section.id'
                        class='d-flex flex-wrap'
                    >
                        <v-checkbox
                            v-model='sections'
                            :label='section.name'
                            color='primary'
                            class='mx-4'
                            :value='section.id'
                            :disabled='!!section.required || (sections.length>=exam.total_section && !sections.includes(section.id))'
                        ></v-checkbox>
                    </div>
                    <v-col cols='12' class='text-center'>
                        <v-btn rounded color='success' :disabled='sections.length!==exam.total_section' @click='initialize'>
                            Load Questions
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card rounded elevation='2' class='sticky white'>
            <v-container v-if="mode === 'group_exam'">
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
                    </div>
                    <v-btn
                        v-if="mode === 'group_exam'"
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
            <exam-result
                v-if="mode==='result' && mcqs && !!result"
                :answer-available-at='answerAvailableAt'
                :isAnswerAvailable='isAnswerAvailable'
                :examReport='result'
                :exam='exam'
                :show-result='exam.showResult'
            />
            <v-tabs
                v-if='exam.attended || started'
                v-model='tab'
                centered
                background-color='primary'
                color='green'
                dark
                next-icon='mdi-arrow-right-bold-box-outline'
                prev-icon='mdi-arrow-left-bold-box-outline'
                show-arrows
            >
                <v-tabs-slider color='green'></v-tabs-slider>
                <v-tab
                    v-for='item in selectedSections'
                    :key='item.id'
                >
                    {{ item.name }}
                </v-tab>
            </v-tabs>
        </v-card>
        <v-tabs-items v-if='exam.attended || started' v-model='tab'>
            <v-tab-item
                v-for='item in selectedSections'
                :key='item.id+item.name'
            >
                <v-card flat style='height: 80vh; overflow: auto;'>
                    <v-card-text>
                        <div v-for='(mcq,index) in item.mcqs' :key='mcq.id'>
                            <exam-mcq
                                v-model='mcq.user_answer'
                                :mcq='mcq'
                                :mode='mode'
                                :index='index'
                                :isAnswerAvailable='isAnswerAvailable'
                            />
                        </div>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-card>
</template>

<script>
import moment from 'moment'

export default {
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
            mode: '',
            allSections: [],
            sections: [],
            started: false,
            disabled: false,
            timer: 1,
            start_time: '',
            end_time: '',
            alertTime: '',
            timerMessage: '',
            currentTime: moment(),
            showTimerNotification: true
        }
    },
    computed: {
        token() {
            return this.$route.params.token || null
        },
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
        mcqs() {
            let mcqs = []
            this.selectedSections.forEach((section) => {
                mcqs = mcqs.concat(section.mcqs)
            })
            return mcqs
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
        this.loadSections()
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
        loadSections() {
            if (this.exam.attended) {
                this.selectedSectionId = this.result.sections[0]
                this.sections = this.result.sections
                this.initialize()
            } else {
                this.allSections = this.exam.sections
                this.allSections.forEach((section) => {
                    if (section.required) {
                        this.sections.push(section.id)
                    }
                })
                this.selectedSectionId = this.sections[0]
                if (this.exam.total_section === this.sections.length) {
                    this.initialize()
                }
            }
        },
        initialize() {
            this.disabled = false
            this.started = true
            this.start_time = moment()
            this.end_time = this.strict ? moment(this.exam.ends_at).toDate() : this.exam.result ? moment(this.exam.result.entered_at).add(this.exam.duration, 'm') : moment().add(this.exam.duration, 'm')
            this.alertTime = moment(this.end_time).subtract(5, 'minutes')
            const finalSubmit = this.result ? this.result.final_submit : 0
            if (this.expired || finalSubmit) {
                this.mode = 'result'
            } else {
                this.mode = 'group_exam'
            }
            if (!this.videoExam) {
                if (this.exam.mode === 'group_exam' && !this.expired && !finalSubmit) {
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
            let config = {}
            if (this.token) {
                config = {
                    headers: { Authorization: `Bearer ${this.token}` }
                }
            }
            this.$axios.$post(link, data, config).then(() => {
                this.$emit('submitted')
                this.mode = 'result'
                this.disabled = false
                document.getElementById('questions').scrollTo(0, 0)
                if (!this.isAnswerAvailable) {
                    this.hideQuestion = true
                }
            }).then(() => {
                this.loadSections()
            }).catch(() => {
                this.disabled = false
            })
        },
        submitAnswerSilently() {
            if (!this.expired && !(this.result && this.result.final_submit) && this.started) {
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
                let config = {}
                if (this.token) {
                    config = {
                        headers: { Authorization: `Bearer ${this.token}` }
                    }
                }
                this.$axios.$post(link, data, config)
            }
        }
        ,
        startCallBack() {

        }
        ,
        endCallBack() {
            if (this.mode === 'group_exam') {
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
