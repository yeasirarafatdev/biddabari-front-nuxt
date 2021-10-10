<template>
    <section class='vH-100 vW-100'>

        <!-- Breadcrum -->
        <lazy-the-breadcrum
            v-if='courseInfo && Object.keys(courseInfo).length'
            :items-push="[{text: 'Courses',disabled: false,href: '/courses'},
            {text: courseInfo.title ,disabled: false,href: `/courses/${courseInfo.id}`},
            {text: 'Buy course' ,disabled: true,href: '/'}]" />

        <div class='mt-2'>
            <v-card class='px-4'>
                <v-row>
                    <v-col v-if='courseInfo && Object.keys(courseInfo).length' cols='12' xl='5' lg='5' md='5' sm='6' xs='12'>
                        <lazy-slide-show-card-course :data='courseInfo' :show-subtitle='true' display-name='title' />
                    </v-col>
                    <v-col v-if='courseInfo && Object.keys(courseInfo).length' cols='12' xl='7' lg='7' md='7' sm='6' xs='12'>

                        <payment-instructions :settings='settings' :instructions='instructions' />

                        <div class='d-flex flex-wrap justify-space-between align-center py-2'>
                            <div>Price</div>
                            <strong> ৳ {{ courseInfo.price }}</strong>
                        </div>
                        <div v-if='courseInfo.discount' class='d-flex flex-wrap justify-space-between align-center py-2'>
                            <div>Discount</div>
                            <strong class='orange--text'> ৳ {{ courseInfo.discount }}</strong>
                        </div>
                        <v-divider class=' px-2'></v-divider>
                        <div class='d-flex flex-wrap justify-space-between align-center py-2'>
                            <strong>Payable</strong>
                            <strong v-if='courseInfo.discount' class='orange--text'> ৳ {{ courseInfo.price - courseInfo.discount }}</strong>
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

import { required, digits, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

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
    fetchOnServer: true,
    head() {
        return {
            title: 'Payment',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Biddabari'
                }
            ]
        }
    },
    watch: {},
    methods: {
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
    }
}
</script>
