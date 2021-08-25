<template>
    <div class='cart-link'>
        <v-icon dark>mdi-cart-outline</v-icon>
        <strong class='cart-item-counter'>{{ cartItems && cartItems.length ? cartItems.length : 0 }}</strong>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    computed: {
        cartItems() {
            return this.$store.state.cart.book_cart
        }
    }
}
</script>

<style>
.cart-link {
    position: relative;
}

.cart-item-counter {
    background-color: #ffbf3f;
    color: #09153A;
    height: 16px;
    width: 16px;
    font-size: 12px;
    position: absolute;
    top: -6px;
    right: -6px;
    border-radius: 50%;
    text-align: center;
}
</style>
