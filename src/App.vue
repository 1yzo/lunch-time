<template>
    <div>
        <div class="header">
            <div class="container">
                <h1>📋 Lunch Time</h1>
            </div>
        </div>
        <div class="container">
            <UserInput v-if="!currentUserName" v-model="newUserText" @submit="addUser"/>
            <div v-else class="content">
                <UserList :users="users" :current-user-id="currentUser && currentUser.id"/>
                <div class="options-container">
                    <button id="coffee" @click="getCoffee">Get Coffee</button>
                    <button id="lunch" @click="getLunch">Get Lunch</button>
                </div>
            </div>
        </div>
        <Modal
            :is-visible="showModal"
            :id-list="selectedIds"
            @closeModal="closeModal()"
            :error="error"
            :users="users"
            :current-user-name="currentUser && currentUser.name"
        />
    </div>
</template>

<script>
import uuid from 'uuid/v4';
import UserInput from './components/UserInput';
import UserList from './components/UserList';
import Modal from './components/Modal';

export default {
    data: function() {
        return {
            users: [],
            newUserText: '',
            currentUserName: '',
            selectedIds: [],
            showModal: false,
            error: ''
        };
    },
    created: function () {
        // Load existing users
        const existingUsers = JSON.parse(localStorage.getItem('users'));
        if (existingUsers) {
            this.users = existingUsers;
        }
    },
    computed: {
        currentUser: function () {
            return this.users.find(({ name }) => name === this.currentUserName);
        }
    },
    methods: {
        addUser () {
            if (this.newUserText.trim()) {
                // Add user to list and persist if not already present
                if (!this.users.map((user) => user.name).includes(this.newUserText)) {
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
           const partner = this.users.find((user) => user.id !== this.currentUser.id && !this.currentUser.coffees.includes(user.id));
           if (partner) {
               // Add eachother's ids to respective coffees array then persist
               this.users = this.users.map((user) => {
                   if (user.id === this.currentUser.id) {
                       return {
                           ...user,
                           coffees: [...user.coffees, partner.id]
                       };
                   } else if (user.id === partner.id) {
                       return {
                           ...user,
                           coffees: [...user.coffees, this.currentUser.id]
                       };
                   } else {
                       return user;
                   }
               });
               localStorage.setItem('users', JSON.stringify(this.users));
               this.selectedIds = [partner.id];
               this.showModal = true;
           } else {
               this.error = "You've already caffeinated with everyone! Try lunch instead.";
               this.showModal = true;
           }
        },
        getLunch () {
            let availableUsers = this.users.filter((user) => user.id !== this.currentUser.id);
            const group = []; 
            // Attempt to fill group with previously unmatched user ids
            for (let user of availableUsers) {
                if (!user.lunches.includes(this.currentUser.id)) {
                    group.push(user.id);
                    availableUsers = availableUsers.filter((curr) => curr.id !== user.id);
                }
                if (group.length === 4) {
                    // Update users' lunches array then persist
                    this.updateLunches(group);
                    localStorage.setItem('users', JSON.stringify(this.users));
                    this.selectedIds = group;
                    this.showModal = true;
                    return;
                }
            }
            // Fill remaining spots with random user ids
            if (group.length + availableUsers.length <= 4) {
                for (let user of availableUsers) {
                    group.push(user.id);
                }
            } else {
                while (group.length < 4) {
                    const randomIndex = Math.floor(Math.random() * ((availableUsers.length - 1) - 0 + 1) + 0);
                    const randomUserId = availableUsers[randomIndex].id;
                    if (!group.includes(randomUserId)) {
                        group.push(randomUserId);
                    }
                }
            }
            if (group.length < 2) {
                this.error = 'Not enough people to go out to lunch with';
                this.showModal = true;
            } else {
                // Update users' lunches array then persist
                this.updateLunches(group);
                localStorage.setItem('users', JSON.stringify(this.users));
                this.selectedIds = group;
                this.showModal = true;
            }
        },
        updateLunches (group) {
            this.users = this.users.map((user) => {
                if (user.id === this.currentUser.id) {
                    const idsToAdd = group.filter((id) => !user.lunches.includes(id));
                    return {
                        ...user,
                        lunches:[...user.lunches, ...group.filter((id) => !user.lunches.includes(id))]
                    };
                } else if (group.includes(user.id)) {
                    return {
                        ...user,
                        lunches: [...user.lunches, ...group.filter((curr) => curr !== user.id), this.currentUser.id],
                        lunches: [
                            ...user.lunches,
                            ...group.filter((id) => id !== user.id && !user.lunches.includes(id)),
                            ...(user.lunches.includes(this.currentUser.id) ? [] : [this.currentUser.id])
                        ]
                    };
                } else {
                    return user;
                }
            });
        },
        closeModal () {
            this.showModal = false;
            this.error = '';
            this.selectedIds = [];
        }
    },
    components: {
        UserInput,
        UserList,
        Modal
    }
};
</script>

<style lang="scss">
@import './base';
@import './variables';

h1 {
    margin: 0 0 10px 0;
}

.header {
    font-size: 20px;
    padding: 30px 0 10px 0;
    margin-bottom: 70px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.199);
}

.container {
    max-width: 500px;
    margin: 0 auto;
    padding: 0 20px;
}

.content {
    box-shadow: 0 1px 10px  rgba(0, 0, 0, 0.199);
    border-radius: 10px;
}

.options-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    width: 100%;
    button {
        width: 50%;
        font-size: 20px;
        padding: 10px;
        border: none;
        background: $blue;
        color: rgb(243, 244, 247);
        font-size: 25px;
        box-shadow: 0px 1px 1px $blue;
    }
    #coffee {
        border-bottom-left-radius: 10px;
    }
    #lunch {
        border-bottom-right-radius: 10px;
    }
}
</style>