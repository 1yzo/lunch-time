<template>
    <transition name="fade">
        <div v-if="isVisible" class="modal-mask" @click="$emit('closeModal')">
            <div class="modal">
                <i class="fas fa-times close-button" @click="$emit('closeModal')"></i>
                <!-- render coffee message if idList.length === 1 otherwise lunch message and pass optional prop for error -->
                <div v-if="error" class="error">{{ error }}</div>
                <div v-if="names && names.length === 1" class="title names-container">
                    <div>Get coffee with</div>
                    <div class="name">{{ names[0] }}</div>
                </div>
                <div v-if="names && names.length > 1">
                    <div class="title">Today's lunch group</div>
                    <div class="names-container">
                        <div class="name">{{ currentUserName }}</div>
                        <div class="name" v-for="name in names" :key="name">{{ name }}</div>
                    </div>
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
        },
        currentUserName: String
    },
    created: function () {
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
@import '../styles/variables';

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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-shadow: 0 1px 10px  rgba(0, 0, 0, 0.199);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    overflow: hidden;
}

.title {
    font-size: 25px;
    margin-bottom: 20px;
    word-break: break-all;
}

.names-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.name {
    color: $blue;
    margin-bottom: 3px;
}

.close-button {
    position: absolute;
    cursor: pointer;
    top: 15px;
    left: 15px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>