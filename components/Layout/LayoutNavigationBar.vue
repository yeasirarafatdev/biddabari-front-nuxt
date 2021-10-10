<template>
    <div id='navigation-bar' class='max-width-'>
        <div class='d-flex justify-start align-center flex-wrap gap-10'>
            <div class='logo'>
                <nuxt-link to='/'>
                    <img :src="require('~/assets/images/biddiabari/biddabari.png')" alt='March  Forward' loading='lazy'
                         class='swiper-lazy mt-1 large-logo'
                         width='140px'>
                    <img :src="require('~/assets/images/biddiabari/biddabari_logo 512x512.png')" alt='March  Forward' loading='lazy'
                         class='swiper-lazy mt-1 small-logo'
                         width='60px'>
                </nuxt-link>
            </div>
            <div class='search-option' style='position:relative;'>
                <form @submit='search()'>
                    <input type='search' class='search-input' placeholder='Search' v-model='searchText'>
                    <button type='submit' @click='search()'>
                        <v-icon color='white'>mdi-search-web</v-icon>
                    </button>
                    <div v-show='searchResult' @blur='searchResult=false' @focusout='searchResult=false'>
                        <template v-if='searchedCourses'>
                            <div style='background-color:white; margin-top:6px; padding:10px; position: absolute; max-height: 400px; width:100%; max-width: 100%; box-shadow: 0 0 6px rgba(27, 36, 55, 0.6); border-radius: 6px'>
                                <template v-for='(searchedCourse, i) in searchedCourses'>
                                    <nuxt-link :to='"/courses/"+searchedCourse.slug' class='px-2 my-0'>
                                        <v-card class='d-flex justify-start align-center my-0' elevation='1'>
                                            <div>
                                                <img :src='searchedCourse.photo' alt='' height='40px'>
                                            </div>
                                            <div v-text='searchedCourse.title' class='py-2 text-14'></div>
                                        </v-card>
                                    </nuxt-link>
                                </template>
                            </div>
                        </template>
                        <div v-if='searching' style='background-color:white; margin-top:6px; padding:10px; position: absolute; max-height: 400px; width:100%; max-width: 100%; box-shadow: 0 0 6px rgba(27, 36, 55, 0.6); border-radius: 6px'>
                            <div class='text-center'>
                                <v-progress-circular
                                    indeterminate
                                    color='purple'
                                ></v-progress-circular>
                            </div>
                        </div>
                        <div v-if='notFound' style='background-color:white; margin-top:6px; padding:10px; position: absolute; max-height: 400px; width:100%; max-width: 100%; box-shadow: 0 0 6px rgba(27, 36, 55, 0.6); border-radius: 6px'>
                            <div class='error--text text-center'>Not Found!</div>
                        </div>
                    </div>
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
                            <li v-for='(subLink, n) in link.subLinks' :key='n' :class='subLink.sub && subLink.sub == true?"ml-5":""'>
                                <nuxt-link :to='subLink.to' exact>{{ subLink.label }}</nuxt-link>
                                <v-divider v-if='subLink.sub && subLink.sub == true'></v-divider>
                            </li>
                        </ul>
                    </li>
                    <li v-if='$auth.loggedIn'>
                        <v-menu offset-y>
                            <template v-slot:activator='{ on, attrs }'>
                                <v-btn
                                    dark
                                    class='btn-theme-btn'
                                    v-bind='attrs'
                                    v-on='on'
                                >
                                    <v-icon class='mr-2'>mdi-account</v-icon>
                                    {{ truncateText($auth.user.name) }}
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item>
                                    <nuxt-link to='/my-courses'>
                                        <v-list-item-title>My Courses</v-list-item-title>
                                    </nuxt-link>
                                </v-list-item>
                                <v-list-item @click='logout()'>
                                    <v-list-item-title>Logout</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </li>
                    <li v-else>
                        <nuxt-link to='/auth/login' exact>
                            <v-btn dark class='mx-auto btn-theme-btn'>
                                Login
                            </v-btn>
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
import _ from 'lodash'

export default {
    props: {
        // eslint-disable-next-line vue/require-default-prop
        links: {
            type: Array,
            default: () => [],
            required: true
        }
    },
    data: () => ({
        searchText: '',
        searching: false,
        searchResult: false,
        notFound: false,
        searchedCourses: {}
    }),
    watch: {
        searchText: {
            handler: _.debounce(function(newVal, oldVal) {
                if (newVal.length > 1) {
                    this.search()
                } else {
                    this.searchedCourses = {}
                    this.notFound = false
                    this.searching = false
                }
            }, 500), deep: true
        },
        $route() {
            this.searchedCourses = {}
            this.notFound = false
        }
    },
    methods: {
        truncateText(text) {
            if (text.length <= 10) return text
            else return text.substring(0, 10) + '...'
        },
        async logout() {
            await this.$auth.logout()
        },
        async search() {
            this.notFound = false
            this.searchResult = true
            this.searching = true
            await this.$axios.$get(`search/courses?query=${this.searchText}`)
                .then((response) => {
                    this.searchedCourses = response
                    this.notFound = this.searchedCourses.length < 1
                })
                .finally(() => {
                    this.searching = false
                })
        }
    }
}
</script>
