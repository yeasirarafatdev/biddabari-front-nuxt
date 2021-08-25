<template>
    <section class='vH-100 vW-100 max-width-' style='margin-top: 80px !important;'>

        <template v-if='$fetchState.pending'>
            <v-alert
                border='left'
                color='success lighten-1'
                dark>
                Loading content ...
            </v-alert>
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
            <v-alert
                v-if='!(courseTopics && Object.keys(courseTopics).length)'
                border='left'
                color='warning'
                dark
            >
                No course topics available!
            </v-alert>
            <v-alert
                v-else-if='!isAccessible'
                border='left'
                color='info lighten-1'
                dark
            >
                You can view some of the course contents. To view all contents you need to buy the course.
            </v-alert>
            <v-alert
                v-if='findingViewableContent'
                border='left'
                color='indigo lighten-1'
                dark
            >
                Finding viewable content ...
            </v-alert>
        </template>

        <course-information-modal
            v-if='courseTopics && Object.keys(courseTopics).length'
            :course-info='courseInfo'
        />

        <v-row>
            <!-- Load child route -->
            <nuxt-child v-if='!findingViewableContent' :course-slug='$route.params.course_slug' />
            <!-- Load child route -->

            <v-col cols='12' lg='4' md='4' sm='6' xs='12' class='text-14'>
                <lazy-course-topic-list
                    v-if='courseTopics'
                    :is-accessible='isAccessible'
                    :course-info='courseInfo'
                    :is-content-viewable='true'
                    :course-topics='courseTopics'
                    @displayCourseContent='displayContent($event)'
                />
            </v-col>
        </v-row>
    </section>
</template>

<script>
export default {
    layout: 'mobile',
    data() {
        return {
            findingViewableContent: true,
            isAccessible: true,
            courseInfo: [],
            courseTopics: [],
            myCourses: []
        }
    },
    async fetch() {
        const searchParameter = this.$route.params.course_slug;
        const courseUrl = `api/courses/${searchParameter}?filter=info`
        this.courseInfo = await this.$axios.$get(courseUrl)

        const courseTopicsUrl = `api/courses/${searchParameter}?filter=topics`
        this.courseTopics = await this.$axios.$get(courseTopicsUrl)

        if (this.$auth.loggedIn) {
            const myCoursesUrl = 'api/courses?filter=my-course'
            this.myCourses = await this.$axios.$get(myCoursesUrl)
            this.checkIfCourseIsEnrolled()
        }

        this.filterFirstViewableContent()
    },
    fetchOnServer: true,
    head() {
        return {
            title: this.courseInfo && Object.keys(this.courseInfo).length ? this.courseInfo.title : 'Course Content',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.courseInfo && Object.keys(this.courseInfo).length ? this.courseInfo.title + '. ' : '' + 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    },
    mounted() {
        this.filterFirstViewableContent()
    },
    activated() {
        const courseUrl = `api/courses/${this.$route.params.course_slug}?filter=info`
        this.courseInfo = this.$axios.$get(courseUrl)

        const courseTopicsUrl = `api/courses/${this.$route.params.course_slug}?filter=topics`
        this.courseTopics = this.$axios.$get(courseTopicsUrl)

        if (this.$auth.loggedIn) {
            const myCoursesUrl = 'api/courses?filter=my-course'
            this.myCourses = this.$axios.$get(myCoursesUrl)
            this.checkIfCourseIsEnrolled()
        }

        this.filterFirstViewableContent()
    },
    methods: {
        checkIfCourseIsEnrolled() {
            if (this.myCourses && Object.keys(this.myCourses).length) {
                const id = this.courseInfo.id
                let isAccessible = false
                this.myCourses.forEach(function(e) {
                    if (e.id === id) {
                        isAccessible = true
                    }
                })
                this.isAccessible = isAccessible
            }
        },
        filterFirstViewableContent() {
            if (!this.$route.params.content_id) {
                /// ..................... Code ./..........
                let topicId = null
                this.courseTopics.forEach(function topicLoop(obj) {
                    if (topicId) return
                    if (obj.contents) {
                        obj.contents.forEach(function contentLoop(cont) {
                            if (topicId) return
                            if (cont.allow === true) {
                                topicId = cont.id
                                contentLoop.stop = true
                            }
                        })
                    }
                })
                if (topicId) {
                    // Redirect ... to course topic ...
                    this.findingViewableContent = false
                    this.$router.push(`/courses/${this.courseInfo.slug}/content/${topicId}`)
                } else {
                    this.findingViewableContent = false
                }
            } else {
                this.findingViewableContent = false
            }
        },
        // async displayContent(contentId) {
        displayContent(contentId) {
            this.$router.push(`/courses/${this.courseInfo.slug}/content/${contentId}`)
        }
    }
}
</script>
