import axios from 'axios';

const BaseStateUrl = 'admin/community-category/';

export default {
    namespaced: true,
    state:  () => ({
        categories: []
    }),
    getters: {
        categories(state) {
            return state.categories;
        }
    },
    mutations: {
        setCategories(state, value) {
            state.categories = value;
        },
        updateProducts(state, value) {
            state.categories.map(to => {
                if (to.id == value.id) {
                    for (let key in value) {
                        to[key] = value[key];
                    }
                }
            });
        },
        addNewCategory(state, value) {
            state.categories.push(value);
        },
        /*removeCategory(state, data) {

        },*/
    },
    actions: {
        async getCategories({commit, dispatch}) {
            return await axios.get(BaseStateUrl)
                .then((response) => {
                    commit("setCategories", response.data.data);
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((errors) => {
                    dispatch("errors/setErrors", errors, {root: true});
                });
        },
        async addCategory({commit, dispatch}, data) {
            return await axios.post(BaseStateUrl, data)
                .then((response) => {
                    if (!data.parent_id) {
                        if (response) commit("addNewCategory", response.data.data);
                    } else {
                        dispatch("getCategories");
                    }
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((errors) => {
                    dispatch("errors/setErrors", errors, {root: true});
                });
        },
        async updateCategory({dispatch}, combinedData) {
            return await axios.put(`${BaseStateUrl}${combinedData.id}`, combinedData.formData)
                .then(() => {
                    dispatch("getCategories");
                    dispatch("errors/clearErrors", [], {root: true});
                })
                .catch((errors) => {
                    dispatch("errors/setErrors", errors, {root: true});
                });
        },
        async deleteCategory({commit, dispatch}, value) {
            await axios.delete(`${BaseStateUrl}${value.id}`,)
                .then(() => {
                    //commit("removeCategory", response.data.data);
                    dispatch("getCategories");
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
