<template>
<div>
    <h2>Product list</h2>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Weight</th>
                    <th scope="col">Calories</th>
                    <th scope="col">Protein</th>
                    <th scope="col">Fat</th>
                    <th scope="col">Carbs</th>
                </tr>
            </thead>
            <tbody>
                <product v-for="product in getProducts" :key="product.id" :product="product" />
            </tbody>
        </table>
</div>
</template>

<script>
import Product from './Product.vue'

export default {
    data() {
        return {

        }
    },
    components: {
        Product,
    },
    computed: {
        getProducts() {
            return this.$store.getters.getProducts
        }
    },
    mounted() {
        this.$store.dispatch('getProducts')
    }
}
</script>
