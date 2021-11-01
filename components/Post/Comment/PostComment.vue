<template>
    <div v-if='comment'>
        <v-card elevation='4' class='pa-2 my-2' :class="user.id === comment.user_id?' blue':''">
            <div class='mt-2 d-flex justify-start'>
                <div class='mr-3'>
                    <v-avatar size='30' v-if='comment.user && comment.user_avatar'>
                        <img :src='comment.user_avatar' :alt='comment.user_name'>
                    </v-avatar>
                    <v-avatar size='30' color='indigo' v-else>
                        <v-icon dark>mdi-account-circle</v-icon>
                    </v-avatar>
                </div>
                <div>
                    <div style='font-size: 12px'>
                        <strong>{{ comment.user_name }}</strong>
                        <div>{{ comment.comment }}</div>
                    </div>
                    <div>
                        <v-btn x-small color='accent' class='mr-3' @click='reply=true'><strong>Reply</strong></v-btn>
                        <small class='text--secondary'>{{ comment.created_at }}</small>
                    </div>
                </div>
            </div>
        </v-card>


        <comment-form
            v-if='reply'
            :post='{}'
            :reply='{community_post_id:comment.community_post_id, parent_id:comment.id}'
            @newCommentAdded='newCommentAdd($event)' />


        <div v-if='comment.children' style='margin-left: 12px'>
            <template v-for='comm in comment.children'>
                <post-comment :comment='comm' :key='comm.id'></post-comment>
            </template>
        </div>

    </div>
</template>

<script>
import PostComment from '@/components/Post/Comment/PostComment'
import CommentForm from '@/components/Post/Comment/CommentForm'
import { mapGetters } from 'vuex'

export default {
    name: 'PostComment',
    components: {
        CommentForm,
        PostComment
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    props: ['comment'],
    data: () => ({
        reply: false
    }),
    methods: {
        newCommentAdd(event) {
            this.$emit('newCommentAdded', event)
            this.reply = false
        }
    }
}
</script>
