<template>
<div class="row justify-content-center">
    <div class="col-md-4">
        <div class="card">
            <div class="card-header">Регистрация</div>
            <div class="card-body">
                <form @submit.prevent="register">
                    <div class="form-group row">
                        <label for="name">Имя:</label>
                        <input class="form-control" type="text" name="name" id="name" v-model="name" required>
                        <template v-if="errors.name">
                            <p class="text-danger mb-0" v-for="(error, index) in errors.name" :key="index">{{error}}</p>
                        </template>
                    </div>
                    <div class="form-group row">
                        <label for="email">Email:</label>
                        <input class="form-control" type="email" name="email" id="email" v-model="email" required>
                        <template v-if="errors.email">
                            <p class="text-danger mb-0" v-for="(error, index) in errors.email" :key="index">{{error}}</p>
                        </template>
                    </div>
                    <div class="form-group row">
                        <label for="password">Пароль:</label>
                        <input class="form-control" type="password" minlength="8" name="password" id="password" v-model="password" required>
                        <template v-if="errors.password">
                            <p class="text-danger mb-0" v-for="(error, index) in errors.password" :key="index">{{error}}</p>
                        </template>
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
            errors: {},
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
                .catch(error => {
                    this.errors = error.response.data.errors
                })
        }
    }
}
</script>
