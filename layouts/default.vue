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

        <div v-show='notification && Object.keys(notification).length'
             class='notification-holder'>
            <div class='notification'>
                <div>
                    <img :src='notification.photo' alt=''>
                </div>
                <div>
                    <a v-if='notification.link'>
                        <div><strong>{{ notification.title }}</strong></div>
                    </a>
                    <div v-else><strong>{{ notification.title }}</strong></div>
                    <div style='overflow-y: auto'>
                        <div class='text-14' v-html='notification.body'></div>
                    </div>
                </div>
                <div class='notification-close-btn' @click.stop.prevent='closeNotification(notification.id)'>
                    <v-icon color='white'>mdi-close</v-icon>
                </div>
            </div>
        </div>

        <div class='bg-bg-bg'></div>
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
                        { to: '/courses', label: 'All Course' },
                    ]
                },
                { to: '/books', label: 'Books' },
                { to: '/notice', label: 'Notice' },
                { to: '/job-news', label: 'Job News' },
                {
                    to: '#', label: 'About',
                    subLinks: [
                        { to: '/about', label: 'Who We Are' },
                        { to: '/teachers', label: 'Teachers' },
                        { to: '/founders', label: 'Founders' },
                        { to: '/contact', label: 'Contact' }
                    ]
                }
            ],
            courseCategories: {},
            notification: {}
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
    fetchOnServer: false,
    mounted() {
        this.$store.dispatch('cart/getDBCart')
        this.$axios.get('api/popup').then((response) => {
            this.notification = response.data
        })
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
                    if (e.sub_categories) {
                        e.sub_categories.forEach((x) => {
                            _this.links[1].subLinks.push({ to: '/courses/category/' + x.id, label: x.name, sub: true })
                        }, e)
                    }
                })
            }
        },
        async closeNotification(popup_id) {
            await this.$axios.$post('api/popup', { 'popup_id': popup_id }).then(() => {
                this.notification = {}
            })
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

.notification-holder {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;

    .notification {
        position: relative;
        min-width: 280px;
        max-width: 400px;
        max-height: 500px;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0 0 10px rgba(20, 20, 20, 0.6);

        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;

        &:hover {
            box-shadow: 0 0 6px rgba(20, 20, 20, 0.6);
        }

        opacity: 0;
        transition: all 400ms ease-in-out;
        transform: translateX(100%);
        animation-delay: 5s;
        animation: popup 0.6s ease-in-out forwards;

        img {
            margin-right: 10px;
            border-radius: 10px;
            box-shadow: 0 0 4px rgba(20, 20, 20, 0.4);
            max-height: 80px;
            max-width: 80px;
        }

        .notification-close-btn {
            position: absolute;
            top: -10px;
            right: -10px;
            background-color: orangered;
            color: white;
            padding: 6px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 6px rgba(20, 20, 20, 1);
            transition: all 200ms ease-in-out;

            &:hover {
                background-color: crimson;
                box-shadow: 0 0 2px rgba(20, 20, 20, 1);
            }
        }

    }
}

@keyframes popup {
    0% {
        opacity: 0;
        transform: translateX(100%);
    }
    100% {
        opacity: 1;
        transform: translateX(0px);
    }
}
</style>
