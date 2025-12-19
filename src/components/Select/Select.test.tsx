import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SelectShape, SelectSize } from './Select.types';
import { Select } from './';
import { sleep } from '../../tests/Utilities';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

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

  const options = [
    { text: 'Option 1', value: 'option1', 'data-testid': 'option1-test-id' },
    { text: 'Option 2', value: 'option2', 'data-testid': 'option2-test-id' },
    { text: 'Option 3', value: 'option3', 'data-testid': 'option3-test-id' },
  ];

  test('Renders without crashing', () => {
    const { container, getAllByPlaceholderText } = render(
      <Select options={options} placeholder="Select test" />
    );
    const select = getAllByPlaceholderText('Select test');
    expect(() => container).not.toThrowError();
    expect(select).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Renders null options in single mode without crashing', () => {
    const { container, getAllByPlaceholderText } = render(
      <Select options={null} placeholder="Select single test" />
    );
    const select = getAllByPlaceholderText('Select single test');
    expect(() => container).not.toThrowError();
    expect(select).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Renders null options in multiple mode without crashing', () => {
    const { container, getAllByPlaceholderText } = render(
      <Select multiple options={null} placeholder="Select multiple test" />
    );
    const selectMulti = getAllByPlaceholderText('Select multiple test');
    expect(() => container).not.toThrowError();
    expect(selectMulti).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Renders empty options in single mode without crashing', () => {
    const { container, getAllByPlaceholderText } = render(
      <Select options={[]} placeholder="Select single test" />
    );
    const select = getAllByPlaceholderText('Select single test');
    expect(() => container).not.toThrowError();
    expect(select).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Renders empty options in multiple mode without crashing', () => {
    const { container, getAllByPlaceholderText } = render(
      <Select multiple options={[]} placeholder="Select multiple test" />
    );
    const selectMulti = getAllByPlaceholderText('Select multiple test');
    expect(() => container).not.toThrowError();
    expect(selectMulti).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Renders as not read-only and is editable', () => {
    const { container } = render(<Select filterable options={options} />);
    expect(
      container.querySelector('.select-input').getAttribute('readonly')
    ).toBeFalsy();
  });

  test('Renders as read-only and is not editable', () => {
    const { container } = render(
      <Select filterable readonly options={options} />
    );
    expect(
      container.querySelector('.select-input').hasAttribute('readonly')
    ).toBeTruthy();
  });

  test('Hides the dropdown when readonly', async () => {
    const { container, rerender, getByPlaceholderText } = render(
      <Select options={options} readonly={false} placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    await waitFor(() =>
      expect(container.querySelector('.dropdown-wrapper')).toBeTruthy()
    );
    rerender(
      <Select options={options} readonly={true} placeholder="Select test" />
    );
    await waitFor(() =>
      expect(
        container.querySelector('.select-input').hasAttribute('readOnly')
      ).toBe(true)
    );
    expect(container.querySelector('.dropdown-wrapper')).toBeFalsy();
  });

  test('Opens the dropdown when clicked', async () => {
    const { getByPlaceholderText, getByText } = render(
      <Select options={options} placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    const option = await waitFor(() => getByText('Option 1'));
    expect(option).toBeTruthy();
  });

  test('Selects an option', async () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Select
        options={options}
        onOptionsChange={handleChange}
        placeholder="Select test"
      />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    const option = await waitFor(() => getByText('Option 1'));
    fireEvent.click(option);
    expect(handleChange).toHaveBeenCalledWith(
      ['option1'],
      [
        {
          'data-testid': 'option1-test-id',
          hideOption: false,
          id: 'Option 1-0',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 1',
          value: 'option1',
        },
      ]
    );
  });

  test('Selects multiple options', async () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Select
        options={options}
        onOptionsChange={handleChange}
        multiple
        placeholder="Select test"
      />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    const option1 = await waitFor(() => getByText('Option 1'));
    fireEvent.click(option1);
    const option2 = await waitFor(() => getByText('Option 2'));
    fireEvent.click(option2);
    expect(handleChange).toHaveBeenCalledWith(
      ['option1', 'option2'],
      [
        {
          'data-testid': 'option1-test-id',
          hideOption: false,
          id: 'Option 1-0',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 1',
          value: 'option1',
        },
        {
          'data-testid': 'option2-test-id',
          hideOption: false,
          id: 'Option 2-1',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 2',
          value: 'option2',
        },
      ]
    );
  });

  test('Renders with default value', () => {
    const defaultValue = 'option2';
    const { container, getByDisplayValue } = render(
      <Select options={options} defaultValue={defaultValue} />
    );
    const select = getByDisplayValue('Option 2');
    expect(() => container).not.toThrowError();
    expect(select).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Renders without stealing focus', () => {
    const defaultValue = 'option2';
    const { getByDisplayValue } = render(
      <Select options={options} defaultValue={defaultValue} />
    );
    const select = getByDisplayValue('Option 2');
    expect(select).toBeTruthy();
    expect(document.activeElement === select).toBe(false);
  });

  test('Updates the selected value', async () => {
    const defaultValue = 'option2';
    const handleChange = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Select
        options={options}
        defaultValue={defaultValue}
        onOptionsChange={handleChange}
        placeholder="Select test"
      />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    const option1 = await waitFor(() => getByText('Option 1'));
    fireEvent.click(option1);
    expect(handleChange).toHaveBeenCalledWith([], []);
    expect(handleChange).toHaveBeenCalledWith(
      ['option2'],
      [
        {
          'data-testid': 'option2-test-id',
          hideOption: false,
          id: 'Option 2-1',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 2',
          value: 'option2',
        },
      ]
    );
    expect(handleChange).toHaveBeenCalledWith(
      ['option1'],
      [
        {
          'data-testid': 'option1-test-id',
          hideOption: false,
          id: 'Option 1-0',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 1',
          value: 'option1',
        },
      ]
    );
  });

  test('Renders with default values when multiple', () => {
    const defaultValue = ['option2', 'option3'];
    const { container, getByText } = render(
      <Select options={options} defaultValue={defaultValue} multiple />
    );
    const option2 = getByText('Option 2');
    const option3 = getByText('Option 3');
    expect(() => container).not.toThrowError();
    expect(option2).toBeTruthy();
    expect(option3).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test('Updates the selected values when multiple', async () => {
    const defaultValue = ['option2', 'option3'];
    const handleChange = jest.fn();
    const { container, getByText } = render(
      <Select
        options={options}
        defaultValue={defaultValue}
        multiple
        onOptionsChange={handleChange}
      />
    );
    const select = container.querySelector('.select-input');
    fireEvent.click(select);
    const option1 = await waitFor(() => getByText('Option 1'));
    fireEvent.click(option1);
    expect(handleChange).toHaveBeenCalledWith(
      ['option1', 'option2', 'option3'],
      [
        {
          'data-testid': 'option1-test-id',
          hideOption: false,
          id: 'Option 1-0',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 1',
          value: 'option1',
        },
        {
          'data-testid': 'option2-test-id',
          hideOption: false,
          id: 'Option 2-1',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 2',
          value: 'option2',
        },
        {
          'data-testid': 'option3-test-id',
          hideOption: false,
          id: 'Option 3-2',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 3',
          value: 'option3',
        },
      ]
    );
  });

  test('Renders with clear button', () => {
    const defaultValue = 'option2';
    const { container } = render(
      <Select defaultValue={defaultValue} options={options} clearable />
    );
    const clearButton = container.querySelector('.clear-icon-button');
    expect(clearButton).toBeTruthy();
  });

  test('Handles clearing the selected value', async () => {
    const defaultValue = 'option2';
    const handleChange = jest.fn();
    const { container, getByPlaceholderText, getByText } = render(
      <Select
        options={options}
        defaultValue={defaultValue}
        onOptionsChange={handleChange}
        clearable
        placeholder="Select test"
      />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    await waitFor(() => getByText('Option 1'));
    const clearButton = container.querySelector('.clear-icon-button');
    fireEvent.click(clearButton);
    expect(handleChange).toHaveBeenCalledWith([], []);
    expect(handleChange).toHaveBeenCalledWith(
      ['option2'],
      [
        {
          'data-testid': 'option2-test-id',
          hideOption: false,
          id: 'Option 2-1',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 2',
          value: 'option2',
        },
      ]
    );
    expect(handleChange).toHaveBeenCalledWith([], []);
  });

  test('Select clearable input value is cleared and clear button is no longer visible', async () => {
    const defaultValue = 'option2';
    const { container } = render(
      <Select defaultValue={defaultValue} options={options} clearable />
    );
    await change(container, 'Option 2');
    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('Option 2');
    fireEvent.click(container.querySelector('.clear-icon-button'));
    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('');
    expect(container.querySelector('.clear-icon-button')).toBeFalsy();
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
    const defaultValue = 'option2';
    const { container } = render(
      <Select defaultValue={defaultValue} options={options} />
    );
    await change(container, 'Option 2');
    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('Option 2');
    let count = 8;
    do {
      backspace(container.querySelector('.select-input') as HTMLInputElement);
    } while (count--);
    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('');
  });

  test('Renders as disabled', () => {
    const { container } = render(<Select options={options} disabled />);
    expect(container.querySelector('.disabled')).toBeTruthy();
  });

  test('Does not open the dropdown when clicked and disabled', async () => {
    const handleChange = jest.fn();
    const { container, getByPlaceholderText } = render(
      <Select
        options={options}
        onChange={handleChange}
        disabled
        placeholder="Select test"
      />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    expect(container.querySelector('.dropdown')).toBeFalsy();
    expect(handleChange).not.toHaveBeenCalled();
  });

  test('Renders with all options initially visible', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select options={options} filterable placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
  });

  test('Filters the options when input value changes', async () => {
    const { getAllByRole, getByPlaceholderText, getByText, queryByText } =
      render(<Select options={options} filterable placeholder="Select test" />);
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    fireEvent.change(select, { target: { value: 'Option 1' } });
    await waitFor(() => getAllByRole('option'));
    const option1 = getByText('Option 1');
    const option2 = queryByText('Option 2');
    const option3 = queryByText('Option 3');
    expect(option1).toBeTruthy();
    expect(option2).toBeFalsy();
    expect(option3).toBeFalsy();
  });

  test('Calls onFocus and onBlur callbacks when Select is focused and blurred', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    const { getByPlaceholderText } = render(
      <Select
        options={options}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Select test"
      />
    );

    const select = getByPlaceholderText('Select test');
    fireEvent.focus(select);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(select);
    expect(handleBlur).toHaveBeenCalled();
  });

  test('Displays an empty string when the default value is null', () => {
    const { container } = render(
      <Select options={options} defaultValue={null} />
    );

    expect(
      (container.querySelector('.select-input') as HTMLInputElement).value
    ).toBe('');
  });

  test('Sets the input element autocomplete attribute to the specified value', () => {
    const { container } = render(
      <Select options={options} defaultValue="option1" autocomplete="email" />
    );

    const input = container.querySelector('.select-input');
    expect(input.getAttribute('autocomplete')).toBe('email');
  });

  test('Calls the onKeyDown function when a key is pressed', () => {
    const onKeyDown = jest.fn();
    const { container } = render(
      <Select options={options} onKeyDown={onKeyDown} />
    );

    const input = container.querySelector('.select-input');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
  });

  test('Select is large', () => {
    const { container } = render(
      <Select options={options} size={SelectSize.Large} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is medium', () => {
    const { container } = render(
      <Select options={options} size={SelectSize.Medium} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is small', () => {
    const { container } = render(
      <Select options={options} size={SelectSize.Small} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is rectangle shaped', () => {
    const { container } = render(
      <Select options={options} shape={SelectShape.Rectangle} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is pill shaped', () => {
    const { container } = render(
      <Select options={options} shape={SelectShape.Pill} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Select is underline shaped', () => {
    const { container } = render(
      <Select options={options} shape={SelectShape.Underline} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('Focuses the first focusable element when dropdown is visible and not filterable and initialFocus is not set', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select options={options} placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    select.focus();
    fireEvent.keyDown(select, { key: 'Enter' });
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
    await waitFor(() =>
      expect(screen.getByTestId('option1-test-id').matches(':focus')).toBe(true)
    );
    expect(screen.getByTestId('option1-test-id').matches(':focus')).toBe(true);
  });

  test('Focuses the first focusable element when dropdown is visible and not filterable and initialFocus is true', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select options={options} initialFocus placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    select.focus();
    fireEvent.keyDown(select, { key: 'Enter' });
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
    await waitFor(() =>
      expect(screen.getByTestId('option1-test-id').matches(':focus')).toBe(true)
    );
    expect(screen.getByTestId('option1-test-id').matches(':focus')).toBe(true);
  });

  test('Focuses the first focusable element when dropdown is visible and filterable and initialFocus is true', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        options={options}
        initialFocus
        filterable
        placeholder="Select test"
      />
    );
    const select = getByPlaceholderText('Select test');
    select.focus();
    fireEvent.keyDown(select, { key: 'Enter' });
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
    await waitFor(() =>
      expect(screen.getByTestId('option1-test-id').matches(':focus')).toBe(true)
    );
    expect(screen.getByTestId('option1-test-id').matches(':focus')).toBe(true);
  });

  test('Focuses the first focusable element when dropdown is visible and filterable and arrowDown is pressed', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select options={options} filterable placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    select.focus();
    fireEvent.click(select, { key: 'Enter' });
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
    fireEvent.keyDown(select, { key: 'ArrowDown' });
    await waitFor(() =>
      expect(screen.getByTestId('option1-test-id').matches(':focus')).toBe(true)
    );
    expect(screen.getByTestId('option1-test-id').matches(':focus')).toBe(true);
  });

  test('Does not focus the first focusable element when dropdown is visible and not filterable and initialFocus is false', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        options={options}
        initialFocus={false}
        placeholder="Select test"
      />
    );
    const select = getByPlaceholderText('Select test');
    select.focus();
    fireEvent.keyDown(select, { key: 'Enter' });
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
    expect(select).toHaveFocus();
  });

  test('Does not focus the first focusable element when dropdown is visible and filterable and initialFocus is not set', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select options={options} filterable placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    select.focus();
    fireEvent.keyDown(select, { key: 'Enter' });
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
    expect(select).toHaveFocus();
  });

  test('Does not focus the first focusable element when dropdown is visible and filterable and initialFocus is false', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        options={options}
        initialFocus={false}
        filterable
        placeholder="Select test"
      />
    );
    const select = getByPlaceholderText('Select test');
    select.focus();
    fireEvent.keyDown(select, { key: 'Enter' });
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
    expect(select).toHaveFocus();
  });

  test('Focuses the reference element when not visible', async () => {
    const mockEventKeys = {
      ESCAPE: 'Escape',
    };
    const { container, getAllByRole, getByPlaceholderText } = render(
      <Select options={options} filterable placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    const listbox = await waitFor(() => getAllByRole('option'));
    expect(listbox).toHaveLength(options.length);
    act(() => {
      userEvent.type(listbox[0], mockEventKeys.ESCAPE);
    });
    expect(container.querySelector('.dropdown')).toBeFalsy();
    expect(select).toHaveFocus();
  });

  test('Applies menuButtonRole when menuButtonHasRole is true', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        options={options}
        placeholder="Select test"
        menuProps={
          { menuButtonHasRole: true, menuButtonRole: 'menuitem' } as any
        }
      />
    );
    fireEvent.click(getByPlaceholderText('Select test'));
    const items = await waitFor(() => getAllByRole('menuitem'));
    expect(items[0].getAttribute('role')).toBe('menuitem');
  });

  test('Uses default option role when menuButtonHasRole is true without menuButtonRole', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        options={options}
        placeholder="Select test"
        menuProps={{ menuButtonHasRole: true } as any}
      />
    );
    fireEvent.click(getByPlaceholderText('Select test'));
    const items = await waitFor(() => getAllByRole('option'));
    expect(items[0].getAttribute('role')).toBe('option');
  });

  test('Removes role when menuButtonHasRole is false', async () => {
    const { getAllByRole, getByPlaceholderText, container } = render(
      <Select
        options={options}
        placeholder="Select test"
        menuProps={{ menuButtonHasRole: false } as any}
      />
    );
    fireEvent.click(getByPlaceholderText('Select test'));
    await waitFor(() => getAllByRole('listbox'));
    const button = container.querySelector('li button');
    expect(button?.hasAttribute('role')).toBe(false);
  });

  test('Applies menuItemRole to list item wrappers', async () => {
    const { getAllByRole, getByPlaceholderText, container } = render(
      <Select
        options={options}
        placeholder="Select test"
        menuProps={{ menuItemRole: 'option' } as any}
      />
    );
    fireEvent.click(getByPlaceholderText('Select test'));
    await waitFor(() => getAllByRole('listbox'));
    expect(container.querySelector('li[role="option"]')).toBeTruthy();
  });

  test('Uses default presentation role when menuItemRole is not provided', async () => {
    const { getAllByRole, getByPlaceholderText, container } = render(
      <Select
        options={options}
        placeholder="Select test"
        menuProps={{} as any}
      />
    );
    fireEvent.click(getByPlaceholderText('Select test'));
    await waitFor(() => getAllByRole('listbox'));
    expect(container.querySelector('li[role="presentation"]')).toBeTruthy();
  });

  test('Combines menuButtonHasRole true with menuItemRole', async () => {
    const { getAllByRole, getByPlaceholderText, container } = render(
      <Select
        options={options}
        placeholder="Select test"
        menuProps={
          {
            menuButtonHasRole: true,
            menuButtonRole: 'menuitem',
            menuItemRole: 'option',
          } as any
        }
      />
    );
    fireEvent.click(getByPlaceholderText('Select test'));
    await waitFor(() => getAllByRole('menuitem'));
    expect(container.querySelector('li[role="option"]')).toBeTruthy();
  });
});
