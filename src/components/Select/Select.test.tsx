import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { SelectShape, SelectSize } from './Select.types';
import { Select } from './';
import { MenuItemType } from '../Menu';
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
          id: 'list--option-0',
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
          id: 'list--option-0',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 1',
          value: 'option1',
        },
        {
          'data-testid': 'option2-test-id',
          hideOption: false,
          id: 'list--option-1',
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
          id: 'list--option-1',
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
          id: 'list--option-0',
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
          id: 'list--option-0',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 1',
          value: 'option1',
        },
        {
          'data-testid': 'option2-test-id',
          hideOption: false,
          id: 'list--option-1',
          object: undefined,
          role: 'option',
          selected: true,
          text: 'Option 2',
          value: 'option2',
        },
        {
          'data-testid': 'option3-test-id',
          hideOption: false,
          id: 'list--option-2',
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
          id: 'list--option-1',
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

  test('Updates aria-activedescendant when an option receives focus via keyboard navigation', async () => {
    // ArrowDown in a filterable select calls focusFirstElement(), which focuses
    // the first <li role="option">, firing focusin and updating the attribute.
    const { getAllByRole, getByPlaceholderText } = render(
      <Select options={options} filterable placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    select.focus();
    fireEvent.click(select);
    await waitFor(() => getAllByRole('option'));

    fireEvent.keyDown(select, { key: 'ArrowDown' });

    await waitFor(() =>
      expect(select.getAttribute('aria-activedescendant')).toBe('list--option-0')
    );
  });

  test('Clear button has an accessible name', () => {
    const { container } = render(
      <Select
        defaultValue="option2"
        options={options}
        clearable
        placeholder="Select test"
      />
    );
    const clearButton = container.querySelector('.clear-icon-button');
    expect(clearButton).toBeTruthy();
    expect(clearButton.getAttribute('aria-label')).toBe('Clear selection');
  });

  test('Clear button uses the provided clearButtonAriaLabel', () => {
    const { container } = render(
      <Select
        defaultValue="option2"
        options={options}
        clearable
        clearButtonAriaLabel="Clear priority"
        placeholder="Select test"
      />
    );
    expect(
      container.querySelector('.clear-icon-button').getAttribute('aria-label')
    ).toBe('Clear priority');
  });

  test('Clears aria-activedescendant after selecting and closing', async () => {
    // Closed dropdown unmounts its options; the attribute must not point at a gone option.
    const { getByPlaceholderText, getByText } = render(
      <Select options={options} placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    fireEvent.click(select);
    const option1 = await waitFor(() => getByText('Option 1'));
    fireEvent.click(option1);
    await waitFor(() =>
      expect((select as HTMLInputElement).value).toBe('Option 1')
    );
    await waitFor(() =>
      expect(select.getAttribute('aria-activedescendant')).toBeFalsy()
    );
  });

  test('Does not set aria-activedescendant from an option focus while closed', () => {
    // A closed Select must ignore option focusin (e.g. from another Select's listbox).
    const { getByPlaceholderText } = render(
      <Select options={options} placeholder="Select test" />
    );
    const select = getByPlaceholderText('Select test');
    const foreignOption = document.createElement('button');
    foreignOption.id = 'list--option-0';
    foreignOption.setAttribute('role', 'option');
    document.body.appendChild(foreignOption);
    fireEvent.focusIn(foreignOption);
    expect(select.getAttribute('aria-activedescendant')).toBeFalsy();
    foreignOption.remove();
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

  test('Enter key opens the dropdown', async () => {
    const { getByPlaceholderText, getAllByRole } = render(
      <Select options={options} placeholder="Select test" />
    );
    const input = getByPlaceholderText('Select test') as HTMLInputElement;
    input.focus();

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => getAllByRole('listbox'));
    const listbox = getAllByRole('listbox');
    expect(listbox).toBeTruthy();
  });

  test('Enter key opens the dropdown in multiple mode', async () => {
    const { getByPlaceholderText, getAllByRole } = render(
      <Select multiple options={options} placeholder="Select test" />
    );
    const input = getByPlaceholderText('Select test') as HTMLInputElement;
    input.focus();

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => getAllByRole('listbox'));
    const listbox = getAllByRole('listbox');
    expect(listbox).toBeTruthy();
  });

  test('Enter key does not propagate to prevent cross-component focus jumps', async () => {
    const onKeyDown = jest.fn();
    const { getByPlaceholderText } = render(
      <div onKeyDown={onKeyDown}>
        <Select options={options} placeholder="Select test" />
      </div>
    );
    const input = getByPlaceholderText('Select test') as HTMLInputElement;
    input.focus();

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await sleep(100);
    expect(onKeyDown).not.toHaveBeenCalled();
  });

  test('Focus stays within dropdown after selection in multi-select', async () => {
    const { getByPlaceholderText, getByText, container } = render(
      <Select multiple options={options} placeholder="Select test" />
    );
    const input = getByPlaceholderText('Select test') as HTMLInputElement;

    fireEvent.click(input);
    const option1 = await waitFor(() => getByText('Option 1'));
    fireEvent.click(option1);

    await waitFor(() => {
      const pill = container.querySelector('#selectPilllist--option-0');
      expect(pill).toBeTruthy();
    });

    await sleep(300);

    // Focus should remain in the dropdown menu after selection
    const menuItem = container.querySelector('.menu-item') as HTMLElement;
    expect(menuItem).toBeTruthy();
  });

  test('Focus returns to input when dropdown closes after multiple selections', async () => {
    const { getByPlaceholderText, getByText, container } = render(
      <Select multiple options={options} placeholder="Select test" />
    );
    const input = getByPlaceholderText('Select test') as HTMLInputElement;

    fireEvent.click(input);
    const option1 = await waitFor(() => getByText('Option 1'));
    fireEvent.click(option1);
    await sleep(300);

    const option2 = await waitFor(() => getByText('Option 2'));
    fireEvent.click(option2);

    await waitFor(() => {
      const pill2 = container.querySelector('#selectPilllist--option-1');
      expect(pill2).toBeTruthy();
    });

    // Close the dropdown by clicking outside
    fireEvent.mouseDown(document.body);

    // Focus should return to the input element after dropdown closes
    await waitFor(
      () => {
        expect(document.activeElement).toBe(input);
      },
      { timeout: 1000 }
    );
  });

  describe('Live region announcements', () => {
    test('Announces result count when dropdown opens (plural)', async () => {
      const { getByPlaceholderText, getByRole } = render(
        <Select options={options} filterable placeholder="Select test" />
      );
      const input = getByPlaceholderText('Select test');

      fireEvent.click(input);

      await waitFor(() => {
        expect(getByRole('status')).toHaveTextContent(
          `${options.length} matches found.`
        );
      });
    });

    test('Announces singular result count when one option matches', async () => {
      const { getByPlaceholderText, getByRole, container } = render(
        <Select options={options} filterable placeholder="Select test" />
      );
      const input = getByPlaceholderText('Select test');
      fireEvent.click(input);

      fireEvent.change(container.querySelector('.select-input'), {
        target: { value: 'Option 1' },
      });

      await waitFor(() => {
        expect(getByRole('status')).toHaveTextContent('1 match found.');
      });
    });

    test('Announces no-results message when filter yields zero results', async () => {
      const { getByPlaceholderText, getByRole, container } = render(
        <Select options={options} filterable placeholder="Select test" />
      );
      const input = getByPlaceholderText('Select test');
      fireEvent.click(input);

      fireEvent.change(container.querySelector('.select-input'), {
        target: { value: 'zzz' },
      });

      await waitFor(() => {
        expect(getByRole('status')).toHaveTextContent('No match found');
      });
    });

    test('Does not announce when options are empty and no search query is active', async () => {
      const { getByPlaceholderText, getByRole } = render(
        <Select options={[]} filterable placeholder="Select test" />
      );
      const input = getByPlaceholderText('Select test');
      fireEvent.click(input);

      await waitFor(() => {
        expect(getByRole('status').textContent).toBe('');
      });
    });

    test('Retains last message in live region when dropdown closes', async () => {
      const { getByPlaceholderText, getByRole } = render(
        <Select options={options} filterable placeholder="Select test" />
      );
      const input = getByPlaceholderText('Select test');
      fireEvent.click(input);

      let lastMessage: string;
      await waitFor(() => {
        lastMessage = getByRole('status').textContent;
        expect(lastMessage).not.toBe('');
      });

      fireEvent.mouseDown(document.body);

      await waitFor(() => {
        expect(getByRole('status').textContent).toBe(lastMessage);
      });
    });

    describe('Grouped options with sub headers', () => {
      const groupedOptions = [
        { text: 'Group One', value: 'group-one', type: MenuItemType.subHeader },
        { text: 'Apple', value: 'apple' },
        { text: 'Banana', value: 'banana' },
        { text: 'Group Two', value: 'group-two', type: MenuItemType.subHeader },
        { text: 'Cherry', value: 'cherry' },
      ];

      // Keeps sub headers visible while filtering, mirroring grouped Select
      // consumers that render persistent group labels.
      const groupAwareFilterOption = (
        option: { type?: MenuItemType; text?: string },
        query: string
      ): boolean => {
        if (option.type === MenuItemType.subHeader) return true;
        const q = (query || '').toLowerCase();
        return !q || (option.text || '').toLowerCase().includes(q);
      };

      test('Excludes sub headers from announced count when dropdown opens', async () => {
        const { getByPlaceholderText, getByRole } = render(
          <Select
            options={groupedOptions}
            filterable
            placeholder="Select test"
          />
        );
        const input = getByPlaceholderText('Select test');
        fireEvent.click(input);

        await waitFor(() => {
          expect(getByRole('status')).toHaveTextContent('3 matches found.');
        });
      });

      test('Excludes visible sub headers from announced count while filtering', async () => {
        const { getByPlaceholderText, getByRole, container } = render(
          <Select
            options={groupedOptions}
            filterable
            filterOption={groupAwareFilterOption}
            placeholder="Select test"
          />
        );
        const input = getByPlaceholderText('Select test');
        fireEvent.click(input);

        fireEvent.change(container.querySelector('.select-input'), {
          target: { value: 'a' },
        });

        await waitFor(() => {
          expect(getByRole('status')).toHaveTextContent('a,2 matches found.');
        });
      });

      test('Announces singular count when one option matches alongside visible sub headers', async () => {
        const { getByPlaceholderText, getByRole, container } = render(
          <Select
            options={groupedOptions}
            filterable
            filterOption={groupAwareFilterOption}
            placeholder="Select test"
          />
        );
        const input = getByPlaceholderText('Select test');
        fireEvent.click(input);

        fireEvent.change(container.querySelector('.select-input'), {
          target: { value: 'banana' },
        });

        await waitFor(() => {
          expect(getByRole('status')).toHaveTextContent(
            'banana,1 match found.'
          );
        });
      });

      test('Announces no-results message when only sub headers remain visible', async () => {
        const { getByPlaceholderText, getByRole, container } = render(
          <Select
            options={groupedOptions}
            filterable
            filterOption={groupAwareFilterOption}
            placeholder="Select test"
          />
        );
        const input = getByPlaceholderText('Select test');
        fireEvent.click(input);

        fireEvent.change(container.querySelector('.select-input'), {
          target: { value: 'zzz' },
        });

        await waitFor(() => {
          expect(getByRole('status')).toHaveTextContent(
            'No match found for zzz'
          );
        });
      });
    });
  });
});

describe('Select improvedA11y', () => {
  let matchMediaAd: any;

  beforeAll(() => {
    matchMediaAd = new MatchMediaMock();
  });

  afterEach(() => {
    matchMediaAd.clear();
  });

  const adOptions = [
    { text: 'Apple', value: 'apple' },
    { text: 'Banana', value: 'banana' },
    { text: 'Cherry', value: 'cherry' },
  ];

  test('moves id/role/aria-selected onto the <li> and drops the inner button', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        improvedA11y
        filterable
        options={adOptions}
        placeholder="Fruit"
      />
    );
    const input = getByPlaceholderText('Fruit');
    fireEvent.click(input);
    const optionEls = await waitFor(() => getAllByRole('option'));
    expect(optionEls).toHaveLength(adOptions.length);
    optionEls.forEach((el: HTMLElement) => {
      // The list item itself is the option; the inner button is removed.
      expect(el.tagName).toBe('LI');
      expect(el.hasAttribute('id')).toBe(true);
      expect(el.hasAttribute('aria-selected')).toBe(true);
      expect(el.querySelector('button')).toBeNull();
    });
  });

  test('keeps focus on the input and moves aria-activedescendant on ArrowDown/ArrowUp', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        improvedA11y
        filterable
        options={adOptions}
        placeholder="Fruit"
      />
    );
    const input = getByPlaceholderText('Fruit') as HTMLInputElement;
    input.focus();
    fireEvent.click(input);
    const optionEls = await waitFor(() => getAllByRole('option'));
    const [first, second] = optionEls;

    // Opening highlights the first option.
    await waitFor(() =>
      expect(input.getAttribute('aria-activedescendant')).toBe(first.id)
    );

    fireEvent.keyDown(input, { key: 'ArrowDown' });
    await waitFor(() =>
      expect(input.getAttribute('aria-activedescendant')).toBe(second.id)
    );
    // Focus never moved into the listbox.
    expect(document.activeElement).toBe(input);

    fireEvent.keyDown(input, { key: 'ArrowUp' });
    await waitFor(() =>
      expect(input.getAttribute('aria-activedescendant')).toBe(first.id)
    );
    expect(document.activeElement).toBe(input);
  });

  test('selects the highlighted option on Enter', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        improvedA11y
        filterable
        options={adOptions}
        placeholder="Fruit"
      />
    );
    const input = getByPlaceholderText('Fruit') as HTMLInputElement;
    input.focus();
    fireEvent.click(input);
    await waitFor(() => getAllByRole('option'));

    fireEvent.keyDown(input, { key: 'ArrowDown' }); // move to second option
    fireEvent.keyDown(input, { key: 'Enter' });

    await waitFor(() => expect(input.value).toBe('Banana'));
  });

  test('clears aria-activedescendant when the dropdown closes', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        improvedA11y
        filterable
        options={adOptions}
        placeholder="Fruit"
      />
    );
    const input = getByPlaceholderText('Fruit') as HTMLInputElement;
    input.focus();
    fireEvent.click(input);
    await waitFor(() => getAllByRole('option'));
    await waitFor(() =>
      expect(input.getAttribute('aria-activedescendant')).toBeTruthy()
    );

    // Selecting a single value closes the dropdown.
    fireEvent.keyDown(input, { key: 'Enter' });
    await waitFor(() =>
      expect(input.getAttribute('aria-activedescendant')).toBeFalsy()
    );
  });

  test('still renders a focusable button option when the flag is off', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select filterable options={adOptions} placeholder="Fruit" />
    );
    const input = getByPlaceholderText('Fruit');
    fireEvent.click(input);
    const optionEls = await waitFor(() => getAllByRole('option'));
    // Legacy behavior: role="option" lives on an inner <button>.
    expect(optionEls[0].tagName).toBe('BUTTON');
  });

  test('highlights the active option with the focus border, not a fill', async () => {
    const { getAllByRole, getByPlaceholderText } = render(
      <Select
        improvedA11y
        filterable
        options={adOptions}
        placeholder="Fruit"
      />
    );
    const input = getByPlaceholderText('Fruit') as HTMLInputElement;
    input.focus();
    fireEvent.click(input);
    await waitFor(() => getAllByRole('option'));

    // On open the first option shows the focus border, not a background fill.
    await waitFor(() =>
      expect(
        getAllByRole('option')[0].classList.contains('active-descendant')
      ).toBe(true)
    );
    expect(getAllByRole('option')[0].classList.contains('active')).toBe(false);

    // Arrow Down moves the border to the next option.
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    await waitFor(() =>
      expect(
        getAllByRole('option')[1].classList.contains('active-descendant')
      ).toBe(true)
    );
    expect(
      getAllByRole('option')[0].classList.contains('active-descendant')
    ).toBe(false);
  });
});
