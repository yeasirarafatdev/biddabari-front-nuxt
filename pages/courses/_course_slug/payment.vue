<template>
    <section class='vH-100 vW-100'>

        <!-- Breadcrum -->
        <lazy-the-breadcrum
            v-if='courseInfo && Object.keys(courseInfo).length'
            :items-push="[{text: 'Courses',disabled: false,href: '/courses'},
            {text: courseInfo.title ,disabled: false,href: `/courses/${courseInfo.id}`},
            {text: 'Buy course' ,disabled: true,href: '/'}]"/>

        <div class='mt-2'>
            <v-card class='px-4'>
                <v-row>
                    <v-col v-if='courseInfo && Object.keys(courseInfo).length' cols='12' xl='5' lg='5' md='5' sm='6'
                           xs='12'>
                        <lazy-slide-show-card-course :data='courseInfo' :show-subtitle='true' display-name='title'/>
                        <v-btn @click="paymentOption='online'" class="my-1" color="primary" outlined
                               :block="$vuetify.breakpoint.mdAndDown">Online Payment
                        </v-btn>
                        <v-btn @click="paymentOption='manual'" class="my-1" color="primary" outlined
                               :block="$vuetify.breakpoint.mdAndDown">Manual Payment
                        </v-btn>
                    </v-col>

                    <v-col v-if="paymentOption === 'online'" cols="12" lg="7" sm="6">
                        <div class="text-h6 mb-2">Pay using card or mobile banking</div>
                        <v-img src="https://nextivesolution.sgp1.cdn.digitaloceanspaces.com/sslcommerz.png"
                               alt="ssl-commerz"/>

                        <v-checkbox v-model="agreed" label="I agree to the terms and conditions">
                            <template #label>
                                I agree to the
                                <nuxt-link class="ml-1" to="/terms-and-conditions">
                                    terms and conditions
                                </nuxt-link>
                                <span class="mx-1">&</span>
                                <nuxt-link to="/refund-policy">
                                    refund policy
                                </nuxt-link>
                            </template>
                        </v-checkbox>

                        <!--                        <v-btn :disabled="!agreed" @click="showAlert" color="primary" class="mt-2">Pay now</v-btn>-->

                        <button
                            :disabled="!agreed"
                            id="sslczPayBtn"
                            class="btn btn-primary btn-lg btn-block"
                            :postdata="obj"
                            order="#"
                            :endpoint="apiUrl"> Pay Now
                        </button>
<!--                        <button
                            id='sslczPayBtn'
                            class='btn btn-primary btn-lg btn-block'
                            order='#'
                            :postdata='obj'
                            :endpoint='apiUrl'
                        > Pay Now
                        </button>-->
                    </v-col>

                    <v-col v-if="paymentOption === 'manual' && courseInfo && Object.keys(courseInfo).length" cols='12'
                           xl='7' lg='7' md='7' sm='6' xs='12'>

                        <payment-instructions :settings='settings' :instructions='instructions'/>

                        <div class='d-flex flex-wrap justify-space-between align-center py-2'>
                            <div>Price</div>
                            <strong> ৳ {{ courseInfo.price }}</strong>
                        </div>
                        <div v-if='courseInfo.discount'
                             class='d-flex flex-wrap justify-space-between align-center py-2'>
                            <div>Discount</div>
                            <strong class='orange--text'> ৳ {{ courseInfo.discount }}</strong>
                        </div>
                        <v-divider class=' px-2'></v-divider>
                        <div class='d-flex flex-wrap justify-space-between align-center py-2'>
                            <strong>Payable</strong>
                            <strong v-if='courseInfo.discount' class='orange--text'> ৳
                                {{ courseInfo.price - courseInfo.discount }}</strong>
                            <strong v-else class='orange--text'> ৳ {{ courseInfo.price }}</strong>
                        </div>


                        <validation-observer ref='observer'>

                            <template v-if='formErrors && Object.keys(formErrors).length'>
                                <template v-for='(error, err) in formErrors'>
                                    <v-alert :key='err' type='error'>
                                        {{ error }}
                                    </v-alert>
                                </template>
                            </template>

                            <template>
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
                                        v-model='formData.transaction_id'
                                        label='Transaction Id'
                                        :error-messages='errors'
                                        :disabled='submittingForm'
                                        required
                                    ></v-text-field>
                                </validation-provider>
                            </template>

                            <div v-if='!$auth.loggedIn' class='text-center'>
                                <p class='error--text'>Please
                                    <nuxt-link to='/auth/login'>login</nuxt-link>
                                    now to place order!
                                </p>
                            </div>

                            <div class='text-center mb-6'>
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


                        <v-alert v-if='showSuccessAlert' type='info' class='text-14'>
                            {{ successAlertMessage }}
                        </v-alert>

                    </v-col>
                </v-row>
            </v-card>
        </div>

    </section>
</template>

<script>

import {required, digits, max, regex} from 'vee-validate/dist/rules'
import {extend, ValidationObserver, ValidationProvider, setInteractionMode} from 'vee-validate'

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
    data() {
        return {
            apiUrl: process.env.API_URL + '/initiate',
            obj: {
                cus_name: 'Customer Name',
                cus_phone: '01500000000',
                cus_email: 'example@email.com',
                product_name: 'Product Name',
                total_amount: ''
            },
            paymentOption: 'manual',
            agreed: false,
            instructions: [],
            settings: [],
            courseInfo: '',
            formErrors: '',
            submittingForm: false,
            formData: {
                phone: '',
                amount: '',
                transaction_id: '',
                course_id: '',
                coupon: ''
            },
            reasonForFreeAccess: '',
            showSuccessAlert: false,
            successAlertMessage: '',
            rules: {
                commonRule: {
                    required: true
                },
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
        const courseUrl = `courses/${this.$route.params.course_slug}?filter=info`
        this.courseInfo = await this.$axios.$get(courseUrl)

        const instructionsUrl = `instructions`
        this.instructions = await this.$axios.$get(instructionsUrl)

        const settingsUrl = `settings`
        this.settings = await this.$axios.$get(settingsUrl)

        if (!this.courseInfo.price) {
            this.$router.back()
        }
    },
    head() {
        return {
            title: 'Payment',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Biddabari'
                }
            ],
            script: [
                {
                    hid: 'stripe',
                    src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
                    integrity: 'sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo',
                    crossorigin: 'anonymous',
                    defer: false
                },
                {
                    hid: 'stripe',
                    src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
                    integrity: 'sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1',
                    crossorigin: 'anonymous',
                    defer: false
                },
                {
                    hid: 'stripe',
                    src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js',
                    integrity: 'sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM',
                    crossorigin: 'anonymous',
                    defer: false
                }
            ]
        }
    },
    beforeMount() {
        (function (window, document) {
            const loader = function () {
                const script = document.createElement('script')
                const tag = document.getElementsByTagName('script')[0]
                // script.src = 'https://seamless-epay.sslcommerz.com/embed.min.js?' + Math.random().toString(36).substring(7) // USE THIS FOR LIVE
                script.src = 'https://sandbox.sslcommerz.com/embed.min.js?' + Math.random().toString(36).substring(7) // USE THIS FOR SANDBOX
                tag.parentNode.insertBefore(script, tag)
            }
            window.addEventListener ? window.addEventListener('load', loader, false) : window.attachEvent('onload', loader)
        })(window, document)
    },
    mounted() {
        this.loadSSLBtn()
    },
    fetchOnServer: true,
    watch: {},
    methods: {
        loadSSLBtn() {
            if (process.client) {
                const obj = {}
                obj.cus_name = this.cus_name
                obj.cus_phone = this.cus_phone
                obj.cus_email = this.cus_email
                obj.value_a = this.user_id
                obj.value_b = this.courseInfo.id
                obj.product_name = this.courseInfo.title
                obj.total_amount = this.calculatedDiscountPrice()
                $('#sslczPayBtn').prop('postdata', obj)
            }
        },
        calculatedDiscountPrice() {
            let price = this.courseInfo?.price
            if (this.courseInfo.discount || this.courseInfo.discount_type === 'tk')
                price = this.courseInfo.price - this.courseInfo.discount
            if (this.courseInfo.discount_type === '%')
                price = (this.courseInfo.price * this.courseInfo.discount) / 100
            return price
        },
        showAlert() {
            if (this.$auth.loggedIn) {
                location.href = process.env.API_URL + '/pay/confirm?user=' + this.$auth.user.id + '&course=' + this.courseInfo.id
            }
        },
        async placeOrder() {
            this.submittingForm = true
            const valid = await this.$refs.observer.validate()
            if (!valid) {
                this.submittingForm = false
            } else {
                try {
                    this.formData.course_id = this.courseInfo.id
                    if (this.courseInfo.discount) this.formData.amount = this.courseInfo.price - this.courseInfo.discount
                    else this.formData.amount = this.courseInfo.price

                    await this.$axios.$post('payment', this.formData)
                        .then((response) => {
                            this.showSuccessAlert = true
                            this.successAlertMessage = 'We have accepted your payment information. Please wait until your payment is verified. Thank you!'
                            this.$notifier.showMessage({content: 'Order successfully placed.', color: 'success'})
                        })
                        .catch(() => {
                            this.$notifier.showMessage({content: 'Failed to place your order!', color: 'error'})
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
    }
}
</script>
