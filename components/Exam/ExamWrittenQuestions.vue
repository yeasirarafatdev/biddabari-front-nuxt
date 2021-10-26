<template>
    <v-card v-if='question && Object.keys(question).length' class='my-4'>
        <v-card-text>
            <div class='d-flex justify-space-between'>
                <div class='d-flex'>
                    <div class='subtitle-1 font-weight-bold mr-2'>{{ index + 1 }}.</div>
                    <div v-katex:auto class='subtitle-1 text-12 mcq-card' v-html='question.question'></div>
                    <img v-if='question.photo' :src='question.photo' style='max-width: 100% !important; width: 100%'>
                </div>
            </div>

            <div v-if='(uploadPercentage!==0 && uploadPercentage!==100) || uploadingAnswer'>
                <div>Uploading: {{ uploadPercentage }}% ...</div>
                <progress max='100' :value.prop='uploadPercentage' style='width: 100%'></progress>
            </div>

            <div v-if='previewImages.length && submittedAnswer' class='mt-1'>
                <div class='d-flex flex-wrap'>
                    <div v-for='(image, im) in previewImages' :key='im' class='formImageContainer'>
                        <img :src='image.src' alt='image' height='50px' class='rounded' style='margin: 2px 6px 2px 0; max-width: 100% !important; width: 100%'>
                        <!-- <v-icon class='imageCloseButton' color='error' @click.stop.prevent='removeImageFromCollection(im)'>
                                                    mdi-close-circle
                                                </v-icon> -->
                    </div>
                </div>
            </div>

            <div v-if='previewImages.length && !submittedAnswer' class='mt-1'>
                <div class='orange--text' v-if='!uploadingAnswer'>Drag to rearrange image</div>
                <draggable v-model='previewImages' @end='rearrange'>
                    <transition-group>
                        <div v-for='(image, im) in previewImages' class='formImageContainer'>
                            <img :src='image.src' alt='image' height='50px' class='rounded'
                                 style='margin: 2px 6px 2px 0; max-width: 100% !important; width: 100%'>
                            <v-icon class='imageCloseButton' color='error' @click.stop.prevent='removeImageFromCollection(im)'
                                    v-if='!uploadingAnswer'
                                    :disabled='uploadingAnswer'>
                                mdi-close-circle
                            </v-icon>
                        </div>
                    </transition-group>
                </draggable>
            </div>
            <div v-if='!isDisabled'>
                <div v-if='!submittedAnswer'>
                    <v-form @submit.prevent='submitAnswer()'>
                        <v-file-input
                            v-model='photos'
                            accept='image/png, image/jpeg, image/bmp, image/jpg, image/*'
                            prepend-icon='mdi-camera'
                            label='Upload photo'
                            multiple
                            counter
                            small-chips
                            show-size
                            truncate-length='10'
                            @change='onFilePicked'
                            :disabled='uploadingAnswer'
                        >
                            <template #selection='{ text }'>
                                <v-chip small label color='primary'>{{ text }}</v-chip>
                            </template>
                        </v-file-input>
                        <v-btn
                            type='submit'
                            small
                            color='green'
                            class='mx-1'
                            :disabled='!photos ||!previewImages|| uploadingAnswer'
                        >
                            Submit
                        </v-btn>
                    </v-form>
                </div>
                <div v-else>
                    <strong style='color: #5ff246'>Answer Submitted.</strong>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>


<script>
import draggable from 'vuedraggable'

export default {
    components: {
        draggable
    },
    props: {
        question: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
        isDisabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            uploadPercentage: 0,
            uploadingAnswer: false,
            submittedAnswer: false,
            rules: [
                value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!'
            ],
            photos: null,
            previewImages: [],
            answers: {}
        }
    },
    watch: {
        answers() {
            this.$emit('input', this.answers)
        }
    },
    computed: {
        token() {
            return this.$route.params.token ?? null
        }
    },
    methods: {
        async getAnswers() {
            let config = {}
            if (this.token) {
                config = {
                    headers: { Authorization: `Bearer ${this.token}` }
                }
            }
            await this.$axios.get(`answer?id=${this.question.id}`, config).then((resp) => {
                this.answers = resp
            })
        },
        onFilePicked() {
            this.previewImages = []
            if (this.photos && this.photos.length) {
                this.photos.forEach(element => {
                    this.previewImages.push({ 'src': URL.createObjectURL(element) })
                })
            }
        },
        removeImageFromCollection(imageKey) {
            this.photos.splice(imageKey, 1)
            this.previewImages.splice(imageKey, 1)
        },
        rearrange(ee) {
            const newIndex = ee.newIndex
            const oldIndex = ee.oldIndex
            // console.log(this.previewImages, oldIndex, newIndex)
        },
        async submitAnswer() {
            this.snackbar = false
            this.uploadingAnswer = true
            const formData = new FormData()
            formData.append('question_id', this.question.id)
            if (this.photos.length) {
                for (let i = 0; i < this.photos.length; i++) {
                    formData.append('photos[]', this.photos[i])
                }
            }
            const url = 'answer'
            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: function(progressEvent) {
                    this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
                }.bind(this)
            }
            if (this.token) {
                config = {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: function(progressEvent) {
                        this.uploadPercentage = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100))
                    }.bind(this)
                }
            }
            await this.$axios.post(url, formData, config).then(() => {
                this.submittedAnswer = true
                this.$notifier.showMessage({ content: 'Answer submitted!', color: 'success' })
                this.uploadingAnswer = false
                this.getAnswers()
            }).catch((error) => {
                if (error.response && error.response.status === 422)
                    this.$notifier.showMessage({ content: error.response.data.photos[0], color: 'error' })
                else
                    this.$notifier.showMessage({ content: error, color: 'error' })
            }).finally(() => {
                this.uploadingAnswer = false
            })
        },
        report() {

        }
    }
}
</script>

<style scoped lang='scss'>
.formImageContainer {
    position: relative;
}

.imageCloseButton {
    position: absolute;
    top: -2px;
    right: 2px;
    background-color: #09153A;
    border-radius: 50%;
}
</style>
