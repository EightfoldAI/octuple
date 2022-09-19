import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import MatchMediaMock from 'jest-matchmedia-mock';

import { Slider } from './';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Slider', () => {
    let wrapper: ReactWrapper;

    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });
    afterEach(() => {
        matchMedia.clear();
    });

    test('Should render', () => {
        wrapper = mount(<Slider min={20} max={40} value={30} />);
        expect(wrapper.children().length).toEqual(1);
    });

    test('should correctly display marker segments and indicate when they are active', () => {
        let markers;
        let activeMarkerSegments;

        wrapper = mount(
            <Slider min={20} max={40} value={30} showMarkers={true} />
        );
        markers = wrapper.find(
            '.rail-marker-segment:not(.rail-marker-segment-hidden)'
        );
        expect(markers.length).toEqual(20);
        activeMarkerSegments = wrapper.find('.rail-marker-segment.active');
        expect(activeMarkerSegments.length).toEqual(10);

        wrapper = mount(
            <Slider
                min={0}
                max={40}
                step={10}
                value={[10, 20]}
                showMarkers={true}
            />
        );
        markers = wrapper.find(
            '.rail-marker-segment:not(.rail-marker-segment-hidden)'
        );
        expect(markers.length).toEqual(4);
        activeMarkerSegments = wrapper.find('.rail-marker-segment.active');
        expect(activeMarkerSegments.length).toEqual(1);
    });

    test('should not call onChanges on initial load', () => {
        const testCtrl = {
            handleChange: () => {},
        };
        const handleChangeSpy = jest
            .spyOn(testCtrl, 'handleChange')
            .mockImplementation(() => {});

        wrapper = mount(
            <Slider
                min={20}
                max={40}
                value={30}
                showMarkers={true}
                onChange={testCtrl.handleChange}
            />
        );
        let thumb1 = wrapper.find('input[type="range"]').at(0);
        expect(handleChangeSpy).toHaveBeenCalledTimes(0);
        thumb1.simulate('change', { target: { value: 29 } });
        expect(handleChangeSpy).toHaveBeenCalledTimes(1);
    });

    test('should update values correctly', () => {
        let val = 1;
        wrapper = mount(
            <Slider
                min={0}
                max={10}
                value={val}
                onChange={(newVal: number) => (val = newVal)}
            />
        );

        let thumb = wrapper.find('input[type="range"]').at(0);
        expect(thumb.prop('value')).toEqual(1);
        thumb.simulate('change', { target: { value: 3 } });
        expect(val).toEqual(3);

        let vals = [0, 10];
        wrapper = mount(
            <Slider
                min={0}
                max={20}
                value={vals}
                onChange={(newVal: number[]) => (vals = [...newVal])}
            />
        );
        let thumb1 = wrapper.find('input[type="range"]').at(0);
        let thumb2 = wrapper.find('input[type="range"]').at(1);
        expect(thumb1.prop('value')).toEqual(0);
        expect(thumb2.prop('value')).toEqual(10);
        thumb1.simulate('change', { target: { value: 3 } });
        thumb2.simulate('change', { target: { value: 7 } });
        expect(vals[0]).toEqual(3);
        expect(vals[1]).toEqual(7);
    });
});
