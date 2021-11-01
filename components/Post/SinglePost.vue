<template>
    <v-card elevation="6" class="my-6 pa-3" :key="post.id" max-width="600" style="background-color: #f1f1f1; color: #262626;">
        <template>
            <div class="d-flex justify-space-between align-center">
                <div class="d-flex justify-start align-center">
                    <div class="mr-3">
                        <v-avatar size="40" v-if="post.user && post.user.avatar">
                            <img :src="post.user.avatar" :alt="post.user.name">
                        </v-avatar>
                        <v-avatar size="40" color="indigo" v-else>
                            <v-icon dark>mdi-account-circle</v-icon>
                        </v-avatar>
                    </div>
                    <div v-if="post.user">
                        <div><strong>{{ post.user.name }}</strong></div>
                        <div><small>{{ post.publish_at }}</small></div>
                    </div>
                </div>
                <div>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="primary" dark v-bind="attrs" v-on="on" x-small fab>
                                <v-icon>mdi-menu</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-if="user.id === post.user.id">
                                <v-list-item-title>
                                    <v-btn @click="editItem(post, index)" small color="warning">
                                        <v-icon>mdi-grease-pencil</v-icon>
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item v-if="user.id === post.user.id || (user.role === 'admin' && post.user.role!='admin')">
                                <v-list-item-title>
                                    <v-btn @click="deleteItem(post)" small color="error">
                                        <v-icon>mdi-trash-can-outline</v-icon>
                                    </v-btn>
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <div class="py-2">
                <v-card style="background-color: #d9d9d9; color: #131212" elevation="0" class="pa-2">
                    <div class="mb-2">
                        <div style="font-size: 14px">{{ truncate(post.description, maxRead, '...') }}</div>
                        <div class="text-right">
                            <v-btn x-small color="primary" v-if="post.description.length > maxRead" @click="expand()">
                                <strong>Read more</strong>
                            </v-btn>
                            <v-btn x-small color="primary" v-if="is_expand" @click="minimize()">
                                <strong>Show less</strong>
                            </v-btn>
                        </div>
                    </div>
                    <div v-if="post.first_image" class="d-flex justify-start">
                        <div style="padding-right: 4px"
                             :style="post.imageUrls && post.imageUrls.length>1 ?'width: 80%':''">
                            <img :src="post.first_image" alt="image" width="100%">
                        </div>
                        <div style="width: 20%" v-if="post.imageUrls && post.imageUrls.length>1">
                            <div v-for="(image, n) in post.imageUrls" :key="image.id">
                                <template v-if="n!=0 && n<=3">
                                    <img :src="image" alt="image" width="100%">
                                </template>
                            </div>
                            <template v-if="post.imageUrls.length>4">
                                <div class="d-flex justify-center align-center more-image">
                                    <h3>+ {{ post.imageUrls.length - 4 }}</h3>
                                </div>
                            </template>
                        </div>
                    </div>
                </v-card>
            </div>
            <div v-if="post.categories && post.categories.length" class="my-1">
                <strong class="mr-2">Category:</strong>
                <v-chip v-for="category in post.categories" :key="category.id"
                        filter class="blue accent-3 mr-2" small>
                    {{ category.name }}
                </v-chip>
            </div>
            <div v-if="post.tags && post.tags.length" class="my-1">
                <strong class="mr-2">Tag:</strong>
                <v-chip v-for="tag in post.tags" :key="tag.id"
                        filter class="warning accent-3 mr-2" small>
                    {{ tag.name }}
                </v-chip>
            </div>


            <div>
                <div class="text-right" v-if="post.comment_count">
                    <span v-if="loadingComments" class="mr-2">
                        <v-progress-circular :size="20" indeterminate color="primary"></v-progress-circular>
                    </span>
                    <v-btn small color="primary" @click="loadComments(post)">
                        <strong>{{ post.comment_count }}</strong>
                        <v-icon class="ml-2">mdi-comment</v-icon>
                    </v-btn>
                </div>

                <comment-form :post="post" @newCommentAdded="newComment($event)"></comment-form>

                <div>
                    <div v-if="newComments && newComments.length">
                        <div v-for="comment in newComments" :key="comment.id">
                            <post-comment :comment="newComments" @newCommentAdded="loadComments(post)"></post-comment>
                        </div>
                    </div>
                    <div v-if="allComments && allComments.length">
                        <div v-for="comment in allComments" :key="comment.id">
                            <post-comment :comment="comment"  @newCommentAdded="loadComments(post)"></post-comment>
                        </div>
                    </div>
                </div>
            </div>

        </template>
    </v-card>
</template>

<script>
import {mapGetters} from 'vuex'
import PostComment from "@/components/Post/Comment/PostComment";
import CommentForm from "@/components/Post/Comment/CommentForm";

export default {
    props: ['post', 'index'],
    components: {
        CommentForm,
        PostComment,
    },
    data: () => ({
        commentForm: {
            comment: '',
            parent_id: null,
            community_post_id: null,
            user_id: null,
        },
        errors: {},
        confirmDialog: false,
        dialog: false,
        is_expand: false,
        maxRead: 150,
        showComments: false,
        loadingComments: false,
        newComments: [],
        allComments: [],
    }),
    methods: {
        editItem(item) {
            item.index = this.index
            this.$emit('editItem', item)
        },
        deleteItem(item) {
            this.$emit('deleteItem', item)
        },
        minimize() {
            this.is_expand = false
            this.maxRead = 150
        },
        expand() {
            this.is_expand = true
            this.maxRead = 10000
        },
        newComment() {
           /* if (response) {
                this.post.comment_count = this.post.comment_count + 1
                if (!response.parent_id) {
                    this.newComments.push(response)
                }
            }*/
            this.loadComments(this.post)
        },
        async loadComments(post) {
            this.loadingComments = true
            await axios.get(`/admin/community-comment?community_post_id=${post.id}`)
                .then((response) => {
                    if (response.data && response.data.data) {
                        this.allComments = response.data.data
                        this.loadingComments = false
                    }
                })
        },
    }
}
</script>


<style scoped lang="scss">
img {
    border-radius: 4px;
    cursor: pointer;
    transition: all 400ms ease-in-out;

    &:hover {
        opacity: 0.8;
    }
}

.more-image {
    cursor: pointer;
    height: 54px;
    width: 100%;
    background-color: #1d2124;
    color: white;
    border-radius: 4px;
    transition: all 400ms ease-in-out;

    &:hover {
        background-color: black;
    }
}
</style>
