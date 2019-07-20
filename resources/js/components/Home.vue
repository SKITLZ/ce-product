<template>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card card-default">
                <div class="card-body">
                    <h1 class="home__header">CE Product</h1>
                    <p class="home__sub-header">choose the most cost-efficient product for your situation</p>
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
        font-size: 20px;
        line-height: 30px;
    }
}
</style>
