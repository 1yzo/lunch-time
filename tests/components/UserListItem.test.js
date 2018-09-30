import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import UserListItem from '../../src/components/UserListItem';
import { coffeeUsers, lunchUsers } from '../fixtures/users';

const createWrapper = propsData => shallowMount(UserListItem, { propsData });

describe('UserListItem', () => {
    it('renders correctly', () => {
        const wrapper = createWrapper({ user: coffeeUsers[0] });
        expect(wrapper.element).toMatchSnapshot();
    });

    it('correctly computes isCurrentUser as true', () => {
        const wrapper = createWrapper({ user: coffeeUsers[0], currentUserId: coffeeUsers[0].id });
        expect(wrapper.vm.isCurrentUser).toBeTruthy();
    });

    it('correctly computes isCurrentUser as false', () => {
        const wrapper = createWrapper({ user: coffeeUsers[0], currentUserId: coffeeUsers[1].id });
        expect(wrapper.vm.isCurrentUser).toBeFalsy();
    });
    
    it('correctly computes hadCoffee as true', () => {
        const wrapper = createWrapper({ user: coffeeUsers[0], currentUserId: coffeeUsers[5].id });
        expect(wrapper.vm.hadCoffee).toBeTruthy();
    });

    it('correctly computes hadCoffee as false', () => {
        const wrapper = createWrapper({ user: coffeeUsers[0], currentUserId: coffeeUsers[1].id });
        expect(wrapper.vm.hadCoffee).toBeFalsy();
    });

    it('correctly computes hadLunch as true', () => {
        const wrapper = createWrapper({ user: lunchUsers[7], currentUserId: lunchUsers[6].id });
        expect(wrapper.vm.hadLunch).toBeTruthy();
    })

    it('correctly computes hadLunch as false', () => {
        const wrapper = createWrapper({ user: coffeeUsers[0], currentUserId: coffeeUsers[3].id });
        expect(wrapper.vm.hadLunch).toBeFalsy();
    })
});