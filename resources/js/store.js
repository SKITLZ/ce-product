export default {
    state: {
        token: localStorage.getItem('access_token') || null,
    },
    mutations: {
        retrieveToken(state, token) {
            state.token = token
        },
        destroyToken(state) {
            state.token = null
        }
    },
    actions: {
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
        }
    },
    getters: {
        loggedIn(state) {
            return state.token !== null
        }
    },
}