<template>
    <v-app style='background: transparent !important;'>

        <layout-the-header :links='links' />
        <layout-the-mobile-nav :links='links' />
        <div>
            <transition name='slide-bottom'>
                <Nuxt />
            </transition>
        </div>
        <layout-the-footer />

        <the-snack-bar />

        <div class='bg-bg-bg'>
        </div>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
            links: [
                { to: '/', label: 'Home' },
                {
                    to: '#', label: 'Courses',
                    subLinks: [
                        { to: '/courses', label: 'All Course' }
                    ]
                },
                //{ to: '/books', label: 'Books' },
                { to: '/notice', label: 'Notice' },
                {
                    to: '#', label: 'About',
                    subLinks: [
                        { to: '/about', label: 'Who We Are' },
                        { to: '/teachers', label: 'Teachers' },
                        { to: '/contact', label: 'Contact' }
                    ]
                }
            ],
            courseCategories: {}
        }
    },
    async fetch() {
        await this.$axios.$get('api/categories').then((response) => {
            this.courseCategories = response
            this.generateCourseSubLinks()
        })

        if (this.$auth.loggedIn) {
            const myCoursesUrl = 'api/courses?filter=my-course'
            await this.$axios.$get(myCoursesUrl).then((response) => {
                this.$store.commit('userData/setEnrolledCourses', response)
            })
        }
    },
    fetchOnServer: true,
    mounted() {
        this.$store.dispatch('cart/getDBCart')
        /* if (this.$auth.loggedIn) {
            this.$store.dispatch('userData/fetchEnrolledCourse')
        } */
        /* this.$axios.$get('/api/user').then((resp) => {
            this.$auth.setUser(resp)
        }) */
    },
    methods: {
        generateCourseSubLinks() {
            let _this = this
            if (this.courseCategories && Object.keys(this.courseCategories).length) {
                this.courseCategories.forEach((e) => {
                    _this.links[1].subLinks.push({ to: '/courses/category/' + e.id, label: e.name })
                })
            }
        }
    }
}
</script>

<style lang='scss'>
//@import "assets/scss/gs/grammo_shodae.scss";
.slide-bottom-enter-active,
.slide-bottom-leave-active {
    transition: opacity .8s ease-in-out, transform 0.8s ease-in-out;
}

.slide-bottom-enter,
.slide-bottom-leave-to {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
}

.bg-bg-bg {
    height: 100vh;
    width: 100%;
    position: fixed;
    z-index: -1;
    background: linear-gradient(to bottom right, white 15%, transparent),
    radial-gradient(circle at 100% 0%, rgba(0, 0, 0, .08) 10%, transparent 20%) center center / 15px 15px,
    linear-gradient(to bottom right, #e3e3e3, white);
}
</style>
