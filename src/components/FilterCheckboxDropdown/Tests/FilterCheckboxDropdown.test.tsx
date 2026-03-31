import React from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { render, screen, fireEvent } from '../../../tests/Utilities';
import '@testing-library/jest-dom';
import { FilterCheckboxDropdown } from '..';

let matchMedia: MatchMediaMock;

beforeAll(() => {
  matchMedia = new MatchMediaMock();
});

afterEach(() => {
  matchMedia.clear();
});

const options = [
  { label: 'Option one', value: 'one' },
  { label: 'Option two', value: 'two' },
  { label: 'Option three', value: 'three' },
];

describe('FilterCheckboxDropdown', () => {
  test('renders the trigger button with the label', () => {
    const { container } = render(
      <FilterCheckboxDropdown label="Filter" options={options} />
    );
    expect(screen.getByRole('button', { name: /filter/i })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('panel is not visible on initial render', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('opens panel on trigger click and sets aria-expanded=true', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    const trigger = screen.getByRole('button', { name: /filter/i });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('closes panel on second trigger click and sets aria-expanded=false', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    const trigger = screen.getByRole('button', { name: /filter/i });
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('aria-controls on trigger matches the panel id', () => {
    render(<FilterCheckboxDropdown id="f1" label="Filter" options={options} />);
    const trigger = screen.getByRole('button', { name: /filter/i });
    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-controls')).toBe(
      screen.getByRole('dialog').id
    );
  });

  test('panel has role="dialog" labeled by the legend', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    expect(screen.getByRole('dialog', { name: /filter/i })).toBeInTheDocument();
  });

  test('panel has no role="listbox"', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('checkboxes are grouped inside a fieldset with legend', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    expect(screen.getByRole('group', { name: /filter/i })).toBeInTheDocument();
  });

  test('checkboxes render with correct labels and no role="option"', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    expect(
      screen.getByRole('checkbox', { name: 'Option one' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Option two' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
  });

  test('checkbox selection calls onChange with correct values', () => {
    const onChange = jest.fn();
    render(
      <FilterCheckboxDropdown
        label="Filter"
        options={options}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Option one' }));
    expect(onChange).toHaveBeenCalledWith(['one']);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Option two' }));
    expect(onChange).toHaveBeenCalledWith(['one', 'two']);
  });

  test('clicking outside closes the panel and resets selections', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: 'Option one' }));
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    expect(
      screen.getByRole('checkbox', { name: 'Option one' })
    ).not.toBeChecked();
  });

  test('Escape key closes the panel and returns focus to trigger', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('Tab from last element closes panel without refocusing trigger', async () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Tab' });
    screen.getByRole('button', { name: /filter/i }).focus();
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('disabled trigger cannot open the panel', () => {
    render(
      <FilterCheckboxDropdown label="Filter" options={options} disabled />
    );
    const trigger = screen.getByRole('button', { name: /filter/i });
    expect(trigger).toBeDisabled();
    fireEvent.click(trigger);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('controlled mode: respects selectedValues prop', () => {
    render(
      <FilterCheckboxDropdown
        label="Filter"
        options={options}
        selectedValues={['two']}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /filter/i }));
    expect(screen.getByRole('checkbox', { name: 'Option two' })).toBeChecked();
    expect(
      screen.getByRole('checkbox', { name: 'Option one' })
    ).not.toBeChecked();
  });

  test('trigger has no aria-haspopup and no role="combobox"', () => {
    render(<FilterCheckboxDropdown label="Filter" options={options} />);
    const trigger = screen.getByRole('button', { name: /filter/i });
    expect(trigger).not.toHaveAttribute('aria-haspopup');
    expect(trigger).not.toHaveAttribute('role', 'combobox');
  });
});
