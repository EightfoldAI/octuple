import React, { FC } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useFocusVisible } from './useFocusVisible';

const Foo: FC = () => {
  const isFocusVisible = useFocusVisible();
  return <div data-testid="testDiv">{`${isFocusVisible}`}</div>;
};

describe('useFocusVisible', () => {
  it('returns default value of false', () => {
    render(<Foo />);
    expect(screen.getByTestId('testDiv')).toHaveTextContent('false');
  });

  it('returns true', () => {
    render(<Foo />);
    screen.debug();
    fireEvent.keyDown(screen.getByTestId('testDiv'), { KeyboardEvent });
    expect(screen.getByTestId('testDiv')).toHaveTextContent('true');
    screen.debug();
  });

  it('returns false after true', () => {
    render(<Foo />);
    screen.debug();
    fireEvent.keyDown(screen.getByTestId('testDiv'), { KeyboardEvent });
    expect(screen.getByTestId('testDiv')).toHaveTextContent('true');
    fireEvent.mouseMove(screen.getByTestId('testDiv'), { MouseEvent });
    expect(screen.getByTestId('testDiv')).toHaveTextContent('false');
    screen.debug();
  });

  it('returns false', () => {
    render(<Foo />);
    screen.debug();
    fireEvent.mouseMove(screen.getByTestId('testDiv'), { MouseEvent });
    expect(screen.getByTestId('testDiv')).toHaveTextContent('false');
    screen.debug();
  });
});
