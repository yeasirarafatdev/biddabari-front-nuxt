<template>
    <section class='vH-100 vW-100 mt-16 max-width-'>

        <the-breadcrum :items-push="[{text: 'Checkout',disabled: true,href: '/checkout'}]" />

        <v-card elevation='2' class='px-4 py-4 mb-10'>
            <v-row>
                <v-col cols='12'>
                    <h3>Checkout:</h3>
                    <v-row>
                        <v-col cols='12' lg='12' md='12' sm='12' xs='12'>

                            <div v-if='cartItems && cartItems.length'>
                                <div>
                                    <h4 class='orange--text'>Checkout Summary:</h4>
                                    <div class='mb-4'>
                                        <div v-for='(item, index) in cartItems' class='my-2'>
                                            <div class='d-flex flex-wrap justify-start align-center'>
                                                <div class='text-center'>
                                                    <v-avatar class='profile' color='grey' size='60' tile rounded>
                                                        <v-img :src='item.photo'></v-img>
                                                    </v-avatar>
                                                    <div>
                                                        <strong class='text-12'>{{ item.title }}</strong>
                                                    </div>
                                                </div>
                                                <div class='mx-4'> x {{ item.quantity }}</div>
                                                <div class='mx-4'> = {{ itemTotal(item) }}</div>
                                            </div>
                                        </div>
                                        <div class='text-right'>
                                            Total: <strong class='total orange--text'>{{ cartTotal }}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class='d-flex flex-wrap justify-center align-center gap-10'>
                                    <nuxt-link to='/cart' class='my-2'>
                                        <v-btn small color='warning'>Go Back to Cart</v-btn>
                                    </nuxt-link>
                                    <nuxt-link to='/books' class='my-2'>
                                        <v-btn small color='primary'>Continue Shopping</v-btn>
                                    </nuxt-link>
                                </div>
                            </div>
                        </v-col>
                        <v-col cols='12' lg='12' md='12' sm='12' xs='12'>
                            <h3 class='text-center bg-yellow py-2'>Make payment</h3>
                        </v-col>
                        <v-col cols='12' lg='6' md='6' sm='6' xs='12'>

                            <payment-instructions :settings='settings' :instructions='instructions'/>

                        </v-col>
                        <v-col cols='12' lg='6' md='6' sm='6' xs='12'>
                            <validation-observer ref='observer'>

                                <template v-if='formErrors && Object.keys(formErrors).length'>
                                    <template v-for='(error, err) in formErrors'>
                                        <v-alert :key='err' type='error'>
                                            {{ error }}
                                        </v-alert>
                                    </template>
                                </template>

                                <p class='text-14 my-4'>
                                    Delivery is only available through
                                    <strong class='orange--text'>Sundarban Courier</strong> Service.
                                </p>

                                <div class='d-flex flex-wrap justify-space-between align-center'>

                                </div>
                                <v-divider class='mb-2'></v-divider>
                                <validation-provider
                                    v-slot='{ errors }'
                                    name='Name'
                                    rules='required'
                                >
                                    <v-text-field
                                        v-model='formData.name'
                                        label='Name'
                                        :error-messages='errors'
                                        :disabled='submittingForm'
                                        required
                                    ></v-text-field>
                                </validation-provider>

                                <!--                                <validation-provider
                                                                    v-slot='{ errors }'
                                                                    name='Address'
                                                                    rules='required'
                                                                >
                                                                    <v-text-field
                                                                        v-model='formData.address'
                                                                        label='Address'
                                                                        :error-messages='errors'
                                                                        :disabled='submittingForm'
                                                                        required
                                                                    ></v-text-field>
                                                                </validation-provider>-->

                                <validation-provider
                                    v-slot='{ errors }'
                                    name='Phone'
                                    :rules='rules.phoneNumberRules'
                                >
                                    <v-text-field
                                        v-model='formData.phone'
                                        :counter='11'
                                        label='bKash/Rocket/Nagad number'
                                        :error-messages='errors'
                                        :disabled='submittingForm'
                                        required
                                    ></v-text-field>
                                </validation-provider>

                                <validation-provider
                                    v-slot='{ errors }'
                                    name='Transaction Id'
                                    :rules='rules.transactionIdRules'
                                >
                                    <v-text-field
                                        v-model='formData.transaction_number'
                                        label='Transaction Id'
                                        :error-messages='errors'
                                        :disabled='submittingForm'
                                        required
                                    ></v-text-field>
                                </validation-provider>

                                <div v-if='!$auth.loggedIn' class='text-center'>
                                    <p class='error--text'>Please
                                        <nuxt-link to='/auth/login'>login now</nuxt-link>
                                        to place order!
                                    </p>
                                </div>

                                <div class='text-center'>
                                    <v-btn
                                        class='mt-2'
                                        type='submit'
                                        color='primary'
                                        elevation='14'
                                        rounded
                                        :loading='submittingForm'
                                        :disabled='submittingForm || !$auth.loggedIn'
                                        @click.prevent='placeOrder()'>
                                        Place Order
                                    </v-btn>
                                </div>
                            </validation-observer>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-card>
    </section>
</template>


<script>
import { required, digits, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { mapGetters } from 'vuex'

setInteractionMode('eager')

extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})'
})

extend('required', {
    ...required,
    message: '{_field_} can not be empty'
})

extend('min', {
    ...max,
    message: '{_field_} may not be less than {length} characters'
})
extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters'
})

extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}'
})


export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    middleware: ['auth'],
    data() {
        return {
            showBookDialogue: false,
            book: {},
            recommendedBooks: {},
            instructions: {},
            settings: {},
            isBookDescriptionExpanded: false,
            formErrors: '',
            submittingForm: false,
            formData: {
                source: 'cart',
                name: '',
                address: '',
                phone: '',
                transaction_number: '',
                total: ''
            },
            rules: {
                phoneNumberRules: {
                    required: true,
                    digits: 11,
                    regex: '^(013|015|016|017|018|019)\\d{8}$'
                },
                transactionIdRules: {
                    required: true
                }
            }
        }
    },
    async fetch() {
        const instructionsUrl = `api/instructions`
        this.instructions = await this.$axios.$get(instructionsUrl)

        const settingsUrl = `api/settings`
        this.settings = await this.$axios.$get(settingsUrl)
    },
    fetchOnServer: true,
    computed: {
        ...mapGetters({
            cartItems: 'cart/cartItems'
        }),
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
    head() {
        return {
            title: 'Checkout',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward product checkout page.'
                }
            ]
        }
    },
    mounted() {
        this.getRecommendedBooks()
        if (this.$auth.loggedIn) {
            this.formData.name = this.$auth.user.name
            this.formData.phone = this.$auth.user.phone
        }
    },
    methods: {
        async getRecommendedBooks() {
            const bookUrl = `api/books?filter=recommended`
            this.recommendedBooks = await this.$axios.$get(bookUrl)
        },
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
        async placeOrder() {
            this.submittingForm = true
            const valid = await this.$refs.observer.validate()
            if (!valid) {
                this.submittingForm = false
            } else {
                try {
                    this.formData.total = this.cartTotal
                    await this.$axios.$post('api/book-orders', this.formData)
                        .then((response) => {
                            localStorage.removeItem('book_cart')
                            this.$notifier.showMessage({ content: 'Order successfully placed.', color: 'success' })
                        })
                        .catch(() => {
                            this.$notifier.showMessage({ content: 'Failed to place your order!', color: 'error' })
                        })
                        .finally(() => {
                            this.submittingForm = false
                        })
                } catch (err) {
                    this.submittingForm = false
                    this.formErrors = err
                }
            }
        },
        increaseQuantity() {
            this.formData.quantity = 1 + this.formData.quantity
        },
        decreaseQuantity() {
            if (this.formData.quantity > 1) {
                this.formData.quantity = this.formData.quantity - 1
            }
        }
    }
}
</script>

<style scoped lang='scss'>
.overlappingImageContainer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    height: 100px;

    .overlapImage {
        position: absolute;
    }
}
</style>
