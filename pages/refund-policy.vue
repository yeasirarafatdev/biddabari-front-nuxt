<template>
    <section class='vH-100 vW-100 max-width-'>

        <the-breadcrum :items-push="[{text: 'Refund Policy',disabled: true,href: '/refund-policy'}]"/>

        <v-card>
            <v-card-title class='bg-yellow'>Refund Policy</v-card-title>
            <v-card-text class='py-4'>
                Course fee is refundable if the course you purchased is not available to you or you
                bought this course by mistaken. Only then your request will be considered within 3
                days of your purchase of the course, that Biddabari will credit/ refund your account.
                A refund request will be finalized valid only if made through an email to
                biddabari4bcs@gmail.com specifying your email address or phone number used
                during registration within 3 days from the time of purchase.
            </v-card-text>
            <v-card-text>
                No refund request will be considered valid after 3 days of purchase.
                Refunds shall be made to the bank, mobile financial services account, or card with
                which the purchase was made within 10 working days of the refund request being
                successfully processed and approved by biddabari. This confirmation will be sent to
                the user by email.
            </v-card-text>
            <v-card-text>
                We reserve the right to apply for a credit or a refund, at our discretion, depending
                on the capabilities of our payment processing partners or the platform from which
                you purchased your course (website or mobile app).
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
