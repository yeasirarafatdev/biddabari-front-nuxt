<template>
    <section class='vH-100 vW-100 max-width-'>

        <the-breadcrum :items-push="[{text: 'Refund Policy',disabled: true,href: '/refund-policy'}]" />

        <v-card>
            <v-card-title class='bg-yellow'>Refund Policy</v-card-title>
            <v-card-text class='py-4'>
                All Online Courses from BIDDABARI come with an unconditional 10-day money-back guarantee. If the Course you purchase does not work as planned or was bought by mistake or you are in any way dissatisfied with your Course, then let us know within 10 days of issuance and we will refund the full Course Fee of your purchase upon request. It’s what we promise and it’s what we do.
            </v-card-text>
        </v-card>
    </section>
</template>

<script>
export default {
    head() {
        return {
            title: 'Refund Policy',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Biddabari refund policy details.'
                }
            ]
        }
    }
}
</script>
