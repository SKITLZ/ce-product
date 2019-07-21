<template>
<tr>
    <td style="max-width: 180px">{{product.name}}</td>
    <td style="max-width: 240px">{{product.description}}</td>
    <td><span v-if="product.price">{{product.price}}</span></td>
    <td><span v-if="product.weight">{{product.weight}}</span>  <p>({{calcEff('weight')}} / 1р)</p></td>
    <td><span v-if="product.calories">{{product.calories}}</span> <p>({{calcEff('calories')}} / 1р)</p></td>
    <td><span v-if="product.protein">{{product.protein}}</span> <p>({{calcEff('protein')}} / 1р)</p></td>
    <td><span v-if="product.fat">{{product.fat}}</span> <p>({{calcEff('fat')}} / 1р)</p></td>
    <td><span v-if="product.carbohydrate">{{product.carbohydrate}}</span> <p>({{calcEff('carbohydrate')}} / 1р)</p></td>
    <td class="text-center px-0">
        <button class="btn btn-sm btn-warning" type="button" @click="editProduct">Изменить</button>
        <button class="btn btn-sm btn-danger" type="button" @click="deleteProduct">Удалить</button>
    </td>
</tr>
</template>

<script>
export default {
    props: ['product'],
    methods: {
        calcEff(prop) {
            const portions = this.product.weight / 100;
            const per100 = portions / this.product.price;
            const eff = per100 * this.product[prop];
            return Math.round(eff*100)/100;
        },
        editProduct() {
            this.$router.push({ name: 'ProductForm', params: { product: this.product }})
        },
        deleteProduct() {
            this.$store.dispatch('deleteProduct', this.product.id)
        },
    }
}
</script>
