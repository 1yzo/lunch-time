<template>
    <div id="input-container">
        <input
            type="text"
            :value="value" 
            placeholder="Enter name..."
            @input="$emit('input', $event.target.value)"
            @keyup.enter="$emit('submit')"
        />
    </div>
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
        width: 100%;
        font-size: 30px;
        padding: 10px;
    }
</style>


