<template>
<div class="row justify-content-center">
    <div class="col-md-4">
        <div class="card">
            <div class="card-header">Авторизация</div>
            <div class="card-body">
                <p class="row">Нет аккаунта? <router-link class="ml-1" :to="{name: 'Register'}">Зарегистрируйтесь</router-link></p>
                <form @submit.prevent="login">
                    <div class="form-group row">
                        <label for="email">Email:</label>
                        <input class="form-control" type="email" name="email" id="email" v-model="email" required>
                    </div>
                    <div class="form-group row">
                        <label for="password">Пароль:</label>
                        <input class="form-control" type="password" minlength="8" name="password" id="password" v-model="password" required>
                    </div>
                    <p class="text-danger row mb-2" v-if="errorStatus == 401">Неправильные данные</p>
                    <div class="form-group row">
                        <input type="submit" value="Войти">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            authError: false,
            email: '',
            password: '',
            errorStatus: null,
        }
    },
    methods: {
        login() {
            this.$store.dispatch('retrieveToken', {
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    this.$router.push({ name: 'ProductList'})
                })
                .catch(error => {
                    this.errorStatus = error.response.status
                })
        }
    }
}
</script>
