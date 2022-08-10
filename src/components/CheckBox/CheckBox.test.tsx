import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { CheckBox, SelectorSize } from './';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('RadioButton', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    it('CheckBox renders', () => {
        const wrapper = mount(<CheckBox checked={true} />);
        expect(
            wrapper.containsMatchingElement(<CheckBox checked={true} />)
        ).toEqual(true);
    });

    it('Checkbox renders as toggle switch', () => {
        const wrapper = mount(<CheckBox checked={true} toggle />);
        expect(wrapper.find('.toggle')).toBeTruthy();
    });

    it('simulate disabled CheckBox', () => {
        const wrapper = mount(<CheckBox disabled label="test label" />);
        wrapper.find('input').html().includes('disabled=""');
    });

    it('CheckBox is large', () => {
        const wrapper = mount(
            <CheckBox size={SelectorSize.Large} label="test label" />
        );
        expect(wrapper.find('.selector-large')).toBeTruthy();
    });

    it('CheckBox is medium', () => {
        const wrapper = mount(
            <CheckBox size={SelectorSize.Medium} label="test label" />
        );
        expect(wrapper.find('.selector-medium')).toBeTruthy();
    });

    it('CheckBox is small', () => {
        const wrapper = mount(
            <CheckBox size={SelectorSize.Small} label="test label" />
        );
        expect(wrapper.find('.selector-small')).toBeTruthy();
    });
});
