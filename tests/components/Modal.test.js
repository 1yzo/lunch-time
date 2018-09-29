import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';
import Modal from '../../src/components/Modal';
import { coffeeUsers } from '../fixtures/users';

const createWrapper = propsData => shallowMount(Modal, { propsData });

describe('Modal', () => {
    it('renders nothing if isVisible prop is false', () => {
        const wrapper = createWrapper({
            isVisible: false,
            users: coffeeUsers,
            idList: []
        });
        expect(wrapper.element).toMatchSnapshot();
    })
    
    it('renders coffee partner if idList contains only 1 id', () => {
        const wrapper = createWrapper({
            isVisible: true,
            idList: [coffeeUsers[0].id],
            users: coffeeUsers
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    it('renders lunch group if idList contains multiple ids', () => {
        const wrapper = createWrapper({
            isVisible: true,
            idList: coffeeUsers.slice(0, 4).map((user) => user.id),
            users: coffeeUsers,
            currentUserName: 'Current User'
        });
        expect(wrapper.element).toMatchSnapshot();
    });

    it('contains error message if error exists', () => {
        const wrapper = createWrapper({
            isVisible: true,
            idList: [],
            users: coffeeUsers,
            error: 'Something went wrong'
        });
        expect(wrapper.contains('.error')).toBeTruthy();
    });

    it('correctly computes names from idList', () => {
        const wrapper = createWrapper({
            isVisible: true,
            idList: coffeeUsers.slice(0, 4).map((user) => user.id),
            users: coffeeUsers
        });
        expect(wrapper.vm.names).toEqual(['first', 'second', 'third', 'fourth']);
    });

    it('emits closeModal on close button click', () => {
        const wrapper = createWrapper({
            isVisible: true,
            idList: coffeeUsers.slice(0, 4).map((user) => user.id),
            users: coffeeUsers
        });
        wrapper.find('.close-button').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('closeModal');
    });

    it('emits closeModal on modal-mask click', () => {
        const wrapper = createWrapper({
            isVisible: true,
            idList: coffeeUsers.slice(0, 4).map((user) => user.id),
            users: coffeeUsers
        });
        wrapper.find('.modal-mask').trigger('click');
        expect(wrapper.emitted()).toHaveProperty('closeModal');
    });
});