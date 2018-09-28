<template>
    <input
        type="text"
        :value="value" 
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

<style lang="scss">

</style>


