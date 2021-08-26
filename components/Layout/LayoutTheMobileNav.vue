<template>
    <div class='mobile-nav-container'>
        <div class='overlay' @click='closeMobileNavigation()'></div>
        <div id='mobile-nav'>
            <ul v-if='links && links.length'>
                <div class='close-nav-menu-icon'>
                    <v-icon color='white'>mdi-close-thick</v-icon>
                </div>
                <li v-for='(link, i) in links' :key='i'>
                    <a v-if='link.subLinks' href='#' class='d-flex flex-wrap justify-space-between' @click.stop.prevent='toggleSubmenu(i)'>
                        <div>{{ link.label }}</div>
                        <v-icon v-if='link.subLinks' color='white'>mdi-chevron-down</v-icon>
                    </a>
                    <nuxt-link v-else :to='link.to' exact>
                        {{ link.label }}
                    </nuxt-link>

                    <ul v-if='(link.subLinks && link.subLinks.length) && showSubMenuKey === i' class='subLinks'>
                        <li v-for='(subLink, n) in link.subLinks' :key='n'>
                            <nuxt-link :to='subLink.to' exact>{{ subLink.label }}</nuxt-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <nuxt-link to='/auth/login' exact>
                        <v-btn dark color='blue' class='mx-auto btn-theme-btn'>
                            Login
                        </v-btn>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        links: {
            type: Array,
            default: () => [],
            required: true
        }
    },
    data() {
        return {
            showSubMenuKey: 0
        }
    },
    watch:{
        $route(){
            this.closeMobileNavigation()
        }
    },
    methods: {
        toggleSubmenu(key) {
            if (this.showSubMenuKey === key) this.showSubMenuKey = 0
            else this.showSubMenuKey = key
        },
        closeMobileNavigation() {
            const navigation = document.getElementById('mobile-nav')
            const mobileNavContainer = document.querySelector('.mobile-nav-container')
            navigation.classList.remove('show')
            mobileNavContainer.classList.remove('show')
        }
    }
}
</script>
