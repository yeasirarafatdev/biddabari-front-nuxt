const BaseStateUrl = 'admin/community-post/';
export default {
    namespaced: true,
    state: {
        posts: [],
    },
    getters: {
        posts(state) {
            return state.posts;
        },
    },
    mutations: {
        setPosts(state, value) {
            state.posts = value;
        },
        updatePosts(state, value) {
            state.posts.map(to => {
                if (to.id == value.id) {
                    for (let key in value) {
                        to[key] = value[key];
                    }
                }
            });
        },
        addNewPost(state, value) {
            // state.posts.push(value);
            state.posts.splice(0, 0, value)
        },
        removePosts(state, value) {
            state.posts = state.posts.filter((obj) => {
                return obj.id != value.id;
            });
        },
    },
    actions: {
        // eslint-disable-next-line no-unused-vars
        async getPosts({commit, dispatch}) {
            await this.$axios.get(BaseStateUrl)
                .then((response) => {
                    commit("setPosts", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((error) => {
                    dispatch("errors/setErrors", error, {root: true});
                });
        },
        async addPost({commit, dispatch}, data, config) {
            await this.$axios.post(BaseStateUrl, data, config)
                .then((response) => {
                    commit("addNewPost", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((error) => {
                    dispatch("errors/setErrors", error, {root: true});
                });
        },
        async updatePost({commit, dispatch}, combinedData) {
            await this.$axios.post(`${BaseStateUrl}${combinedData.id}`, combinedData.formData, combinedData.config)
                .then((response) => {
                    commit("updatePosts", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((error) => {
                    dispatch("errors/setErrors", error, {root: true});
                });
        },
        async deletePost({commit, dispatch}, value) {
            await this.$axios.delete(`${BaseStateUrl}${value.id}`)
                .then((response) => {
                    commit("removePosts", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((error) => {
                    dispatch("errors/setErrors", error, {root: true});
                });
        }
    },
};
