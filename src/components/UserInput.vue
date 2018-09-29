<template>
    <div id="input-container">
        <label for="user-input">What's your name?</label>
        <input
            id="user-input"
            type="text"
            :value="value" 
            autofocus
            @input="$emit('input', $event.target.value)"
            @keyup.enter="$emit('submit')"
        />
    </div>
</template>

<script>
export default {
    props: {
        value: String,
    }
}
</script>

<style lang="scss" scoped>
    label {
        font-size: 30px;
    }
    
    input {
        width: 100%;
        font-size: 30px;
        padding: 10px;
        border: none;
        box-shadow: inset 0 1px 5px  rgba(0, 0, 0, 0.199);
        margin-top: 10px;
        color: rgba(54, 69, 237, 0.637);
    }
</style>


