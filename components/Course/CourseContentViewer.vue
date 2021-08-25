<template>
    <v-dialog
        v-model='showDialogue'
        max-width='1024px'
    >
        <v-card>
            <v-card-title>
                Dialog 2
            </v-card-title>

            <!-- Content Viewer -->
            <div>Content</div>

            <v-card-actions>
                <v-btn
                    color='primary'
                    text
                    @click.stop.prevent='close()'
                >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    data() {
        return {
            showDialogue: false
        }
    },
    watch: {
        dialog(val, oldVal) {
            this.showDialogue = val
        }
    },
    methods: {
        close() {
            this.$emit('closeDialogue')
        }
    }
}
</script>
