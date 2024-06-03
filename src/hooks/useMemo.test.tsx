import React from 'react';
import { render } from '@testing-library/react';
import { useMemo } from './useMemo';

let disableUseId = false;

jest.mock('react', () => {
  const react = jest.requireActual('react');

  const clone = { ...react };

  Object.defineProperty(clone, 'useId', {
    get: () => (disableUseId ? undefined : react.useId),
  });

  return clone;
});

describe('hooks', () => {
  it('useMemo', () => {
    const FC = (props: { open: any; data: any }) => {
      const { open, data } = props;
      const memoData = useMemo(
        () => data,
        [open, data],
        (prev, next) => next[0] && prev[1] !== next[1]
      );
      return <div>{memoData}</div>;
    };

    const { container, rerender } = render(<FC data="open" open />);
    expect(container.querySelector('div').textContent).toEqual('open');

    rerender(<FC data="again" open />);
    expect(container.querySelector('div').textContent).toEqual('again');

    rerender(<FC data="close" open={false} />);
    expect(container.querySelector('div').textContent).toEqual('again');

    rerender(<FC data="repeat" open />);
    expect(container.querySelector('div').textContent).toEqual('repeat');
  });
});
