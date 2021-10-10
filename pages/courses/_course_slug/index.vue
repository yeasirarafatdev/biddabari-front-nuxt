<template>
    <section class='vH-100 vW-100 max-width-'>
        <!-- Banner Image -->
        <!--        <lazy-layout-the-banner
                    v-if='courseInfo.photo'
                    :image-url='courseInfo.photo' />-->

        <!-- Breadcrum -->
        <lazy-the-breadcrum
            v-if='courseInfo && Object.keys(courseInfo).length'
            :items-push="[{text: 'Course',disabled: false,href: '/courses'}, {text: courseInfo.title, disabled: true, href: '/'}]" />

        <div class='mt-2'>
            <v-card :loading='$fetchState.pending' elevation='4'>
                <!-- Loading Content -->
                <template v-if='$fetchState.pending'>
                    <v-sheet
                        :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
                        class='pa-3'
                    >
                        <v-skeleton-loader
                            class='mx-auto'
                            max-width='300'
                            type='card'
                        ></v-skeleton-loader>
                    </v-sheet>
                </template>
                <!-- Error fetching Content -->
                <template v-else-if='$fetchState.error'>
                    <v-alert
                        border='top'
                        color='red lighten-2'
                        dark
                    >
                        {{ $fetchState.error && $fetchState.error.response && $fetchState.error.response.status == 403 ? 'Access Denied!' : $fetchState.error.message }}
                    </v-alert>
                </template>
                <template v-else>
                    <div v-if='(courseInfo && Object.keys(courseInfo).length)'>
                        <v-card-title class='bg-yellow'>
                            <strong><i class='fas fa-crosshairs mr-2'></i> {{ courseInfo.title }}</strong>
                        </v-card-title>
                        <v-subheader>
                            <strong class='color-orange'>
                                <span class='text-muted'>Status: </span>
                                {{ courseInfo.sub_title }}
                            </strong>
                        </v-subheader>
                        <div class='px-3'>
                            <v-row class='my-2'>
                                <!-- Course Content Count -->
                                <v-col cols='12' lg='5' md='5' sm='6' xs='12'>
                                    <v-list disabled>
                                        <v-subheader class='bg-yellow'><strong>Contents</strong></v-subheader>
                                        <v-list-item-group color='primary'>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon v-text="'mdi-video'"></v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ resourceCount.video }} Video Lectures</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon v-text="'mdi-card-text-outline'"></v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ resourceCount.note }} Notes</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon v-text="'mdi-file-pdf'"></v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ resourceCount.pdf }} PDF Books</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-icon>
                                                    <v-icon v-text="'mdi-clipboard-edit-outline'"></v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <v-list-item-title>{{ resourceCount.exam }} Exams</v-list-item-title>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-col>
                                <!-- Course name photo -->
                                <v-col cols='12' lg='7' md='7' sm='6' xs='12'>
                                    <img :src='courseInfo.photo' alt='' style='width:100%; max-width: 100%' class='shadow'>
                                    <div class='mt-4'>
                                        <div class='my-2 d-flex justify-space-between align-center flex-wrap'>
                                            <div title='price'>
                                                <template v-if='!myCoursesIds.includes(courseInfo.id)'>
                                                    <div v-if='courseInfo.price'>
                                                        <div v-if='courseInfo.discount'>
                                                            <strong>
                                                                <del class='text-muted'>৳ {{ courseInfo.price }}</del>
                                                                <br>
                                                                <span class='color-orange'>৳ {{ courseInfo.price - courseInfo.discount }} </span>
                                                            </strong>
                                                            <span class='text-12'>You save ৳ {{ courseInfo.price - (courseInfo.price - courseInfo.discount) }}</span>
                                                        </div>
                                                        <strong v-else class='color-orange'>৳ {{ courseInfo.price }}</strong>
                                                    </div>
                                                    <div v-else class='color-success'><strong> Free </strong></div>
                                                </template>
                                                <template v-else>
                                                    <div class='color-success'><strong> Enrolled </strong></div>
                                                </template>
                                            </div>
                                        </div>
                                        <div class='my-4 text-center'>
                                            <template v-if='!myCoursesIds.length || !myCoursesIds.includes(courseInfo.id)'>
                                                <template v-if='courseInfo.price'>
                                                    <nuxt-link :to='"/courses/"+courseInfo.slug+"/payment"'>
                                                        <v-btn color='primary lighten-2 mb-2' small>Buy Course</v-btn>
                                                    </nuxt-link>
                                                </template>
                                                <template v-else>
                                                    <v-btn color='primary lighten-2 mb-2' small @click.stop.prevent='enroll(0, courseInfo)'>Enroll now</v-btn>
                                                </template>
                                            </template>
                                            <nuxt-link :to='"/courses/"+courseInfo.slug+"/content"'>
                                                <v-btn color='warning lighten-2 mb-2' small>View Course Content</v-btn>
                                            </nuxt-link>
                                        </div>
                                    </div>
                                </v-col>
                                <!-- About Course -->
                                <v-col v-if='courseInfo.description' cols='12' lg='12' md='12' sm='12' xs='12'>
                                    <h2 class='mb-2'>About this course</h2>
                                    <hr class='mb-4'>
                                    <div class='course-description text-12 max-height-200' v-html=courseInfo.description></div>
                                    <div class='text-center mt-4'>
                                        <v-btn class='themeBtn mb-2' small @click.stop.prevent='expandDescription()'>
                                            <span v-if='!isCourseDescriptionExpanded'>Read More <i class='fas fa-caret-down'></i></span>
                                            <span v-else><i class='fas fa-caret-up'></i></span>
                                        </v-btn>
                                    </div>
                                </v-col>
                                <!-- Course Content -->
                                <v-col v-if='courseTopics && Object.keys(courseTopics).length' cols='12' lg='12' md='12' sm='12' xs='12'>
                                    <h2 class='mb-2'>Course content</h2>
                                    <hr class='mb-4'>
                                    <div class='course-content text-12 pb-4 max-height-200'>
                                        <lazy-course-topic-list
                                            v-if='courseTopics'
                                            :is-list-disabled='false'
                                            :course-topics='courseTopics' />
                                    </div>
                                    <div class='text-center mt-4'>
                                        <v-btn class='themeBtn mb-2' small @click.stop.prevent='expandCourseContent()'>
                                            <span v-if='!isCourseContentExpanded'>View Content <i class='fas fa-caret-down'></i></span>
                                            <span v-else><i class='fas fa-caret-up'></i></span>
                                        </v-btn>
                                    </div>
                                </v-col>
                                <!-- Course Requirements -->
                                <v-col v-if='courseInfo.requirements' cols='12' lg='12' md='12' sm='12' xs='12'>
                                    <h2 class='mb-2'>Requirements</h2>
                                    <hr class='mb-4'>
                                    <div class='text-12' v-html=courseInfo.requirements></div>
                                </v-col>
                            </v-row>
                        </div>
                    </div>
                    <div v-else>
                        <v-alert
                            border='top'
                            color='red lighten-2'
                            dark>
                            Sorry! Failed to load course data.
                        </v-alert>
                    </div>

                    <dialog-want-to-view-content :content-url='"/courses/"+courseInfo.slug+"/content"' />

                </template>
            </v-card>
        </div>

        <!-- Recommended Courses section -->
        <section v-if='recommendedCourses && Object.keys(recommendedCourses).length' class='max-width-'>
            <lazy-slide-show
                :data-array='recommendedCourses'
                display-name='title'
                heading='Recommended Courses'
                slide-show-type='courses'
                :display-price-label='false' />
            <div class='mt-4 text-center'>
                <nuxt-link to='/courses'>
                    <v-btn class='themeBtn mb-2'>All Courses</v-btn>
                </nuxt-link>
            </div>
        </section>

    </section>
</template>

<script>
export default {
    inject: {
        theme: {
            default: { isDark: false }
        }
    },
    data() {
        return {
            showDialogue: false,
            courseInfo: [],
            courseTopics: [],
            recommendedCourses: {},
            isCourseDescriptionExpanded: false,
            isCourseContentExpanded: false,
            resourceCount: {
                video: 0,
                pdf: 0,
                note: 0,
                exam: 0
            },
            dialog: false
        }
    },
    async fetch() {
        const searchParameter = this.$route.params.course_slug
        const courseUrl = `courses/${searchParameter}?filter=info`
        this.courseInfo = await this.$axios.$get(courseUrl)

        const courseTopicsUrl = `courses/${searchParameter}?filter=topics`
        this.courseTopics = await this.$axios.$get(courseTopicsUrl)
        this.calculateCourseResource()
    },
    fetchOnServer: false,
    head() {
        return {
            title: this.courseInfo && Object.keys(this.courseInfo).length ? this.courseInfo.title : 'Course',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.courseInfo && Object.keys(this.courseInfo).length ? this.courseInfo.title + '. ' : '' + 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    },
    computed: {
        myCoursesIds() {
            return this.$store.state.userData.myCoursesIds
        }
    },
    mounted() {
        this.checkIfCourseIsEnrolled()
        this.getRecommendedBooks()
    },
    methods: {
        checkIfCourseIsEnrolled() {
            if (this.$auth.loggedIn && this.myCoursesIds.length) {
                if (this.courseInfo && Object.keys(this.courseInfo).length) {
                    this.$router.push(`/courses/${this.courseInfo.slug}/content`)
                }
            }
        },
        async getRecommendedBooks() {
            const url = `courses?filter=recommended`
            this.recommendedCourses = await this.$axios.$get(url)
        },
        calculateCourseResource() {
            const _this = this
            if (this.courseTopics && Object.keys(this.courseTopics).length) {
                this.courseTopics.forEach(function(topic) {
                    if (topic.contents && Object.keys(topic.contents).length) {
                        _this.resourceCount.video = _this.resourceCount.video + topic.total_video_count
                        _this.resourceCount.note = _this.resourceCount.note + topic.total_note_count
                        _this.resourceCount.exam = _this.resourceCount.exam + topic.total_exam_count
                        _this.resourceCount.pdf = _this.resourceCount.pdf + topic.total_pdf_count
                    }
                })
            }
        },
        expandDescription() {
            this.isCourseDescriptionExpanded = !this.isCourseDescriptionExpanded
            document.querySelector('.course-description').classList.toggle('max-height-200')
        },
        expandCourseContent() {
            this.isCourseContentExpanded = !this.isCourseContentExpanded
            document.querySelector('.course-content').classList.toggle('max-height-200')
        },
        async enroll(amount, courseInfo) {
            if (this.$auth.loggedIn) {
                await this.$axios.$post('payment', { amount, course_id: courseInfo.id }).then((response) => {
                    if (this.$auth.user.id === response.user_id) {
                        this.$notifier.showMessage({ content: 'Enrolled to course successfully!', color: 'success' })
                        this.$router.push(`/courses/${courseInfo.slug}/content`)
                    }
                })
                return
            }
            await this.$router.push('/auth/login')
        }
    }
}
</script>
