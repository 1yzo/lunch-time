<template>
    <div>
        <div class="user-list-item">
            <div>{{ user.name }}</div>
            <div style="display: flex">
                <div v-if="hadCoffee">☕</div>
                <div v-if="hadLunch">🍔</div>
                <div v-if="isCurrentUser" class="info">You</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object,
        currentUserId: String
    },
    computed: {
        hadCoffee: function () {
            return this.user.coffees.includes(this.currentUserId);
        },
        hadLunch: function () {
            return this.user.lunches.includes(this.currentUserId);
        },
        isCurrentUser: function () {
            return this.user.id === this.currentUserId;
        }
    }
}
</script>

<style lang="scss">
@import '../styles//variables';

.user-list-item {
    padding: 20px;
    border-bottom: 1px solid #eee;
    font-size: 18px;
    display: flex;
    justify-content: space-between
}

.info {
    color: $blue;
}
</style>

