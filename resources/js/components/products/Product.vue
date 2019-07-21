<template>
<tr>
    <td style="max-width: 200px">{{product.name}}</td>
    <td style="max-width: 260px">{{product.description}}</td>
    <td>{{product.price}}</td>
    <td>{{product.weight}}</td>
    <td>{{product.calories}}</td>
    <td>{{product.protein}}</td>
    <td>{{product.fat}}</td>
    <td>{{product.carbohydrates}}</td>
    <td class="text-center px-0">
        <button class="btn btn-sm btn-warning" type="button">Изменить</button>
        <button class="btn btn-sm btn-danger" type="button">Удалить</button>
    </td>
</tr>
</template>

<script>
export default {
    props: ['product']
}
</script>
