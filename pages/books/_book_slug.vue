<template>
    <section class='vH-100 vW-100 max-width-'>
        <lazy-the-breadcrum
            v-if='book && Object.keys(book).length'
            :items-push="[{text: 'Books',disabled: false,href: '/books'},{text: book.title ,disabled: true,href: '/'}]" />

        <div class='mt-8'>
            <v-card elevation='2' :loading='$fetchState.pending' class='px-4 py-4 mb-10'>
                <!-- Loading Content -->
                <template v-if='$fetchState.pending'>
                    <v-sheet
                        class='pa-3'
                    >
                        <v-skeleton-loader
                            class='mx-auto'
                            max-width='300'
                            type='card'
                        ></v-skeleton-loader>
                    </v-sheet>
                </template>
                <!-- Error fetching Content -->
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
                    <v-row>
                        <v-col cols='12' lg='4' md='4' sm='5' class='text-center'>
                            <div class='hoverBookContainer'>
                                <strong class='error--text'>একটু পড়ে দেখুন <i class='fas fa-level-down-alt ml-1'></i></strong>
                                <br>
                                <img :src='book.photo' alt=''
                                     class='bookImage book-flip mt-1'
                                     title='Click to see some of the book pages.'
                                     @click='showBookDialogue=true'>
                            </div>
                        </v-col>
                        <v-col cols='12' lg='5' md='6' sm='7'>
                            <h1>{{ book.title }}</h1>
                            <v-card v-if='book.description' elevation='2' class='px-4 py-4 mb-10'>
                                <v-row>
                                    <v-col cols='12' lg='12' md='12' sm='12' xs='12'>
                                        <h3>About:</h3>
                                        <div class='book-description max-height-200' v-html=book.description></div>
                                        <div class='text-center mt-4'>
                                            <v-btn color='primary' small @click.stop.prevent='expandDescription()'>
                                                <span v-if='!isBookDescriptionExpanded'>Read more <i class='fas fa-caret-down'></i></span>
                                                <span v-else><i class='fas fa-caret-up'></i></span>
                                            </v-btn>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <!--                            <p class='color-success text-12'>
                                                            <strong class='text-muted'>Status: </strong> {{ book.status }}
                                                        </p>
                                                        <div title='price'>
                                                            <div class='mt-2'>
                                                                <div v-if='book.price'>
                                                                    <div v-if='book.discount'>
                                                                        <strong>
                                                                            <del class='text-muted'>৳ {{ book.price }}</del>
                                                                            <br>
                                                                            <span class='color-orange'>৳ {{ book.price - book.discount }} </span>
                                                                        </strong>
                                                                        <span class='text-12'>You save ৳ {{ book.price - (book.price - book.discount) }}</span>
                                                                    </div>
                                                                    <strong v-else class='color-orange'>৳ {{ book.price }}</strong>
                                                                </div>
                                                                <div v-else class='color-success'><strong> Free </strong></div>
                                                            </div>
                                                        </div>-->

                            <!--                            <div v-if=' itemIdsInCart.includes(book.id)' class='mt-2'>
                                                            <div class='text-12 orange&#45;&#45;text'>Product Already Added To Cart</div>
                                                        </div>
                                                        <div class='d-flex flex-wrap justify-start align-center gap-10'>
                                                            <div>Quantity:</div>
                                                            <div class='cart-quantity-btn'>
                                                                <button :disabled='quantity<=1 || itemIdsInCart.includes(book.id)' @click.stop.prevent='decreaseQuantity()'>
                                                                    <v-icon>mdi-minus</v-icon>
                                                                </button>
                                                                <strong class='quantity-value'>{{ quantity }}</strong>
                                                                <button :disabled='itemIdsInCart.includes(book.id)' @click.stop.prevent='increaseQuantity()'>
                                                                    <v-icon>mdi-plus</v-icon>
                                                                </button>
                                                            </div>
                                                        </div>-->

                            <div class='d-flex flex-wrap justify-start align-center gap-10'>
                                <v-btn class='mt-2' outlined color='primary' @click='showBookDialogue=true'>
                                    <v-icon class='mr-2'>mdi-book-open-outline</v-icon>
                                    Preview
                                </v-btn>
                                <!-- Add to cart button component -->
                                <!--                                <cart-add-to-cart v-if='book' :product-object='book' :quantity='quantity' :item-ids-in-cart='itemIdsInCart' />-->
                            </div>
                            <nuxt-link to='/books'>
                                <v-btn class='mt-10 primary horizontal-btn'>
                                    Find more books
                                    <v-icon class='ml-2'>mdi-arrow-right-thick</v-icon>
                                </v-btn>
                            </nuxt-link>
                        </v-col>
                        <v-col cols='12' lg='3' md='2' sm='1'>
                        </v-col>
                    </v-row>
                </template>
            </v-card>
        </div>

        <v-dialog
            v-model='showBookDialogue'
            hide-overlay
            transition='dialog-bottom-transition'
            style='z-index: 10001'
        >
            <v-card tile>
                <v-toolbar
                    color='primary'
                >
                    <v-btn
                        icon
                        dark
                        @click.stop.prevent='showBookDialogue = false'
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ book.title }}</v-toolbar-title>
                </v-toolbar>
                <div>
                    <template v-if='book.book_photos && Object.keys(book.book_photos).length'>
                        <div v-for='(photo,i) in book.book_photos' :key='i+photo.id' class='text-center mb-2'>
                            <img :src='photo.photo' alt='' style='max-width: 100%'>
                        </div>
                    </template>
                </div>
            </v-card>
        </v-dialog>


        <!-- Recommended Books section -->
        <section v-if='recommendedBooks && Object.keys(recommendedBooks).length' class='max-width-'>
            <lazy-slide-show
                :data-array='recommendedBooks'
                display-name='title'
                heading='Recommended Books'
                :breakpoints='bookSliderBreakPoints'
                slide-show-type='books' />
            <div class='mt-4 text-center'>
                <nuxt-link to='/books' class='btn-blue'>All Books</nuxt-link>
            </div>
        </section>
    </section>
</template>

<script>
export default {
    data() {
        return {
            showBookDialogue: false,
            book: {},
            recommendedBooks: {},
            instructions: {},
            isBookDescriptionExpanded: false,
            bookSliderBreakPoints: {
                1366: { slidesPerView: 6, spaceBetween: 30 },
                1024: { slidesPerView: 5, spaceBetween: 30 },
                800: { slidesPerView: 5, spaceBetween: 30 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                640: { slidesPerView: 4, spaceBetween: 15 },
                400: { slidesPerView: 3, spaceBetween: 10 },
                320: { slidesPerView: 2, spaceBetween: 10 }
            },
            itemIdsInCart: [],
            quantity: 1
        }
    },
    async fetch() {
        const bookUrl = `books/${this.$route.params.book_slug}`
        this.book = await this.$axios.$get(bookUrl)

        const instructionsUrl = `instructions`
        this.instructions = await this.$axios.$get(instructionsUrl)
    },
    fetchOnServer: true,
    head() {
        return {
            title: this.book && Object.keys(this.book).length ? this.book.title : 'Books',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.book && Object.keys(this.book).length ? this.book.title + '. ' : '' + 'Biddabari'
                }
            ]
        }
    },
    computed: {
        cartItems() {
            return this.$store.state.cart.book_cart
        }
    },
    watch: {
        cartItems: {
            handler() {
                this.matchItemsInCart()
            },
            deep: true,
            immediate: true
        }
    },
    mounted() {
        this.matchItemsInCart()
        this.getRecommendedBooks()
    },
    methods: {
        matchItemsInCart() {
            if (this.cartItems.length) {
                this.cartItems.forEach((obj) => {
                    this.itemIdsInCart.push(obj.id)
                })
            }
        },
        async getRecommendedBooks() {
            const bookUrl = `books?filter=recommended`
            this.recommendedBooks = await this.$axios.$get(bookUrl)
        },
        expandDescription() {
            this.isBookDescriptionExpanded = !this.isBookDescriptionExpanded
            document.querySelector('.book-description').classList.toggle('max-height-200')
        },
        increaseQuantity() {
            this.quantity = 1 + this.quantity
        },
        decreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity = this.quantity - 1
            }
        }
    }
}
</script>

<style lang='scss'>
.cart-quantity-btn {
    display: flex;
    margin: 10px 0;

    button {
        background-color: #ffbf3f;
        border: 1px solid #b78011;
        border-radius: 4px;
    }

    button:disabled,
    button[disabled] {
        border: 1px solid #999999;
        background-color: #cccccc;
        color: #666666;
    }

    .quantity-value {
        padding: 0 6px;
    }
}
</style>
