<template>
    <div>
        <h1 style='margin-bottom: -40px; margin-left: 6px;'>{{ heading }}</h1>
        <swiper class='swiper' :options='swiperOption'>
            <template v-if='slideShowType=="books"'>
                <swiper-slide v-for='(data, d) in  dataArray' :key='d' style='padding: 60px 5px 20px 5px'>
                    <lazy-slide-show-card-book :data='data' :display-name='displayName'/>
                </swiper-slide>
            </template>
            <template v-else-if='slideShowType=="courses"'>
                <swiper-slide v-for='(data, d) in  dataArray' :key='d' style='padding: 60px 5px 20px 5px'>
                    <lazy-slide-show-card-course :data='data' :display-name='displayName' :display-price-label='displayPriceLabel'/>
                </swiper-slide>
            </template>
            <template v-else>
                <swiper-slide v-for='(data, d) in  dataArray' :key='d' style='padding: 60px 5px 20px 5px'>
                    <slot :data='data' name='card'></slot>
                </swiper-slide>
            </template>

            <div slot='button-prev' class='swiper-button-prev'>
                <i class='fas fa-chevron-left'></i>
            </div>
            <div slot='button-next' class='swiper-button-next'>
                <i class='fas fa-chevron-right'></i>
            </div>
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
    components: {
        Swiper,
        SwiperSlide
    },
    props: {
        dataArray: {
            type: Array,
            required: true
        },
        slideShowType: {
            type: String,
            default: ''
        },
        heading: {
            type: String,
            required: true
        },
        displayName: {
            type: String,
            required: true
        },
        centered: {
            type: Boolean,
            default: false
        },
        displayPriceLabel: {
            type: Boolean,
            default: false
        },
        singularSlide: {
            type: Boolean,
            default: false
        },
        // eslint-disable-next-line vue/require-default-prop
        breakpoints: {
            type: Object
        }
    },
    data() {
        return {
            swiperOption: {
                lazy: true,
                // loop: true,
                grabCursor: true,
                slidesPerView: 'auto',
                // slidesPerView: 4,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                centeredSlides: this.centered,
                breakpoints: {
                    1920: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    1366: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 15
                    },
                    400: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                }
            }
        }
    },
    beforeMount() {
        this.initSlide()
    },
    methods: {
        initSlide() {
            if (this.singularSlide) {
                this.swiperOption.breakpoints = {}
            }
            if (this.breakpoints) {
                this.swiperOption.breakpoints = this.breakpoints
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

.swiper-button-prev {
    left: auto !important;
    right: 46px !important;
}

.swiper-button-next {
    right: 6px;
}

.swiper-button-prev,
.swiper-button-next {
    top: 30px;
    color: rgb(20, 20, 20);
    background-color: white;
    border: 1px solid rgb(20, 20, 20, .4);
    border-radius: 4px;
    /*@apply text-gray-900 dark:text-gray-50 bg-gray-50 dark:bg-gray-900
    rounded-full border-2 border-b-4 border-gray-800 dark:border-gray-100
    hover:bg-gray-300 dark:hover:bg-gray-700 shadow-lg;*/
    font-size: 16px;
    height: 34px;
    width: 34px;
    transition: all 200ms ease-in-out;

    &:hover {
        color: white;
        background-color: #ffbf3f;
    }
}
</style>
