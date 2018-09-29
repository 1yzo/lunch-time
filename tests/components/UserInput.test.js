import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import UserInput from '../../src/components/UserInput';

describe('UserInput', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(UserInput);
        expect(wrapper.element).toMatchSnapshot();
    });
});