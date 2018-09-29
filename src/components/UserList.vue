<template>
    <div class="user-list">
        <UserListItem 
            v-for="user in users"
            :key="user.id"
            :user="user"
            :current-user-id="currentUserId"
        />
    </div>
</template>

<script>
import UserListItem  from './UserListItem';

export default {
    components: { UserListItem },
    props: {
        users: Array,
        currentUserId: String
    }
};
</script>

<style lang="scss">
.user-list {
    height: 400px;
    overflow-y: auto;
}
</style>