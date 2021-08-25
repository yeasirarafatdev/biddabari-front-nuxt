<template>
    <div>
        <v-btn v-show='!itemIdsInCart.includes(productObject.id)' class='warning mt-2'
               @click.stop.prevent='addToCart(productType, productObject, quantity)'>
            <v-icon class='mr-2'>mdi-cart-outline</v-icon>
            Add to Cart
        </v-btn>
        <nuxt-link v-show='itemIdsInCart.includes(productObject.id)' to='/cart'>
            <v-btn class='warning mt-2 lighten-1'>
                <v-icon class='mr-2'>mdi-cart-outline</v-icon>
                View Cart
            </v-btn>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        productType: { // Book, Course
            type: String,
            default: 'book'
        },
        productObject: {
            type: Object,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        itemIdsInCart: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        addToCart(productType, productObject, quantity = 1) {
            productObject.quantity = quantity
            this.$store.dispatch('cart/addDBCart', productObject).then(() => {
                this.$notifier.showMessage({ content: 'Product added to cart.', color: 'success' })
            })
        }
    }
}
</script>
