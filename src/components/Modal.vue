<template>
    <transition name="fade">
        <div v-if="isVisible" class="modal-mask">
            <div class="modal">
                <i class="fas fa-times close-button" @click="$emit('closeModal')"></i>
                <!-- render coffee message if idList.length === 1 otherwise lunch message and pass optional prop for error -->
                <div v-if="error" class="error">{{ error }}</div>
                <div v-if="names && names.length === 1">Get coffee with {{ names[0] }}</div>
                <div v-if="names && names.length > 1" class="names-container">
                    <div class="name" v-for="name in names" :key="name">{{ name }}</div>
                </div>
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
        },
        error: String,
        users: {
            type: Array,
            required: true
        }
    },
    created: function () {
        window.addEventListener('click', (e) => {
            if (e.target.className === "modal-mask") {
                this.$emit('closeModal');
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 27) {
                if (this.isVisible) {
                    this.$emit('closeModal');
                }
            }
        });
    },
    computed: {
        names: function () {
            return this.users.reduce((acc, curr) => {
                if (this.idList.includes(curr.id)) {
                    return acc.concat(curr.name);
                } else return acc;
            }, []);
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
    margin-bottom: 20px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>