<template>
<div class="home container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card card-default">
                <div class="card-body">
                    <h1 class="home__header">CE Product</h1>
                    <p class="home__sub-header">Выберите самый экономически эффективный продукт питания для Вашей ситуации</p>
                    <p><small>даже если это просто покушать в макдональдсе</small></p>
                    <p><router-link :to="{name: 'ProductList'}">Перейти в список продуктов</router-link></p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'home',
}
</script>

<style lang="scss">
.home {
    &__header {
        margin-bottom: 0;
    }
    &__sub-header {
        margin-bottom: 0;
        font-size: 20px;
        line-height: 30px;
    }
}

.form-control {
    color: #000;
    &:focus {
        color: #000;
    }
    &::placeholder {
        color: #999
    }
}
.table {
    th, td {
        padding: 6px;
        font-size: 13px;
    }
    p {
        margin: 0;
        margin-top: 20px;
    }
    span + p {
        margin-top: 0;
    }
}
</style>
