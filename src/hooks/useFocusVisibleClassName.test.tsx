import React, { FC } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useFocusVisibleClassName } from './useFocusVisibleClassName';

const Foo: FC = () => {
  useFocusVisibleClassName(true, document.getElementById('testDiv'));
  return (
    <div id="testDiv" data-testid="testDiv">
      Content
    </div>
  );
};

describe('useFocusVisibleClassName', () => {
  it('initializes with no className', () => {
    render(<Foo />);
    expect(screen.getByTestId('testDiv')).not.toHaveClass('focus-visible');
  });

  it('uses className when keyboard is active', () => {
    render(<Foo />);
    screen.debug();
    fireEvent.keyDown(screen.getByTestId('testDiv'), { KeyboardEvent });
    expect(screen.getByTestId('testDiv')).toHaveClass('focus-visible');
    screen.debug();
  });

  it('uses className when keyboard is active, then does not when mouse is active', () => {
    render(<Foo />);
    screen.debug();
    fireEvent.keyDown(screen.getByTestId('testDiv'), { KeyboardEvent });
    expect(screen.getByTestId('testDiv')).toHaveClass('focus-visible');
    fireEvent.mouseMove(screen.getByTestId('testDiv'), { MouseEvent });
    expect(screen.getByTestId('testDiv')).not.toHaveClass('focus-visible');
    screen.debug();
  });

  it('does not use className when mouse is active', () => {
    render(<Foo />);
    screen.debug();
    fireEvent.mouseMove(screen.getByTestId('testDiv'), { MouseEvent });
    expect(screen.getByTestId('testDiv')).not.toHaveClass('focus-visible');
    screen.debug();
  });
});
