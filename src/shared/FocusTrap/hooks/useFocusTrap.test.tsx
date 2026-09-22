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

  test('setUpFocus sets up the initial focus with the firstFocusableSelector', async () => {
    const { container } = render(
      <FocusTrap firstFocusableSelector=".button-2" trap>
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
    container.focus();
    const secondButton = container.getElementsByClassName('button-2')[0];
    await waitFor(() => expect(secondButton.matches(':focus')).toBe(true));
    expect(secondButton.matches(':focus')).toBe(true);
  });

  test('setUpFocus does not steal focus when the trap activates via focus already inside it', async () => {
    const ExplicitFocusFC = () => {
      const [trap, setTrap] = React.useState(false);
      const secondButtonRef = React.useRef<HTMLButtonElement>(null);
      return (
        <>
          <FocusTrap trap={trap} onFocus={() => setTrap(true)}>
            <>
              <button className="button-1" id="button1">
                Button 1
              </button>
              <button
                className="button-2"
                id="button2"
                ref={secondButtonRef}
              >
                Button 2
              </button>
            </>
          </FocusTrap>
          <button
            className="activate"
            onClick={() => secondButtonRef.current?.focus()}
          >
            Activate
          </button>
        </>
      );
    };
    const { container } = render(<ExplicitFocusFC />);
    // Mirrors a consumer explicitly focusing a non-first element (e.g. to move
    // focus into a dialog for a11y), which is what activates `trap` via `onFocus`.
    fireEvent.click(container.getElementsByClassName('activate')[0]);
    const secondButton = container.getElementsByClassName('button-2')[0];
    // The explicit focus should stick -- `setUpFocus` must not redirect it to
    // the first focusable element just because `trap` turned on.
    await waitFor(() => expect(secondButton.matches(':focus')).toBe(true));
    expect(secondButton.matches(':focus')).toBe(true);
  });
});
