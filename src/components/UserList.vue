<template>
    <div class="user-card-container">
        <UserListItem 
            class="user-card"
            v-for="user in users"
            :key="user.id"
            v-bind="user"
        />
    </div>
</template>

<script>
import UserListItem  from './UserListItem';

export default {
    components: { UserListItem },
    props: {
        users: Array
    }
};
</script>

<style lang="scss">
.user-card-container {
    background: #eee;
    height: 500px;
}
</style>