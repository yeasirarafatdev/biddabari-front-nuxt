<template>
    <section class='vH-100 vW-100'>
        <v-card
            elevation='4'
            :loading='submittingForm'
            class='mx-auto my-12 py-6 px-6'
            max-width='400'
            max-height='100vh'
            min-height='260px'
            rounded
        >
            <div style='display: flex; justify-content: center; align-content: center; align-items: center;'>
                <div class='mt-4 flex1'>
                    <!--<v-card-title>Login</v-card-title>-->
                    <h2 class='mb-2'>Request new password</h2>
                    <validation-observer
                        ref='observer'>
                        <form>
                            <template v-if='formErrors && Object.keys(formErrors).length'>
                                <template v-for='(error, err) in formErrors'>
                                    <v-alert :key='err' type='error'>
                                        {{ error }}
                                    </v-alert>
                                </template>
                            </template>
                            <v-row>
                                <!-- Phone number Field-->
                                <v-col cols='12'>
                                    <validation-provider
                                        v-slot='{ errors }'
                                        name='phone'
                                        :rules='phoneNumberRules'
                                    >
                                        <v-text-field
                                            v-model='formData.phone'
                                            :counter='11'
                                            label='Phone Number'
                                            :error-messages='errors'
                                            :disabled='submittingForm'
                                            required
                                        ></v-text-field>
                                    </validation-provider>
                                </v-col>
                            </v-row>
                            <div class='text-center'>
                                <v-btn
                                    type='submit'
                                    color='warning'
                                    elevation='14'
                                    rounded
                                    :loading='submittingForm'
                                    @click.prevent='reset()'>
                                    Submit
                                </v-btn>
                            </div>
                        </form>
                    </validation-observer>

                    <div class='text-center'>
                        <nuxt-link to='/auth/login'>
                            <v-btn
                                class='mt-6'
                                x-small
                                link
                            >
                                Go back to login page?
                            </v-btn>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </v-card>
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
            submittingForm: false,
            formErrors: {},
            formData: {
                phone: ''
            },
            phoneNumberRules: {
                required: true,
                digits: 11,
                regex: '^(013|015|016|017|018|019)\\d{8}$'
            }
        }
    },
    head() {
        return {
            title: 'Recover Passwords',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Biddabari'
                }
            ]
        }
    },
    methods: {
        async reset() {
            this.submittingForm = true
            const valid = await this.$refs.observer.validate()
            if (!valid) {
                this.submittingForm = false
            } else {
                try {
                    await this.$axios.$post('api/login/reset', this.formData)
                        .then((response) => {
                            this.$router.push(`/auth/login`)
                            this.$notifier.showMessage({ content: 'A new password has been sent to your phone number.', color: 'success' })
                        })
                        .catch(() => {
                            this.$notifier.showMessage({ content: 'Failed to send OTP!', color: 'error' })
                        })
                        .finally(() => {
                            this.submittingForm = false
                        })
                } catch (err) {
                    this.submittingForm = false
                    this.login_errors = err
                }
            }
        }
    }
}
</script>
