<template>
    <section class='vH-100 vW-100 mt-16 max-width-'>

        <the-breadcrum :items-push="[{text: 'Privacy And Policy',disabled: true,href: '/privacy-and-policy'}]" />

        <v-card>
            <v-card-title class='bg-yellow'>Privacy And Policy</v-card-title>
            <div></div>
        </v-card>
    </section>
</template>

<script>
export default {
    head() {
        return {
            title: 'Privacy and policy',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    },
}
</script>
