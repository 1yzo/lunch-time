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
    border-bottom: 2px solid black;
}
</style>

