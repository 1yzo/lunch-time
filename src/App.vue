<template>
    <div>
        <div class="header">
            <h1 class="container">Lunch Time</h1>
        </div>
        <div class="container">
            <UserInput v-model="newUserText" @submit="addUser"/>
            <UserList :users="users" />
        </div>
    </div>
</template>

<script>
import uuid from 'uuid/v4';
import UserInput from './components/UserInput';
import UserList from './components/UserList';

export default {
    data: function() {
        return {
            users: [],
            newUserText: '',
        };
    },
    methods: {
        addUser () {
            this.users = [
                ...this.users,
                { 
                    id: uuid(),
                    name: this.newUserText,
                    coffees: [],
                    lunches: []
                }
            ];
            this.newUserText = '';
        }
    },
    components: {
        UserInput,
        UserList
    }
};
</script>

<style lang="scss">
html, body {
    margin: 0;
    padding: 0;
}

.header {
    background: rgba(33, 104, 196, 0.527);
    margin-bottom: 50px;
}

.container {
    max-width: 500px;
    margin: 0 auto;
}
</style>