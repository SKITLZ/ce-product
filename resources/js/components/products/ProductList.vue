<template>
<div>
    <div class="d-flex align-items-center justify-content-between mb-2">
        <h2 class="mb-0">Список продуктов</h2>
        <router-link :to="{name: 'ProductForm'}">Добавить продукт</router-link>
    </div>
    <template v-if="getProducts.length">
        <p class="mb-3">Кликните на заголовок нужного Вам поля для сортировки</p>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Описание</th>
                    <th scope="col"
                        class="filter-toggle"
                        :class="{'desc': prop == 'price' && desc == true, 'asc': prop == 'price' && desc == false}"
                        @click="toggleFilter('price')">Цена</th>
                    <th scope="col"
                        class="filter-toggle"
                        :class="{'desc': prop == 'weight' && desc == true, 'asc': prop == 'weight' && desc == false}"
                        @click="toggleFilter('weight')"
                    >Вес, г.</th>
                    <th scope="col"
                        class="filter-toggle"
                        :class="{'desc': prop == 'calories' && desc == true, 'asc': prop == 'calories' && desc == false}"
                        @click="toggleFilter('calories')"
                    >Калории</th>
                    <th scope="col"
                        class="filter-toggle"
                        :class="{'desc': prop == 'protein' && desc == true, 'asc': prop == 'protein' && desc == false}"
                        @click="toggleFilter('protein')"
                    >Белки</th>
                    <th scope="col"
                        class="filter-toggle"
                        :class="{'desc': prop == 'fat' && desc == true, 'asc': prop == 'fat' && desc == false}"
                        @click="toggleFilter('fat')"
                    >Жиры</th>
                    <th scope="col"
                        class="filter-toggle"
                        :class="{'desc': prop == 'carbohydrate' && desc == true, 'asc': prop == 'carbohydrate' && desc == false}"
                        @click="toggleFilter('carbohydrate')"
                    >Углеводы</th>
                </tr>
            </thead>
            <tbody>
                <product v-for="product in getProducts" :key="product.id" :product="product" />
            </tbody>
        </table>
    </template>
    <template v-else>
        <p class="mt-3">Вы ещё не добавили ни один продукт</p>
        <p>Пожалуйста перейдите по <router-link :to="{name: 'ProductForm'}">ссылке</router-link> чтобы <router-link :to="{name: 'ProductForm'}">добавить продукт</router-link></p>
    </template>
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
