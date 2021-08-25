<template>
    <section class='vH-100 vW-100 mt-16 max-width-'>
        <!-- Banner Image -->
        <lazy-layout-the-banner :image-url="require('~/assets/images/online-course-banner.jpg')" />

        <div v-if='$auth.loggedIn && myCourses && Object.keys(myCourses).length' class='mt-8'>
            <h1 class='my-6 text-center'>My Courses</h1>
            <hr class='mb-4'>
            <h3 class='mb-6 bg-yellow px-4 py-2'
                style='color: #09153A; border-radius: 4px;'>
                <i class='fas fa-crosshairs mr-2'></i> My Courses
            </h3>
            <v-row>
                <v-col v-for='(course, c) in myCourses' :key='c' cols='12' lg='3' md='4' sm='6' xs='12'>
                    <lazy-slide-show-card-course :data='course' :show-subtitle='true' display-name='title' />
                </v-col>
            </v-row>
        </div>
        <div class='mt-8'>
            <h1 class='my-6 text-center'>All Courses</h1>
            <hr class='mb-4'>
            <div v-if='$fetchState.pending'>
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
            </div>
            <div v-else-if='$fetchState.error'>
                <v-alert
                    border='top'
                    color='red lighten-2'
                    dark
                >
                    {{ $fetchState.error && $fetchState.error.response && $fetchState.error.response.status == 403 ? 'Access Denied!' : $fetchState.error.message }}
                </v-alert>
            </div>
            <div v-else>
                <template v-if='courses && Object.keys(courses).length'>
                    <div v-for='(data, d) in  courses' :key='d' class='mb-16'>
                        <h3 class='mb-6 bg-yellow px-4 py-2'
                            style='color: #09153A; border-radius: 4px;'>
                            <i class='fas fa-crosshairs mr-2'></i> {{ data.name }}
                        </h3>
                        <v-row>
                            <v-col v-for='(course, c) in data.courses' :key='c' cols='12' lg='3' md='4' sm='6' xs='12'>
                                <lazy-slide-show-card-course
                                    :data='course'
                                    :show-subtitle='true'
                                    display-name='title' />
                            </v-col>
                        </v-row>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    layout: 'mobile',
    // middleware: ['require_authenticated']
    inject: {
        theme: {
            default: { isDark: false }
        }
    },
    data() {
        return {
            courses: [],
            myCourses: []
        }
    },
    async fetch() {
        const coursesUrl = 'api/courses?filter=category'
        this.courses = await this.$axios.$get(coursesUrl)

        if (this.$auth.loggedIn) {
            const myCoursesUrl = 'api/courses?filter=my-course'
            this.myCourses = await this.$axios.$get(myCoursesUrl)
        }
    },
    fetchOnServer: true,
    head() {
        return {
            title: 'Courses',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    }
}
</script>
