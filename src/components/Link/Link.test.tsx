import React, { FC } from 'react';
import MatchMediaMock from 'jest-matchmedia-mock';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Link, LinkProps } from './';
import { IconName } from '../Icon';
import { postérieur } from '../../shared/utilities/Posterior';

let matchMedia: any;

describe('Link', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });

  afterEach(() => {
    matchMedia.clear();
  });

  test('Link renders', () => {
    const { container } = render(<Link>Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toBeTruthy();
    expect(link?.tagName).toBe('A');
  });

  test('Link renders as a link', () => {
    const { container } = render(<Link>Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link?.tagName).toBe('A');
  });

  test('Link renders with an href', () => {
    const { container } = render(<Link href="#">Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toHaveAttribute('href', '#');
  });

  test('Link renders with a target', () => {
    const { container } = render(
      <Link href="#" target="_blank">
        Test link
      </Link>
    );
    const link = container.querySelector('.link-style');
    expect(link).toHaveAttribute('target', '_blank');
  });

  test('Link renders with a rel when target is _blank', () => {
    const { container } = render(
      <Link href="#" target="_blank">
        Test link
      </Link>
    );
    const link = container.querySelector('.link-style');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('Link renders without a rel when target is not _blank', () => {
    const { container } = render(
      <Link href="#" target="_self">
        Test link
      </Link>
    );
    const link = container.querySelector('.link-style');
    expect(link).not.toHaveAttribute('rel');
  });

  test('Link renders with a default variant', () => {
    const { container } = render(<Link>Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).not.toHaveClass('neutral');
    expect(link).not.toHaveClass('primary');
    expect(link).not.toHaveClass('secondary');
    expect(link).not.toHaveClass('disruptive');
  });

  test('Link renders with a neutral variant', () => {
    const { container } = render(<Link variant="neutral">Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toHaveClass('neutral');
  });

  test('Link renders with a primary variant', () => {
    const { container } = render(<Link variant="primary">Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toHaveClass('primary');
  });

  test('Link renders with a secondary variant', () => {
    const { container } = render(<Link variant="secondary">Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toHaveClass('secondary');
  });

  test('Link renders with a disruptive variant', () => {
    const { container } = render(<Link variant="disruptive">Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toHaveClass('disruptive');
  });

  test('Link renders as disabled', () => {
    const { container } = render(<Link disabled>Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toHaveClass('disabled');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  test('Link renders with an underline', () => {
    const { container } = render(<Link underline>Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toHaveClass('underline');
  });

  test('Link renders with an onClick', () => {
    const onClick = jest.fn();
    const { container } = render(<Link onClick={onClick}>Test link</Link>);
    const link = container.querySelector('.link-style');
    fireEvent.click(link!);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('Link does not fire onClick when disabled', () => {
    const onClick = jest.fn();
    const { container } = render(
      <Link disabled onClick={onClick}>
        Test link
      </Link>
    );
    const link = container.querySelector('.link-style');
    fireEvent.click(link!);
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  test('Link renders with custom class names', () => {
    const { container } = render(
      <Link classNames="custom-class">Test link</Link>
    );
    const link = container.querySelector('.link-style');
    expect(link).toHaveClass('custom-class');
  });

  test('Link renders with a data-test-id', () => {
    const { container } = render(
      <Link data-test-id="test-id">Test link</Link>
    );
    const link = container.querySelector('.link-style');
    expect(link).toHaveAttribute('data-test-id', 'test-id');
  });

  test('Link renders with highContrastFocus class when prop is true', () => {
    const { container } = render(<Link highContrastFocus>Test link</Link>);
    const link = container.querySelector('.link-style');
    expect(link).toHaveClass('highContrastFocus');
  });

  test('Link does not render with highContrastFocus class when prop is false or undefined', () => {
    const { container: containerFalse } = render(
      <Link highContrastFocus={false}>Test link false</Link>
    );
    const linkFalse = containerFalse.querySelector('.link-style');
    expect(linkFalse).not.toHaveClass('highContrastFocus');

    const { container: containerUndefined } = render(
      <Link>Test link undefined</Link>
    );
    const linkUndefined = containerUndefined.querySelector('.link-style');
    expect(linkUndefined).not.toHaveClass('highContrastFocus');
  });

  describe('Posterior enabled', () => {
    beforeAll(() => {
      postérieur.enabled(true);
    });
    afterAll(() => {
      postérieur.enabled(false);
    });
    test('Link renders with focus-visible class on keyboard focus', async () => {
      const { getByText } = render(<Link>Test link</Link>);
      const linkElement = getByText('Test link');

      // Simulate keyboard focus
      fireEvent.focus(linkElement);
      // Simulate a keydown event to trigger focus-visible logic
      fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });

      await waitFor(() => {
        expect(linkElement.parentElement).toHaveClass('focus-visible');
      });

      // Simulate blur
      fireEvent.blur(linkElement);
      await waitFor(() => {
        expect(linkElement.parentElement).not.toHaveClass('focus-visible');
      });
    });

    test('Link with highContrastFocus renders with focus-visible and highContrastFocus classes on keyboard focus', async () => {
      const { getByText } = render(<Link highContrastFocus>Test link</Link>);
      const linkElement = getByText('Test link');

      // Simulate keyboard focus
      fireEvent.focus(linkElement);
      // Simulate a keydown event to trigger focus-visible logic
      fireEvent.keyDown(document, { key: 'Tab', code: 'Tab' });

      await waitFor(() => {
        expect(linkElement.parentElement).toHaveClass('focus-visible');
        expect(linkElement).toHaveClass('highContrastFocus'); // The class is on the <a> tag itself
      });

      // Simulate blur
      fireEvent.blur(linkElement);
      await waitFor(() => {
        expect(linkElement.parentElement).not.toHaveClass('focus-visible');
      });
    });
  });
});
