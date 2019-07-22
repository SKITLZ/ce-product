<template>
<div id="main">
    <page-header />
    <div class="content">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import PageHeader from './PageHeader.vue';

export default {
    name: 'main-app',
    components: {
        PageHeader
    },
    methods: {
        throttleRequests() {
            setInterval(() => {
                this.$store.dispatch('throttleRequests', false);
            }, 60*1000);
        },
    },
    mounted() {
        this.throttleRequests();
    }
}
</script>