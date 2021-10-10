<template>
    <section class='vH-100 vW-100 max-width-'>
        <the-breadcrum :items-push="[{text: 'My Course',disabled: true,href: '/my-courses'}]" />

        <v-row>
            <v-col cols='12' v-if='$fetchState.pending'>
                <div class='text-center my-6'>
                    <v-progress-circular
                        :size='50'
                        color='primary'
                        indeterminate
                    ></v-progress-circular>
                </div>
            </v-col>
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
                <v-col cols='12'>
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
                </v-col>
            </template>
        </v-row>
    </section>
</template>

<script>
export default {
    // middleware: ['require_authenticated']
    inject: {
        theme: {
            default: { isDark: false }
        }
    },
    data() {
        return {
            myCourses: []
        }
    },
    async fetch() {
        if (this.$auth.loggedIn) {
            const myCoursesUrl = 'courses?filter=my-course'
            this.myCourses = await this.$axios.$get(myCoursesUrl)
        }
    },
    fetchOnServer: false,
    head() {
        return {
            title: 'Courses',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Biddabari'
                }
            ]
        }
    }
}
</script>
