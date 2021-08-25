/// Accept Only ... "Not Logged In" ... Users ...
export default function ({ store, redirect }) {
    if (store.state.auth.loggedIn) {
        return redirect("/");
    }
}
