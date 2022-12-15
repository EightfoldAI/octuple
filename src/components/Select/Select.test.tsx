import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SelectShape, SelectSize } from './Select.types';
import { Select, SelectOption } from './';
import { fireEvent, render } from '@testing-library/react';
import { sleep } from '../../tests/Utilities';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver;

describe('Select', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  async function change(container: HTMLElement, value: string) {
    fireEvent.change(container.querySelector('.select-input'), {
      target: { value },
    });
    await sleep();
  }

  const defaultOptions: SelectOption[] = [
    {
      text: 'School',
      value: 'school',
    },
  ];

  test('Select clearable', async () => {
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
    await change(container, 'School');
    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('School');
    fireEvent.click(container.querySelector('.clear-icon-button'));
    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('');
  });

  test('Select backspace clearable', async () => {
    const backspace = (element: HTMLInputElement) => {
      let actuallyTyped: string = element.value;

      const backspaceKey = {
        key: 'Backspace',
        code: 8,
        inputType: 'deleteContentBackward',
      };

      const sharedEventConfig = {
        key: backspaceKey.key,
        charCode: backspaceKey.code,
        keyCode: backspaceKey.code,
        which: backspaceKey.code,
      };
      const downEvent = fireEvent.keyDown(element, sharedEventConfig);

      if (downEvent) {
        actuallyTyped = actuallyTyped.slice(0, -1);

        fireEvent.input(element, {
          target: { value: actuallyTyped },
          inputType: backspaceKey.inputType,
          bubbles: true,
          cancelable: true,
        });
      }

      fireEvent.keyUp(element, sharedEventConfig);
    };
    const { container } = render(<Select options={defaultOptions} />);
    await change(container, 'School');
    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('School');
    let count = 6;
    do {
      backspace(container.querySelector('.select-input') as HTMLInputElement);
    } while (count--);
    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('');
  });

  test('Select is large', () => {
    const { container } = render(
      <Select options={defaultOptions} size={SelectSize.Large} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is medium', () => {
    const { container } = render(
      <Select options={defaultOptions} size={SelectSize.Medium} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is small', () => {
    const { container } = render(
      <Select options={defaultOptions} size={SelectSize.Small} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is rectangle shaped', () => {
    const { container } = render(
      <Select options={defaultOptions} shape={SelectShape.Rectangle} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is pill shaped', () => {
    const { container } = render(
      <Select options={defaultOptions} shape={SelectShape.Pill} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is underline shaped', () => {
    const { container } = render(
      <Select options={defaultOptions} shape={SelectShape.Underline} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
