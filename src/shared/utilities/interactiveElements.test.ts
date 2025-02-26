import { interactWithFirstInteractiveElement } from './interactiveElements';
import { SELECTORS } from './types';

describe('interactWithFirstInteractiveElement', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(container);
  });

  test('should return false if container is null', () => {
    expect(
      interactWithFirstInteractiveElement(null as unknown as HTMLElement)
    ).toBe(false);
  });

  test('should click on checkbox inputs', () => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const clickSpy = jest.spyOn(checkbox, 'click');

    container.appendChild(checkbox);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(clickSpy).toHaveBeenCalled();
  });

  test('should click on button elements', () => {
    const button = document.createElement('button');
    const clickSpy = jest.spyOn(button, 'click');

    container.appendChild(button);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(clickSpy).toHaveBeenCalled();
  });

  test('should focus on text input elements', () => {
    const input = document.createElement('input');
    input.type = 'text';
    const focusSpy = jest.spyOn(input, 'focus');

    container.appendChild(input);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(focusSpy).toHaveBeenCalled();
  });

  test('should click on anchor elements with href', () => {
    const anchor = document.createElement('a');
    anchor.href = '#test';
    const clickSpy = jest.spyOn(anchor, 'click');

    container.appendChild(anchor);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(clickSpy).toHaveBeenCalled();
  });

  test('should focus on textarea elements', () => {
    const textarea = document.createElement('textarea');
    const focusSpy = jest.spyOn(textarea, 'focus');

    container.appendChild(textarea);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(focusSpy).toHaveBeenCalled();
  });

  test('should toggle details elements', () => {
    const details = document.createElement('details');

    container.appendChild(details);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(details.open).toBe(true);
  });

  test('should focus on elements with tabindex', () => {
    const div = document.createElement('div');
    div.setAttribute('tabindex', '0');
    const focusSpy = jest.spyOn(div, 'focus');

    container.appendChild(div);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(focusSpy).toHaveBeenCalled();
  });

  test('should not interact with elements with tabindex="-1"', () => {
    const div = document.createElement('div');
    div.setAttribute('tabindex', '-1');
    const focusSpy = jest.spyOn(div, 'focus');

    container.appendChild(div);

    // Add a button to ensure we have an interactive element
    const button = document.createElement('button');
    const buttonClickSpy = jest.spyOn(button, 'click');
    container.appendChild(button);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(focusSpy).not.toHaveBeenCalled();
    expect(buttonClickSpy).toHaveBeenCalled();
  });

  test('should respect priority order of interactive elements', () => {
    // Create elements in reverse priority order
    const tabIndexDiv = document.createElement('div');
    tabIndexDiv.setAttribute('tabindex', '0');
    const tabIndexFocusSpy = jest.spyOn(tabIndexDiv, 'focus');

    const textarea = document.createElement('textarea');
    const textareaFocusSpy = jest.spyOn(textarea, 'focus');

    const anchor = document.createElement('a');
    anchor.href = '#test';
    const anchorClickSpy = jest.spyOn(anchor, 'click');

    const button = document.createElement('button');
    const buttonClickSpy = jest.spyOn(button, 'click');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const checkboxClickSpy = jest.spyOn(checkbox, 'click');

    // Add elements to container in reverse priority order
    container.appendChild(tabIndexDiv);
    container.appendChild(textarea);
    container.appendChild(anchor);
    container.appendChild(button);
    container.appendChild(checkbox);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    // Checkbox should be clicked as it has highest priority
    expect(checkboxClickSpy).toHaveBeenCalled();
    // Other elements should not be interacted with
    expect(buttonClickSpy).not.toHaveBeenCalled();
    expect(anchorClickSpy).not.toHaveBeenCalled();
    expect(textareaFocusSpy).not.toHaveBeenCalled();
    expect(tabIndexFocusSpy).not.toHaveBeenCalled();
  });

  test('should use SELECTORS as fallback when no specific interactive element is found', () => {
    // Create a custom element that matches SELECTORS but not the specific selectors
    const iframe = document.createElement('iframe');
    const focusSpy = jest.spyOn(iframe, 'focus');

    container.appendChild(iframe);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(focusSpy).toHaveBeenCalled();
  });

  test('should click on container itself if no interactive element is found', () => {
    // Create a div with no interactive elements
    const clickSpy = jest.spyOn(container, 'click');

    // Mock querySelector to return null for all selectors
    const originalQuerySelector = container.querySelector;
    container.querySelector = jest.fn().mockReturnValue(null);

    const result = interactWithFirstInteractiveElement(container);

    expect(result).toBe(true);
    expect(clickSpy).toHaveBeenCalled();

    // Restore original querySelector
    container.querySelector = originalQuerySelector;
  });
});
