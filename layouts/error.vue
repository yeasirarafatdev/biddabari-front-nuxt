<template>
    <section class='vH-100 vW-100 mt-16'>
        <v-card
            elevation='2'
            class='mx-auto my-12 py-6 px-6 text-center'
            max-width='500'
            color='error lighten-5'
        >
            <h1>
                {{ error_code }}: {{ msg }}
            </h1>
            <div>{{ desc }}</div>

            <div class='d-flex flex-wrap justify-center align-center gap-10 mt-4'>
                <v-btn class='orange lighten-2' small @click='back()'>Go back</v-btn>
                <div class='space-x-10'>|</div>
                <div class='text-14'>
                    Take me
                    <NuxtLink to='/'><strong>Home</strong></NuxtLink>
                </div>
            </div>
        </v-card>
    </section>
</template>

<script>
export default {
    layout: 'empty',
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            error_code: '',
            msg: '',
            desc: ''
        }
    },
    head() {
        const title =
            this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        return {
            title
        }
    }, mounted() {
        this.generateError()
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        generateError() {
            if (this.error.statusCode === 404) {
                this.error_code = 404
                this.msg = 'Page not found!'
                this.desc = 'Looks like you are lost.'
            } else if (this.error.statusCode === 401) {
                this.error_code = 401
                this.msg = 'Not authenticated!'
                this.desc = 'You are not logged in.'
            } else if (this.error.statusCode === 403) {
                this.error_code = 403
                this.msg = 'Not authorized!'
                this.desc = 'You don\'t have permission access.'
            } else if (this.error.statusCode === 400) {
                this.error_code = 400
                this.msg = 'Bad request!'
                this.desc = 'Something wrong with URL or parameters.'
            } else if (this.error.statusCode === 422) {
                this.error_code = 422
                this.msg = 'Unprocessable Entity!'
                this.desc = 'Validation failed.'
            } else if (this.error.statusCode === 500) {
                this.error_code = 500
                this.msg = 'Server error!'
                this.desc = 'Sorry an error accrued at our end.'
            } else {
                this.error_code = 'Unknown'
                this.msg = 'Error Occurred'
                this.desc = 'The error is not defined!'
            }
        }
    }
}
</script>

<style scoped>
h1 {
    font-size: 20px;
}
</style>
