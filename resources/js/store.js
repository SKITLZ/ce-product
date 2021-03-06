export default {
    state: {
        products: [],
        token: localStorage.getItem('access_token') || null,
        productsReceived: false,
    },
    mutations: {
        throttleRequests(state, received) {
            state.productsReceived = received;
        },
        clearProducts(state) {
            state.products = []
        },
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        },
        getProducts(state, products) {
            state.products = products
        },
        createProduct(state, product) {
            state.products.push(product)
        },
        updateProduct(state, product) {
            const index = state.products.findIndex(item => item.id == product.id)
            state.products.splice(index, 1, {
                name: product.name,
                description: product.description,
                price: product.price,
                weight: product.weight,
                calories: product.calories,
                protein: product.protein,
                fat: product.fat,
                carbohydrate: product.carbohydrate,
            })
        },
        deleteProduct(state, id) {
            const index = state.products.findIndex(item => item.id == id)
            state.products.splice(index, 1)
        },
    },
    actions: {
        throttleRequests(context, received) {
            context.commit('throttleRequests', received);
        },
        clearProducts(context) {
            context.commit('clearProducts');
        },
        register(context, data) {
            return new Promise((resolve, reject) => {   // doing this for register async redirect
                axios.post('/api/register', {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                })
                    .then(response => {
                        resolve(response)   // doing this for register async redirect
                    })
                    .catch(error => {
                        reject(error)       // doing this for register async redirect
                    })
            })
        },
        retrieveToken(context, credentials) {
            return new Promise((resolve, reject) => {
                axios.post('/api/login', {
                    username: credentials.email,
                    password: credentials.password,
                })
                    .then(response => {
                        const token = response.data.access_token
    
                        localStorage.setItem('access_token', token)
                        context.commit('retrieveToken', token)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {
                    axios.post('/api/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            context.commit('destroyToken')
                            resolve(response)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token') // in kase someone's trying to access their own local storage key
                            context.commit('destroyToken')          // in kase someone's trying to access their own local storage key
                            reject(error)
                        })
                })
            }
        },
        getProducts(context) {
            if (this.state.productsReceived == true)
                return;

            axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
            axios.get('/api/products')
                .then(response => {
                    context.commit('getProducts', response.data)
                    context.commit('throttleRequests', true);
                })
                .catch(error => {
                    console.log(error)
                })
        },
        createProduct(context, product) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
            return new Promise((resolve, reject) => {
                axios.post('/api/products', {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    weight: product.weight,
                    calories: product.calories,
                    protein: product.protein,
                    fat: product.fat,
                    carbohydrate: product.carbohydrate,
                })
                    .then(response => {
                        context.commit('createProduct', response.data)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        updateProduct(context, product) {
            axios.patch(`/api/products/${product.id}`, {
                name: product.name,
                description: product.description,
                price: product.price,
                weight: product.weight,
                calories: product.calories,
                protein: product.protein,
                fat: product.fat,
                carbohydrate: product.carbohydrate,
            })
            .then(response => {
                context.commit('updateProduct', response.data)
            })
            .catch(error => {
                console.log(error)
            })
        },
        deleteProduct(context, id) {
            axios.delete(`/api/products/${id}`)
                .then(response => {
                    context.commit('deleteProduct', id)
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        },
        getProducts(state) {
            return state.products
        },
    },
}