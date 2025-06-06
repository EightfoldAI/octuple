import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Example } from './Example';
import { ExampleProps } from './Example.types';

describe('Example Component', () => {
  // Basic rendering test
  test('renders without crashing', () => {
    render(<Example>Example Content</Example>);
    const element = screen.getByTestId('example');
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent('Example Content');
  });

  // Test different variants
  test.each([
    ['default', 'default'],
    ['primary', 'primary'],
    ['secondary', 'secondary'],
    ['accent', 'accent'],
  ])('renders %s variant correctly', (name, variant) => {
    render(<Example variant={variant as ExampleProps['variant']}>Test</Example>);
    const element = screen.getByTestId('example');
    expect(element).toHaveClass(variant);
  });

  // Test disabled state
  test('applies disabled class when disabled prop is true', () => {
    render(<Example disabled>Disabled Example</Example>);
    const element = screen.getByTestId('example');
    expect(element).toHaveClass('disabled');
  });

  // Test custom className
  test('applies custom className', () => {
    render(<Example className="custom-class">With Custom Class</Example>);
    const element = screen.getByTestId('example');
    expect(element).toHaveClass('custom-class');
  });

  // Test custom styles
  test('applies custom styles', () => {
    const customStyle = { color: 'red', backgroundColor: 'blue' };
    render(<Example style={customStyle}>With Custom Style</Example>);
    const element = screen.getByTestId('example');
    expect(element).toHaveStyle('color: red');
    expect(element).toHaveStyle('background-color: blue');
  });

  // Test custom ID
  test('applies custom id', () => {
    render(<Example id="custom-id">With Custom ID</Example>);
    const element = screen.getByTestId('example');
    expect(element).toHaveAttribute('id', 'custom-id');
  });

  // Test custom data-testid
  test('applies custom data-testid', () => {
    render(<Example dataTestId="custom-test-id">With Custom Test ID</Example>);
    const element = screen.getByTestId('custom-test-id');
    expect(element).toBeInTheDocument();
  });

  // Test with complex children
  test('renders with complex children', () => {
    render(
      <Example>
        <div data-testid="child-div">
          <h3>Title</h3>
          <p>Paragraph</p>
        </div>
      </Example>
    );
    const childDiv = screen.getByTestId('child-div');
    expect(childDiv).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Paragraph')).toBeInTheDocument();
  });

  // Test RTL direction
  test('applies dir attribute', () => {
    render(<Example>RTL Test</Example>);
    const element = screen.getByTestId('example');
    expect(element).toHaveAttribute('dir');
  });
});
