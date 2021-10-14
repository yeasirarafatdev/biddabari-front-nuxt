<template>
    <section class='vH-100 vW-100 max-width-'>

        <the-breadcrum :items-push="[{text: 'Contact',disabled: true,href: '/contact'}]" />

        <v-row class='my-10'>


            <v-col cols='12' lg='6' md='6' sm='6' xs='12'>
                <contact-us></contact-us>
            </v-col>

            <v-col cols='12' lg='6' md='6' sm='6' xs='12'>
                <h3 class='font-roboto-slab text-uppercase'>CONTACT INFO</h3>
                <p class='text-14 text-muted'>Welcome to our website. We are glad to have you around.</p>
                <div style='height: 2px; width: 50px; background-color: #49556c; border-radius: 10px;'></div>

                <v-divider class='mt-10'></v-divider>

                <v-row class='my-10'>
                    <v-col cols='12' lg='6' md='12' sm='12' xs='12'>
                        <div class='d-flex'>
                            <v-icon color='warning lighten-1' class='pr-4'>mdi-phone-outline</v-icon>
                            <div>
                                <strong>Phone</strong>
                                <div class='text-muted text-14'>01963-929200 / 01 / 02</div>
                            </div>
                        </div>
                    </v-col>
                    <!--                    <v-col cols='12' lg='6' md='12' sm='12' xs='12'>
                                            <div class='d-flex'>
                                                <v-icon color='warning lighten-1' class='pr-4'>mdi-email</v-icon>
                                                <div>
                                                    <strong>Email</strong>
                                                    <div class='text-muted text-14'>biddabari@gmail.com</div>
                                                </div>
                                            </div>
                                        </v-col>-->
                    <v-col cols='12' lg='6' md='12' sm='12' xs='12'>
                        <div class='d-flex'>
                            <v-icon color='warning lighten-1' class='pr-4'>mdi-map-marker</v-icon>
                            <div>
                                <strong>Address</strong>
                                <div class='text-muted text-14'>House# 347/1 (4B), Free School Street, Hatirpool, Dhaka 1205</div>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols='12'>
                        <layout-social-icons />
                    </v-col>
                </v-row>
            </v-col>

            <v-col cols='12' class='mt-10'>
                <h3 class='font-roboto-slab text-uppercase'>LOCATION ON MAP</h3>
                <div class='mt-4' style='height: 2px; width: 50px; background-color: #49556c; border-radius: 10px;'></div>

                <div class='my-10'>
                    <iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14607.607282694651!2d90.39911678036226!3d23.75088025342449!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b888ad339cb5%3A0x20c70986185ad2ba!2sMogbazar%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1628399626823!5m2!1sen!2sbd' width='100%' height='350' style='border:0;' allowfullscreen='' loading='lazy'></iframe>
                </div>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import ContactUs from '~/_Addons/ContactUs/Components/ContactUs'

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
        ContactUs,
        ValidationProvider,
        ValidationObserver
    },
    data() {
        return {
            contactForm: {
                name: '',
                email: '',
                subject: '',
                message: ''
            },
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
            this.contactForm.email = this.$auth.user.email
        }
    },
    methods: {
        async formSubmit() {
            this.submittingForm = true
            const valid = await this.$refs.observer.validate()
            if (!valid) {
                this.submittingForm = false
            } else {
                try {

                    // Sending message

                } catch (err) {
                    this.submittingForm = false
                    this.login_errors = err
                }
            }
        }
    }
}
</script>
