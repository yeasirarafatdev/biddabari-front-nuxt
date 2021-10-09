<template>
    <section class='vH-100 vW-100 max-width-'>
        <the-breadcrum :items-push="[{text: 'All Course',disabled: false,href: '/courses'},{text: category.name,disabled: true,href: '/courses'}]" />

        <div class='mt-8'>
            <!--            <h1 class='my-6 text-center' v-if='category && Object.keys(category).length'>{{ category.name }}</h1>-->
            <hr class='mb-4'>
            <div v-if='$fetchState.pending'>
                <v-sheet class='pa-3'>
                    <v-skeleton-loader
                        class='mx-auto'
                        max-width='300'
                        type='card'
                    ></v-skeleton-loader>
                </v-sheet>
            </div>
            <div v-else-if='$fetchState.error'>
                <v-alert
                    border='top'
                    color='red lighten-2'
                    dark
                >
                    {{ $fetchState.error && $fetchState.error.response && $fetchState.error.response.status == 403 ? 'Access Denied!' : $fetchState.error.message }}
                </v-alert>
            </div>
            <div v-else>
                <section class='max-width-' v-if='subCategory && Object.keys(subCategory).length'>
                    <div class='services-container'>
                        <template v-for='category in subCategory'>
                            <nuxt-link :to='"/courses/category/"+category.id+"/courses"' class='services-card' :key='category.id'>
                                <div class='icon-yellow'>
                                    <img :src='category.photo' alt='' height='50px' width='50px'>
                                </div>
                                <div>
                                    <h3>{{ category.name }}</h3>
                                </div>
                            </nuxt-link>
                        </template>
                    </div>
                </section>
                <template v-else>
                    <v-col cols='12'>
                        <v-alert border='left' color='indigo' dark>No Category Found.</v-alert>
                    </v-col>
                </template>
                <hr>
                <template v-if=' category.courses && Object.keys( category.courses).length'>
                    <div class='mb-16'>
                        <h3 class='mb-6 bg-yellow px-4 py-2'
                            style='color: #09153A; border-radius: 4px;'>
                            <i class='fas fa-crosshairs mr-2'></i> {{ category.name }}
                        </h3>
                        <v-row>
                            <v-col v-for='(course, c) in category.courses' :key='c' cols='12' lg='3' md='4' sm='6' xs='12'>
                                <lazy-slide-show-card-course :data='course' :show-subtitle='true' display-name='title' />
                            </v-col>
                        </v-row>
                    </div>
                </template>
                <!--                <template v-else>
                                    <v-col cols='12'>
                                        <v-alert
                                            border='left'
                                            color='indigo'
                                            dark
                                        >
                                            No Category Found.
                                        </v-alert>
                                    </v-col>
                                </template>-->
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            subCategory: [],
            category: []
        }
    },
    async fetch() {
        const subCategoryUrl = 'api/sub-categories?id=' + this.$route.params.category_id
        await this.$axios.$get(subCategoryUrl).then((response) => {
            this.subCategory = response
        })

        /*const coursesUrl = 'api/categories/' + this.$route.params.category_id
        this.category = await this.$axios.$get(coursesUrl)*/
    },
    fetchOnServer: false,
    head() {
        return {
            title: 'Courses',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Biddabari'
                }
            ]
        }
    }
}
</script>
