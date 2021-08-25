<template>
    <div class='d-flex flex-wrap justify-start align-center'>
        <v-list-item-icon>
            <v-icon v-text='icon'></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <div class='d-flex flex-wrap justify-space-between align-center'>
                <div v-if='content[table_name]' class='text-14'>
                    {{ content[table_name].title }}
                    <span v-if='content[table_name].mode' class='text-muted text-12'>({{ content[table_name].mode }})</span>
                </div>
                <div v-if='table_name==="exam" && content[table_name].attended' class='ml-2'>
                    <v-icon small color='success'>mdi-checkbox-multiple-marked-circle-outline</v-icon>
                </div>
            </div>
        </v-list-item-content>
    </div>
</template>

<script>
export default {
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            icon: '',
            table_name: ''
        }
    },
    mounted() {
        this.generateIcon()
    },
    methods: {
        generateIcon() {
            if (this.content.video) {
                this.icon = 'mdi-video'
                this.table_name = 'video'
            } else if (this.content.note) {
                this.icon = 'mdi-note-multiple-outline'
                this.table_name = 'note'
            } else if (this.content.pdf) {
                this.icon = 'mdi-file-pdf'
                this.table_name = 'pdf'
            } else if (this.content.exam) {
                this.icon = 'mdi-clipboard-list-outline'
                this.table_name = 'exam'
            }
            else if (this.content.written_exam) {
                this.icon = 'mdi-clipboard-text-multiple-outline'
                this.table_name = 'written_exam'
            }
        }
    }
}
</script>
