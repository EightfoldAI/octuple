import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MockDate from 'mockdate';
import {
  mount,
  getDayjs,
  DayjsRangePicker,
  DayjsPicker,
  DayjsPickerPartial,
} from './util/commonUtil';
import '@testing-library/jest-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Picker.Components', () => {
  beforeAll(() => {
    MockDate.set(getDayjs('1990-09-03 00:00:00').toDate());

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  afterAll(() => {
    MockDate.reset();
  });

  [
    { name: 'RangePicker', component: DayjsRangePicker, ranges: true },
    { name: 'Picker', component: DayjsPicker },
    { name: 'PickerPartial', component: DayjsPickerPartial },
  ].forEach(({ name, component, ranges }) => {
    it(name, () => {
      const Component = component as any;
      const Button: React.FC<any> = (props) => <h1 {...props}>test</h1>;
      const Item: React.FC<any> = (props) => <h2 {...props}>test</h2>;

      const wrapper = mount(
        <Component
          ranges={{
            good: [null, null],
          }}
          components={{
            button: Button,
            rangeItem: Item,
          }}
          picker="time"
          open
        />
      );

      expect(wrapper.find('.picker-footer')).toHaveLength(1);
      if (ranges) {
        expect(wrapper.find('.picker-footer')).toHaveLength(1);
      }
    });
  });
});
