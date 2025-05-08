import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MenuItemButton } from '../MenuItemButton';
import { MenuVariant } from '../../../Menu.types';

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
});
