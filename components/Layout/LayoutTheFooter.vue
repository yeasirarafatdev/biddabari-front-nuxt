<template>
    <footer>
        <v-container>
            <section>
                <v-row class='my-2'>
                    <v-col cols='12' xs='6' sm='6' md='3'>
                        <!-- Logo -->
                        <nuxt-link to='/'>
                            <img :src="require('~/assets/images/biddiabari/biddabari.png')" alt='March  Forward' loading='lazy'
                                 class='swiper-lazy mt-1'
                                 width='150px'>
                        </nuxt-link>
                        <ul>
                            <li>
                                <a href='#'>
                                    <v-icon small color='black'>mdi-phone</v-icon>
                                    01963-929200/01/02
                                </a>
                            </li>
                            <!--                            <li>
                                                            <a href='mailto:bcff2020@gmail.com' target='_blank'>
                                                                <v-icon small color='black'>mdi-email-outline</v-icon>
                                                                bcff2020@gmail.com
                                                            </a>
                                                        </li>-->
                            <li>
                                <a href='mailto:bcff2020@gmail.com' target='_blank'>
                                    <v-icon small color='black'>mdi-google-maps</v-icon>
                                    43 BC DAD STREET, LALBAG, DHAKA-1211
                                </a>
                            </li>
                        </ul>

                        <layout-social-icons/>

                    </v-col>
                    <v-col cols='12' xs='6' sm='6' md='3'>
                        <h3>Company</h3>
                        <ul>
                            <li>
                                <nuxt-link to='/about'>About Us</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to='/contact'>Contact Us</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to='/teachers'>Teachers</nuxt-link>
                            </li>
                        </ul>
                    </v-col>
                    <v-col cols='12' xs='6' sm='6' md='3'>
                        <h3>Links</h3>
                        <ul>
                            <li>
                                <nuxt-link to='/courses'>Course</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to='/notice'>Notices</nuxt-link>
                            </li>
                        </ul>
                    </v-col>
                    <v-col cols='12' xs='6' sm='6' md='3'>
                        <h3>Others</h3>
                        <ul>
                            <li>
                                <nuxt-link to='/privacy-and-policy'>Privacy & Policy</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to='/terms-and-conditions'>Terms & Conditions</nuxt-link>
                            </li>
                            <li>
                                <nuxt-link to='/refund-policy'>Refund Policy</nuxt-link>
                            </li>
                        </ul>
                    </v-col>
                </v-row>
                <div class="my-2">
                    <v-img src="https://nextivesolution.sgp1.cdn.digitaloceanspaces.com/sslcommerz.png"
                           alt="ssl-commerz"/>
                </div>
                <hr>
                <p class='text-muted text-12 mt-4'>
                    &copy; Biddabari {{ new Date().getFullYear() }} | Developed by Nextive Solution
                </p>
            </section>
        </v-container>
    </footer>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>
