<template>
    <div class='py-4'>
        <h3>Payment instruction</h3>
        <div v-if='instructions && Object.keys(instructions).length'>
            <div v-html='instructions.book_payment'></div>
        </div>
        <div v-if='settings && Object.keys(settings).length'
             class='d-flex flex-wrap justify-space-between align-center gap-10 mb-4 '>
            <div v-if='settings.bkash'><strong style='white-space: nowrap'><span class='orange--text'>Bkash:</span> {{ settings.bkash }}</strong></div>
            <div v-if='settings.nagad'><strong style='white-space: nowrap'><span class='orange--text'>Nagad:</span> {{ settings.nagad }}</strong></div>
            <div v-if='settings.rocket'><strong style='white-space: nowrap'><span class='orange--text'>Rocket:</span> {{ settings.rocket }}</strong></div>
        </div>
        <div class='text-center'>
            <img :src='require("~/assets/images/payment.jpg")' alt='' width='100%' style='max-width: 500px'>
        </div>
    </div>
</template>

<script>
export default {
    props: ['instructions', 'settings']
}
</script>
