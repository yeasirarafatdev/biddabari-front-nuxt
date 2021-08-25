export default {
    namespaced: true,
    state: () => ({
        enrolledCourses: {},
        myCoursesIds: []
    }),
    getters: {},
    mutations: {
        setEnrolledCourses(state, payload) {
            state.enrolledCourses = payload

            if (state.enrolledCourses && Object.keys(state.enrolledCourses).length) {
                state.enrolledCourses.forEach(function(obj) {
                    state.myCoursesIds.push(obj.id)
                })
            }
        },
        removeEnrolledCourses(state) {
            state.enrolledCourses = {}
            state.myCoursesIds = []
        }
    },
    actions: {
        async fetchEnrolledCourse(context) {
            if (this.$auth.loggedIn) {
                const myCoursesUrl = 'api/courses?filter=my-course'
                await this.$axios.$get(myCoursesUrl).then((response) => {
                    context.commit('setEnrolledCourses', response)
                })
            } else {
                context.commit('removeEnrolledCourses')
            }
        },
        emptyEnrolledCourse(context) {
            context.commit('removeEnrolledCourses')
        }
    }
}
