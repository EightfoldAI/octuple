import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SelectSize } from './Select.types';
import { Select, SelectOption } from './';
import { fireEvent, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Select', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('Select clearable', () => {
        const defaultOptions: SelectOption[] = [
            {
                text: 'School',
                value: 'school',
            },
        ];
        const { container } = render(
            <Select
                defaultValue="school"
                options={defaultOptions}
                textInputProps={{
                    defaultValue: 'school',
                    clearable: true,
                }}
            />
        );
        expect(
            (container.querySelector('.select-input') as HTMLInputElement).value
        ).toBe('School');
        fireEvent.click(container.querySelector('.clear-icon-button'));
        expect(
            (container.querySelector('.select-input') as HTMLInputElement).value
        ).toBe('');
    });

    test('Select is large', () => {
        const wrapper = mount(<Select size={SelectSize.Large} />);
        expect(wrapper.find('.select-large')).toBeTruthy();
    });

    test('Select is medium', () => {
        const wrapper = mount(<Select size={SelectSize.Medium} />);
        expect(wrapper.find('.select-medium')).toBeTruthy();
    });

    test('Select is small', () => {
        const wrapper = mount(<Select size={SelectSize.Small} />);
        expect(wrapper.find('.select-small')).toBeTruthy();
    });
});
