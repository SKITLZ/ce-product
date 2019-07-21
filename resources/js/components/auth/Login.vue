<template>
<div class="row justify-content-center">
    <div class="col-md-4">
        <div class="card">
            <div class="card-header">Авторизация</div>
            <div class="card-body">
                <form @submit.prevent="login">
                    <div class="form-group row">
                        <label for="email">Email:</label>
                        <input class="form-control" type="email" name="email" id="email" v-model="email">
                    </div>
                    <div class="form-group row">
                        <label for="password">Пароль:</label>
                        <input class="form-control" type="password" name="password" id="password" v-model="password">
                    </div>
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
        }
    },
    methods: {
        login() {
            this.$store.dispatch('retrieveToken', {
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    this.$router.push({ name: 'Home'})
                })
        }
    }
}
</script>
