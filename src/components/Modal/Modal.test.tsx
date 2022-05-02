import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Modal } from './Modal';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Modal', () => {
    let wrapper: ReactWrapper;
    const body = 'This is the modal body';
    const header = 'This is the header';

    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    beforeEach(() => {
        wrapper = mount(<Modal visible={false} />);
    });

    test('modal not visible', () => {
        expect(wrapper.hasClass('visible')).not.toEqual(true);
    });

    test('modal visible', () => {
        wrapper.setProps({
            visible: true,
        });
        expect(wrapper.hasClass('visible')).toBe(false);
    });

    test('modal content', () => {
        wrapper.setProps({
            visible: true,
            header,
            body,
        });
        expect(wrapper.find('.body').text()).toBe(body);
        expect(wrapper.find('.header').text()).toBe(header);
    });

    test('modal actions', () => {
        const onClose = jest.fn();
        wrapper.setProps({
            visible: true,
            header,
            body,
            onClose,
        });
        wrapper.find('.buttonNeutral').at(0).simulate('click');
        wrapper.find('.dialogBackdrop').at(0).simulate('click');

        expect(onClose).toHaveBeenCalledTimes(2);

        wrapper.setProps({
            maskClosable: false,
        });

        wrapper.find('.dialogBackdrop').at(0).simulate('click');
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});
