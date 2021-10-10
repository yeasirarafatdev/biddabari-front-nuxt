<template>
    <div>
        <div class='relative'>
            <!-- Banner -->
            <div class='home-banner-container max-width-'>
                <div class='home-banner-content'>
                    <h1 class='color-yellow'>বিদ্যাবাড়ি</h1>
                    <h3 class=''>ঘরে বসেই বিসিএস প্রস্তুতি</h3>
                    <p class='text-14 text--secondary bold'>সফল BCS ক্যাডার এম আই প্রধান মুকুল স্যারের তত্ত্বাবধানে BCS কোর্স। শিক্ষকতায় দীর্ঘ অভিজ্ঞতা সম্পন্ন একঝাঁক মেধাবী ও চৌকস শিক্ষকমন্ডলী দ্বারা পরিচালিত।</p>
                </div>
                <div class='home-banner-image'>
                    <img :src='require("~/assets/images/biddiabari/banner.png")' alt='' width='100%'>
                </div>
            </div>
        </div>


        <!-- Notice Board Section -->
        <section v-if='allNotice && Object.keys(allNotice).length' class='max-width-'>
            <lazy-slide-show
                :data-array='allNotice'
                display-name='title'
                heading='Notice board'
                :singular-slide='true'>
                <div slot='card' slot-scope='{data}' class='notice-board card-round px-4'>
                    <div style='text-align: left'>
                        <h1 class='font-roboto-slab my-2'>{{ data.title | truncate(60) }}</h1>
                        <div class='truncate-ellipsis' v-html='data.body'></div>
                        <nuxt-link :to='"/notice/"+data.slug' class='action-button mt-4'>Read more</nuxt-link>
                    </div>
                    <div>
                        <img :src='data.photo' alt='' loading='lazy'
                             class='swiper-lazy swiper-image'>
                    </div>
                </div>
            </lazy-slide-show>
            <div class='text-center'>
                <nuxt-link to='/notice' class='btn-theme-btn'>All Notice</nuxt-link>
            </div>
        </section>

        <!-- Services -->
        <section class='max-width-' v-if='categories && Object.keys(categories).length'>
            <div class='services-container'>
                <template v-for='category in categories'>
                    <nuxt-link :to='"/courses/category/"+category.id' class='services-card' :key='category.id'>
                        <div class='icon-yellow'>
                            <img :src='category.photo' alt='' height='50px' width='50px'>
                        </div>
                        <div>
                            <h3>{{ category.name }}</h3>
                        </div>
                    </nuxt-link>
                </template>
            </div>
        </section>

        <!-- Why us section -->
        <section class='max-width-'>
            <div>
                <h1 class='mb-5'>Why Us ?</h1>
                <v-row>
                    <v-col cols='12' sm='6'>
                        <!-- v-video-embed ... Enables to change video URL on click of a button -->
                        <!-- Tutorial:  -->
                        <!-- https://codingshiksha.com/vue/vue-js-iframe-embed-component-for-youtubedailymotionvimeo-videos-using-v-video-embed-library-in-javascript-full-project-for-beginners/ -->
                        <video-embed css='embed-responsive-16by9' src='https://youtu.be/ZRgZUqDEEeA'></video-embed>
                    </v-col>
                    <v-col cols='12' sm='6'>
                        <div class='text-14 line-height-24 text-muted'>
                            <div>দীর্ঘ একাডেমিক পড়ালেখা শেষ করে চাকুরী নিয়োগ পরীক্ষায় অংশ নিতে একজন প্রার্থীর যে সমস্যাগুলি হয় তার মধ্যে অন্যতম হচ্ছে –</div>
                            <div>ক) কোথা থেকে শুরু করতে হবে, কী পড়তে হবে, কোথা থেকে পড়তে হবে।</div>
                            <div>খ) কোন বইগুলি দিয়ে পড়া শুরু করতে হবে ।</div>
                            <div>গ) অনেক পড়েও কিছুই মনে থাকে না ।</div>
                            <div>ঘ) ইংরেজি, গণিত এর পাশাপাশি অন্যান্য কঠিন বিষয়গুলি থেকে কীভাবে প্রস্তুতি নেয়া সহজ হবে। এ ধরনের নানাবিধ সমস্যা বা প্রশ্ন মাথায় নিয়ে একজন নতুন চাকরি প্রত্যাশী প্রার্থী ভাবনায় থাকে।</div>

                            <div>াবাড়ী" প্রতিষ্ঠানটি পরিচালিত হয় দীর্ঘ অভীজ্ঞ একজন বিসিএস ক্যাডার কর্মকর্তার মস্তিস্ক নিঃসৃত নির্দেশনা ও গাইড লাইনের মাধ্যমে।</div>
                            <div>এখানে যে সকল শিক্ষক মণ্ডলী ক্লাস নেন তাঁরা সবাই দীর্ঘ অভীজ্ঞ ও সমৃদ্ধ জ্ঞাণের অধিকারী। বিদ্যাবাড়ীতে কেবল লেকচার ক্লাস বা নিয়মিত পরীক্ষাই নেয়া হয় না, এখানে একজন নতুন চাকুরী প্রত্যাশী প্রার্থীর প্রস্তুতি কীভাবে নিতে হবে , কত ঘন্টা পড়তে হবে , কী কী বই পড়তে হবে এইগুলোও ঠিক করে দেয়া হয়। এর পাশাপাশি একজন অভিভাবকের মতো করেই বিদ্যাবাড়ি টীম প্রতিটি শিক্ষার্থীকে প্রতি সপ্তাহে বাড়িতে পড়ার জন্য হোম এসাইনমেন্ট দিয়ে থাকে এবং নিয়মিত লেকচার ক্লাস এর পাশাপাশি সেই এসাইন্টমেন্ট এর উপর পরীক্ষা নিয়ে একজন নতুন অনভিজ্ঞ শিক্ষার্থীকে চৌকস করে তোলার কাজ করে থাকে।</div>

                            <div>, মাত্র কয়েক মাসের মধ্যেই বিদ্যাবাড়ির প্রতিটি শিক্ষার্থী খুব দ্রুতই আগের থেকে অনেক বেশি সমৃদ্ধ মনে করে থাকে।</div>
                            <div>বিসিএস বা যেকোন জব পরীক্ষায় শুরু থেকে ভাল করতে বিদ্যাবাড়ি এক অনন্য ব্যতিক্রম প্রতিষ্ঠান।</div>
                            <div>সুযোগ থাকলে বিদ্যাবাড়ির যেকোন একটি কোর্স করার আমন্ত্রণ রইল।</div>
                        </div>
                        <div class='text-center'>
                            <nuxt-link to='/about'>
                                <v-btn dark class='mx-auto btn-theme-btn'>Want to know more ?
                                    <v-icon class='ml-2'>mdi-arrow-right-bold-circle-outline</v-icon>
                                </v-btn>
                            </nuxt-link>
                        </div>
                    </v-col>
                </v-row>
            </div>
        </section>


        <!-- Courses section -->
        <section v-if='courses && Object.keys(courses).length' id='courses' class='max-width-'>
            <div class='d-flex justify-lg-space-between align-center flex-wrap mb-10 justify-md-space-between justify-sm-space-between justify-space-around'>
                <h1 class='theme-text mb-4' style='font-size: 50px; border-bottom: 2px solid #1b2437;'>Our Courses</h1>
                <img :src='require("~/assets/images/biddiabari/our-courses.png")' alt='' width='300'>
            </div>
            <v-row>
                <v-col v-for='course in courses' cols='12' lg='3' md='3' sm='4' :key='course.id'>
                    <lazy-slide-show-card-course :data='course' display-name='title' :display-price-label='true' />
                </v-col>
            </v-row>
            <div class='my-10 text-center'>
                <div style='width: 86px;margin: 0 auto;'>
                    <nuxt-link to='/courses' exact class='btn-theme-btn'>
                        All Courses
                    </nuxt-link>
                </div>
            </div>
        </section>

        <!-- Books section -->
        <section v-if='books && Object.keys(books).length' id='books' class='max-width-'>
            <lazy-slide-show
                :data-array='books'
                display-name='title'
                heading='Books'
                :breakpoints='bookSliderBreakPoints'
                slide-show-type='books' />
            <div class='mt-4 text-center'>
                <nuxt-link to='/books' class='btn-blue'>All Books</nuxt-link>
            </div>
        </section>

        <!-- Teachers section -->
        <section v-if='teachers && Object.keys(teachers).length' class='gradientBG'>
            <div class='max-width- px-4percent'>
                <lazy-slide-show
                    :data-array='teachers'
                    display-name='name'
                    heading='Honourable Teachers'>
                    <div slot='card' slot-scope='{data}' class='card-round'>
                        <v-avatar height='80' width='80'>
                            <v-img
                                :lazy-src='data.photo'
                                max-height='150'
                                max-width='150'
                                :src='data.photo'
                            ></v-img>
                        </v-avatar>
                        <div class='mt-4'>
                            <strong>{{ data.name }}</strong>
                            <div>{{ data.designation }}</div>
                        </div>
                    </div>
                </lazy-slide-show>
                <div class='mt-4 text-center'>
                    <div style='width: 86px;margin: 0 auto;'>
                        <nuxt-link to='/teachers' exact class='btn-theme-btn'>
                            Show All
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </section>

        <!-- Student Review section -->
        <section v-if='testimonial && Object.keys(testimonial).length' class='max-width-'>
            <lazy-slide-show
                :data-array='testimonial'
                display-name='name'
                heading='Students Review'
                :singular-slide='true'>
                <div slot='card' slot-scope='{data}' class='card-round'>
                    <div class='notice-board'>
                        <div>
                            <p>{{ data.review }}</p>
                        </div>
                        <div class='text-center'>
                            <img :src='data.photo' alt='' loading='lazy'
                                 class='swiper-lazy swiper-image'
                                 style='height: 100px; width: 100px; object-fit: cover; object-position: center; border-radius: 50%'>
                            <div>
                                <strong>{{ data.name }}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </lazy-slide-show>
        </section>

        <!-- Founders section -->
        <section v-if='founders && Object.keys(founders).length' class='gradientBG'>
            <lazy-slide-show
                :data-array='founders'
                display-name='name'
                heading='Founders'
                :centered='false'
                :breakpoints='founderSliderBreakPoints'>
                <div slot='card' slot-scope='{data}' class='card-round'>
                    <v-avatar height='150' width='150' class='shadow-dark'>
                        <v-img
                            :lazy-src='data.photo'
                            max-height='250'
                            max-width='250'
                            :src='data.photo'>
                        </v-img>
                    </v-avatar>
                    <div class='mt-4'>
                        <strong>{{ data.name }}</strong>
                        <div>{{ data.designation }}</div>
                    </div>
                </div>
            </lazy-slide-show>
            <div class='mt-4 text-center'>
                <div style='width: 86px;margin: 0 auto;'>
                    <nuxt-link to='/founders' exact class='btn-theme-btn'>
                        Show all
                    </nuxt-link>
                </div>
            </div>
        </section>


        <div v-show='notification && Object.keys(notification).length' class='notification-holder'>
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

    </div>
</template>

<script>
export default {
    data() {
        return {
            notification: {},
            books: [],
            courses: [],
            categories: [],
            allNotice: {},

            teachers: [],
            founders: [],
            testimonial: [],
            founderSliderBreakPoints: {
                1366: { slidesPerView: 3, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                400: { slidesPerView: 2, spaceBetween: 10 },
                320: { slidesPerView: 1, spaceBetween: 10 }
            },
            lg4BreakPoints: {
                1366: { slidesPerView: 4, spaceBetween: 30 },
                1024: { slidesPerView: 4, spaceBetween: 30 },
                768: { slidesPerView: 3, spaceBetween: 20 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                400: { slidesPerView: 2, spaceBetween: 10 },
                320: { slidesPerView: 1, spaceBetween: 10 }
            },
            bookSliderBreakPoints: {
                1366: { slidesPerView: 6, spaceBetween: 30 },
                1024: { slidesPerView: 5, spaceBetween: 30 },
                800: { slidesPerView: 5, spaceBetween: 30 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                640: { slidesPerView: 4, spaceBetween: 15 },
                400: { slidesPerView: 3, spaceBetween: 10 },
                320: { slidesPerView: 2, spaceBetween: 10 }
            }
        }
    },
    async fetch() {
        const booksUrl = 'books?filter=welcome'
        this.books = await this.$axios.$get(booksUrl)

        const coursesUrl = 'courses-welcome'
        this.courses = await this.$axios.$get(coursesUrl)

        const categoriesUrl = 'categories'
        this.categories = await this.$axios.$get(categoriesUrl)

        this.testimonial = await this.$axios.$get('preview-reviews')

        const noticeUrl = 'notices'
        const allNotice = await this.$axios.$get(noticeUrl)
        this.allNotice = allNotice.data
    },
    fetchOnServer: false,
    head() {
        return {
            title: 'Home',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    },
    mounted() {
        this.$axios.get('popup').then((response) => {
            this.notification = response.data
        })
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const hrUrl = 'hr'
            const hr = await this.$axios.$get(hrUrl)
            this.teachers = hr.filter(obj => {
                return obj.hr_type === 'teacher'
            })
            this.founders = hr.filter(obj => {
                return obj.hr_type === 'founder'
            })
        },
        async closeNotification(popup_id) {
            await this.$axios.$post('popup', { 'popup_id': popup_id }).then(() => {
                this.notification = {}
            })
        }
    }
}
</script>

<style>
.gradientBG {
    color: white;
    background: linear-gradient(to bottom right, #3C4BBD 15%, transparent),
    radial-gradient(circle at 100% 0%, rgba(0, 0, 0, .2) 10%, transparent 20%) center center / 15px 15px,
    linear-gradient(to bottom right, #3C4BBD, #57ADD8);
}
</style>
