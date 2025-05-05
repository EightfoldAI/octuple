import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InlineSvg } from './';
import { SkeletonVariant } from '../Skeleton/Skeleton.types';
import {
  AiAgent,
  AiAgentSmall,
  AiAgentMedium,
  AiAgentLarge,
  AiAgentOutline,
  AiAgentGradient,
} from './SVG';

export default {
  title: 'InlineSvg',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>InlineSvg</h1>
              <p>
                InlineSvg is used to render an SVG image inline, allowing it to
                be styled using classes and css variables. This enables svgs to
                be leveraged in a themable way, reacting to changes to css
                variables.
              </p>
            </section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
  },
  argTypes: {},
} as ComponentMeta<typeof InlineSvg>;

const InlineSvg_Story: ComponentStory<typeof InlineSvg> = (args) => (
  <InlineSvg {...args} />
);

export const Default = InlineSvg_Story.bind({});

Default.args = {
  classNames: 'my-inline-svg',
  height: '120px',
  hideBrokenIcon: false,
  showSkeleton: true,
  skeletonVariant: SkeletonVariant.Rounded,
  url: 'https://static.vscdn.net/images/learning-opp.svg',
  width: '120px',
};

// AI Agent Component Stories
export const AiAgentComponents = () => {
  // Define sizes and variants for the matrix display
  const sizes = ['small', 'medium', 'large'] as const;
  const variants = ['solid', 'outline', 'gradient'] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3>Predefined Components</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h4>Size Variants</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <p>Small</p>
                <AiAgentSmall />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>Medium</p>
                <AiAgentMedium />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>Large</p>
                <AiAgentLarge />
              </div>
            </div>
          </div>

          <div>
            <h4>Style Variants</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <p>Solid</p>
                <AiAgent variant="solid" />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>Outline</p>
                <AiAgentOutline />
              </div>
              <div style={{ textAlign: 'center' }}>
                <p>Gradient</p>
                <AiAgentGradient />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3>All Combinations Matrix</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ padding: '8px', textAlign: 'left' }}>
                Size / Variant
              </th>
              {variants.map((variant) => (
                <th
                  key={variant}
                  style={{ padding: '8px', textAlign: 'center' }}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sizes.map((size) => (
              <tr key={size}>
                <td style={{ padding: '8px', fontWeight: 'bold' }}>
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </td>
                {variants.map((variant) => (
                  <td
                    key={`${size}-${variant}`}
                    style={{ padding: '16px', textAlign: 'center' }}
                  >
                    <AiAgent size={size} variant={variant} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3>Custom Usage Examples</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <p>Large Gradient</p>
            <AiAgent size="large" variant="gradient" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p>Medium Outline with Custom Class</p>
            <AiAgent
              classNames="custom-ai-agent"
              size="medium"
              variant="outline"
            />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p>Small Solid</p>
            <AiAgent size="small" variant="solid" />
          </div>
        </div>
      </div>
    </div>
  );
};
