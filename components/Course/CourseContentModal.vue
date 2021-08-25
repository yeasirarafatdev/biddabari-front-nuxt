<template>
    <div style='z-index: 1001;'>
        <v-row
            justify='center'
            style='z-index: 1001;'
        >
            <v-dialog
                v-model='showDialogue'
                fullscreen
                hide-overlay
                transition='dialog-bottom-transition'
                scrollable
            >
                <v-card tile>
                    <v-toolbar
                        flat
                        dark
                        color='primary'
                    >
                        <v-btn
                            icon
                            dark
                            @click.stop.prevent='close()'
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ courseInfo.title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn
                                dark
                                text
                                @click.stop.prevent=''
                            >
                                Buy course
                            </v-btn>
                        </v-toolbar-items>
                        <!-- <v-menu
                            bottom
                            right
                            offset-y
                        >
                            <template v-slot:activator='{ on, attrs }'>
                                <v-btn
                                    dark
                                    icon
                                    v-bind='attrs'
                                    v-on='on'
                                >
                                    <v-icon>mdi-dots-vertical</v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                    v-for='(item, i) in items'
                                    :key='i'
                                    @click='() => {}'
                                >
                                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>-->
                    </v-toolbar>
                    <v-card-text>
                        <v-btn
                            color='primary'
                            dark
                            class='ma-2'
                            @click='showContentView = !showContentView'
                        >
                            Open Dialog 2
                        </v-btn>
                        <v-list
                            three-line
                            subheader
                        >
                            <v-subheader>Course Content</v-subheader>
                        </v-list>
                        <v-divider></v-divider>

                        <lazy-course-topic-list v-if='courseTopics' :course-topics='courseTopics'></lazy-course-topic-list>

                    </v-card-text>
                    <div style='flex: 1 1 auto;'></div>
                </v-card>
            </v-dialog>

            <!-- Content Viewer -->
            <course-content-viewer
                :dialog='showContentView'
                @closeDialogue='showContentView=false' />

        </v-row>
    </div>
</template>

<script>
export default {
    props: {
        dialog: {
            type: Boolean,
            required: true,
            default: false
        },
        courseInfo: {
            type: Object,
            required: true
        },
        courseTopics: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            showDialogue: false,
            showContentView: false,
            items: [
                {
                    title: 'Click Me'
                },
                {
                    title: 'Click Me'
                }
            ]
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
