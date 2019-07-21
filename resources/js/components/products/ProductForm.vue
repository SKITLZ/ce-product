<template>
<div>
    <h2 v-if="edit == false">Добавить продукт</h2>
    <h2 v-else>Редактировать продукт</h2>
    <form @submit.prevent="submit">
        <div class="form-row">
            <form-field class="col-md-4"
                        name="name"
                        label="Название"
                        placeholder="Куриная грудка"
                        required="1"
                        v-model="product.name" :errors="errors.name" />

            <form-field class="col-md-8"
                        name="description"
                        label="Описание"
                        placeholder="Хороший белок"
                        v-model="product.description" :errors="errors.description" />
        </div>
        <div class="form-row">
            <form-field class="col-md-4"
                        name="price"
                        label="Цена"
                        type="number"
                        :step="0.01" :min="0" :max="99999"
                        placeholder="270"
                        required="1"
                        v-model="product.price" :errors="errors.price" />

            <form-field class="col-md-4"
                        name="weight"
                        label="Вес, г."
                        type="number"
                        :step="0.01" :min="0" :max="999999"
                        placeholder="1000"
                        required="1"
                        v-model="product.weight" :errors="errors.weight" />
                        
            <form-field class="col-md-4"
                        name="calories"
                        label="Калорийность на 100г"
                        type="number"
                        :min="0"
                        placeholder="165"
                        v-model="product.calories" :errors="errors.calories" />
        </div>
        <div class="form-row">
            <form-field class="col-md-4"
                        name="protein"
                        label="Белки на 100г"
                        type="number"
                        :step="0.1" :min="0" :max="100"
                        placeholder="31"
                        v-model="product.protein" :errors="errors.protein" />

            <form-field class="col-md-4"
                        name="fat"
                        label="Жиры на 100г"
                        type="number"
                        :step="0.1" :min="0" :max="100"
                        placeholder="3.6"
                        v-model="product.fat" :errors="errors.fat" />
                        
            <form-field class="col-md-4"
                        name="carbohydrate"
                        label="Углеводы на 100г"
                        type="number"
                        :step="0.1" :min="0" :max="100"
                        placeholder="0"
                        v-model="product.carbohydrate" :errors="errors.carbohydrate" />
        </div>
        <p><span class="text-danger">*</span> - поля, обязательные для заполнения</p>
        <button type="submit" class="btn btn-primary" v-if="edit == false">Добавить</button>
        <button type="submit" class="btn btn-primary" v-else>Сохранить</button>
    </form>
</div>
</template>

<script>
import FormField from './FormField.vue'

export default {
    data() {
        return {
            product: {
                name: '',
                description: '',
                price: null,
                weight: null,
                calories: null,
                protein: null,
                fat: null,
                carbohydrate: null,
            },
            errors: {},
            edit: false,
        }
    },
    components: {
        FormField,
    },
    methods: {
        submit() {
            if (this.edit == true)
                this.editProduct();
            else
                this.createProduct();
        },
        createProduct() {
            this.$store.dispatch('createProduct', this.product)
                .then(response => {
                    this.$router.push({ name: 'ProductList'})
                })
                .catch(error => {
                    this.errors = error.response.data.errors
                })
        },
        editProduct() {
            this.$store.dispatch('updateProduct', this.product)
                .then(response => {
                    this.$router.push({ name: 'ProductList'})
                })
                .catch(error => {
                    this.errors = error.response.data.errors
                })
        },
        isEdit() {
            if (this.$route.params.product) {
                this.edit = true;
                this.product = this.$route.params.product;
            }
        }
    },
    mounted() {
        this.isEdit();
    }
}
</script>
