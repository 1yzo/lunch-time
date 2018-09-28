<template>
    <div class="user-list">
        <UserListItem 
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
.user-list {
    background: #eee;
    height: 400px;
    overflow-y: auto;
}
</style>