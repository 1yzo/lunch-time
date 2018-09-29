import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import UserListItem from '../../src/components/UserListItem';
import { coffeeUsers } from '../fixtures/users';

describe('UserListItem', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(UserListItem, {
            propsData: {
                user: coffeeUsers[0]
            }
        });
        expect(wrapper.element).toMatchSnapshot();
    });
});