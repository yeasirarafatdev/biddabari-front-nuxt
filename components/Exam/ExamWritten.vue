<template>
    <div id='exam-container'>
        <div v-if='loading.exam' class='text-center my-16'>
            <v-dialog v-model='loading.exam' hide-overlay persistent width='300'>
                <v-card color='primary' dark>
                    <v-card-text class='py-2'>
                        Preparing Exam Questions
                        <v-progress-linear indeterminate color='white' class='mb-2'></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <v-progress-circular indeterminate color='primary'></v-progress-circular>
        </div>
        <v-card v-else elevation='2' class='px-2 py-2 relative'>
            <v-card rounded elevation='2' class='sticky white'>
                <v-container v-if='questions && questions.length'>
                    <div class='pa-4 mx-2 d-flex justify-space-between' style='border: 2px solid dodgerblue;border-radius: 20px'>
                        <div style='width: 100%' class='mr-4'>
                            <div v-if='disabled' class='text-center error--text'><strong>Time Over</strong></div>
                            <div v-else class='d-flex flex-wrap justify-start align-center gap-10'>
                                <div class='mb-2'>{{ total_tried }}/{{ questions.length }}</div>
                                <div class='flex-grow-1 mb-2'>
                                    <div class='d-flex mb-2'>
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
                                    <v-progress-linear height='4' rounded :value='bar'></v-progress-linear>
                                </div>

                                <v-btn color='primary' small rounded @click.stop.prevent='examCompleted()'>Exam Complete ?</v-btn>
                            </div>
                        </div>
                    </div>
                </v-container>
            </v-card>
            <div style='overflow: auto; max-height: 90vh'>

                <exam-rules />

                <template v-if='questions'>
                    <div v-for='(question, index) in questions' :key='"question-"+question.id'>
                        <ExamWrittenQuestions
                            v-model='question.user_answer'
                            :key='question.id'
                            :question='question'
                            :index='index'
                            :isDisabled='disabled'
                            @submitted='getExamData()' />
                    </div>
                </template>
            </div>
        </v-card>
    </div>
</template>


<script>
import moment from 'moment'

export default {
    props: {
        courseExam: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            exam: this.courseExam,
            examReport: {},
            questions: [],
            loading: {
                exam: false
            },
            disabled: false,
            timer: 1,
            start_time: '',
            end_time: '',
            mode: '',
            alertTime: '',
            timerMessage: '',
            currentTime: moment(),
            showTimerNotification: true
        }
    },
    watch: {
        courseExam(val, oldVal) {
            this.getExamData()
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
    computed: {
        bar() {
            if (this.strict) {
                const duration = moment(this.exam.ends_at).diff(moment(), 'seconds')
                return (this.timer * 100) / (duration)
            } else
                return (this.timer * 100) / (this.exam.duration * 60)
        },
        strict() {
            return !!this.exam.strict
        },
        /*bar() {
            return this.total_tried * 100 / this.questions.length
        },*/
        total_tried() {
            const total = this.questions.filter((question) => {
                return question.user_answer
            })
            return total.length
        }
    },
    mounted() {
        this.getExamData()
        setInterval(() => {
            this.currentTime = moment()
            this.timer++
        }, 1000)
    },
    methods: {
        initialize() {
            // this.exam.duration = 12000
            console.log(this.exam, this.examReport.started_at)
            /////////////////////
            this.disabled = false
            this.start_time = moment()
            this.end_time = this.strict ? moment(this.exam.ends_at).toDate()
                : this.examReport ? moment(this.examReport.started_at).add(this.exam.duration, 'm')
                    : moment().add(this.exam.duration, 'm')
            this.alertTime = moment(this.end_time).subtract(5, 'minutes')
            const finalSubmit = this.result ? this.result.final_submit : 0
            if (this.expired || finalSubmit) {
                this.mode = 'result'
            } else {
                this.mode = 'exam'
            }
            if (this.exam.mode === 'exam' && !this.expired && !finalSubmit) {
                this.examCompletedSilently()
            }
        },
        async getExamData() {
            this.loading.exam = true
            this.examReport = await this.$axios.$post(`api/written-exam-report`, { 'written_exam_id': this.courseExam.id })
            const examUrl = `api/question?id=${this.courseExam.id}`
            let examWithQuestions = {}
            await this.$axios.$get(examUrl).then((response) => {
                //this.exam = response
                examWithQuestions = response
                // https://api.cn1.nextivesolution.com/api/question?id=5
            }).catch(() => {
                this.$notifier.showMessage({ content: 'Failed to load questions.', color: 'error' })
            }).finally(() => {
                this.loading.exam = false
            })
            if (examWithQuestions && Object.keys(examWithQuestions).length) {
                if (examWithQuestions.questions && examWithQuestions.questions.length) {
                    // console.log(this.exam.questions)
                    this.questions = examWithQuestions.questions
                }
            }
            this.initialize()
        },
        startCallBack() {
        },
        endCallBack() {
            this.disabled = true
            if (this.mode === 'exam') {
                this.examCompleted(false)
            }
        },
        examCompletedSilently() {
        },
        async examCompleted(clicked = true) {
            await this.$axios.$post(`api/written-exam-report`, {
                'written_exam_id': this.courseExam.id,
                type: 'submit'
            }).then(() => {
                if (clicked) {
                    this.$notifier.showMessage({ content: 'Answer Submitted.', color: 'success' })
                }
            }).catch(() => {
                this.$notifier.showMessage({ content: 'Failed to submit.', color: 'error' })
            })
        }
    }
}
</script>


<style scoped lang='scss'>
.bullet {
    border-radius: 50%;
    background-color: #ffbf3f;
    height: 26px !important;
    width: 26px !important;
    line-height: 28px;
    font-weight: bold;
}
</style>
