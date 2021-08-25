<template>
    <div id='bannerSlider' class='mb-16' style='max-height: 400px !important;'>
        <client-only>
            <div v-swiper:mySwiper='swiperOption'>
                <div class='swiper-wrapper mb-16'>
                    <div v-for='sliderContent in sliderContents' :key='sliderContent.id' class='swiper-slide'>
                        <picture>
                            <source :srcset="require('~/assets/images/slides/'+sliderContent.bgImage)" type='image/webp' />
                            <img :src="require('~/assets/images/slides/'+sliderContent.bgImage)" alt='' loading='lazy'
                                 class='swiper-lazy swiper-image' style='max-height: 400px !important;' width='100'>
                        </picture>
                        <div class='swiper-lazy-preloader swiper-lazy-preloader-white'></div>
                    </div>
                    <div slot='pagination' class='swiper-pagination'></div>
                </div>
            </div>
        </client-only>
    </div>
</template>

<script>
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
                { id: 1, bgImage: '1.jpg', title: 'Better education for a better', focusText: 'WORLD', link: '/', linkLabel: 'Buy now' },
                { id: 2, bgImage: '2.jpg', title: 'Better education for a better', focusText: 'world', link: '/', linkLabel: 'Buy now' },
                { id: 3, bgImage: '3.jpg', title: 'Better education for a better', focusText: 'World', link: '/', linkLabel: 'Buy now' }
            ],
            swiperOption: {
                effect: 'fade',
                lazy: true,
                loop: true,
                slidesPerView: 1,
                spaceBetween: 0,
                centeredSlides: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    }
}
</script>

<style lang='scss'>
.swiper-slide {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(20, 20, 20, 1);
}

.swiper-pagination {
    bottom: -20px;
    left: 50%;
    transform: translate(-50%, 50%);
}

.swiper-button-prev::after,
.swiper-button-next::after {
    content: "";
}

.swiper-button-prev,
.swiper-button-next {
    font-size: 20px;
    height: 40px;
    width: 40px;
}
</style>
