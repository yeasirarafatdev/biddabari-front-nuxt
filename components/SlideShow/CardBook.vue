<template>
    <div class='slide-show-card'>
        <div class='image-container'>
            <nuxt-link :to='"/books/"+data.slug'>
                <img :src='data.photo' alt='' style='max-width: 500px'>
            </nuxt-link>
        </div>
        <div class='d-flex justify-center flex-column'>
            <nuxt-link :to='"/books/"+data.slug' class='card-title'>
                <strong>
                    {{ data[displayName] }}
                </strong>
            </nuxt-link>

            <div class='text-center text-14 mt-2'>
                <div v-if='data.price'>
                    <strong v-if='data.discount'>
                        <del class='text-muted'>৳ {{ data.price }}</del>
                        <span class='color-orange'>৳ {{ data.price - data.discount }}</span>
                    </strong>
                    <strong v-else class='color-orange'>৳ {{ data.price }}</strong>
                </div>
                <div v-else class='color-success'><strong> Free </strong></div>
            </div>
            <!--            <strong class='color-orange text-center mt-2 mb-0'> ৳ {{ data.price }}</strong>-->
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
        }
    }
}
</script>
