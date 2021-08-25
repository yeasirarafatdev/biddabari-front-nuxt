<template>
    <section class='vH-100 vW-100 mt-16 max-width-'>

        <the-breadcrum :items-push="[{text: 'Cart',disabled: true,href: '/cart'}]" />

        <v-card :loading='loadingCartItems'>
            <v-card-title class='bg-yellow'>Cart</v-card-title>
            <v-card-text>
                <div v-if='loadingCartItems' class='text-center my-4' >
                    <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </div>
                <div v-else-if='cartItems.length'>
                    <v-simple-table class='cart-table'>
                        <template #default>
                            <thead>
                            <tr>
                                <th class='text-left'>#</th>
                                <th class='text-left'>Name</th>
                                <th class='text-left'>Quantity</th>
                                <th class='text-left'>Price</th>
                                <th class='text-left'>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr
                                v-for='(item, index) in cartItems'
                                :key='item.id'
                            >
                                <td>{{ index + 1 }}</td>
                                <td>
                                    <div class='cart-title'>
                                        <img :src='item.photo' alt='' height='60'>
                                        <strong class='ml-2'>{{ item.title }}</strong>
                                    </div>
                                </td>
                                <td>
                                    <div class='d-flex flex-column flex-lg-row flex-md-row flex-sm-row flex-xs-column justify-start align-center'>
                                        <v-btn :disabled='item.quantity <=1' class='error' fab x-small @click='reduceQuantity(item, index)'>
                                            <v-icon>mdi-minus</v-icon>
                                        </v-btn>
                                        <strong class='px-2'>{{ item.quantity }}</strong>
                                        <v-btn class='success' fab x-small @click='increaseQuantity(item)'>
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>
                                    </div>
                                </td>
                                <td>
                                    <div class='cart-table-price'>
                                        <div class='orange--text'>
                                            <span class='orange--text'> {{ item.discount ? item.price - item.discount : item.price }} </span>
                                            <span> x </span>
                                            <!-- <span class='orange&#45;&#45;text'>{{ item.quantity }}</span>-->
                                            <span class='orange--text'> {{ item.quantity }} </span>
                                        </div>
                                        <div>
                                            <span> = </span>
                                        </div>
                                        <div>
                                            <span class='orange--text'><strong> {{ itemTotal(item) }} </strong></span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <v-btn class='error' fab x-small title='Delete' rounded @click='deleteItemFormCart(item, index)'>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </td>
                            </tr>
                            </tbody>
                        </template>
                    </v-simple-table>

                    <div class='d-flex flex-wrap justify-space-between align-center'>
                        <div class='mt-2'>
                            <v-btn class='error' small @click='clearCart()'>
                                Clear Cart
                            </v-btn>
                        </div>
                        <div class='mt-2 d-flex align-center flex-wrap'>
                            <strong>Total: <span class='orange--text mr-2'>{{ cartTotal }}</span></strong>
                            <nuxt-link to='/checkout'>
                                <v-btn class='primary' small>
                                    Checkout
                                </v-btn>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <v-alert
                        border='left'
                        color='indigo'
                        dark
                        class='mt-6'
                    >
                        Cart is empty
                    </v-alert>
                </div>
            </v-card-text>
        </v-card>

        <div class='mt-6 text-center'>
            <nuxt-link to='/books'>
                <v-btn class='primary' small>
                    <v-icon class='mr-3'>mdi-keyboard-backspace</v-icon>
                    GO back to book shop
                </v-btn>
            </nuxt-link>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {}
    },
    head() {
        return {
            title: 'Cart',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward product cart page.'
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/cartItems'
        }),
        loadingCartItems() {
            return this.$store.state.cart.loadingCartItems
        },
        /* cartItems() {
            return this.$store.state.cart.book_cart
        }, */
        cartQuantity() {
            if (this.cartItems && this.cartItems.length) {
                return this.cartItems.reduce((acc, item) => acc + item.quantity, 0)
            } else {
                return 0
            }
        },
        cartTotal() {
            if (this.cartItems && this.cartItems.length) {
                const price = this.cartItems.reduce((acc, item) => acc + (item.discount ? (item.price - item.discount) * item.quantity : item.price * item.quantity), 0)
                // price = (price / 100);
                return '৳ ' + price // .toLocaleString('en-BN', { style: 'currency', currency: 'BDT' })
                // return 'Tk ' + price;
            } else {
                return 0
            }
        }
    },
    methods: {
        itemTotal(item) {
            if (this.cartItems && this.cartItems.length) {
                const price = (item.discount ? (item.price - item.discount) * item.quantity : item.price * item.quantity)
                // price = (price / 100);
                return '৳ ' + price // .toLocaleString('en-BN', { style: 'currency', currency: 'BDT' })
                // return 'Tk ' + price;
            } else {
                return 0
            }
        },
        increaseQuantity(product) {
            this.$store.dispatch('cart/addDBCart', product)
        },
        reduceQuantity(product, index) {
            this.$store.dispatch('cart/removeItemDBCart', product)
        },
        deleteItemFormCart(product, index) {
            this.$store.dispatch('cart/deleteDBCart', { product, index })
        },
        clearCart() {
            this.$store.dispatch('cart/clearCart')
        }
    }
}
</script>
