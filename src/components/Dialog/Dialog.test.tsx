import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import { Dialog } from './Dialog';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Dialog', () => {
    let wrapper: ReactWrapper;
    const body = 'This is the dialog body';
    const header = 'This is the header';

    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    beforeEach(() => {
        wrapper = mount(<Dialog visible={false} />);
    });

    test('dialog not visible', () => {
        expect(wrapper.hasClass('visible')).not.toEqual(true);
    });

    test('dialog visible', () => {
        wrapper.setProps({
            visible: true,
        });
        expect(wrapper.hasClass('visible')).toBe(false);
    });

    test('dialog content', () => {
        wrapper.setProps({
            visible: true,
            header,
            body,
        });
        expect(wrapper.find('.body').text()).toBe(body);
        expect(wrapper.find('.header').text()).toBe(header);
    });

    test('dialog actions', () => {
        const onOk = jest.fn();
        const onCancel = jest.fn();
        const onClose = jest.fn();
        wrapper.setProps({
            visible: true,
            header,
            body,
            okButtonProps: {
                text: 'ok',
            },
            cancelButtonProps: {
                text: 'Cancel',
            },
            onOk,
            onCancel,
            onClose,
        });
        wrapper.find('.buttonPrimary').at(0).simulate('click');
        wrapper.find('.buttonDefault').at(0).simulate('click');
        wrapper.find('.buttonNeutral').at(0).simulate('click');
        wrapper.find('.dialogBackdrop').at(0).simulate('click');

        expect(onOk).toHaveBeenCalledTimes(1);
        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(2);

        wrapper.setProps({
            maskClosable: false,
        });

        wrapper.find('.dialogBackdrop').at(0).simulate('click');
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});
