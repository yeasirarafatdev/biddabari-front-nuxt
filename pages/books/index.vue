<template>
    <section class='vH-100 vW-100 max-width-'>
        <lazy-the-breadcrum :items-push="[{text: 'Books',disabled: true,href: '/books'}]" />
        <div class='mt-8'>
            <v-row>
                <v-col cols='12'>
                    <h3 class='mb-6 bg-yellow px-4 py-2' style='color: #09153A; border-radius: 4px;'>Books</h3>
                </v-col>
                <v-col cols='12' v-if='$fetchState.pending'>
                    <div class='text-center my-6'>
                        <v-progress-circular
                            :size='50'
                            color='primary'
                            indeterminate
                        ></v-progress-circular>
                    </div>
                </v-col>
                <template v-else-if='$fetchState.error'>
                    <v-alert
                        border='top'
                        color='red lighten-2'
                        dark
                    >
                        {{ $fetchState.error && $fetchState.error.response && $fetchState.error.response.status == 403 ? 'Access Denied!' : $fetchState.error.message }}
                    </v-alert>
                </template>
                <template v-else>
                    <template v-if='books && Object.keys(books).length'>
                        <v-col v-for='(book, d) in  books' :key='d' cols='6' xl='2' lg='2' md='3' sm='3'>
                            <lazy-slide-show-card-book :data='book' display-name='title' />
                        </v-col>
                    </template>
                    <template v-else>
                        <v-col cols='12'>
                            <v-alert
                                border='left'
                                color='indigo'
                                dark
                            >
                                No books Found.
                            </v-alert>
                        </v-col>
                    </template>
                </template>
            </v-row>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            books: {}
        }
    },
    async fetch() {
        const booksUrl = 'api/books'
        this.books = await this.$axios.$get(booksUrl)
    },
    fetchOnServer: true,
    head() {
        return {
            title: 'Books',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'March Forward is a Free Education, Coaching Training and career mentoring platform for all Bangladeshi young people.'
                }
            ]
        }
    }
}
</script>
