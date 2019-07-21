<template>
<div>
    <div class="d-flex align-items-center justify-content-between mb-3">
        <h2 class="mb-0">Список продуктов</h2>
        <router-link :to="{name: 'CreateProduct'}">Добавить продукт</router-link>
    </div>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col"
                    class="filter-toggle"
                    :class="{'desc': prop == 'price' && desc == true, 'asc': prop == 'price' && desc == false}"
                    @click="toggleFilter('price')">Price</th>
                <th scope="col"
                    class="filter-toggle"
                    :class="{'desc': prop == 'weight' && desc == true, 'asc': prop == 'weight' && desc == false}"
                    @click="toggleFilter('weight')"
                >Weight</th>
                <th scope="col"
                    class="filter-toggle"
                    :class="{'desc': prop == 'calories' && desc == true, 'asc': prop == 'calories' && desc == false}"
                    @click="toggleFilter('calories')"
                >Calories</th>
                <th scope="col"
                    class="filter-toggle"
                    :class="{'desc': prop == 'protein' && desc == true, 'asc': prop == 'protein' && desc == false}"
                    @click="toggleFilter('protein')"
                >Protein</th>
                <th scope="col"
                    class="filter-toggle"
                    :class="{'desc': prop == 'fat' && desc == true, 'asc': prop == 'fat' && desc == false}"
                    @click="toggleFilter('fat')"
                >Fat</th>
                <th scope="col"
                    class="filter-toggle"
                    :class="{'desc': prop == 'carbohydrate' && desc == true, 'asc': prop == 'carbohydrate' && desc == false}"
                    @click="toggleFilter('carbohydrate')"
                >Carbs</th>
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
            desc: true,
            prop: 'id',
        }
    },
    components: {
        Product,
    },
    methods: {
        toggleFilter(prop) {
            if (this.prop == prop) {
                this.desc = !this.desc
            } else {
                this.desc = true
                this.prop = prop
            }
        },
        filterProducts(products) {
            if (this.prop == 'price') {
                products.sort((a, b) => {
                    if (this.desc == true)
                        return b.price - a.price;
                    return a.price - b.price;
                });
                return products;
            }

            if (this.prop !== 'id') {
                products.sort((a, b) => {
                    const aPortions = a.weight / 100;
                    const bPortions = b.weight / 100;
                    const aPer100 = aPortions / a.price;
                    const bPer100 = bPortions / b.price;
                    const aEff = aPer100 * a[this.prop];
                    const bEff = bPer100 * b[this.prop];
                    if (this.desc == true)
                        return bEff - aEff;
                    return aEff - bEff;
                });
            }
            
            return products;
        },
    },
    computed: {
        getProducts() {
            return this.filterProducts(this.$store.getters.getProducts)
        }
    },
    mounted() {
        this.$store.dispatch('getProducts')
    }
}
</script>

<style lang="scss">
.filter-toggle {
    position: relative;
    cursor: pointer;
    &.desc,
    &.asc {
        &::after {
            content: "";
            position: absolute;
            top: 50%;
            width: 5px;
            height: 5px;
            border-bottom: 1px solid #000;
            border-left: 1px solid #000;
        }
    }
    &.desc {
        &::after {
            transform: translate(8px, -50%) rotate(-45deg);
        }
    }
    &.asc {
        &::after {
            top: calc(50% + 2px);
            transform: translate(8px, -50%) rotate(135deg);
        }
    }
}
</style>
