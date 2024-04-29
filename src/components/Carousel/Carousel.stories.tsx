import React, { useRef, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  autoScrollApiType,
  Carousel,
  CarouselSize,
  Slide,
  VisibilityContext,
} from './';
import { Button, ButtonShape, ButtonSize, ButtonVariant } from '../Button';
import { Card } from '../Card';
import { IconName } from '../Icon';
import { Tooltip, TooltipSize, TooltipTheme } from '../Tooltip';
import { useCanvasDirection } from '../../hooks/useCanvasDirection';

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
  argTypes: {
    size: {
      options: [CarouselSize.Large, CarouselSize.Medium, CarouselSize.Small],
      control: { type: 'radio' },
    },
    theme: {
      options: [
        'red',
        'redOrange',
        'orange',
        'yellow',
        'yellowGreen',
        'green',
        'blueGreen',
        'blue',
        'blueViolet',
        'violet',
        'violetRed',
        'grey',
      ],
      control: 'select',
    },
  },
} as ComponentMeta<typeof Carousel>;

const Slide_Story: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args}>
    <Slide>
      <div
        style={{
          background: 'var(--grey-background2-color)',
          height: 400,
          width: '100%',
        }}
      ></div>
    </Slide>
    <Slide>
      <div
        style={{
          background: 'var(--green-background2-color)',
          height: 400,
          width: '100%',
        }}
      ></div>
    </Slide>
    <Slide>
      <div
        style={{
          background: 'var(--violet-background2-color)',
          height: 400,
          width: '100%',
        }}
      ></div>
    </Slide>
    <Slide>
      <div
        style={{
          background: 'var(--blue-background2-color)',
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

const sampleList: SampleItem[] = [1, 2, 3, 4, 5, 6, 7, 8].map((i) => ({
  name: `Item ${i}`,
  key: `key-${i}`,
}));

const TOOLTIP_INFO_TEXT =
  'Try dragging on me in a mobile view!\n\nWhen inside a Carousel, Tooltips will set preventTouchMoveDefault={false} by default to enable touch scrolling.';
// const TOOLTIP_INFO_SUBTITLE_TEXT =
//   ' When inside a Carousel, Tooltips will set preventTouchMoveDefault={false} by default to enable touch scrolling.'

const Scroll_Story: ComponentStory<typeof Carousel> = (args) => (
  <Carousel {...args} />
);

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

// When using custom buttons, manually handle touch via scrollVisibilityApiType and apiRef.
const onWheel = (
  apiObj: scrollVisibilityApiType,
  event: React.WheelEvent
): void => {
  const isTouchpad =
    Math.abs(event?.deltaX) !== 0 || Math.abs(event?.deltaY) < 15;

  if (isTouchpad) {
    event?.stopPropagation();
    return;
  }

  if (event?.deltaY < 0) {
    apiObj?.scrollNext();
  } else if (event.deltaY > 0) {
    apiObj?.scrollPrev();
  }
};

const Scroll_Custom_Buttons_Story: ComponentStory<typeof Carousel> = (args) => {
  const htmlDir: string = useCanvasDirection();
  const apiRef: React.MutableRefObject<autoScrollApiType> = useRef(
    {} as scrollVisibilityApiType
  );

  const [nextDisabled, setNextDisabled] = useState<boolean>(false);
  const [previousDisabled, setPreviousDisabled] = useState<boolean>(true);

  const scrollPrevAsync = async (): Promise<void> => {
    await apiRef.current?.scrollPrev();
    setNextDisabled(apiRef.current.isLastItemVisible);
    setPreviousDisabled(apiRef.current.isFirstItemVisible);
  };

  const scrollNextAsync = async (): Promise<void> => {
    await apiRef.current?.scrollNext();
    setNextDisabled(apiRef.current.isLastItemVisible);
    setPreviousDisabled(apiRef.current.isFirstItemVisible);
  };

  return (
    <Card bordered height={440} style={{ padding: 48 }} width={400}>
      <div
        style={{
          height: '100%',
          left: htmlDir === 'rtl' ? 'unset' : 8,
          position: 'absolute',
          right: htmlDir === 'rtl' ? 8 : 'unset',
          top: 0,
          width: 28,
        }}
      >
        <Button
          ariaLabel="Previous"
          disabled={previousDisabled}
          iconProps={{
            path:
              htmlDir === 'rtl'
                ? IconName.mdiChevronRight
                : IconName.mdiChevronLeft,
          }}
          onClick={() => {
            if (apiRef.current?.isFirstItemVisible) {
              console.log('first item visible');
              setPreviousDisabled(true);
              return;
            }
            console.log('previous clicked');
            scrollPrevAsync();
          }}
          shape={ButtonShape.Round}
          size={ButtonSize.Small}
          style={{
            position: 'absolute',
            top: 'calc(50% - 14px)',
          }}
          variant={ButtonVariant.Secondary}
        />
      </div>
      <Carousel
        {...args}
        carouselScrollMenuProps={{
          apiRef: apiRef,
          ...args.carouselScrollMenuProps,
        }}
      />
      <div
        style={{
          height: '100%',
          left: htmlDir === 'rtl' ? 8 : 'unset',
          position: 'absolute',
          right: htmlDir === 'rtl' ? 'unset' : 8,
          top: 0,
          width: 28,
        }}
      >
        <Button
          ariaLabel="Next"
          disabled={nextDisabled}
          iconProps={{
            path:
              htmlDir === 'rtl'
                ? IconName.mdiChevronLeft
                : IconName.mdiChevronRight,
          }}
          onClick={() => {
            if (apiRef.current?.isLastItemVisible) {
              console.log('last item visible');
              return;
            }
            console.log('next clicked');
            scrollNextAsync();
          }}
          shape={ButtonShape.Round}
          size={ButtonSize.Small}
          style={{
            position: 'absolute',
            top: 'calc(50% - 14px)',
          }}
          variant={ButtonVariant.Secondary}
        />
      </div>
    </Card>
  );
};

export const Slider = Slide_Story.bind({});
export const Scroller = Scroll_Story.bind({});
export const Scroller_Single = Scroll_Story.bind({});
export const Scroller_Custom_Buttons = Scroll_Custom_Buttons_Story.bind({});
export const Scroller_With_Tooltips = Scroll_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Slider',
  'Scroller',
  'Scroller_Single',
  'Scroller_Custom_Buttons',
  'Scroller_With_Tooltips',
];

const carouselArgs: Object = {
  classNames: 'my-carousel',
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  gradient: false,
  theme: '',
  themeContainerId: 'my-carousel-theme-container',
  controls: true,
  'data-test-id': 'myCarouselTestyId',
  overlayControls: true,
  size: CarouselSize.Large,
};

Slider.args = {
  ...carouselArgs,
  activeIndex: 0,
  auto: true,
  id: 'myCarouselSlideId',
  interval: 5000,
  loop: true,
  pagination: true,
  pause: 'hover',
  single: false,
  transition: 'push',
  type: 'slide',
};

Scroller.args = {
  ...carouselArgs,
  carouselScrollMenuProps: {
    children: sampleList.map((item: SampleItem) => (
      <Card bordered height={344} key={item.key} tabIndex={0} width={280}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {item.name}
        </div>
      </Card>
    )),
    containerPadding: 8,
    gap: 24,
  },
  id: 'myCarouselScrollId',
  type: 'scroll',
};

Scroller_Single.args = {
  ...carouselArgs,
  carouselScrollMenuProps: {
    children: sampleList.map((item: SampleItem) => (
      <Card bordered height={344} key={item.key} tabIndex={0} width={280}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {item.name}
        </div>
      </Card>
    )),
    containerPadding: 8,
    gap: 24,
  },
  id: 'myCarouselScrollId',
  single: true,
  type: 'scroll',
};

Scroller_Custom_Buttons.args = {
  ...carouselArgs,
  carouselScrollMenuProps: {
    children: sampleList.map((item: SampleItem) => (
      <Card bordered height={344} key={item.key} tabIndex={0} width={280}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {item.name}
        </div>
      </Card>
    )),
    containerPadding: 0,
    controls: false,
    gap: 8,
    onWheel: onWheel,
  },
  id: 'myCarouselScrollId',
  single: true,
  style: { background: 'transparent' },
  type: 'scroll',
};

Scroller_With_Tooltips.args = {
  ...carouselArgs,
  carouselScrollMenuProps: {
    children: sampleList.map((item: SampleItem) => (
      <Card bordered height={344} key={item.key} tabIndex={0} width={280}>
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {item.name}
          <Tooltip
            content={TOOLTIP_INFO_TEXT}
            portal
            size={TooltipSize.Medium}
            theme={TooltipTheme.dark}
            tooltipStyle={{ fontSize: 14 }}
            wrapperStyle={{ width: 'fit-content' }}
          >
            <div
              style={{
                display: '-webkit-box',
                overflow: 'hidden',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 4,
                whiteSpace: 'pre-line',
                width: '100%',
              }}
            >
              {TOOLTIP_INFO_TEXT}
            </div>
          </Tooltip>
        </div>
      </Card>
    )),
    containerPadding: 8,
    gap: 24,
  },
  id: 'myCarouselScrollId',
  type: 'scroll',
};
