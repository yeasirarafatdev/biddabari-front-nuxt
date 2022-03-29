import axios from 'axios';

const BaseStateUrl = 'admin/community-tag/';

export default {
    namespaced: true,
    state: () => ({
        tags: []
    }),
    getters: {
        tags(state) {
            return state.tags;
        }
    },
    mutations: {
        setTags(state, value) {
            state.tags = value;
        },
        updateTags(state, value) {
            state.tags.map(to => {
                if (to.id == value.id) {
                    for (let key in value) {
                        to[key] = value[key];
                    }
                }
            });
        },
        addNewTag(state, value) {
            state.tags.push(value);
        },
        removeTags(state, data) {
            if (data && data.length) {
                data.forEach(e => {
                    state.tags = state.tags.filter((obj) => {
                        return obj.id != e.id;
                    });
                })
            }
        },
    },
    actions: {
        async getTags({commit, dispatch}) {
            return await axios.get(BaseStateUrl)
                .then((response) => {
                    commit("setTags", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((errors) => {
                    dispatch("errors/setErrors", errors, {root: true});
                });
        },
        async addTag({commit, dispatch}, data) {
            return await axios.post(BaseStateUrl, data)
                .then((response) => {
                    if (response) commit("addNewTag", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((errors) => {
                    dispatch("errors/setErrors", errors, {root: true});
                });
        },
        async updateTag({commit, dispatch}, formData) {
            console.log(formData)
            return await axios.put(`${BaseStateUrl}${formData.id}`, formData)
                .then((response) => {
                    if (response) commit("updateTags", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((errors) => {
                    dispatch("errors/setErrors", errors, {root: true});
                });
        },
        async deleteTag({commit, dispatch}, value) {
            await axios.post(`${BaseStateUrl}multiple-delete/`, value)
                .then(() => {
                    dispatch("getTags");
                    // commit("removeTags", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((error) => {
                    let customErrorMessage = null;
                    if (error.response && error.response.status === 500) {
                        commit('errors/updateErrors', error.response.data.errorMsg, {root: true});
                        return;
                    }
                    dispatch("errors/setErrors", error, customErrorMessage, {root: true});
                });
        }
    }
};
