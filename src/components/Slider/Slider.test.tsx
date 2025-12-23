import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount, ReactWrapper } from 'enzyme';
import MatchMediaMock from 'jest-matchmedia-mock';
import { Slider, SliderTrackStatus } from './';
import { render, fireEvent } from '@testing-library/react';

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

    wrapper = mount(<Slider min={20} max={40} value={30} showMarkers={true} />);
    markers = wrapper.find(
      '.rail-marker-segment:not(.rail-marker-segment-hidden)'
    );
    expect(markers.length).toEqual(20);
    activeMarkerSegments = wrapper.find('.rail-marker-segment.active');
    expect(activeMarkerSegments.length).toEqual(10);

    wrapper = mount(
      <Slider min={0} max={40} step={10} value={[10, 20]} showMarkers={true} />
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

  test('should not update values when readOnly', () => {
    let val = 1;
    wrapper = mount(
      <Slider
        min={0}
        max={10}
        value={val}
        onChange={(newVal: number) => (val = newVal)}
        readOnly
      />
    );

    let thumb = wrapper.find('input[type="range"]').at(0);
    expect(thumb.prop('value')).toEqual(1);
    thumb.simulate('change', { target: { value: 3 } });
    expect(val).toEqual(1);

    let vals = [0, 10];
    wrapper = mount(
      <Slider
        min={0}
        max={20}
        value={vals}
        onChange={(newVal: number[]) => (vals = [...newVal])}
        readOnly
      />
    );
    let thumb1 = wrapper.find('input[type="range"]').at(0);
    let thumb2 = wrapper.find('input[type="range"]').at(1);
    expect(thumb1.prop('value')).toEqual(0);
    expect(thumb2.prop('value')).toEqual(10);
    thumb1.simulate('change', { target: { value: 3 } });
    thumb2.simulate('change', { target: { value: 7 } });
    expect(vals[0]).toEqual(0);
    expect(vals[1]).toEqual(10);
  });

  test('should render normally when `hideRail=true`', () => {
    const { container } = render(<Slider hideRail value={50} />);
    expect(() => container).not.toThrowError();
  });

  test('should render normally when `hideThumb=true`', () => {
    const { container } = render(<Slider hideThumb value={50} />);
    expect(() => container).not.toThrowError();
  });

  test('should render normally when `hideTrack=true`', () => {
    const { container } = render(<Slider hideTrack value={50} />);
    expect(() => container).not.toThrowError();
  });

  test('should render normally when `trackBorder=false`', () => {
    const { container } = render(<Slider trackBorder={false} value={50} />);
    expect(() => container).not.toThrowError();
  });

  test('should render normally when `railBorder=false`', () => {
    const { container } = render(<Slider railBorder={false} value={50} />);
    expect(() => container).not.toThrowError();
  });

  test('should render normally when `railBorder=false` and `trackBorder=false`', () => {
    const { container } = render(
      <Slider railBorder={false} trackBorder={false} value={50} />
    );
    expect(() => container).not.toThrowError();
  });

  test('should render normally when `labelPosition=inline`', () => {
    const { container } = render(<Slider labelPosition="inline" value={50} />);
    expect(() => container).not.toThrowError();
  });

  test('should render dots correctly when `dots=true`', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} dots />
    );
    expect(container1.getElementsByClassName('slider-dot')).toHaveLength(11);
    expect(container1.getElementsByClassName('slider-dot-active')).toHaveLength(
      6
    );

    const { container: container2 } = render(
      <Slider value={[20, 50]} step={10} dots />
    );
    expect(container2.getElementsByClassName('slider-dot')).toHaveLength(11);
    expect(container2.getElementsByClassName('slider-dot-active')).toHaveLength(
      4
    );
  });

  test('should render dots correctly when `dots=true` and visibleDots', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} dots visibleDots={[20, 49]} />
    );
    expect(container1.getElementsByClassName('slider-dot')).toHaveLength(2);
    expect(container1.getElementsByClassName('slider-dot-active')).toHaveLength(
      2
    );

    const { container: container2 } = render(
      <Slider value={[20, 50]} step={10} dots visibleDots={[30, 60]} />
    );
    expect(container2.getElementsByClassName('slider-dot')).toHaveLength(2);
    expect(container2.getElementsByClassName('slider-dot-active')).toHaveLength(
      1
    );
  });

  test('should render dots with custom class', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} dots dotClassNames="dot-test-class" />
    );
    expect(container1.getElementsByClassName('slider-dot')).toHaveLength(11);
    expect(container1.getElementsByClassName('dot-test-class')).toHaveLength(
      11
    );
  });

  test('should render normally when `dots=true` and `step=null`', () => {
    const { container } = render(<Slider step={null} value={50} dots />);
    expect(() => container).not.toThrowError();
  });

  test('should render dots correctly when dotStyle is dynamic`', () => {
    const { container: container1 } = render(
      <Slider
        value={50}
        step={10}
        dots
        dotStyle={(dotValue) => ({ width: `${dotValue}px` })}
      />
    );
    expect(
      container1.getElementsByClassName('slider-dot')[1].getAttribute('style')
    ).toBe('left: 10%; transform: translateX(-50%); width: 10px;');
    expect(
      container1.getElementsByClassName('slider-dot')[2].getAttribute('style')
    ).toBe('left: 20%; transform: translateX(-50%); width: 20px;');

    const { container: container2 } = render(
      <Slider
        value={[20, 50]}
        step={10}
        dots
        activeDotStyle={(dotValue) => ({ width: `${dotValue}px` })}
      />
    );
    expect(
      container2
        .getElementsByClassName('slider-dot-active')[1]
        .getAttribute('style')
    ).toBe('left: 30%; transform: translateX(-50%); width: 30px;');
    expect(
      container2
        .getElementsByClassName('slider-dot-active')[2]
        .getAttribute('style')
    ).toBe('left: 40%; transform: translateX(-50%); width: 40px;');
  });

  test('should render marks correctly when `marks` is not an empty object', () => {
    const marks = { 0: 0, 30: '30', 99: '', 100: '100' };

    const { container } = render(<Slider marks={marks} value={30} />);
    expect(container.getElementsByClassName('slider-mark-text')).toHaveLength(
      3
    );
    expect(
      container.getElementsByClassName('slider-mark-text')[0].innerHTML
    ).toBe('0');
    expect(
      container.getElementsByClassName('slider-mark-text')[1].innerHTML
    ).toBe('30');
    expect(
      container.getElementsByClassName('slider-mark-text')[2].innerHTML
    ).toBe('100');

    const { container: container2 } = render(
      <Slider value={[0, 30]} marks={marks} />
    );
    expect(container2.getElementsByClassName('slider-mark-text')).toHaveLength(
      3
    );
    expect(
      container2.getElementsByClassName('slider-mark-text')[0].innerHTML
    ).toBe('0');
    expect(
      container2.getElementsByClassName('slider-mark-text')[1].innerHTML
    ).toBe('30');
    expect(
      container2.getElementsByClassName('slider-mark-text')[2].innerHTML
    ).toBe('100');

    expect(container.querySelector('.slider-mark')).toBeTruthy();
  });

  test('should select correct value while click on marks', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const { container } = render(<Slider marks={marks} value={20} />);
    fireEvent.click(container.getElementsByClassName('slider-mark-text')[1]);
    expect(
      container.getElementsByClassName('thumb')[0].getAttribute('value')
    ).toBe('30');
  });

  test('should render success track color', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} trackStatus={SliderTrackStatus.Success} />
    );
    expect(container1.getElementsByClassName('success')).toHaveLength(1);
  });

  test('should render warning track color', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} trackStatus={SliderTrackStatus.Warning} />
    );
    expect(container1.getElementsByClassName('warning')).toHaveLength(1);
  });

  test('should render error track color', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} trackStatus={SliderTrackStatus.Error} />
    );
    expect(container1.getElementsByClassName('error')).toHaveLength(1);
  });

  test('should hide track', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} hideTrack />
    );
    expect(
      container1.getElementsByClassName('slider-track-opacity')
    ).toHaveLength(1);
    expect(
      container1.getElementsByClassName('slider-rail-opacity')
    ).toHaveLength(0);
  });

  test('should hide rail', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} hideRail />
    );
    expect(
      container1.getElementsByClassName('slider-rail-opacity')
    ).toHaveLength(1);
    expect(
      container1.getElementsByClassName('slider-track-opacity')
    ).toHaveLength(0);
  });

  test('should hide rail and track', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} hideRail hideTrack />
    );
    expect(
      container1.getElementsByClassName('slider-rail-opacity')
    ).toHaveLength(1);
    expect(
      container1.getElementsByClassName('slider-track-opacity')
    ).toHaveLength(1);
  });

  test('should render segments correctly when step is an integer', () => {
    const { container: container1 } = render(
      <Slider min={0} max={5} value={4} step={1} showMarkers />
    );
    expect(
      container1.getElementsByClassName('rail-marker-segment')
    ).toHaveLength(5);
    expect(container1.getElementsByClassName('active')).toHaveLength(4);

    const { container: container2 } = render(
      <Slider min={0} max={5} value={[1, 4]} step={1} showMarkers />
    );
    expect(
      container2.getElementsByClassName('rail-marker-segment')
    ).toHaveLength(5);
    expect(container2.getElementsByClassName('active')).toHaveLength(3);
  });

  test('should render segments correctly when step is a decimal', () => {
    const { container: container1 } = render(
      <Slider min={0} max={5} value={4} step={0.1} showMarkers />
    );
    expect(
      container1.getElementsByClassName('rail-marker-segment')
    ).toHaveLength(5);
    expect(container1.getElementsByClassName('active')).toHaveLength(4);

    const { container: container2 } = render(
      <Slider min={0} max={5} value={[1, 4]} step={0.1} showMarkers />
    );
    expect(
      container2.getElementsByClassName('rail-marker-segment')
    ).toHaveLength(5);
    expect(container2.getElementsByClassName('active')).toHaveLength(3);
  });

  test('should set tabIndex=-1 on markers when slider is readonly', () => {
    const marks = { 0: '0', 50: '50', 100: '100' };
    const { container } = render(<Slider marks={marks} value={50} readOnly />);
    const markElements = container.getElementsByClassName('slider-mark-text');
    
    expect(markElements).toHaveLength(3);
    Array.from(markElements).forEach((mark) => {
      expect(mark.getAttribute('tabindex')).toBe('-1');
    });
  });

  test('should set tabIndex=-1 on markers when slider is disabled', () => {
    const marks = { 0: '0', 50: '50', 100: '100' };
    const { container } = render(<Slider marks={marks} value={50} disabled />);
    const markElements = container.getElementsByClassName('slider-mark-text');
    
    expect(markElements).toHaveLength(3);
    Array.from(markElements).forEach((mark) => {
      expect(mark.getAttribute('tabindex')).toBe('-1');
    });
  });

  test('should not set tabIndex on markers when slider is interactive', () => {
    const marks = { 0: '0', 50: '50', 100: '100' };
    const { container } = render(<Slider marks={marks} value={50} />);
    const markElements = container.getElementsByClassName('slider-mark-text');
    
    expect(markElements).toHaveLength(3);
    Array.from(markElements).forEach((mark) => {
      expect(mark.getAttribute('tabindex')).toBeNull();
    });
  });
});
