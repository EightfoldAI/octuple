import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Carousel, Slide } from './';

export default {
  title: 'Carousel',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Carousel slide mode</h1>
              <p>
                A Carousel is a slideshow for cycling within a group of content.
                It runs with a group of images, text, or html elements and
                incorporates support for previous/next buttons. Carousel sliders
                don't automatically normalize slide dimensions. Use extra
                utilities or custom methods to properly size content.
              </p>
              <h1>Carousel scroll mode</h1>
              <p>
                A horizontal scrolling menu component that accepts mapped items
                and incorporates support for previous/next buttons.
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
} as ComponentMeta<typeof Carousel>;

const Slide_Story: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args}>
    <Slide>
      <div
        style={{
          background: 'var(--grey-color-20)',
          height: 400,
          width: '100%',
        }}
      ></div>
    </Slide>
    <Slide>
      <div
        style={{
          background: 'var(--green-color-20)',
          height: 400,
          width: '100%',
        }}
      ></div>
    </Slide>
    <Slide>
      <div
        style={{
          background: 'var(--violet-color-20)',
          height: 400,
          width: '100%',
        }}
      ></div>
    </Slide>
    <Slide>
      <div
        style={{
          background: 'var(--blue-color-20)',
          height: 400,
          width: '100%',
        }}
      ></div>
    </Slide>
  </Carousel>
);

interface SampleItem {
  name: string;
  key: string;
}

const sampleList: SampleItem[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24,
].map((i) => ({
  name: `Item ${i}`,
  key: `key-${i}`,
}));

const Scroll_Story: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

export const Slider = Slide_Story.bind({});
export const Scroller = Scroll_Story.bind({});

const carouselArgs: Object = {
  classNames: 'my-carousel',
  controls: true,
  pagination: true,
  'data-test-id': 'myCarouselTestyId',
};

Slider.args = {
  ...carouselArgs,
  activeIndex: 0,
  auto: true,
  id: 'myCarouselSlideId',
  interval: 5000,
  loop: true,
  pause: 'hover',
  transition: 'push',
  type: 'slide',
};

Scroller.args = {
  ...carouselArgs,
  carouselScrollMenuProps: {
    children: sampleList.map((item: SampleItem) => (
      <div
        key={item.key}
        style={{
          alignItems: 'center',
          background: 'var(--grey-color-20)',
          boxShadow:
            '0px 1px 2px rgba(15, 20, 31, 0.12), 0px 2px 8px rgba(15, 20, 31, 0.16)',
          display: 'flex',
          height: 200,
          justifyContent: 'center',
          padding: 20,
          width: 200,
        }}
      >
        {item.name}
      </div>
    )),
    containerPadding: 8,
    gap: 24,
  },
  id: 'myCarouselScrollId',
  type: 'scroll',
};
