<template>
    <input
        type="text"
        :value="value" 
        placeholder="Join the list..."
        @input="$emit('input', $event.target.value)"
        @keyup.enter="$emit('submit')"
    />
</template>

<script>
export default {
    props: {
        value: String
    }
}
</script>

<style lang="scss" scoped>
    input {
        font-size: 30px;
        width: 100%;
        padding: 10px;
    }
</style>


