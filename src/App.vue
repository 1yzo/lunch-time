<template>
    <div>
        <div class="header">
            <h1 class="container">Lunch Time</h1>
        </div>
        <div class="container">
            <UserInput v-if="!currentUserName" v-model="newUserText" @submit="addUser"/>
            <div v-else>
                <UserList :users="users" />
                <div class="options-container">
                    <button @click="getCoffee">Get Coffee</button>
                    <button @click="getLunch">Get Lunch</button>
                </div>
            </div>
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
            currentUserName: ''
        };
    },
    created: function () {
        // Load existing users
        const existingUsers = JSON.parse(localStorage.getItem('users'));
        if (existingUsers) {
            this.users = existingUsers;
        }
    },
    methods: {
        addUser () {
            if (this.newUserText.trim()) {
                // Add user to list and persist if not already present
                if (!this.users.map((user) => user.name.toLowerCase()).includes(this.newUserText.toLowerCase())) {
                    const newUser = { 
                        id: uuid(),
                        name: this.newUserText,
                        coffees: [],
                        lunches: []
                    }
                    localStorage.setItem('users', JSON.stringify([...this.users, newUser]));
                    this.users = [
                        ...this.users,
                        newUser
                    ];
                }
                
                this.currentUserName = this.newUserText; 
                this.newUserText = '';
            }
        },
        getCoffee () {
           
        },
        getLunch () {
            console.log('Get lunch');
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

* {
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;

}

.header {
    font-size: 20px;
    background: rgba(33, 104, 196, 0.527);
    margin-bottom: 50px;
    padding: 30px 0 10px 0;
}

.container {
    max-width: 500px;
    margin: 0 auto;
}

.options-container {
    display: flex;
    button {
        width: 50%;
        font-size: 20px;
        padding: 10px;
    }
}
</style>