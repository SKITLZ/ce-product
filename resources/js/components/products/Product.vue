<template>
<tr>
    <td>{{product.name}}</td>
    <td>{{product.description}}</td>
    <td>{{product.price}}</td>
    <td>{{product.weight}}</td>
    <td>{{product.calories}}</td>
    <td>{{product.protein}}</td>
    <td>{{product.fat}}</td>
    <td>{{product.carbohydrates}}</td>
</tr>
</template>

<script>
export default {
    props: ['product']
}
</script>
