<template>
<tr>
    <td style="max-width: 180px">{{product.name}}</td>
    <td style="max-width: 240px">{{product.description}}</td>
    <td>{{product.price}}</td>
    <td>{{product.weight}}  ({{calcEff('weight')}} / 1р)</td>
    <td>{{product.calories}} ({{calcEff('calories')}} / 1р)</td>
    <td>{{product.protein}} ({{calcEff('protein')}} / 1р)</td>
    <td>{{product.fat}} ({{calcEff('fat')}} / 1р)</td>
    <td>{{product.carbohydrate}} ({{calcEff('carbohydrate')}} / 1р)</td>
    <td class="text-center px-0">
        <button class="btn btn-sm btn-warning" type="button">Изменить</button>
        <button class="btn btn-sm btn-danger" type="button">Удалить</button>
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
            return Math.floor(eff*100)/100;
        }
    }
}
</script>
