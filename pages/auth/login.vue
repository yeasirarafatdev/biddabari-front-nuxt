<template>
    <section class='vH-100 vW-100'>
        <v-row class='mt-10'>
            <v-col col='12' lg='6' md='6' sm='6'>
                <v-card
                    elevation='1'
                    :loading='submittingForm'
                    class='mx-auto py-6 px-6'
                    max-width='400'
                    max-height='100vh'
                    min-height='400px'
                    rounded
                >

                    <div style='display: flex; justify-content: center; align-content: center; align-items: center;'>
                        <div class='mt-10 flex1'>
                            <!--<v-card-title>Login</v-card-title>-->
                            <h2 class='mb-2'>Login / Register</h2>
                            <validation-observer
                                ref='observer'>
                                <v-form ref='form'>
                                    <template v-if='login_errors && Object.keys(login_errors).length'>
                                        <template v-for='(error, err) in login_errors'>
                                            <v-alert :key='err' type='error' style='max-width: 100%'>
                                                {{ error }}
                                            </v-alert>
                                        </template>
                                    </template>
                                    <v-row>
                                        <!-- Phone number Field-->
                                        <v-col v-show='!showPasswordField' cols='12'>
                                            <validation-provider
                                                v-slot='{ errors }'
                                                name='Phone number'
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

                                        <!-- Name Field-->
                                        <v-col v-if='showNameField' cols='12'>
                                            <validation-provider
                                                v-slot='{ errors }'
                                                name='Name'
                                                :rules='nameRule'
                                            >
                                                <v-text-field
                                                    v-model='formData.name'
                                                    label='Name'
                                                    :error-messages='errors'
                                                    :disabled='submittingForm'
                                                    required
                                                ></v-text-field>
                                            </validation-provider>
                                        </v-col>

                                        <!-- Password Field-->
                                        <v-col v-if='showPasswordField' cols='12'>
                                            <validation-provider
                                                v-slot='{ errors }'
                                                name='Password'
                                                rules='required'
                                            >
                                                <v-text-field
                                                    v-model='formData.password'
                                                    label='Password'
                                                    hint='At least 4 characters'
                                                    :error-messages='errors'
                                                    :disabled='submittingForm'
                                                    :type="'password'"
                                                    required
                                                ></v-text-field>
                                            </validation-provider>
                                        </v-col>
                                    </v-row>
                                    <div class='text-center mt-2'>
                                        <!-- Create OR Get User -->
                                        <v-btn
                                            v-if='!showPasswordField'
                                            class='mx-auto'
                                            type='submit'
                                            color='warning'
                                            elevation='14'
                                            rounded
                                            :loading='submittingForm'
                                            @click.prevent='createOrGetUser()'>
                                            Continue
                                        </v-btn>
                                        <v-btn
                                            v-else
                                            class='mx-auto'
                                            type='submit'
                                            color='warning'
                                            elevation='14'
                                            rounded
                                            :loading='submittingForm'
                                            @click.prevent='loginUser()'>
                                            Login
                                        </v-btn>
                                    </div>
                                </v-form>
                            </validation-observer>
                            <div class='text-center'>
                                <nuxt-link to='/auth/recover-password'>
                                    <v-btn
                                        class='mt-6'
                                        x-small
                                        link
                                    >
                                        Forgot password ?
                                    </v-btn>
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </v-card>

            </v-col>
            <v-col col='12' lg='6' md='6' sm='6' order-lg="first" order-md='first' order-sm='first'>
                <div class='text-center mt-6'>
                    <img :src='require("~/assets/images/biddiabari/LoginIng.png")' alt='' height='300px'>
                </div>
                <div class='text-center mt-10'>
                    Enjoy Your new learning experience <strong class='theme-text'>LOGIN NOW</strong>
                </div>
            </v-col>
        </v-row>
    </section>
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

/* extend('min', {
    ...max,
    message: '{_field_} may not be greater than {length} characters'
}) */
extend('min', {
    validate(value, args) {
        return value.length >= args.length
    },
    params: ['length']
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
    middleware: ['guest_only'],
    data: () => ({
        submittingForm: false,
        formData: {
            name: '',
            phone: '',
            password: '',
            type: 'nuxt'
        },
        login_errors: {},
        passwordRule: {
            required: true
            // min: 6,
            // max: 60
        },
        nameRule: {
            required: true
        },
        phoneNumberRules: {
            required: true,
            digits: 11,
            regex: '^(013|015|016|017|018|019)\\d{8}$'
        },
        showPasswordField: false,
        showNameField: false,
        password: [
            v => !!v || 'Password is required.',
            v => v.length >= 4 || `A minimum of 4 characters is allowed`,
            v => v.length <= 60 || 'Password must be less than 60 characters'
        ]
    }),
    head() {
        return {
            title: 'Login',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    },
    watch: {},
    mounted() {
        /* const token = localStorage.getItem('token')
        console.log(token)
        const headers = {
            'Authorization': 'Bearer ' + token
        }
        this.$axios.$post('api/free-access', this.formData, { headers }).then((response) => {

        }) */
    },
    methods: {
        async createOrGetUser() {
            this.submittingForm = true
            const valid = await this.$refs.observer.validate()
            if (!valid) {
                this.submittingForm = false
            } else {
                const getUserDataUrl = 'api/login/user'
                await this.$axios.$post(getUserDataUrl, this.formData)
                    .then((response) => {
                        this.showPasswordField = true
                        if (response && response.has_password === false) {
                            // if doesn't have password ... user account is not created ...
                            this.showNameField = true
                        }
                    }).catch((err) => {
                        this.login_errors = err
                    }).finally(() => {
                        this.submittingForm = false
                    })
            }
        },
        async loginUser() {
            this.submittingForm = true
            const valid = await this.$refs.observer.validate()
            if (!valid) {
                this.submittingForm = false
            } else {
                try {
                    await this.$auth.loginWith('auth', { data: this.formData })
                        .then((response) => {
                            this.$axios.setHeader('Authorization', 'Bearer ' + response)
                            /* this.$axios.$get('/api/user').then((resp) => {
                                this.$auth.setUser(resp)
                            }) */
                            this.$store.dispatch('cart/getDBCart')
                            this.$store.dispatch('userData/fetchEnrolledCourse')
                            this.$notifier.showMessage({ content: 'You are logged in!', color: 'success' })
                        })
                        .catch(() => {
                            this.login_errors = ['Wrong password or phone number.']
                            this.$notifier.showMessage({ content: 'Failed to login!', color: 'error' })
                        })
                        .finally(() => {
                            this.submittingForm = false
                        })
                } catch (err) {
                    this.submittingForm = false
                    this.login_errors = err
                }
            }
            /* this.$store.dispatch('auth/getUser', this.formData).finally(() => {
                this.submittingForm = false
            }) */
        },
        clear() {
            this.$refs.observer.reset()
        }
    }
}
</script>
