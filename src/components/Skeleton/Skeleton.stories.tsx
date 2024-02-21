import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Skeleton } from './Skeleton';
import {
  SkeletonAnimation,
  SkeletonProps,
  SkeletonVariant,
} from './Skeleton.types';
import { Stack } from '../Stack';
import { Button } from '../Button';

export default {
  title: 'Skeleton',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section></section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
  },
  argTypes: {
    animation: {
      options: [SkeletonAnimation.Pulse, SkeletonAnimation.Wave],
      control: { type: 'inline-radio' },
    },
    variant: {
      options: [
        SkeletonVariant.Circular,
        SkeletonVariant.Rounded,
        SkeletonVariant.Pill,
        SkeletonVariant.Rectangular,
        SkeletonVariant.ButtonSmall,
        SkeletonVariant.ButtonMedium,
        SkeletonVariant.ButtonLarge,
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Skeleton>;

const Default_Story: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

const Child_Wrapper_Story: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args}>
    <Button text={'Sample button'} />
  </Skeleton>
);

const Sample_Usage_Story: ComponentStory<typeof Skeleton> = (args) => (
  <Stack direction="vertical" flexGap="xs" style={{ width: 210 }}>
    <Skeleton
      width={210}
      height={10}
      variant={SkeletonVariant.Rounded}
      {...args}
    />
    <Skeleton
      width={40}
      height={40}
      variant={SkeletonVariant.Circular}
      {...args}
    />
    <Skeleton width={210} height={60} {...args} />
    <Skeleton width={210} height={60} {...args} />
    <Stack justify="flex-end" gap="xs" fullWidth>
      <Skeleton width={60} variant={SkeletonVariant.ButtonSmall} {...args} />
      <Skeleton width={60} variant={SkeletonVariant.ButtonSmall} {...args} />
    </Stack>
  </Stack>
);

export const Default = Default_Story.bind({});
export const Child_Wrapper = Child_Wrapper_Story.bind({});
export const Sample_Usage = Sample_Usage_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = ['Default', 'Child_Wrapper', 'Sample_Usage'];

const skeletonArgs: SkeletonProps = {
  animating: true,
  animation: SkeletonAnimation.Wave,
};

Default.args = {
  ...skeletonArgs,
  width: 80,
  height: 80,
  fullWidth: false,
  variant: SkeletonVariant.Rectangular,
};

Child_Wrapper.args = {
  ...skeletonArgs,
  variant: SkeletonVariant.Pill,
};

Sample_Usage.args = {
  ...skeletonArgs,
};
