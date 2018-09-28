<template>
    <transition name="fade">
        <div v-if="isVisible" class="modal-mask">
            <div class="modal">
                <i class="fas fa-times close-button" @click="$emit('closeModal')"></i>
                <div v-for="id in idList" :key="id">{{ id }}</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        idList: {
            type: Array,
            required: true
        }
    },
    created: function () {
        window.addEventListener('click', this.checkClick);
    },
    methods: {
        checkClick: function (e) {
            if (e.target.className === "modal-mask") {
                this.$emit('closeModal');
            }
        }
    }
};
</script>

<style lang="scss">
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
}

.modal {
    position: absolute;
    width: 300px;
    height: 300px;
    background: white;
    box-shadow: 0 1px 4px gray;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
}

.close-button {
    cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>