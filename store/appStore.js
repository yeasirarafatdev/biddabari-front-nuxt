export default {
    namespaced: true,
    state: () => ({
        wantToViewContentDialog: false
    }),
    getters: {},
    mutations: {
        toggleWantToViewContentDialog(state, payload) {
            state.wantToViewContentDialog = payload
        }
    },
    actions: {
        toggleWantToViewContentDialog(store, payload) {
            store.commit('toggleWantToViewContentDialog', payload)
        }
    }
}
