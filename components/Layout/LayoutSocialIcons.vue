<template>
    <v-card-actions class='d-flex flex-wrap justify-start align-center text-center'>
        <div v-for='(social, i) in socials' :key='i'>
            <a v-if='social.link' :href='social.link'
               target='_blank'>
                <v-btn
                    :key='i'
                    :color='social.color'
                    class='white--text'
                    fab
                    icon
                    small
                >
                    <v-icon>{{ social.icon }}</v-icon>
                </v-btn>
            </a>
        </div>
    </v-card-actions>
</template>

<script>
export default {
    data() {
        return {
            socials: [
                {
                    icon: 'mdi-facebook',
                    color: 'primary lighten-1',
                    link: 'https://www.facebook.com/%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%AC%E0%A6%BE%E0%A7%9C%E0%A6%BF-biddabari-109063707590761'
                },
                {
                    icon: 'mdi-facebook-messenger',
                    color: 'primary lighten-1',
                    link: ''
                },
                {
                    icon: 'mdi-whatsapp',
                    color: 'success lighten-1',
                    link: ''
                },
                {
                    icon: 'mdi-twitter',
                    color: 'cyan darken-1'
                },
                {
                    icon: 'mdi-linkedin',
                    color: 'primary lighten-1'
                },
                {
                    icon: 'mdi-instagram',
                    color: 'pink'
                },
                {
                    icon: 'mdi-youtube',
                    color: 'red lighten-1',
                    link: 'https://www.youtube.com/channel/UCRpQPR-dZ9HHwVo0HM_5_sw'
                }
            ]
        }
    }
}
</script>
