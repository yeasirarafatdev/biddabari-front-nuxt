<template>
    <div class='mt-2 d-flex justify-start'>
        <div class='mr-3'>
            <v-avatar size='30' v-if='post.user && post.user.avatar'>
                <img :src='post.user.avatar' :alt='post.user.name'>
            </v-avatar>
            <v-avatar size='30' color='indigo' v-else>
                <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
        </div>
        <div style='width: 100%'>
            <InputComponent
                style='width: 100%'
                v-model='commentForm.comment'
                type='text-area'
                label=''
                id='name'
                :rows='2'
                placeholder='Write your comments .....'
                :error='errors.comment && Array.isArray(errors.comment) ? errors.comment[0] : errors.comment'
            />
            <div class='text-right'>
                <v-btn small @click='submitComment(post)' color='success'>Submit</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import InputComponent from '@/components/Form/InputComponent'

export default {
    name: 'CommentForm',
    components: {
        InputComponent
    },
    props: {
        post: {
            type: Object,
            default: () => {
            }
        },
        reply: {
            type: Object,
            default: () => {
            }
        }
    },
    data() {
        return {
            user: this.$auth.user,
            commentForm: {
                comment: '',
                parent_id: null,
                community_post_id: null,
                user_id: null
            },
            errors: {}
        }
    },
    methods: {
        submitComment(post = {}) {
            this.commentForm.user_id = this.user.id
            if (this.reply && Object.keys(this.reply).length) {
                this.commentForm.community_post_id = this.reply.community_post_id
                this.commentForm.parent_id = this.reply.parent_id
            } else {
                if (post && Object.keys(post).length) {
                    this.commentForm.community_post_id = post.id
                }
            }
            this.$axios.post('/admin/community-comment', this.commentForm)
                .then((response) => {
                    if (response.data && response.data.data.id) {
                        this.$emit('newCommentAdded', response.data.data)
                        this.clearForm()
                    }
                })
        },
        clearForm() {
            this.commentForm = {
                comment: '',
                parent_id: null,
                community_post_id: null,
                user_id: null
            }
        }
    }
}
</script>
