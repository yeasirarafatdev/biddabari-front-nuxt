<template>
    <div id='bannerSlider'>
        <client-only>
            <div v-swiper:mySwiper='swiperOption'>
                <div class='swiper-wrapper'>
                    <div v-for='sliderContent in sliderContents' :key='sliderContent.id' class='swiper-slide'>
                        <div>
                            <div v-if='sliderContent.title' class='swiper-slide-overlay'>
                                <p>{{ sliderContent.title }}</p>
                                <h1 class='mb-4'>{{ sliderContent.focusText }}</h1>
                                <a :href='sliderContent.link' class='action-button slider-hero-button'>{{ sliderContent.linkLabel }}</a>
                            </div>
                            <picture>
                                <source :srcset="require('~/assets/images/slides/'+sliderContent.bgImage)" type='image/webp' />
                                <img :src="require('~/assets/images/slides/'+sliderContent.bgImage)" alt='' loading='lazy'
                                     class='swiper-lazy swiper-image'>
                            </picture>
                            <div class='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
                        </div>
                    </div>
                </div>
                <div slot='button-prev' class='swiper-button-prev'>
                    <i class='fas fa-chevron-left'></i>
                </div>
                <div slot='button-next' class='swiper-button-next'>
                    <i class='fas fa-chevron-right'></i>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script>
// vue-slick-carousel // vue-owl-carousel
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
    components: {
        // eslint-disable-next-line vue/no-unused-components
        Swiper,
        // eslint-disable-next-line vue/no-unused-components
        SwiperSlide
    },
    directives: {
        swiper: directive
    },
    data() {
        return {
            sliderContents: [
                { id: 1, bgImage: '1.jpg', title: 'Free Coaching', focusText: 'For All', link: '#courses', linkLabel: 'Get Started' },
                { id: 2, bgImage: '2.jpg', title: 'Free Coaching', focusText: 'For All', link: '#courses', linkLabel: 'Get Started' },
                { id: 3, bgImage: '3.jpg', title: 'Read books grow', focusText: 'Knowledge', link: '#books', linkLabel: 'Find books' }
            ],
            swiperOption: {
                effect: 'fade',
                lazy: true,
                loop: true,
                slidesPerView: 1,
                spaceBetween: 0,
                centeredSlides: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        }
    }
}
</script>

<style scoped lang='scss'>
.swiper-slide {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(20, 20, 20, 1);
}

.swiper-pagination {
    .swiper-pagination-bullet {
        margin: 20px !important;
        /*@apply shadow-lg bg-gray-900 dark:bg-gray-50 border-2 border-purple-600;*/
        opacity: 1;

        &.swiper-pagination-bullet-active {
            width: 20px;
        }
    }
}

.swiper-button-prev::after,
.swiper-button-next::after {
    content: "";
}

.swiper-button-prev,
.swiper-button-next {
    /*@apply text-gray-900 dark:text-gray-50 bg-gray-50 dark:bg-gray-900
    rounded-full border-2 border-b-4 border-gray-800 dark:border-gray-100
    hover:bg-gray-300 dark:hover:bg-gray-700 shadow-lg;*/
    font-size: 20px;
    height: 40px;
    width: 40px;

    .fas {
        /*@apply text-gray-900 dark:text-gray-50;*/
    }
}
</style>
