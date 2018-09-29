import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import UserList from '../../src/components/UserList';

describe('UserList', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(UserList);
        expect(wrapper.element).toMatchSnapshot();
    })
});