<template>
<nav class="page-header navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
        <router-link class="navbar-brand" to="/">CE Product</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav w-100">
                <template v-if="!loggedIn">
                    <li class="link--login">
                        <router-link to="/login" class="nav-link">Login</router-link>
                    </li>
                    <li>
                        <router-link to="/register" class="nav-link">Register</router-link> 
                    </li>
                </template>
                <template v-else>
                    <li>
                        <router-link to="/products" class="nav-link">Products</router-link>
                    </li>
                    <li class="link--logout">
                        <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    name: 'app-header',
    methods: {
        logout() {
            this.$store.dispatch('clearProducts')
            this.$store.dispatch('destroyToken')
                .then(response => {
                    this.$router.push({ name: 'Home' })
                })
        }
    },
    computed: {
        loggedIn() {
            return this.$store.getters.loggedIn;
        }
    }
}
</script>

<style lang="scss">
@media (min-width: 768px) {
    .page-header {
        .link {
            &--login,
            &--logout {
                margin-left: auto;
            }
        }
    }
}

</style>
