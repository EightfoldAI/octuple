import React from 'react';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Panel } from './';
import { create } from 'react-test-renderer';
import { Tab, Tabs } from '../Tabs';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Panel', () => {
    let wrapper: ReactWrapper;
    const body = 'This is the panel body';
    const title = 'This is the title';

    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    beforeEach(() => {
        wrapper = mount(
            <Panel visible={false}>
                <div>{body}</div>
            </Panel>
        );
    });

    test('panel visibility', () => {
        expect(wrapper.hasClass('visible')).not.toEqual(true);
        wrapper.setProps({
            visible: true,
        });
        expect(wrapper.hasClass('visible')).toBe(false);
    });

    test('panel content', () => {
        wrapper.setProps({
            visible: true,
            title,
            body,
        });
        expect(wrapper.find('.body').text()).toBe(body);
        expect(wrapper.find('.header').text()).toBe(title);
    });

    test('panel actions', () => {
        const onClose = jest.fn();
        wrapper.setProps({
            visible: true,
            onClose,
        });
        wrapper.find('.panelBackdrop').at(0).simulate('click');

        wrapper.find('.buttonDefault').at(0).simulate('click');
        expect(onClose).toHaveBeenCalledTimes(2);

        wrapper.setProps({
            maskClosable: false,
        });
        wrapper.find('.panelBackdrop').at(0).simulate('click');
        expect(onClose).toHaveBeenCalledTimes(2);
    });
});
