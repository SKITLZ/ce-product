export default {
    state: {
        products: [],
        filter: 'id',
        token: localStorage.getItem('access_token') || null,
    },
    mutations: {
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
    },
    actions: {
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
            return new Promise((resolve, reject) => {   // doing this for login async redirect
                axios.post('/api/login', {
                    username: credentials.email,
                    password: credentials.password,
                })
                    .then(response => {
                        const token = response.data.access_token
    
                        localStorage.setItem('access_token', token)
                        context.commit('retrieveToken', token)
                        resolve(response)   // doing this for login async redirect
                    })
                    .catch(error => {
                        reject(error)       // doing this for login async redirect
                    })
            })
        },
        destroyToken(context) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
            if (context.getters.loggedIn) {
                return new Promise((resolve, reject) => {   // doing this for logout async redirect
                    axios.post('/api/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            context.commit('destroyToken')
                            resolve(response)   // doing this for logout async redirect
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token') // in kase someone's trying to access their own local storage key
                            context.commit('destroyToken')          // in kase someone's trying to access their own local storage key
                            reject(error)       // doing this for logout async redirect
                        })
                })
            }
        },
        getProducts(context) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
            axios.get('/api/products')
                .then(response => {
                    console.log(response.data)
                    context.commit('getProducts', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        createProduct(context, product) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`
            return new Promise((resolve, reject) => {   // doing this for createProduct async function
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
                        context.commit('createProduct', product)
                        resolve(response)   // doing this for createProduct async function
                    })
                    .catch(error => {
                        reject(error)       // doing this for createProduct async function
                    })
            })
        }
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