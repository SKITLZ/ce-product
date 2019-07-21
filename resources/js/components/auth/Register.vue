<template>
<div class="row justify-content-center">
    <div class="col-md-4">
        <div class="card">
            <div class="card-header">Регистрация</div>
            <div class="card-body">
                <form @submit.prevent="register">
                    <div class="form-group row">
                        <label for="name">Имя:</label>
                        <input class="form-control" type="text" name="name" id="name" v-model="name">
                    </div>
                    <div class="form-group row">
                        <label for="email">Email:</label>
                        <input class="form-control" type="email" name="email" id="email" v-model="email">
                    </div>
                    <div class="form-group row">
                        <label for="password">Пароль:</label>
                        <input class="form-control" type="password" name="password" id="password" v-model="password">
                    </div>
                    <div class="form-group row">
                        <input type="submit" value="Зарегистрироваться">
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
            name: '',
            email: '',
            password: '',
        }
    },
    methods: {
        register() {
            this.$store.dispatch('register', {
                name: this.name,
                email: this.email,
                password: this.password,
            })
                .then(response => {
                    this.$router.push({ name: 'Login'})
                })
        }
    }
}
</script>
