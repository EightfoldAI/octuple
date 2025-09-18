import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { StoryFn, Meta } from '@storybook/react';
import { InlineSvg } from './';
import { SkeletonVariant } from '../Skeleton/Skeleton.types';

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
} as Meta<typeof InlineSvg>;

const InlineSvg_Story: StoryFn<typeof InlineSvg> = (args) => (
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
