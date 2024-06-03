import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { FadeIn } from './';

export default {
  title: 'FadeIn',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>FadeIn</h1>
              <p>A FadeIn allows to render content with a fade in animation.</p>
            </section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
  },
} as ComponentMeta<typeof FadeIn>;

const FadeIn_Story: ComponentStory<typeof FadeIn> = (args) => {
  return (
    <>
      <FadeIn {...args} />
    </>
  );
};

export const Default = FadeIn_Story.bind({});

Default.args = {
  children: <>Hello, I was faded into view.</>,
  classNames: 'my-fadein-classname',
  delay: 0,
  disabled: false,
  duration: 300,
};
