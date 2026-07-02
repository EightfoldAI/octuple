import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MenuItemButton } from '../MenuItemButton';
import { MenuVariant } from '../../../Menu.types';
import { MenuItemIconAlign } from '../../MenuItem.types';
import { IconName } from '../../../../Icon';

describe('MenuItemButton', () => {
  test('should render regular menuButton when dropdownMenuItems exist but menuRenderer is not provided', () => {
    const { getByRole } = render(
      <MenuItemButton
        text="Test Button"
        dropdownMenuItems={[{ text: 'Item 1' }]}
        menuRenderer={undefined}
        variant={MenuVariant.neutral}
      />
    );

    const button = getByRole('menuitem');
    expect(button).toBeInTheDocument();
  });

  describe('renderAsListItem (Select aria-activedescendant pattern)', () => {
    test('renders the option as an <li> carrying id/role/aria-selected, with no inner button', () => {
      const { container, getByRole } = render(
        <MenuItemButton
          text="Apple"
          role="option"
          id="apple-0"
          aria-selected
          renderAsListItem
          variant={MenuVariant.neutral}
        />
      );

      const option = getByRole('option');
      expect(option.tagName).toBe('LI');
      expect(option).toHaveAttribute('id', 'apple-0');
      expect(option).toHaveAttribute('aria-selected', 'true');
      // The inner <button> is removed in this mode; content sits in a span.
      expect(container.querySelector('button')).toBeNull();
    });

    test('highlights the active option with the active-descendant class, not the active fill', () => {
      const { getByRole } = render(
        <MenuItemButton
          text="Apple"
          role="option"
          id="apple-0"
          active
          renderAsListItem
          variant={MenuVariant.neutral}
        />
      );

      const option = getByRole('option');
      expect(option).toHaveClass('active-descendant');
      expect(option).not.toHaveClass('active');
    });

    test('applies neither active nor active-descendant when not highlighted', () => {
      const { getByRole } = render(
        <MenuItemButton
          text="Apple"
          role="option"
          id="apple-0"
          renderAsListItem
          variant={MenuVariant.neutral}
        />
      );

      const option = getByRole('option');
      expect(option).not.toHaveClass('active');
      expect(option).not.toHaveClass('active-descendant');
    });

    test('fires onClick with the option value when the list item is clicked', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <MenuItemButton
          text="Apple"
          role="option"
          id="apple-0"
          value="apple"
          renderAsListItem
          onClick={onClick}
          variant={MenuVariant.neutral}
        />
      );

      fireEvent.click(getByRole('option'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith('apple', expect.anything());
    });

    test('does not fire onClick when the option is disabled', () => {
      const onClick = jest.fn();
      const { getByRole } = render(
        <MenuItemButton
          text="Apple"
          role="option"
          id="apple-0"
          value="apple"
          disabled
          renderAsListItem
          onClick={onClick}
          variant={MenuVariant.neutral}
        />
      );

      fireEvent.click(getByRole('option'));
      expect(onClick).not.toHaveBeenCalled();
    });

    test('falls back to the legacy button option (with active fill) when renderAsListItem is false', () => {
      const { container } = render(
        <MenuItemButton
          text="Apple"
          role="option"
          active
          variant={MenuVariant.neutral}
        />
      );

      // Legacy DOM: a focusable <button> wrapped in a presentational <li>.
      const button = container.querySelector('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('role', 'option');

      const listItem = container.querySelector('li');
      expect(listItem).toHaveAttribute('role', 'presentation');
      expect(listItem).toHaveClass('active');
      expect(listItem).not.toHaveClass('active-descendant');
    });

    test('renders icon (left and right), counter and subText inside the list item', () => {
      const { getByText, rerender } = render(
        <MenuItemButton
          text="Apple"
          subText="A fruit"
          counter="3"
          role="option"
          id="apple-0"
          iconProps={{ path: IconName.mdiAccount }}
          renderAsListItem
          variant={MenuVariant.neutral}
        />
      );
      expect(getByText('Apple')).toBeInTheDocument();
      expect(getByText('A fruit')).toBeInTheDocument();
      expect(getByText('3')).toBeInTheDocument();

      // Right-aligned icon path renders without error.
      rerender(
        <MenuItemButton
          text="Apple"
          role="option"
          id="apple-0"
          alignIcon={MenuItemIconAlign.Right}
          iconProps={{ path: IconName.mdiAccount }}
          renderAsListItem
          variant={MenuVariant.neutral}
        />
      );
      expect(getByText('Apple')).toBeInTheDocument();
    });
  });
});
