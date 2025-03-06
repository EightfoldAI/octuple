import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BaseTree from '../BaseTree';

describe('BaseTree', () => {
  it('should render tree when draggable is boolean', () => {
    render(<BaseTree draggable />);
    const tree = screen.getByRole('tree');
    expect(tree).toBeInTheDocument();
    expect(tree).toHaveClass('tree-icon-hide');
  });
});
