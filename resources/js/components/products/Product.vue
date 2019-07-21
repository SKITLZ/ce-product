<template>
<tr>
    <td style="max-width: 180px">{{product.name}}</td>
    <td style="max-width: 240px">{{product.description}}</td>
    <td>{{product.price}}</td>
    <td>{{product.weight}}  <p>({{calcEff('weight')}} / 1р)</p></td>
    <td>{{product.calories}} <p>({{calcEff('calories')}} / 1р)</p></td>
    <td>{{product.protein}} <p>({{calcEff('protein')}} / 1р)</p></td>
    <td>{{product.fat}} <p>({{calcEff('fat')}} / 1р)</p></td>
    <td>{{product.carbohydrate}} <p>({{calcEff('carbohydrate')}} / 1р)</p></td>
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
