import '@testing-library/jest-dom/extend-expect';

import { render, waitFor } from '@testing-library/react';
import React from 'react';

import { InlineSvg } from './InlineSvg';
import {
  AiAgent,
  AiAgentSmall,
  AiAgentMedium,
  AiAgentLarge,
  AiAgentOutline,
  AiAgentGradient,
} from './SVG';

describe('InlineSvg', () => {
  const url = 'https://static.vscdn.net/images/learning-opp.svg';
  const width = '300px';
  const height = '200px';

  test('renders a skeleton while loading the SVG image if enabled', async () => {
    const { container } = render(
      <InlineSvg url={url} width={width} height={height} showSkeleton />
    );
    const skeleton = container.querySelector('.skeleton.wave.rounded');
    expect(skeleton).toBeInTheDocument();
  });

  test('renders the SVG image', async () => {
    const { container } = render(
      <InlineSvg url={url} width={width} height={height} />
    );

    await waitFor(() => {
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  test('renders an error icon when the SVG image fails to load', async () => {
    const errorUrl = 'https://example.com/broken.svg';
    // Mock fetch to simulate a failed request
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    ) as jest.Mock;

    const { container } = render(
      <InlineSvg url={errorUrl} width={width} height={height} />
    );

    // Wait for error state to be set and component to re-render
    await waitFor(
      () => {
        expect(
          container.querySelector('.svg-display-error-icon')
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('Should call fetchSvg only once', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ text: () => '<svg>Mock SVG</svg>' })
    ) as jest.Mock;

    const { rerender } = render(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test('Should call fetchSvg twice', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ text: () => '<svg>Mock SVG</svg>' })
    ) as jest.Mock;

    const { rerender } = render(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url" />);
    rerender(<InlineSvg url="mock-url-diff" />);
    rerender(<InlineSvg url="mock-url-diff" />);
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });
});

describe('AiAgent', () => {
  // Base component tests
  describe('Base AiAgent component', () => {
    test('renders with default props', () => {
      const { container } = render(<AiAgent />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent');
      expect(svg).toHaveClass('ai-agent-medium');
      expect(svg).toHaveClass('ai-agent-gradient');
      expect(svg?.getAttribute('width')).toBe('30');
      expect(svg?.getAttribute('height')).toBe('27');
    });

    test('renders with small size', () => {
      const { container } = render(<AiAgent size="small" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-small');
      expect(svg?.getAttribute('width')).toBe('20');
      expect(svg?.getAttribute('height')).toBe('18');
    });

    test('renders with large size', () => {
      const { container } = render(<AiAgent size="large" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-large');
      expect(svg?.getAttribute('width')).toBe('40');
      expect(svg?.getAttribute('height')).toBe('36');
    });

    test('renders with solid variant', () => {
      const { container } = render(<AiAgent variant="solid" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-solid');

      // Solid variant should have a path with fill="#1A212E"
      const mainPath = container.querySelector('path[fill="#1A212E"]');
      expect(mainPath).toBeInTheDocument();

      // Solid variant should have paths with fill="#ffffff" for the inner details
      const innerPaths = container.querySelectorAll('path[fill="#ffffff"]');
      expect(innerPaths.length).toBeGreaterThan(0);
    });

    test('renders with outline variant', () => {
      const { container } = render(<AiAgent variant="outline" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-outline');

      // Outline variant should have paths with stroke="#1A212E" and fill="none"
      const outlinePath = container.querySelector(
        'path[stroke="#1A212E"][fill="none"]'
      );
      expect(outlinePath).toBeInTheDocument();
    });

    test('renders with gradient variant', () => {
      const { container } = render(<AiAgent variant="gradient" />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-gradient');

      // Gradient variant should have linearGradient definitions
      const gradientDefs = container.querySelectorAll('linearGradient');
      expect(gradientDefs.length).toBeGreaterThan(0);

      // Should have paths using the gradient fills
      const gradientPath = container.querySelector(
        'path[fill="url(#paint0_linear_agent)"]'
      );
      expect(gradientPath).toBeInTheDocument();
    });

    test('renders with custom className', () => {
      const customClass = 'my-custom-class';
      const { container } = render(<AiAgent classNames={customClass} />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass(customClass);
    });

    test('renders with combined props', () => {
      const { container } = render(
        <AiAgent size="large" variant="solid" classNames="test-class" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-large');
      expect(svg).toHaveClass('ai-agent-solid');
      expect(svg).toHaveClass('test-class');
      expect(svg?.getAttribute('width')).toBe('40');
      expect(svg?.getAttribute('height')).toBe('36');
    });
  });

  // Size variant component tests
  describe('Size variant components', () => {
    test('AiAgentSmall renders correctly', () => {
      const { container } = render(<AiAgentSmall />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-small');
      expect(svg?.getAttribute('width')).toBe('20');
      expect(svg?.getAttribute('height')).toBe('18');
    });

    test('AiAgentMedium renders correctly', () => {
      const { container } = render(<AiAgentMedium />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-medium');
      expect(svg?.getAttribute('width')).toBe('30');
      expect(svg?.getAttribute('height')).toBe('27');
    });

    test('AiAgentLarge renders correctly', () => {
      const { container } = render(<AiAgentLarge />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-large');
      expect(svg?.getAttribute('width')).toBe('40');
      expect(svg?.getAttribute('height')).toBe('36');
    });
  });

  // Style variant component tests
  describe('Style variant components', () => {
    test('AiAgentOutline renders correctly', () => {
      const { container } = render(<AiAgentOutline />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-outline');

      // Outline variant should have paths with stroke="#1A212E" and fill="none"
      const outlinePath = container.querySelector(
        'path[stroke="#1A212E"][fill="none"]'
      );
      expect(outlinePath).toBeInTheDocument();
    });

    test('AiAgentGradient renders correctly', () => {
      const { container } = render(<AiAgentGradient />);
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('ai-agent-gradient');

      // Gradient variant should have linearGradient definitions
      const gradientDefs = container.querySelectorAll('linearGradient');
      expect(gradientDefs.length).toBeGreaterThan(0);

      // Should have paths using the gradient fills
      const gradientPath = container.querySelector(
        'path[fill="url(#paint0_linear_agent)"]'
      );
      expect(gradientPath).toBeInTheDocument();
    });
  });

  // Test all combinations of size and variant
  describe('Size and variant combinations', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    const variants = ['solid', 'outline', 'gradient'] as const;

    sizes.forEach((size) => {
      variants.forEach((variant) => {
        test(`renders with size=${size} and variant=${variant}`, () => {
          const { container } = render(
            <AiAgent size={size} variant={variant} />
          );
          const svg = container.querySelector('svg');
          expect(svg).toBeInTheDocument();
          expect(svg).toHaveClass(`ai-agent-${size}`);
          expect(svg).toHaveClass(`ai-agent-${variant}`);

          // Check dimensions based on size
          const dimensions = {
            small: { width: '20', height: '18' },
            medium: { width: '30', height: '27' },
            large: { width: '40', height: '36' },
          };
          expect(svg?.getAttribute('width')).toBe(dimensions[size].width);
          expect(svg?.getAttribute('height')).toBe(dimensions[size].height);

          // Check variant-specific elements
          if (variant === 'solid') {
            const mainPath = container.querySelector('path[fill="#1A212E"]');
            expect(mainPath).toBeInTheDocument();
          } else if (variant === 'outline') {
            const outlinePath = container.querySelector(
              'path[stroke="#1A212E"][fill="none"]'
            );
            expect(outlinePath).toBeInTheDocument();
          } else if (variant === 'gradient') {
            const gradientDefs = container.querySelectorAll('linearGradient');
            expect(gradientDefs.length).toBeGreaterThan(0);
          }
        });
      });
    });
  });
});
