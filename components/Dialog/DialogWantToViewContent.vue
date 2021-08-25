<template>
    <v-dialog
        v-model='wantToViewContentDialog'
        max-width='400px'
    >
        <v-card class='py-2'>
            <v-card-title>
                Want to "view" this content ?
            </v-card-title>

            <!-- Content Viewer -->
            <v-card-subtitle class='mt-2'>Click the "View Content" button.</v-card-subtitle>

            <v-card-actions>
                <v-btn
                    color='error'
                    small
                    @click.stop.prevent='close()'
                >
                    Close
                </v-btn>

                <v-row
                    align='center'
                    justify='end'
                    class='mr-1'
                >
                    <nuxt-link :to='contentUrl'>
                        <v-btn color='success' small>View Content</v-btn>
                    </nuxt-link>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        contentUrl: {
            type: String,
            required: true
        }
    },
    computed: {
        wantToViewContentDialog() {
            return this.$store.state.appStore.wantToViewContentDialog
        }
    },
    methods: {
        close() {
            this.$store.dispatch('appStore/toggleWantToViewContentDialog', false)
        }
    }
}
</script>
