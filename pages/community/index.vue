<template>
    <div class='my-10'>
        <div class='px-4 py-4'>
            <h1 class='text-uppercase text-center mt-2' style='color: #560796'>Posts</h1>

            <!-- Loop Through posts -->

            <div v-if='!loadingPosts'>
                <div v-if='posts && posts.length'>
                    <v-row>
                        <v-spacer></v-spacer>
                        <v-col cols='12' sm='12' md='7' lg='5'>
                            <template v-for='(post, n) in posts'>
                                <div class='default justify-center align-center' :key='post.id'>
                                    <single-post v-if='post' :post='post' :index='n'
                                                 @editItem='editItem($event)'
                                                 @deleteItem='deletePostConfirm($event)'></single-post>
                                </div>
                            </template>
                        </v-col>
                        <v-spacer></v-spacer>
                    </v-row>
                </div>
            </div>
            <div v-else class='text-center mt-4'>
                <v-progress-circular indeterminate color='purple' :width='3'></v-progress-circular>
                Loading posts ...
            </div>


            <confirm-modal :dialog='dialog'
                           message='Are you sure you want to delete this post.'
                           @closeDialog='dialog=false'
                           @confirm='del()'></confirm-modal>

            <template>
                <post-form :open-modal='editModal' @closeModal='editModal=false' :editMode='true'
                           :dataToUpdate='editData'></post-form>
            </template>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SinglePost from '@/components/Post/SinglePost'
import ConfirmModal from '@/components/ConfirmModal'
import PostForm from '@/components/Post/PostForm'

export default {
    components: { SinglePost, ConfirmModal, PostForm },
    data: () => ({
        dialog: false,
        editModal: false,
        editIndex: -1,
        editData: {},
        itemToDelete: null,
        loadingPosts: false,
        transition: 'slide-y-reverse-transition'
    }),
    mounted() {
        this.loadPosts()
    },
    computed: {
        ...mapGetters({
            posts: 'post/posts',
            getErrors: 'errors/errors'
        })
    },
    methods: {
        ...mapActions({
            getPosts: 'post/getPosts',
            deletePost: 'post/deletePost'
        }),
        loadPosts() {
            this.loadingPosts = true
            this.getPosts().finally(() => {
                this.loadingPosts = false
            })
        },
        editItem(item) {
            this.editModal = true
            this.editIndex = item.index
            this.editData = item
        },
        deletePostConfirm(item) {
            this.dialog = true
            this.itemToDelete = item
        },
        del() {
            if (this.itemToDelete && Object.keys(this.itemToDelete).length) {
                this.deletePost(this.itemToDelete)
                    .finally(() => {
                        this.dialog = false
                    })
            }
        }
    }
}
</script>
