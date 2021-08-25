<template>
    <div class='slide-show-card'>
        <div>
            <div class='image-container'>
                <nuxt-link :to='courseUrl'>
                    <img :src='data.photo ? data.photo: require("~/assets/images/placeholder.gif")' alt='' style='max-width: 500px'>
                </nuxt-link>
            </div>
            <div class='d-flex justify-center flex-column'>
                <nuxt-link :to='courseUrl' class='card-title mb-2'>
                    <strong>
                        {{ data[displayName] }}
                    </strong>
                </nuxt-link>
                <strong v-if='showSubtitle' class='text-center text-muted text-12'>
                    {{ data.sub_title }}
                </strong>
                <hr>
                <div class='d-flex flex-wrap justify-space-between align-center mt-2'>
                    <div class='text-muted'><i class='fas fa-users'></i> {{ data.users_count }}</div>
                    <div v-if='myCoursesIds.length && myCoursesIds.includes(data.id)'>
                        <strong class='color-success'>Enrolled</strong>
                    </div>
                    <div v-else>
                        <div v-if='data.price'>
                            <strong v-if='data.discount'>
                                <span v-if='displayPriceLabel'>Price: </span>
                                <del class='text-muted'>৳{{ data.price }}</del>
                                <span class='color-orange'>৳ {{ data.price - data.discount }}</span>
                            </strong>
                            <strong v-else class='color-orange'>
                                <span v-if='displayPriceLabel' class='text-muted'>Price: </span> ৳ {{ data.price }}
                            </strong>
                        </div>
                        <div v-else class='color-success'><strong> Free </strong></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        displayName: {
            type: String,
            required: true
        },
        displayPriceLabel: {
            type: Boolean,
            default: true
        },
        showSubtitle: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            courseUrl: '/courses/' + this.data.slug
        }
    },
    computed: {
        myCoursesIds() {
            return this.$store.state.userData.myCoursesIds
        }
    },
    mounted() {
        if (this.myCoursesIds && this.myCoursesIds.length) {
            if (this.myCoursesIds.includes(this.data.id)) {
                this.courseUrl = '/courses/' + this.data.id + '/content'
            }
        }
        if (this.enrolled) {
            this.courseUrl = '/courses/' + this.data.id + '/content'
        }
    }
}
</script>
