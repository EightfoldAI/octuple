import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { FocusTrap } from '../FocusTrap';

describe('useFocusTrap', () => {
  const FC = () => {
    return (
      <FocusTrap trap>
        <>
          <button className="button-1" id="button1">
            Button 1
          </button>
          <button className="button-2" id="button2">
            Button 2
          </button>
        </>
      </FocusTrap>
    );
  };

  test('handleFocus moves focus to the first focusable element when Tab is pressed', async () => {
    const { container } = render(<FC />);
    container.focus();
    const firstButton = container.getElementsByClassName('button-1')[0];
    await waitFor(() => expect(firstButton.matches(':focus')).toBe(true));
    fireEvent.keyDown(container, { key: 'Tab' });
    expect(firstButton.matches(':focus')).toBe(true);
  });

  test('handleFocus moves focus to the last focusable element when Shift + Tab is pressed', async () => {
    const { container } = render(<FC />);
    container.focus();
    const firstButton = container.getElementsByClassName('button-1')[0];
    await waitFor(() => expect(firstButton.matches(':focus')).toBe(true));
    fireEvent.keyDown(container, { key: 'Tab' });
    expect(firstButton.matches(':focus')).toBe(true);
    fireEvent.keyDown(firstButton, { key: 'Tab', shiftKey: true });
    const lastButton = container.getElementsByClassName('button-2')[0];
    expect(lastButton.matches(':focus')).toBe(true);
  });

  test('setUpFocus sets up the initial focus', async () => {
    const { container } = render(<FC />);
    container.focus();
    const firstButton = container.getElementsByClassName('button-1')[0];
    await waitFor(() => expect(firstButton.matches(':focus')).toBe(true));
    expect(firstButton.matches(':focus')).toBe(true);
  });
});
