<template>
    <div>
        <v-row
            justify='center'
        >
            <v-col>
                <div style='text-align: right'>
                    <v-btn class='primary mb-2' dark @click='dialog = true'>
                        <v-icon class='mx-2'>mdi-information-outline</v-icon>
                        Course information
                    </v-btn>
                </div>
            </v-col>
            <v-dialog
                v-model='dialog'
                transition='dialog-bottom-transition'
                scrollable
                fullscreen
                style='z-index: 1001; height: 100%'
            >
                <v-card tile>
                    <v-toolbar
                        flat
                        dark
                        color='primary'
                        max-height='65'
                    >
                        <v-btn
                            icon
                            dark
                            @click='dialog = false'
                        >
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ courseInfo.title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <div class='max-width-'>
                        <div class='text-center'>
                            <img :src='courseInfo.photo' alt='' style='max-width: 100%; width: 800px'>
                        </div>
                    </div>
                    <div class='ma-4'>
                        <div class='px-2 max-width-' style='background-color: white'>
                            <h3 v-text='courseInfo.title'></h3>
                            <div v-html='courseInfo.description'></div>
                        </div>
                    </div>
                    <div style='flex: 1 1 auto;'></div>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        courseInfo: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dialog: false
        }
    }
}
</script>
