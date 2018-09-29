import Vue from 'vue';
import { shallowMount } from '@vue/test-utils'; 
import App from '../../src/App';
import UserInput from '../../src/components/UserInput';
import { coffeeUsers, lunchUsers } from '../fixtures/users';

describe('App', () => {
    describe('No current user', () => {
        it('renders correctly', () => {
            const wrapper = shallowMount(App);
            expect(wrapper.element).toMatchSnapshot();
        });

        it('sets currentUserName on UserInput submit if newUserText exists', () => {
            const wrapper = shallowMount(App);
            const newUserText = 'New User';
            wrapper.setData({ newUserText });
            wrapper.find(UserInput).vm.$emit('submit');
            expect(wrapper.vm.currentUserName).toBe(newUserText);
        });

        it('does not currentUserName on UserInput submit if newUserText is blank', () => {
            const wrapper = shallowMount(App);
            const newUserText = '';
            wrapper.setData({ newUserText });
            wrapper.find(UserInput).vm.$emit('submit');
            expect(wrapper.vm.currentUserName).toBe('');
        });

        it('adds a new user on successful UserInput submit', () => {
            const wrapper = shallowMount(App);
            wrapper.setData({ newUserText: 'New User' });
            wrapper.find(UserInput).vm.$emit('submit');
            expect(wrapper.vm.users[0]).toEqual({
                id: expect.any(String),
                name: 'New User',
                coffees: [],
                lunches: []
            });
        });
    });

    describe('Current user exists', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallowMount(App);
            wrapper.setData({
                currentUserName: 'Name'
            });
        });

        it('renders correctly', () => {
            expect(wrapper.element).toMatchSnapshot();
        });

        it("calls getCoffee on 'Get Coffee' button click", () => {
            const getCoffee = jest.fn();
            wrapper.setMethods({ getCoffee });
            wrapper.findAll('button').at(0).trigger('click');
            expect(getCoffee).toHaveBeenCalled();
        });

        it("calls getLunch on 'Get Lunch' button click", () => {
            const getLunch = jest.fn();
            wrapper.setMethods({ getLunch });
            wrapper.findAll('button').at(1).trigger('click');
            expect(getLunch).toHaveBeenCalled();
        });
    });

    describe('Coffee', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallowMount(App);
            wrapper.setData({
                users: coffeeUsers,
                currentUserName: 'first'
            });
        });

        it('sets selectedIds to first user on the list who has not had coffee with current user', () => {
            wrapper.findAll('button').at(0).trigger('click');
            expect(wrapper.vm.selectedIds).toEqual([coffeeUsers[1].id]);
        });

        it('sets error if user already had coffee with everyone', () => {
            wrapper.setData({ currentUserName: 'coffee master' });
            wrapper.findAll('button').at(0).trigger('click');
            expect(wrapper.vm.error).toBeTruthy();
            expect(wrapper.vm.selectedIds).toEqual([]);
        });

        it("correctly updates users' coffees arrays", () => {
            wrapper.findAll('button').at(0).trigger('click');
            expect(wrapper.vm.users.slice(0, 2)).toEqual([{
                    ...coffeeUsers[0],
                    coffees: expect.arrayContaining(['2'])
                }, {
                    ...coffeeUsers[1],
                    coffees: expect.arrayContaining(['1'])
                }
            ]);     
        });
    });

    describe('Lunch', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallowMount(App);
            wrapper.setData({
                users: lunchUsers,
                currentUserName: 'first'
            });
        });

        it('sets error if less than 3 users are in the list', () => {
            wrapper.setData({ users: lunchUsers.slice(0, 2) });
            wrapper.findAll('button').at(1).trigger('click');
            expect(wrapper.vm.error).toBeTruthy();
            expect(wrapper.vm.selectedIds).toEqual([]);
        });

        it('prioritizes users who have never had lunch together', () => {
            wrapper.findAll('button').at(1).trigger('click');
            wrapper.vm.users.push({
                id: '99',
                name: 'new user',
                coffees: [],
                lunches: []
            }, {
                id: '100',
                name: 'new user 2',
                coffees: [],
                lunches: []
            });
            wrapper.findAll('button').at(1).trigger('click');
            expect(wrapper.vm.selectedIds).toContain('99', '100');
            expect(wrapper.vm.selectedIds.length).toBe(4);            
        });

        it("correctly updates users' lunches arrays", () => {
            wrapper.setData({ users: lunchUsers.slice(0, 3) });
            wrapper.findAll('button').at(1).trigger('click');
            expect(wrapper.vm.users[0].lunches).toContain('2', '3');
            expect(wrapper.vm.users[1].lunches).toContain('1', '3');
            expect(wrapper.vm.users[2].lunches).toContain('1', '2');
        });

        it("never selects more than 4 ids", () => {
            wrapper.findAll('button').at(1).trigger('click');
            expect(wrapper.vm.selectedIds.length).toBe(4);
        });
    });
}); 