export default {
    namespaced: true,
    state: () => ({
        book_cart: [],
        loadingCartItems: false
    }),
    getters: {
        cartItems(state) {
            return state.book_cart
        }
    },
    mutations: {
        setCart(state, cart) {
            state.book_cart = cart
        },
        addToCart(state, product) {
            const productIndex = state.book_cart.findIndex(item => item.id === product.id)
            if (productIndex !== -1) {
                state.book_cart[productIndex].quantity++
            } else {
                state.book_cart.push(product)
            }
            localStorage.removeItem('book_cart')
            const thisCart = JSON.stringify(state.book_cart)
            localStorage.setItem('book_cart', thisCart)
        },
        removeProduct(state, product) {
            const productInTheCart = state.book_cart.findIndex(item => item.id === product.id)
            if (productInTheCart !== -1) {
                state.book_cart[productInTheCart].quantity--
                return
            }

            localStorage.removeItem('book_cart')
            const thisCart = JSON.stringify(state.book_cart)
            localStorage.setItem('book_cart', thisCart)
        },
        updateCart(state, cart) {
            state.book_cart = cart

            if (!state.book_cart.length) {
                localStorage.removeItem('book_cart')
            } else {
                const thisCart = JSON.stringify(state.book_cart)
                localStorage.setItem('book_cart', thisCart)
            }
        },
        removeFromCart(state, index) {
            state.book_cart.splice(index, 1)

            // if (!state.cart.length) {
            localStorage.removeItem('book_cart')
            // } else {
            const thisCart = JSON.stringify(state.book_cart)
            localStorage.setItem('book_cart', thisCart)
            // }
        },
        loadingCartItems(state, payload){
            state.loadingCartItems = payload
        },
        clearCart(state, payload){
            state.book_cart = payload
        }
    },
    actions: {
        setBookCart(store, payload) {
            store.commit('setCart', payload)
        },
        clearCart(context) {
            let products = JSON.parse(localStorage.getItem('book_cart'))
            // let products = store.state.book_cart
            localStorage.removeItem('book_cart')
            context.commit('clearCart', [])
            if (this.$auth.loggedIn) {
                products.forEach(product => {
                    this.$axios.$delete(`api/cart/${product.cart_id}`).then((response) => {
                        this.$notifier.showMessage({ content: 'Product deleted from cart.', color: 'success' })
                    }).catch(() => {
                        this.$notifier.showMessage({ content: 'Error deleting product from cart.', color: 'error' })
                    })
                })
            }
        },
        async getDBCart(context) {
            context.commit('loadingCartItems', true)
            let Cart = []
            if (this.$auth.loggedIn) {
                await this.$axios.$get('api/cart').then((response) => {
                    const cartItems = response
                    if (cartItems && cartItems.length) {
                        localStorage.removeItem('book_cart')
                        const newCartItems = []
                        cartItems.forEach(item => {
                            item.book.quantity = item.quantity
                            item.book.cart_id = item.id
                            if (item.book && Object.keys(item.book).length) newCartItems.push(item.book)
                        })
                        Cart = JSON.stringify(newCartItems)
                        localStorage.setItem('book_cart', Cart)
                    }
                })
            }
            Cart = localStorage.getItem('book_cart')
            if (Cart) Cart = JSON.parse(Cart)
            else Cart = []
            context.commit('loadingCartItems', false)
            return context.commit('setCart', Cart)
        },
        async addDBCart(context, productObject) {
            context.commit('addToCart', productObject)
            if (this.$auth.loggedIn) {
                await this.$axios.post('api/cart', {
                    book_id: productObject.id,
                    type: 'book',
                    direction: 'up',
                    quantity: productObject.quantity
                }).catch(() => {
                    this.$notifier.showMessage({ content: 'Error adding product to cart.', color: 'error' })
                })
            }
        },
        async removeItemDBCart(context, productObject) {
            context.commit('removeProduct', productObject)
            if (this.$auth.loggedIn) {
                await this.$axios.$post('api/cart', {
                    book_id: productObject.id,
                    type: 'book',
                    direction: 'down'
                }).catch(() => {
                    this.$notifier.showMessage({ content: 'Error removing product from cart.', color: 'error' })
                })
            }
        },
        async deleteDBCart(context, payload) {
            const index = payload.index
            context.commit('removeFromCart', index)
            if (this.$auth.loggedIn) {
                await this.$axios.$delete(`api/cart/${payload.product.cart_id}`).then((response) => {
                    this.$notifier.showMessage({ content: 'Product deleted from cart.', color: 'success' })
                }).catch(() => {
                    this.$notifier.showMessage({ content: 'Error deleting product from cart.', color: 'error' })
                })
            }
        }
    }
}
