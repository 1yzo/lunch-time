import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import UserListItem from '../../src/components/UserListItem';

describe('UserListItem', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(UserListItem);
        expect(wrapper.element).toMatchSnapshot();
    });
});