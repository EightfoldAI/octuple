import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { ButtonSize } from './Button.types';
import {
    DefaultButton,
    NeutralButton,
    PrimaryButton,
    SecondaryButton,
    SystemUIButton,
} from './';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Button', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    it('simulate click on button', () => {
        const wrapper = mount(<PrimaryButton text="test Button" />);
        wrapper.find('.button').at(0).simulate('click');
    });

    it('simulate click on enabled button', () => {
        let testCounter = 0;
        const disabled = false;
        const wrapper = mount(
            <PrimaryButton
                disabled={disabled}
                onClick={() => (testCounter += 1)}
                text="test Button"
            />
        );
        wrapper.find('.button').at(0).simulate('click');
        wrapper.find('.button').at(0).simulate('click');
        expect(testCounter).toEqual(2);
    });

    it('simulate click on disabled button', () => {
        let testCounter = 0;
        const disabled = true;
        const wrapper = mount(
            <PrimaryButton
                disabled={disabled}
                onClick={() => (testCounter += 1)}
                text="test Button"
            />
        );
        wrapper.find('.button').at(0).simulate('click');
        wrapper.find('.button').at(0).simulate('click');
        expect(testCounter).toEqual(0);
    });

    it('Button is default', () => {
        const wrapper = mount(<DefaultButton text="test default" />);
        expect(wrapper.find('.button-default')).toBeTruthy();
    });

    it('Button is neutral', () => {
        const wrapper = mount(<NeutralButton text="test neutral" />);
        expect(wrapper.find('.button-neutral')).toBeTruthy();
    });

    it('Button is primary', () => {
        const wrapper = mount(<PrimaryButton text="test" />);
        expect(wrapper.find('.button-primary')).toBeTruthy();
    });

    it('Button is secondary', () => {
        const wrapper = mount(<SecondaryButton text="test secondary" />);
        expect(wrapper.find('.button-secondary')).toBeTruthy();
    });

    it('Button is system ui', () => {
        const wrapper = mount(<SystemUIButton text="test system ui" />);
        expect(wrapper.find('.button-system-ui')).toBeTruthy();
    });

    it('Button is large', () => {
        const wrapper = mount(
            <PrimaryButton size={ButtonSize.Large} text="test" />
        );
        expect(wrapper.find('.button-large')).toBeTruthy();
    });

    it('Button is medium', () => {
        const wrapper = mount(
            <PrimaryButton size={ButtonSize.Medium} text="test" />
        );
        expect(wrapper.find('.button-medium')).toBeTruthy();
    });

    it('Button is small', () => {
        const wrapper = mount(
            <PrimaryButton size={ButtonSize.Small} text="test" />
        );
        expect(wrapper.find('.button-small')).toBeTruthy();
    });
});
