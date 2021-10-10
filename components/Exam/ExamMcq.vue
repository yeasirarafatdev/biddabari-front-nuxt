<template>
    <v-card rounded class='my-1'>
        <v-card-text class='pb-0'>
            <v-snackbar v-model='snackbar' rounded='lg' app centered :timeout='-1'>
                <div class='font-weight-bold text-center my-2'>Tell us what is wrong</div>
                <v-form @submit.prevent='report'>
                    <v-textarea v-model='comment' auto-grow autofocus outlined dense rows='2' />
                    <v-file-input
                        v-model='photo'
                        :rules='rules'
                        accept='image/png, image/jpeg, image/bmp, image/jpg, image/*'
                        prepend-icon='mdi-camera'
                        label='Upload photo'
                    ></v-file-input>
                    <div class='d-flex justify-center'>
                        <v-btn small color='red' class='mx-1' @click='snackbar = false'>Cancel</v-btn>
                        <v-btn type='submit' small color='green' class='mx-1' :disabled='!comment && !photo'>Submit</v-btn>
                    </div>
                </v-form>
            </v-snackbar>
            <div class='d-flex justify-space-between flex-column flex-lg-row flex-md-row flex-sm-row'>
                <div class='d-flex'>
                    <!--                    <div class='subtitle-1 font-weight-bold mr-2'>{{ index + 1 }}.</div>-->
                    <div v-katex:auto class='subtitle-1 text-12 mcq-card' v-html='mcq.question'></div>
                </div>
                <div class='d-flex'>
                    <v-btn v-if='isWrongAnswer' icon>
                        <v-icon color='red'>mdi-close</v-icon>
                    </v-btn>
                    <v-btn v-if='isCorrectAnswer' icon>
                        <v-icon color='green'>mdi-check</v-icon>
                    </v-btn>
                    <!--                    <v-btn v-if="!favorite && mode==='result'" icon @click='toggleFavorite'>
                                            <v-icon>mdi-heart-outline</v-icon>
                                        </v-btn>
                                        <v-btn v-if="favorite && mode==='result'" icon @click='toggleFavorite'>
                                            <v-icon color='red'>mdi-heart</v-icon>
                                        </v-btn>-->
                    <!--                    <v-btn v-if='!mcq.verified' icon @click='snackbar = true'>
                                            <v-icon :color="reported ? 'red':'auto'">mdi-flag-outline</v-icon>
                                        </v-btn>-->
                    <v-icon v-else color='green' small>mdi-check-circle</v-icon>
                </div>
            </div>
            <v-img v-if='mcq.question_photo' style='width: 100%' :src='mcq.question_photo' class='mb-2'></v-img>
            <v-radio-group v-model='user_answer' dense :readonly='shouldBeDisabled' class='mt-1' column>
                <v-radio
                    off-icon='mdi-alpha-a-circle-outline'
                    on-icon='mdi-alpha-a-circle-outline'
                    :color="color('a')"
                    value='a'
                >
                    <template #label>
                        <div v-katex:auto :style="{'color':labelColor('a')}" v-html='mcq.a'></div>
                    </template>
                </v-radio>
                <v-radio
                    off-icon='mdi-alpha-b-circle-outline'
                    on-icon='mdi-alpha-b-circle-outline'
                    :color="color('b')"
                    value='b'
                >
                    <template #label>
                        <div v-katex:auto :style="{'color':labelColor('b')}" v-html='mcq.b'></div>
                    </template>
                </v-radio>
                <v-radio
                    off-icon='mdi-alpha-c-circle-outline'
                    on-icon='mdi-alpha-c-circle-outline'
                    :color="color('c')"
                    value='c'
                >
                    <template #label>
                        <div v-katex:auto :style="{'color':labelColor('c')}" v-html='mcq.c'></div>
                    </template>
                </v-radio>
                <v-radio
                    off-icon='mdi-alpha-d-circle-outline'
                    on-icon='mdi-alpha-d-circle-outline'
                    :color="color('d')"
                    value='d'
                >
                    <template #label>
                        <div v-katex:auto :style="{'color':labelColor('d')}" v-html='mcq.d'></div>
                    </template>
                </v-radio>
                <v-radio
                    v-if='mcq.e'
                    off-icon='mdi-alpha-e-circle-outline'
                    on-icon='mdi-alpha-e-circle-outline'
                    :color="color('e')"
                    value='e'
                >
                    <template #label>
                        <div v-katex:auto :style="{'color':labelColor('e')}" v-html='mcq.e'></div>
                    </template>
                </v-radio>
            </v-radio-group>
            <v-divider v-if='viewMode && (mcq.answer_description || mcq.answer_photo)' class='mb-2'></v-divider>
            <div v-if='viewMode && mcq.answer_description' v-katex:auto v-html='mcq.answer_description'></div>
            <v-img v-if='viewMode && mcq.answer_photo' style='width: 100%' :src='mcq.answer_photo' class='mb-2'></v-img>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['mcq', 'mode', 'index', 'isAnswerAvailable'],
    data() {
        return {
            comment: '',
            snackbar: false,
            answer: this.mcq.answer,
            user_answer: this.mcq.exam_answers.length ? this.mcq.exam_answers[0].user_answer : '',
            favorite: this.mcq.favorite,
            reported: false,
            rules: [
                value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!'
            ],
            photo: null
        }
    },
    computed: {
        shouldBeDisabled() {
            return this.mode === 'result' || !!this.user_answer
        },
        viewMode() {
            return this.mode === 'result' && this.isAnswerAvailable
        },
        isSelectedA() {
            return this.user_answer === 'a'
        },
        isWrongA() {
            return this.isSelectedA && (this.mcq[this.user_answer] !== this.mcq.answer) && this.viewMode
        },
        isSelectedB() {
            return this.user_answer === 'b'
        },
        isWrongB() {
            return this.isSelectedB && (this.mcq[this.user_answer] !== this.mcq.answer) && this.viewMode
        },
        isSelectedC() {
            return this.user_answer === 'c'
        },
        isWrongC() {
            return this.isSelectedC && (this.mcq[this.user_answer] !== this.mcq.answer) && this.viewMode
        },
        isSelectedD() {
            return this.user_answer === 'd'
        },
        isWrongD() {
            return this.isSelectedD && (this.mcq[this.user_answer] !== this.mcq.answer) && this.viewMode
        },
        isSelectedE() {
            return this.user_answer === 'e'
        },
        isWrongE() {
            return this.isSelectedE && (this.mcq[this.user_answer] !== this.mcq.answer) && this.viewMode
        },
        isCorrectAnswer() {
            return (this.mcq[this.user_answer] === this.mcq.answer) && this.viewMode
        },
        isWrongAnswer() {
            return (this.mcq[this.user_answer] !== this.answer) && this.viewMode && this.user_answer
        },
        isCorrectA() {
            return (this.mcq.a === this.answer) && this.viewMode && !this.isWrongA
        },
        isCorrectB() {
            return (this.mcq.b === this.answer) && this.viewMode && !this.isWrongB
        },
        isCorrectC() {
            return (this.mcq.c === this.answer) && this.viewMode && !this.isWrongC
        },
        isCorrectD() {
            return (this.mcq.d === this.answer) && this.viewMode && !this.isWrongD
        },
        isCorrectE() {
            return (this.mcq.e === this.answer) && this.viewMode && !this.isWrongE
        },
        form() {
            const formData = new FormData()
            formData.append('type', 'answer')
            formData.append('mcq_id', this.mcq.id)
            formData.append('user_answer', this.user_answer)
            formData.append('exam_id', this.mcq.exam_id)
            formData.append('answer', this.mcq.answer)
            if (this.photo) {
                formData.append('photo', this.photo)
            }
            return formData
        }
    },
    watch: {
        mode(newVal, olvVal) {
            if ((newVal === 'exam' && olvVal === 'answer') || (newVal === 'exam' && olvVal === 'failed')) {
                this.user_answer = ''
            }
        },
        user_answer() {
            this.$emit('input', this.user_answer)
        }
    },
    methods: {
        color(option) {
            if (this.mode === 'group_exam' || this.mode === 'exam') {
                return 'info'
            } else if (option === 'a') {
                if (this.isCorrectA) {
                    return 'green'
                }
                if (this.isWrongA) {
                    return 'red'
                }
            } else if (option === 'b') {
                if (this.isCorrectB) {
                    return 'green'
                }
                if (this.isWrongB) {
                    return 'red'
                }
            } else if (option === 'c') {
                if (this.isCorrectC) {
                    return 'green'
                }
                if (this.isWrongC) {
                    return 'red'
                }
            } else if (option === 'd') {
                if (this.isCorrectD) {
                    return 'green'
                }
                if (this.isWrongD) {
                    return 'red'
                }
            } else if (option === 'e') {
                if (this.isCorrectE) {
                    return 'green'
                }
                if (this.isWrongE) {
                    return 'red'
                }
            }
        },
        labelColor(option) {
            if (this.mode === 'group_exam' || this.mode === 'exam') {
                return '#000'
            } else if (option === 'a') {
                if (this.isCorrectA) {
                    return '#1ed424'
                }
                if (this.isWrongA) {
                    return 'red'
                }
            } else if (option === 'b') {
                if (this.isCorrectB) {
                    return '#1ed424'
                }
                if (this.isWrongB) {
                    return 'red'
                }
            } else if (option === 'c') {
                if (this.isCorrectC) {
                    return '#1ed424'
                }
                if (this.isWrongC) {
                    return 'red'
                }
            } else if (option === 'd') {
                if (this.isCorrectD) {
                    return '#1ed424'
                }
                if (this.isWrongD) {
                    return 'red'
                }
            } else if (option === 'e') {
                if (this.isCorrectE) {
                    return '#1ed424'
                }
                if (this.isWrongE) {
                    return 'red'
                }
            }
        },
        toggleFavorite() {
            const formData = new FormData()
            formData.append('type', 'favorite')
            formData.append('mcq_id', this.mcq.id)
            formData.append('exam_id', this.mcq.exam_id)
            const url = 'mcqs'
            this.$axios.$post(url, formData).then(() => {
                this.favorite = !this.favorite
            })
        },
        report() {
            this.snackbar = false
            const formData = new FormData()
            formData.append('type', 'report')
            formData.append('mcq_id', this.mcq.id)
            formData.append('exam_id', this.mcq.exam_id)
            formData.append('comment', this.comment)
            if (this.photo) {
                formData.append('photo', this.photo)
            }
            const url = 'mcqs'
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            this.$axios.post(url, formData, config).then(() => {
                this.reported = true
            }).finally(() => {
                this.snackbar = false
            })
        }
    }
}
</script>

<style scoped lang='scss'>
.theme--light.v-card > .v-card__text, .theme--light.v-card .v-card__subtitle {
    color: rgba(0, 0, 0, 1) !important;
}

.theme--light.v-input--is-disabled {
    color: rgba(0, 0, 0, 1) !important;
}

.theme--light.v-label {
    color: rgba(0, 0, 0, 1) !important;
}

.theme--light.v-radio--is-disabled label {
    color: rgba(0, 0, 0, 1) !important;
}

//.v-input--radio-group--column .v-radio:not(:last-child):not(:only-child) {
//  margin-bottom: 2px !important;
//}
</style>
