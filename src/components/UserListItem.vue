<template>
    <div>
        <div class="user-list-item">{{ name }}</div>
    </div>
</template>

<script>
export default {
    props: {
        name: String
    }
}
</script>

<style lang="scss">
.user-list-item {
    padding: 20px;
    border-bottom: 1px solid #eee;
    font-size: 18px;
}
</style>

