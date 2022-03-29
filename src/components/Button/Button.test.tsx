import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { PrimaryButton } from './PrimaryButton/PrimaryButton';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Button', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });
    /*
     * Functionality Tests
     */
    test('simulate click on button', () => {
        const wrapper = mount(<PrimaryButton text="test Button" />);
        wrapper.find('.button').at(0).simulate('click');
    });
    test('simulate click on enabled button', () => {
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

    test('simulate click on disabled button', () => {
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
});
