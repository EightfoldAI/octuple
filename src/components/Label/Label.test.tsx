import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Label } from './index';
import { ButtonShape } from '../Button';
import MatchMediaMock from 'jest-matchmedia-mock';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Label', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('label renders', () => {
        const wrapper = mount(<Label text="Test label" />);
        expect(wrapper.containsMatchingElement(<Label />)).toEqual(true);
    });
    test('label renders with default button', () => {
        const wrapper = mount(
            <Label
                labelIconButtonProps={{
                    show: true,
                    toolTipContent: 'A tooltip',
                    toolTipPlacement: 'right',
                }}
                text="Test label"
            />
        );
        expect(wrapper.containsMatchingElement(<Label />)).toEqual(true);
    });
    test('label renders with custom button', () => {
        const wrapper = mount(
            <Label
                labelIconButtonProps={{
                    iconProps: {
                        path: null,
                    },
                    shape: ButtonShape.Pill,
                    show: true,
                    style: {
                        marginLeft: 8,
                        marginTop: -8,
                    },
                    text: 'Learn more',
                }}
                text="Test label"
            />
        );
        expect(wrapper.containsMatchingElement(<Label />)).toEqual(true);
    });
});
