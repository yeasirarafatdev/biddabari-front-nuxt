<template>
    <div>

        <h3 class='font-roboto-slab text-uppercase'>SEND A MESSAGE</h3>
        <p class='text-14 text-muted'>Your email address will not be published. Required fields are marked.</p>
        <div style='height: 2px; width: 50px; background-color: #49556c; border-radius: 10px;'></div>

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
                <v-alert v-if="statusMessage != ''" type='success'>
                    {{ statusMessage }}
                </v-alert>
                <v-row class='mt-4'>
                    <v-col cols='12'>
                        <validation-provider
                            v-slot='{ errors }'
                            name='name'
                            rules='required'
                        >
                            <v-text-field
                                v-model='contactForm.name'
                                label='Name'
                                :error-messages='errors'
                                :disabled='submittingForm'
                                required
                                small
                                class='my-0 py-0'
                            ></v-text-field>
                        </validation-provider>
                    </v-col>
                    <v-col cols='12'>
                        <validation-provider
                            v-slot='{ errors }'
                            name='Phone number'
                            :rules='phoneNumberRules'
                        >
                            <v-text-field
                                v-model='contactForm.phone'
                                :counter='11'
                                label='Phone Number'
                                :error-messages='errors'
                                :disabled='submittingForm'
                                required
                            ></v-text-field>
                        </validation-provider>
                    </v-col>
                    <v-col cols='12'>
                        <validation-provider
                            v-slot='{ errors }'
                            name='Subject'
                            rules='required'
                        >
                            <v-text-field
                                v-model='contactForm.subject'
                                label='Subject'
                                :error-messages='errors'
                                :disabled='submittingForm'
                                required
                                small
                                class='my-0 py-0'
                            ></v-text-field>
                        </validation-provider>
                    </v-col>
                    <v-col cols='12'>
                        <validation-provider
                            v-slot='{ errors }'
                            name='Message'
                            rules='required'
                        >
                            <v-textarea
                                v-model='contactForm.message'
                                label='Message'
                                required
                                :error-messages='errors'
                                :disabled='submittingForm'
                                small
                                class='my-0 py-0'
                            ></v-textarea>
                        </validation-provider>
                    </v-col>
                    <v-col cols='12'>
                        <v-btn color='error lighten-1' @click.stop.prevent='formSubmit()'>Submit</v-btn>
                    </v-col>
                </v-row>

            </form>
        </validation-observer>
    </div>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
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

extend('email', {
    ...email,
    message: 'Email must be valid'
})

export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            contactForm: {
                name: '',
                phone: '',
                subject: '',
                message: ''
            },
            statusMessage: '',
            rules: {
                commonRule: {
                    required: true
                },
                emailRules: {
                    required: true,
                    digits: 11,
                    regex: '^(013|015|016|017|018|019)\\d{8}$'
                }
            },
            phoneNumberRules: {
                required: true,
                digits: 11,
                regex: '^(013|015|016|017|018|019)\\d{8}$'
            },
            formErrors: {},
            submittingForm: false
        }
    },
    head() {
        return {
            title: 'Contact Us',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward contact us page. Let us know you thoughts.'
                }
            ]
        }
    },
    mounted() {
        if (this.$auth.loggedIn) {
            this.contactForm.name = this.$auth.user.name
            this.contactForm.phone = this.$auth.user.phone
        }
    },
    methods: {
        async formSubmit() {
            this.statusMessage = ''
            this.submittingForm = true
            const valid = await this.$refs.observer.validate()
            if (!valid) {
                this.submittingForm = false
            } else {
                try {
                    await this.$axios.$post('contact-us', this.contactForm).then(() => {
                        this.statusMessage = 'We have received your message. We will contact you as soon as possible.'
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
