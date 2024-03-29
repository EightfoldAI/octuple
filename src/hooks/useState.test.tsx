import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useSafeState } from './useState';

describe('useSafeState', () => {
  it('not throw', (done) => {
    const errorSpy = jest.spyOn(console, 'error');

    const Demo = () => {
      const [val, setValue] = useSafeState(0);

      React.useEffect(
        () => () => {
          setTimeout(() => {
            setValue(1, true);
          }, 0);
        },
        []
      );

      return (
        <button
          onClick={() => {
            setValue(93, true);
          }}
        >
          {val}
        </button>
      );
    };

    const { container, unmount } = render(
      <React.StrictMode>
        <Demo />
      </React.StrictMode>
    );
    expect(container.querySelector('button').textContent).toEqual('0');

    // Update Value
    fireEvent.click(container.querySelector('button'));
    expect(container.querySelector('button').textContent).toEqual('93');

    unmount();

    setTimeout(() => {
      expect(errorSpy).not.toHaveBeenCalled();
      done();
    }, 50);
  });
});
