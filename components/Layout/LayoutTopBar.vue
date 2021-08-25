<template>
    <div class='top-bar-container'>
        <div id='top-bar' class='max-width-'>
            <div>
                <ul class='hide-on-mobile'>
                    <li class='mr-2'><a href=''>Have any Question?</a></li>
                    <li class='mr-2'>
                        <a href='#'>
                            <v-icon small color='white'>mdi-phone</v-icon>
                            01844674202, 01844674203</a></li>
                    <li class='mr-2'>
                        <a href='mailto:bcff2020@gmail.com' target='_blank'>
                            <v-icon small color='white'>mdi-email-outline</v-icon>
                            bcff2020@gmail.com</a></li>
                </ul>
            </div>
            <div>
                <ul class='d-flex'>
                    <li class='ml-2 mr-4'>
                        <nuxt-link to='/cart'>
                            <cart />
                        </nuxt-link>
                    </li>
                    <template v-if='!$auth.loggedIn'>
                        <li class='ml-2'>
                            <nuxt-link to='/auth/login'>Login/Register</nuxt-link>
                        </li>
                    </template>
                    <template v-else>
                        <div class='text-center'>
                            <v-menu offset-y>
                                <template #activator='{ on, attrs }'>
                                    <v-btn
                                        class='white&#45;&#45;text text--black warning lighten-2'
                                        dark
                                        small
                                        v-bind='attrs'
                                        v-on='on'
                                    >
                                        <v-avatar
                                            v-if='$auth.user.avatar != null'
                                            color='warning'
                                            size='36'
                                            v-bind='attrs'
                                            v-on='on'
                                        >
                                            <img
                                                alt='Avatar'
                                                :src='$auth.user'
                                                class='mr-1'
                                            >
                                        </v-avatar>
                                        {{ $auth.user.name }}
                                    </v-btn>
                                </template>
                                <v-list>
                                    <!--                                    <nuxt-link to='/profile'>
                                                                            <v-list-item>
                                                                                <v-list-item-title>Profile</v-list-item-title>
                                                                            </v-list-item>
                                                                        </nuxt-link>-->
                                    <v-list-item @click.stop.prevent='logout()'>
                                        <v-list-item-title>Logout</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    methods: {
        async logout() {
            await this.$auth.logout().then(() => {
                this.$store.dispatch('userData/emptyEnrolledCourse')
                this.$notifier.showMessage({ content: 'You are logged out!', color: 'info' })
            })
            this.$router.push({ path: '/' })
        }
    }
}
</script>
