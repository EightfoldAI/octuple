import React from 'react';
import { Link } from '../Link';
import { Stack } from '../../Stack';

/**
 * @name Navbar Username Link Demo
 * @description This demo showcases the use of the `highContrastFocus` prop on a `Link`
 * component within a simulated navbar setting.
 *
 * ## Accessibility Concern Addressed
 *
 * In scenarios like a navbar with a colored background (e.g., blue), standard focus
 * indicators might not provide sufficient contrast, making it difficult for users
 * with low vision or those relying on keyboard navigation to identify the focused
 * element. The `highContrastFocus` prop ensures that the focus indicator (e.g., a
 * bright white outline) is clearly visible against such backgrounds, enhancing
 * accessibility.
 *
 * The username link in this demo uses `highContrastFocus={true}` to demonstrate
 * how to provide a more visible focus state when the default focus color
 * (e.g., purple) might blend with the background.
 */
const NavbarUsernameLinkDemo: React.FC = () => {
  const navbarStyle: React.CSSProperties = {
    backgroundColor: 'var(--primary-color-70)', // A blue background, similar to the issue description
    padding: '16px',
    borderRadius: '8px',
    color: 'white', // Text color for contrast with blue background
  };

  const usernameStyle: React.CSSProperties = {
    color: 'white', // Ensuring username text is white for contrast
    fontSize: '18px',
    fontWeight: 'bold',
  };

  return (
    <Stack direction="vertical" gap="m">
      <p>
        The Link component below simulates a username link in a navbar with a
        blue background.
      </p>
      <p>
        Tab to the &quot;Username&quot; link to observe the high-contrast focus
        indicator.
      </p>
      <div style={navbarStyle}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            My App
          </span>
          {/*
           * This Link component represents a username in a navbar.
           * - `variant="primary"` is used for styling, but its default focus color
           *   might not be visible enough on a blue background.
           * - `highContrastFocus={true}` is applied to ensure the focus indicator
           *   (e.g., a white outline) has sufficient contrast against the
           *   `--primary-color-70` (blue) background of the navbar.
           *   This directly addresses the accessibility issue of low contrast focus.
           */}
          <Link
            href="#"
            variant="primary" // Using primary as an example, text color will be white due to parent styling
            highContrastFocus={true}
            style={usernameStyle} // Apply white color to the link text itself
          >
            Username
          </Link>
        </Stack>
      </div>
      <div>
        <h3>Explanation:</h3>
        <p>
          The <code>highContrastFocus</code> prop on the <code>Link</code>{' '}
          component is crucial for accessibility in this context.
        </p>
        <p>
          When a link is on a colored background (like the blue navbar above),
          the default focus indicator might not have enough contrast to be
          easily visible, especially for users with visual impairments.
        </p>
        <p>
          By setting <code>highContrastFocus={true}</code>, the link will use a
          more prominent focus style (e.g., a white outline) when it receives
          keyboard focus. This ensures that keyboard navigators can clearly see
          which element is active.
        </p>
      </div>
    </Stack>
  );
};

export default NavbarUsernameLinkDemo;
