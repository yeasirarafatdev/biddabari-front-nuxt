<template>
    <div id='navigation-bar' class='max-width-'>
        <div class='d-flex justify-start align-center flex-wrap gap-10'>
            <div class='logo mt-2'>
                <nuxt-link to='/'>
                    <img :src="require('~/assets/images/biddiabari/biddabari.png')" alt='March  Forward' loading='lazy'
                         class='swiper-lazy mt-1'
                         width='140px'>
                </nuxt-link>
            </div>
            <div class='search-option'>
                <form>
                    <input type='search' class='search-input' placeholder='Search'>
                    <button type='submit'><v-icon color='white'>mdi-search-web</v-icon></button>
                </form>
            </div>
        </div>
        <nav id='navigation'>
            <div class='nav-menu-container'>
                <ul v-if='links && links.length' class='nav-menu-ul'>
                    <li v-for='(link, i) in links' :key='i'>
                        <a v-if='link.subLinks' href='#' @click.stop.prevent=''>
                            {{ link.label }}
                            <v-icon v-if='link.subLinks' color='white'>mdi-chevron-down</v-icon>

                        </a>
                        <nuxt-link v-else :to='link.to' exact>
                            {{ link.label }}
                        </nuxt-link>

                        <ul v-if='link.subLinks && link.subLinks.length' class='subLinks' style='max-height: 400px; overflow: auto'>
                            <li v-for='(subLink, n) in link.subLinks' :key='n'>
                                <nuxt-link :to='subLink.to' exact>{{ subLink.label }}</nuxt-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <nuxt-link to='/auth/login' exact>
                            <div class='wrapper-btn'>
                                <div class='card'>
                                    <div class='ppp'>
                                        <span class='enclosed'>Log</span><span>In</span>
                                    </div>
                                </div>
                            </div>
                        </nuxt-link>
                    </li>
                </ul>
            </div>

            <div class='nav-menu-icon'>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
            </div>
        </nav>
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
    }
}
</script>
