import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Slider, SliderSize, SliderTrackStatus } from './';
import { Stack } from '../Stack';
import { Tooltip, TooltipTheme } from '../Tooltip';
import { Col, Row } from '../Grid';
import { PrimaryButton } from '../Button';
import { useArgs } from '@storybook/client-api';
import { ConfigProvider } from '../ConfigProvider';

export default {
  title: 'Slider',
  component: Slider,
  argTypes: {
    size: {
      options: [
        SliderSize.Flex,
        SliderSize.Large,
        SliderSize.Medium,
        SliderSize.Small,
      ],
      control: { type: 'radio' },
    },
  },
} as ComponentMeta<typeof Slider>;

const Slider_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingAValue, setTransientSlidingAValue] = useState<number>(
    Number(args.value)
  );
  const [transientSlidingBValue, setTransientSlidingBValue] = useState<number>(
    Number(args.value)
  );

  const handleChangeA = (val: number): void => {
    setTransientSlidingAValue(val);
  };

  const handleChangeB = (val: number): void => {
    setTransientSlidingBValue(val);
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
      <Row style={{ marginTop: 100 }}>
        <Col span={6} push={3}>
          <Slider
            {...args}
            onChange={handleChangeB}
            tooltipContent={
              args.tooltipContent ? args.tooltipContent : 'A tooltip!'
            }
            value={transientSlidingBValue}
          />
        </Col>
      </Row>
    </Stack>
  );
};

const Range_Slider_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingAValues, setTransientSlidingAValues] = useState<
    number[]
  >(args.value as number[]);
  const [transientSlidingBValues, setTransientSlidingBValues] = useState<
    number[]
  >(args.value as number[]);

  const handleChangeA = (vals: number[]): void => {
    setTransientSlidingAValues(vals);
  };

  const handleChangeB = (vals: number[]): void => {
    setTransientSlidingBValues(vals);
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValues}
      />
      <Row style={{ marginTop: 100 }}>
        <Col span={6} push={3}>
          <Slider
            {...args}
            onChange={handleChangeB}
            tooltipContent={
              args.tooltipContent
                ? args.tooltipContent
                : ['A tooltip!', 'B tooltip!']
            }
            value={transientSlidingBValues}
          />
        </Col>
      </Row>
    </Stack>
  );
};

const Inline_Extemity_Labels_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingAValue, setTransientSlidingAValue] = useState<number>(
    Number(args.value)
  );
  const [transientSlidingBValues, setTransientSlidingBValues] = useState<
    number[]
  >([40, 80]);

  const handleChangeA = (val: number): void => {
    setTransientSlidingAValue(val);
  };

  const handleChangeB = (vals: number[]): void => {
    setTransientSlidingBValues(vals);
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
      <Slider
        {...args}
        onChange={handleChangeB}
        showMarkers
        step={20}
        style={{ marginTop: 100 }}
        value={transientSlidingBValues}
      />
    </Stack>
  );
};

const Custom_Markers_Included_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingAValue, setTransientSlidingAValue] =
    useState<number>(37);
  const [transientSlidingBValues, setTransientSlidingBValues] = useState<
    number[]
  >([26, 37]);

  const handleChangeA = (val: number): void => {
    setTransientSlidingAValue(val);
  };

  const handleChangeB = (vals: number[]): void => {
    setTransientSlidingBValues(vals);
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
      <Slider
        {...args}
        onChange={handleChangeB}
        value={transientSlidingBValues}
      />
    </Stack>
  );
};

const Custom_Markers_Excluded_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingCValue, setTransientSlidingCValue] =
    useState<number>(37);

  const handleChangeC = (val: number): void => {
    setTransientSlidingCValue(val);
  };

  return (
    <Slider
      {...args}
      included={false}
      onChange={handleChangeC}
      value={transientSlidingCValue}
    />
  );
};

const Custom_Markers_With_Step_Story: ComponentStory<typeof Slider> = (
  args
) => {
  const [transientSlidingDValue, setTransientSlidingDValue] =
    useState<number>(30);

  const handleChangeD = (val: number): void => {
    setTransientSlidingDValue(val);
  };

  return (
    <Slider
      {...args}
      onChange={handleChangeD}
      step={10}
      value={transientSlidingDValue}
    />
  );
};

const Custom_Markers_Null_Step_Story: ComponentStory<typeof Slider> = (
  args
) => {
  const [transientSlidingEValue, setTransientSlidingEValue] =
    useState<number>(37);

  const handleChangeE = (val: number): void => {
    setTransientSlidingEValue(val);
  };

  return (
    <Slider
      {...args}
      onChange={handleChangeE}
      step={null}
      value={transientSlidingEValue}
    />
  );
};

const Dots_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingAValue, setTransientSlidingAValue] = useState<number>(
    Number(args.value)
  );

  const handleChangeA = (val: number): void => {
    setTransientSlidingAValue(val);
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
    </Stack>
  );
};

const Toggle_Thumb_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingAValue, setTransientSlidingAValue] = useState<number>(
    Number(args.value)
  );
  const [thumbHidden, setThumbHidden] = useState<boolean>(true);

  const handleChangeA = (val: number): void => {
    if (thumbHidden) {
      setThumbHidden(false);
    }
    setTransientSlidingAValue(val);
  };

  const toggleThumbVisibility = (): void => {
    setThumbHidden((thumbHidden) => !thumbHidden);
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
      <Slider
        {...args}
        hideThumb={thumbHidden}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
      <Stack direction="horizontal" flexGap="xl" justify="center" fullWidth>
        <PrimaryButton
          onClick={toggleThumbVisibility}
          text={thumbHidden ? 'Show thumb' : 'Hide thumb'}
          toggle
        />
      </Stack>
    </Stack>
  );
};

// Inactive employee asessment marker
const lowerAssessmentInactiveMarker = (): JSX.Element => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_7964_24135" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6654 15.1128C14.2399 13.7834 16 11.0972 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.0972 1.76007 13.7834 4.33457 15.1128L8 20L11.6654 15.1128Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6654 15.1128C14.2399 13.7834 16 11.0972 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.0972 1.76007 13.7834 4.33457 15.1128L8 20L11.6654 15.1128Z"
      fill="#BEC2CA"
    />
    <path
      d="M11.6654 15.1128L11.2066 14.2242L11.003 14.3294L10.8654 14.5128L11.6654 15.1128ZM4.33457 15.1128L5.13457 14.5128L4.99705 14.3294L4.79339 14.2242L4.33457 15.1128ZM8 20L7.2 20.6L8 21.6667L8.8 20.6L8 20ZM15 8C15 10.7086 13.4618 13.0597 11.2066 14.2242L12.1242 16.0013C15.0181 14.507 17 11.4858 17 8H15ZM8 1C11.866 1 15 4.13401 15 8H17C17 3.02944 12.9706 -1 8 -1V1ZM1 8C1 4.13401 4.13401 1 8 1V-1C3.02944 -1 -1 3.02944 -1 8H1ZM4.79339 14.2242C2.5382 13.0597 1 10.7086 1 8H-1C-1 11.4858 0.981937 14.507 3.87576 16.0013L4.79339 14.2242ZM3.53457 15.7128L7.2 20.6L8.8 19.4L5.13457 14.5128L3.53457 15.7128ZM8.8 20.6L12.4654 15.7128L10.8654 14.5128L7.2 19.4L8.8 20.6Z"
      fill="#69717F"
      mask="url(#path-1-inside-1_7964_24135)"
    />
  </svg>
);

// Active employee asessment marker
const lowerAssessmentActiveMarker = (): JSX.Element => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_7881_23918" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6654 15.1128C14.2399 13.7834 16 11.0972 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.0972 1.76007 13.7834 4.33457 15.1128L8 20L11.6654 15.1128Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.6654 15.1128C14.2399 13.7834 16 11.0972 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 11.0972 1.76007 13.7834 4.33457 15.1128L8 20L11.6654 15.1128Z"
      fill="#8ED0FA"
    />
    <path
      d="M11.6654 15.1128L11.2066 14.2242L11.003 14.3294L10.8654 14.5128L11.6654 15.1128ZM4.33457 15.1128L5.13457 14.5128L4.99705 14.3294L4.79339 14.2242L4.33457 15.1128ZM8 20L7.2 20.6L8 21.6667L8.8 20.6L8 20ZM15 8C15 10.7086 13.4618 13.0597 11.2066 14.2242L12.1242 16.0013C15.0181 14.507 17 11.4858 17 8H15ZM8 1C11.866 1 15 4.13401 15 8H17C17 3.02944 12.9706 -1 8 -1V1ZM1 8C1 4.13401 4.13401 1 8 1V-1C3.02944 -1 -1 3.02944 -1 8H1ZM4.79339 14.2242C2.5382 13.0597 1 10.7086 1 8H-1C-1 11.4858 0.981937 14.507 3.87576 16.0013L4.79339 14.2242ZM3.53457 15.7128L7.2 20.6L8.8 19.4L5.13457 14.5128L3.53457 15.7128ZM8.8 20.6L12.4654 15.7128L10.8654 14.5128L7.2 19.4L8.8 20.6Z"
      fill="#5962B7"
      mask="url(#path-1-inside-1_7881_23918)"
    />
  </svg>
);

// Inactive manager asessment marker
const upperAssessmentInactiveMarker = (): JSX.Element => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_7964_24132" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H5L8 20L11 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H5L8 20L11 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4Z"
      fill="#BEC2CA"
    />
    <path
      d="M5 16L5.8 15.4L5.5 15H5V16ZM8 20L7.2 20.6L8 21.6667L8.8 20.6L8 20ZM11 16V15H10.5L10.2 15.4L11 16ZM1 4C1 2.34315 2.34315 1 4 1V-1C1.23858 -1 -1 1.23858 -1 4H1ZM1 12V4H-1V12H1ZM4 15C2.34315 15 1 13.6569 1 12H-1C-1 14.7614 1.23858 17 4 17V15ZM5 15H4V17H5V15ZM4.2 16.6L7.2 20.6L8.8 19.4L5.8 15.4L4.2 16.6ZM8.8 20.6L11.8 16.6L10.2 15.4L7.2 19.4L8.8 20.6ZM12 15H11V17H12V15ZM15 12C15 13.6569 13.6569 15 12 15V17C14.7614 17 17 14.7614 17 12H15ZM15 4V12H17V4H15ZM12 1C13.6569 1 15 2.34315 15 4H17C17 1.23858 14.7614 -1 12 -1V1ZM4 1H12V-1H4V1Z"
      fill="#69717F"
      mask="url(#path-1-inside-1_7964_24132)"
    />
  </svg>
);

// Active manager asessment marker
const upperAssessmentActiveMarker = (): JSX.Element => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_7881_23919" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H5L8 20L11 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H5L8 20L11 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4Z"
      fill="#DAB4D6"
    />
    <path
      d="M5 16L5.8 15.4L5.5 15H5V16ZM8 20L7.2 20.6L8 21.6667L8.8 20.6L8 20ZM11 16V15H10.5L10.2 15.4L11 16ZM1 4C1 2.34315 2.34315 1 4 1V-1C1.23858 -1 -1 1.23858 -1 4H1ZM1 12V4H-1V12H1ZM4 15C2.34315 15 1 13.6569 1 12H-1C-1 14.7614 1.23858 17 4 17V15ZM5 15H4V17H5V15ZM4.2 16.6L7.2 20.6L8.8 19.4L5.8 15.4L4.2 16.6ZM8.8 20.6L11.8 16.6L10.2 15.4L7.2 19.4L8.8 20.6ZM12 15H11V17H12V15ZM15 12C15 13.6569 13.6569 15 12 15V17C14.7614 17 17 14.7614 17 12H15ZM15 4V12H17V4H15ZM12 1C13.6569 1 15 2.34315 15 4H17C17 1.23858 14.7614 -1 12 -1V1ZM4 1H12V-1H4V1Z"
      fill="#B5548E"
      mask="url(#path-1-inside-1_7881_23919)"
    />
  </svg>
);

// Active employee assessment marker when the manager assessment is of the same value
// Active color of the marker depends upon who is editing the marker value
// In this scenario it's the employee
const combinedUpperAssessmentActiveMarker = (): JSX.Element => (
  <svg
    width="34"
    height="20"
    viewBox="0 0 34 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_7964_24132" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H5L8 20L11 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H5L8 20L11 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4Z"
      fill="#BEC2CA" // If manager scenario this fill value would be #DAB4D6
    />
    <path
      d="M5 16L5.8 15.4L5.5 15H5V16ZM8 20L7.2 20.6L8 21.6667L8.8 20.6L8 20ZM11 16V15H10.5L10.2 15.4L11 16ZM1 4C1 2.34315 2.34315 1 4 1V-1C1.23858 -1 -1 1.23858 -1 4H1ZM1 12V4H-1V12H1ZM4 15C2.34315 15 1 13.6569 1 12H-1C-1 14.7614 1.23858 17 4 17V15ZM5 15H4V17H5V15ZM4.2 16.6L7.2 20.6L8.8 19.4L5.8 15.4L4.2 16.6ZM8.8 20.6L11.8 16.6L10.2 15.4L7.2 19.4L8.8 20.6ZM12 15H11V17H12V15ZM15 12C15 13.6569 13.6569 15 12 15V17C14.7614 17 17 14.7614 17 12H15ZM15 4V12H17V4H15ZM12 1C13.6569 1 15 2.34315 15 4H17C17 1.23858 14.7614 -1 12 -1V1ZM4 1H12V-1H4V1Z"
      fill="#69717F" // If manager scenario this fill value would be #B5548E
      mask="url(#path-1-inside-1_7964_24132)"
    />
    <mask id="path-3-inside-2_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.6654 15.1128C32.2399 13.7834 34 11.0972 34 8C34 3.58172 30.4183 0 26 0C21.5817 0 18 3.58172 18 8C18 11.0972 19.7601 13.7834 22.3346 15.1128L26 20L29.6654 15.1128Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.6654 15.1128C32.2399 13.7834 34 11.0972 34 8C34 3.58172 30.4183 0 26 0C21.5817 0 18 3.58172 18 8C18 11.0972 19.7601 13.7834 22.3346 15.1128L26 20L29.6654 15.1128Z"
      fill="#8ED0FA" // If manager scenario this fill value would be #BEC2CA
    />
    <path
      d="M29.6654 15.1128L29.2066 14.2242L29.003 14.3294L28.8654 14.5128L29.6654 15.1128ZM22.3346 15.1128L23.1346 14.5128L22.997 14.3294L22.7934 14.2242L22.3346 15.1128ZM26 20L25.2 20.6L26 21.6667L26.8 20.6L26 20ZM33 8C33 10.7086 31.4618 13.0597 29.2066 14.2242L30.1242 16.0013C33.0181 14.507 35 11.4858 35 8H33ZM26 1C29.866 1 33 4.13401 33 8H35C35 3.02944 30.9706 -1 26 -1V1ZM19 8C19 4.13401 22.134 1 26 1V-1C21.0294 -1 17 3.02944 17 8H19ZM22.7934 14.2242C20.5382 13.0597 19 10.7086 19 8H17C17 11.4858 18.9819 14.507 21.8758 16.0013L22.7934 14.2242ZM21.5346 15.7128L25.2 20.6L26.8 19.4L23.1346 14.5128L21.5346 15.7128ZM26.8 20.6L30.4654 15.7128L28.8654 14.5128L25.2 19.4L26.8 20.6Z"
      fill="#5962B7" // If manager scenario this fill value would be #69717F
      mask="url(#path-3-inside-2_292_708)"
    />
  </svg>
);

// Inactive combined upper assessment marker (both are gray)
const combinedUpperAssessmentInactiveMarker = (): JSX.Element => (
  <svg
    width="34"
    height="20"
    viewBox="0 0 34 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="path-1-inside-1_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H5L8 20L11 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 0C1.79086 0 0 1.79086 0 4V12C0 14.2091 1.79086 16 4 16H5L8 20L11 16H12C14.2091 16 16 14.2091 16 12V4C16 1.79086 14.2091 0 12 0H4Z"
      fill="#BEC2CA"
    />
    <path
      d="M5 16L5.8 15.4L5.5 15H5V16ZM8 20L7.2 20.6L8 21.6667L8.8 20.6L8 20ZM11 16V15H10.5L10.2 15.4L11 16ZM1 4C1 2.34315 2.34315 1 4 1V-1C1.23858 -1 -1 1.23858 -1 4H1ZM1 12V4H-1V12H1ZM4 15C2.34315 15 1 13.6569 1 12H-1C-1 14.7614 1.23858 17 4 17V15ZM5 15H4V17H5V15ZM4.2 16.6L7.2 20.6L8.8 19.4L5.8 15.4L4.2 16.6ZM8.8 20.6L11.8 16.6L10.2 15.4L7.2 19.4L8.8 20.6ZM12 15H11V17H12V15ZM15 12C15 13.6569 13.6569 15 12 15V17C14.7614 17 17 14.7614 17 12H15ZM15 4V12H17V4H15ZM12 1C13.6569 1 15 2.34315 15 4H17C17 1.23858 14.7614 -1 12 -1V1ZM4 1H12V-1H4V1Z"
      fill="#69717F"
      mask="url(#path-1-inside-1_292_708)"
    />
    <mask id="path-3-inside-2_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.6654 15.1128C32.2399 13.7834 34 11.0972 34 8C34 3.58172 30.4183 0 26 0C21.5817 0 18 3.58172 18 8C18 11.0972 19.7601 13.7834 22.3346 15.1128L26 20L29.6654 15.1128Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.6654 15.1128C32.2399 13.7834 34 11.0972 34 8C34 3.58172 30.4183 0 26 0C21.5817 0 18 3.58172 18 8C18 11.0972 19.7601 13.7834 22.3346 15.1128L26 20L29.6654 15.1128Z"
      fill="#BEC2CA"
    />
    <path
      d="M29.6654 15.1128L29.2066 14.2242L29.003 14.3294L28.8654 14.5128L29.6654 15.1128ZM22.3346 15.1128L23.1346 14.5128L22.997 14.3294L22.7934 14.2242L22.3346 15.1128ZM26 20L25.2 20.6L26 21.6667L26.8 20.6L26 20ZM33 8C33 10.7086 31.4618 13.0597 29.2066 14.2242L30.1242 16.0013C33.0181 14.507 35 11.4858 35 8H33ZM26 1C29.866 1 33 4.13401 33 8H35C35 3.02944 30.9706 -1 26 -1V1ZM19 8C19 4.13401 22.134 1 26 1V-1C21.0294 -1 17 3.02944 17 8H19ZM22.7934 14.2242C20.5382 13.0597 19 10.7086 19 8H17C17 11.4858 18.9819 14.507 21.8758 16.0013L22.7934 14.2242ZM21.5346 15.7128L25.2 20.6L26.8 19.4L23.1346 14.5128L21.5346 15.7128ZM26.8 20.6L30.4654 15.7128L28.8654 14.5128L25.2 19.4L26.8 20.6Z"
      fill="#69717F"
      mask="url(#path-3-inside-2_292_708)"
    />
  </svg>
);

// Active benchmark marker
const roleBenchmarkActiveMarker = (): JSX.Element => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.738517 0.5L8 18.6537L15.2615 0.5H0.738517Z"
      fill="#FFCD78"
      stroke="#A88F00"
    />
  </svg>
);

// Inactive benchmark marker
const roleBenchmarkInactiveMarker = (): JSX.Element => (
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.738517 0.5L8 18.6537L15.2615 0.5H0.738517Z"
      fill="#BEC2CA"
      stroke="#69717F"
    />
  </svg>
);

// Active employee assessment marker when the benchmark is of the same value
// Active color of the marker depends upon who is editing the marker value
// In this scenario it's the employee.
const combinedBenchmarkAssessmentActiveMarker = (): JSX.Element => (
  <svg
    width="34"
    height="20"
    viewBox="0 0 34 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.738517 0.5L8 18.6537L15.2615 0.5H0.738517Z"
      fill="#BEC2CA"
      stroke="#69717F"
    />
    <mask id="path-2-inside-1_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.6654 15.1128C32.2399 13.7834 34 11.0972 34 8C34 3.58172 30.4183 0 26 0C21.5817 0 18 3.58172 18 8C18 11.0972 19.7601 13.7834 22.3346 15.1128L26 20L29.6654 15.1128Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.6654 15.1128C32.2399 13.7834 34 11.0972 34 8C34 3.58172 30.4183 0 26 0C21.5817 0 18 3.58172 18 8C18 11.0972 19.7601 13.7834 22.3346 15.1128L26 20L29.6654 15.1128Z"
      fill="#8ED0FA"
    />
    <path
      d="M29.6654 15.1128L29.2066 14.2242L29.003 14.3294L28.8654 14.5128L29.6654 15.1128ZM22.3346 15.1128L23.1346 14.5128L22.997 14.3294L22.7934 14.2242L22.3346 15.1128ZM26 20L25.2 20.6L26 21.6667L26.8 20.6L26 20ZM33 8C33 10.7086 31.4618 13.0597 29.2066 14.2242L30.1242 16.0013C33.0181 14.507 35 11.4858 35 8H33ZM26 1C29.866 1 33 4.13401 33 8H35C35 3.02944 30.9706 -1 26 -1V1ZM19 8C19 4.13401 22.134 1 26 1V-1C21.0294 -1 17 3.02944 17 8H19ZM22.7934 14.2242C20.5382 13.0597 19 10.7086 19 8H17C17 11.4858 18.9819 14.507 21.8758 16.0013L22.7934 14.2242ZM21.5346 15.7128L25.2 20.6L26.8 19.4L23.1346 14.5128L21.5346 15.7128ZM26.8 20.6L30.4654 15.7128L28.8654 14.5128L25.2 19.4L26.8 20.6Z"
      fill="#5962B7"
      mask="url(#path-2-inside-1_292_708)"
    />
  </svg>
);

// Inactive combined employee assessment and benchmark marker (both are gray)
const combinedBenchmarkAssessmentInactiveMarker = (): JSX.Element => (
  <svg
    width="34"
    height="20"
    viewBox="0 0 34 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.738517 0.5L8 18.6537L15.2615 0.5H0.738517Z"
      fill="#BEC2CA"
      stroke="#69717F"
    />
    <mask id="path-2-inside-1_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.6654 15.1128C32.2399 13.7834 34 11.0972 34 8C34 3.58172 30.4183 0 26 0C21.5817 0 18 3.58172 18 8C18 11.0972 19.7601 13.7834 22.3346 15.1128L26 20L29.6654 15.1128Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.6654 15.1128C32.2399 13.7834 34 11.0972 34 8C34 3.58172 30.4183 0 26 0C21.5817 0 18 3.58172 18 8C18 11.0972 19.7601 13.7834 22.3346 15.1128L26 20L29.6654 15.1128Z"
      fill="#BEC2CA"
    />
    <path
      d="M29.6654 15.1128L29.2066 14.2242L29.003 14.3294L28.8654 14.5128L29.6654 15.1128ZM22.3346 15.1128L23.1346 14.5128L22.997 14.3294L22.7934 14.2242L22.3346 15.1128ZM26 20L25.2 20.6L26 21.6667L26.8 20.6L26 20ZM33 8C33 10.7086 31.4618 13.0597 29.2066 14.2242L30.1242 16.0013C33.0181 14.507 35 11.4858 35 8H33ZM26 1C29.866 1 33 4.13401 33 8H35C35 3.02944 30.9706 -1 26 -1V1ZM19 8C19 4.13401 22.134 1 26 1V-1C21.0294 -1 17 3.02944 17 8H19ZM22.7934 14.2242C20.5382 13.0597 19 10.7086 19 8H17C17 11.4858 18.9819 14.507 21.8758 16.0013L22.7934 14.2242ZM21.5346 15.7128L25.2 20.6L26.8 19.4L23.1346 14.5128L21.5346 15.7128ZM26.8 20.6L30.4654 15.7128L28.8654 14.5128L25.2 19.4L26.8 20.6Z"
      fill="#69717F"
      mask="url(#path-2-inside-1_292_708)"
    />
  </svg>
);

// Inactive combined markers (all three are gray)
const lowerAssessmentAllCombinedInactiveMarker = (): JSX.Element => (
  <svg
    width="52"
    height="20"
    viewBox="0 0 52 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.738517 0.5L8 18.6537L15.2615 0.5H0.738517Z"
      fill="#BEC2CA"
      stroke="#69717F"
    />
    <mask id="path-2-inside-1_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 0C19.7909 0 18 1.79086 18 4V12C18 14.2091 19.7909 16 22 16H23L26 20L29 16H30C32.2091 16 34 14.2091 34 12V4C34 1.79086 32.2091 0 30 0H22Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 0C19.7909 0 18 1.79086 18 4V12C18 14.2091 19.7909 16 22 16H23L26 20L29 16H30C32.2091 16 34 14.2091 34 12V4C34 1.79086 32.2091 0 30 0H22Z"
      fill="#BEC2CA"
    />
    <path
      d="M23 16L23.8 15.4L23.5 15H23V16ZM26 20L25.2 20.6L26 21.6667L26.8 20.6L26 20ZM29 16V15H28.5L28.2 15.4L29 16ZM19 4C19 2.34315 20.3431 1 22 1V-1C19.2386 -1 17 1.23858 17 4H19ZM19 12V4H17V12H19ZM22 15C20.3431 15 19 13.6569 19 12H17C17 14.7614 19.2386 17 22 17V15ZM23 15H22V17H23V15ZM22.2 16.6L25.2 20.6L26.8 19.4L23.8 15.4L22.2 16.6ZM26.8 20.6L29.8 16.6L28.2 15.4L25.2 19.4L26.8 20.6ZM30 15H29V17H30V15ZM33 12C33 13.6569 31.6569 15 30 15V17C32.7614 17 35 14.7614 35 12H33ZM33 4V12H35V4H33ZM30 1C31.6569 1 33 2.34315 33 4H35C35 1.23858 32.7614 -1 30 -1V1ZM22 1H30V-1H22V1Z"
      fill="#69717F"
      mask="url(#path-2-inside-1_292_708)"
    />
    <mask id="path-4-inside-2_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.6654 15.1128C50.2399 13.7834 52 11.0972 52 8C52 3.58172 48.4183 0 44 0C39.5817 0 36 3.58172 36 8C36 11.0972 37.7601 13.7834 40.3346 15.1128L44 20L47.6654 15.1128Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M47.6654 15.1128C50.2399 13.7834 52 11.0972 52 8C52 3.58172 48.4183 0 44 0C39.5817 0 36 3.58172 36 8C36 11.0972 37.7601 13.7834 40.3346 15.1128L44 20L47.6654 15.1128Z"
      fill="#BEC2CA"
    />
    <path
      d="M47.6654 15.1128L47.2066 14.2242L47.003 14.3294L46.8654 14.5128L47.6654 15.1128ZM40.3346 15.1128L41.1346 14.5128L40.997 14.3294L40.7934 14.2242L40.3346 15.1128ZM44 20L43.2 20.6L44 21.6667L44.8 20.6L44 20ZM51 8C51 10.7086 49.4618 13.0597 47.2066 14.2242L48.1242 16.0013C51.0181 14.507 53 11.4858 53 8H51ZM44 1C47.866 1 51 4.13401 51 8H53C53 3.02944 48.9706 -1 44 -1V1ZM37 8C37 4.13401 40.134 1 44 1V-1C39.0294 -1 35 3.02944 35 8H37ZM40.7934 14.2242C38.5382 13.0597 37 10.7086 37 8H35C35 11.4858 36.9819 14.507 39.8758 16.0013L40.7934 14.2242ZM39.5346 15.7128L43.2 20.6L44.8 19.4L41.1346 14.5128L39.5346 15.7128ZM44.8 20.6L48.4654 15.7128L46.8654 14.5128L43.2 19.4L44.8 20.6Z"
      fill="#69717F"
      mask="url(#path-4-inside-2_292_708)"
    />
  </svg>
);

// Active employee assessment marker when the manager assessment and benchmark are of the same value
// Active color of the marker depends upon who is editing the marker value
// In this scenario it's the employee
const lowerAssessmentAllCombinedActiveMarker = (): JSX.Element => (
  <svg
    width="52"
    height="20"
    viewBox="0 0 52 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.738517 0.5L8 18.6537L15.2615 0.5H0.738517Z"
      fill="#BEC2CA"
      stroke="#69717F"
    />
    <mask id="path-2-inside-1_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 0C19.7909 0 18 1.79086 18 4V12C18 14.2091 19.7909 16 22 16H23L26 20L29 16H30C32.2091 16 34 14.2091 34 12V4C34 1.79086 32.2091 0 30 0H22Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22 0C19.7909 0 18 1.79086 18 4V12C18 14.2091 19.7909 16 22 16H23L26 20L29 16H30C32.2091 16 34 14.2091 34 12V4C34 1.79086 32.2091 0 30 0H22Z"
      fill="#BEC2CA" // If manager scenario this fill value would be #DAB4D6
    />
    <path
      d="M23 16L23.8 15.4L23.5 15H23V16ZM26 20L25.2 20.6L26 21.6667L26.8 20.6L26 20ZM29 16V15H28.5L28.2 15.4L29 16ZM19 4C19 2.34315 20.3431 1 22 1V-1C19.2386 -1 17 1.23858 17 4H19ZM19 12V4H17V12H19ZM22 15C20.3431 15 19 13.6569 19 12H17C17 14.7614 19.2386 17 22 17V15ZM23 15H22V17H23V15ZM22.2 16.6L25.2 20.6L26.8 19.4L23.8 15.4L22.2 16.6ZM26.8 20.6L29.8 16.6L28.2 15.4L25.2 19.4L26.8 20.6ZM30 15H29V17H30V15ZM33 12C33 13.6569 31.6569 15 30 15V17C32.7614 17 35 14.7614 35 12H33ZM33 4V12H35V4H33ZM30 1C31.6569 1 33 2.34315 33 4H35C35 1.23858 32.7614 -1 30 -1V1ZM22 1H30V-1H22V1Z"
      fill="#69717F" // If manager scenario this fill value would be #B5548E
      mask="url(#path-2-inside-1_292_708)"
    />
    <mask id="path-4-inside-2_292_708" fill="white">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M47.6654 15.1128C50.2399 13.7834 52 11.0972 52 8C52 3.58172 48.4183 0 44 0C39.5817 0 36 3.58172 36 8C36 11.0972 37.7601 13.7834 40.3346 15.1128L44 20L47.6654 15.1128Z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M47.6654 15.1128C50.2399 13.7834 52 11.0972 52 8C52 3.58172 48.4183 0 44 0C39.5817 0 36 3.58172 36 8C36 11.0972 37.7601 13.7834 40.3346 15.1128L44 20L47.6654 15.1128Z"
      fill="#8ED0FA" // If manager scenario this fill value would be #BEC2CA
    />
    <path
      d="M47.6654 15.1128L47.2066 14.2242L47.003 14.3294L46.8654 14.5128L47.6654 15.1128ZM40.3346 15.1128L41.1346 14.5128L40.997 14.3294L40.7934 14.2242L40.3346 15.1128ZM44 20L43.2 20.6L44 21.6667L44.8 20.6L44 20ZM51 8C51 10.7086 49.4618 13.0597 47.2066 14.2242L48.1242 16.0013C51.0181 14.507 53 11.4858 53 8H51ZM44 1C47.866 1 51 4.13401 51 8H53C53 3.02944 48.9706 -1 44 -1V1ZM37 8C37 4.13401 40.134 1 44 1V-1C39.0294 -1 35 3.02944 35 8H37ZM40.7934 14.2242C38.5382 13.0597 37 10.7086 37 8H35C35 11.4858 36.9819 14.507 39.8758 16.0013L40.7934 14.2242ZM39.5346 15.7128L43.2 20.6L44.8 19.4L41.1346 14.5128L39.5346 15.7128ZM44.8 20.6L48.4654 15.7128L46.8654 14.5128L43.2 19.4L44.8 20.6Z"
      fill="#5962B7" // If manager scenario this fill value would be #69717F
      mask="url(#path-4-inside-2_292_708)"
    />
  </svg>
);

const iconSet: Object = {
  IcoMoonType: 'selection',
  icons: [
    {
      icon: {
        paths: [
          'M567.884 732.813c111.188-57.414 187.206-173.426 187.206-307.189 0-190.819-154.685-345.504-345.504-345.504s-345.504 154.686-345.504 345.504c0 133.762 76.015 249.776 187.204 307.189l158.301 211.068 158.299-211.068z',
          'M571.383 737.685l-20.251-39.224-8.989 4.643-6.075 8.095 35.315 26.485zM247.79 737.685l35.315-26.485-6.071-8.095-8.989-4.643-20.252 39.224zM409.585 953.41l-35.315 26.485 35.315 47.085 35.315-47.085-35.315-26.485zM718.575 423.719c0 119.56-67.896 223.342-167.447 274.744l40.506 78.443c127.74-65.958 215.224-199.319 215.224-353.187h-88.281zM409.585 114.73c170.649 0 308.99 138.339 308.99 308.99h88.281c0-219.408-177.86-397.27-397.27-397.27v88.281zM100.6 423.719c0-170.649 138.339-308.99 308.99-308.99v-88.281c-219.408 0-397.27 177.862-397.27 397.27h88.281zM268.042 698.459c-99.546-51.402-167.447-155.184-167.447-274.744h-88.281c0 153.868 87.485 287.228 215.224 353.187l40.506-78.443zM212.475 764.17l161.795 215.725 70.625-52.97-161.795-215.725-70.625 52.97zM444.9 979.895l161.793-215.725-70.625-52.97-161.793 215.725 70.625 52.97z',
        ],
        attrs: [{ fill: 'rgb(142, 208, 250)' }, { fill: 'rgb(89, 98, 183)' }],
        isMulticolor: true,
        isMulticolor2: true,
        grid: 0,
        tags: ['employee'],
        colorPermutations: {
          '201091661802062251': [{ f: 1 }, { f: 0 }],
        },
      },
      attrs: [{ fill: 'rgb(142, 208, 250)' }, { fill: 'rgb(89, 98, 183)' }],
      properties: {
        order: 3,
        id: 0,
        name: 'employee',
        prevSize: 32,
        code: 59648,
        codes: [59648, 59649],
      },
      setIdx: 0,
      setId: 2,
      iconIdx: 0,
    },
  ],
  height: 1024,
  metadata: { name: 'icomoon' },
  preferences: {
    showGlyphs: true,
    showQuickUse: true,
    showQuickUse2: true,
    showSVGs: true,
    fontPref: {
      prefix: 'icon-',
      metadata: { fontFamily: 'icomoon' },
      metrics: { emSize: 1024, baseline: 6.25, whitespace: 50 },
      embed: false,
      autoHost: true,
    },
    imagePref: {
      prefix: 'icon-',
      png: true,
      useClassSelector: true,
      color: 0,
      bgColor: 16777215,
      classSelector: '.icon',
    },
    historySize: 50,
    showCodes: true,
    gridSize: 24,
    quickUsageToken: {
      UntitledProject:
        'NWRmNjcxZTJiOGY2NjdmMjViNzdkOTliNWFiOWJhOGUjMSMxNjUzMDI0ODA4IyMjMTFiZDJhZjI4MDkz',
    },
  },
};

const With_Benchmark_Story: ComponentStory<typeof Slider> = (args) => {
  const [_, updateArgs] = useArgs();
  const [sliderMinLabel, setSliderMinLabel] = useState(args.minLabel);
  const [transientSlidingValue, setTransientSlidingValue] = useState<
    number | number[]
  >(args.value);

  useEffect(() => {
    if (
      Number(transientSlidingValue) >= 0.1 &&
      Number(transientSlidingValue) < 2
    ) {
      setSliderMinLabel('Learner');
    } else if (
      Number(transientSlidingValue) >= 2 &&
      Number(transientSlidingValue) < 3
    ) {
      setSliderMinLabel('Practitioner');
    } else if (
      Number(transientSlidingValue) >= 3 &&
      Number(transientSlidingValue) < 4
    ) {
      setSliderMinLabel('Professional');
    } else if (
      Number(transientSlidingValue) >= 4 &&
      Number(transientSlidingValue) < 5
    ) {
      setSliderMinLabel('Expert');
    } else if (Number(transientSlidingValue) === 5) {
      setSliderMinLabel('Worldclass');
    } else {
      setSliderMinLabel('Assess skill level');
    }
  }, [sliderMinLabel, transientSlidingValue]);

  const handleChange = (val: number): void => {
    setTransientSlidingValue(val);
    if (val < 2) {
      updateArgs({
        ...args,
        trackStatus: SliderTrackStatus.Error,
      });
    } else if (val > 2 && val < 3) {
      updateArgs({
        ...args,
        trackStatus: SliderTrackStatus.Warning,
      });
    } else {
      updateArgs({
        ...args,
        trackStatus: SliderTrackStatus.Success,
      });
    }
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
      <Slider
        {...args}
        visibleDots={[]}
        minLabel={sliderMinLabel}
        onChange={handleChange}
        value={transientSlidingValue}
      />
    </Stack>
  );
};

const Data_Inactive_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingBValues, setTransientSlidingBValues] = useState<
    number[]
  >([1, 3]);

  const handleChangeB = (vals: number[]): void => {
    setTransientSlidingBValues(vals);
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
      <Slider
        {...args}
        classNames="allow-pointers"
        visibleDots={[]}
        onChange={handleChangeB}
        value={transientSlidingBValues}
      />
    </Stack>
  );
};

const Data_Active_Story: ComponentStory<typeof Slider> = (args) => {
  const [_, updateArgs] = useArgs();
  const sliderRef: React.MutableRefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);
  const [markerVisible, setMarkerVisible] = useState<boolean>(false);
  const [sliderMinLabel, setSliderMinLabel] = useState<string>(args.minLabel);
  const [transientSlidingValues, setTransientSlidingValues] = useState<
    number[]
  >(args.value as number[]);
  const [targetSlidingValue, setTargetSlidingValue] = useState<number>(
    (args.value as number[])[0]
  );

  const handleChangeRange = (vals: number[]): void => {
    setTransientSlidingValues(vals);
  };

  const handleChangeTarget = (val: number): void => {
    setTargetSlidingValue(val);
  };

  const updateMarks = (
    value?: number,
    benchmarkValue?: number,
    persistedUpperValue?: number
  ): Record<number, JSX.Element> => {
    let marks: Record<number, JSX.Element> = {
      2: roleBenchmarkInactiveMarker(),
      3: upperAssessmentInactiveMarker(),
    };

    if (
      value > 0 &&
      value !== benchmarkValue &&
      value !== persistedUpperValue
    ) {
      marks[value] = lowerAssessmentActiveMarker();
    } else if (value === benchmarkValue) {
      marks[2] = combinedBenchmarkAssessmentActiveMarker();
    } else if (value === persistedUpperValue) {
      marks[3] = combinedUpperAssessmentActiveMarker();
    }

    return marks;
  };

  const updateValues = (): void => {
    const benchmarkValue: number = 2;
    const persistedUpperValue: number = 3;

    setMarkerVisible(targetSlidingValue > 0);

    if (targetSlidingValue < benchmarkValue) {
      setTransientSlidingValues([targetSlidingValue, persistedUpperValue]);
      updateArgs({
        ...args,
        marks: updateMarks(targetSlidingValue),
        trackStatus: SliderTrackStatus.Error,
        value: [targetSlidingValue, persistedUpperValue],
        visibleDots: [],
      });
    } else if (targetSlidingValue === benchmarkValue) {
      setTransientSlidingValues([targetSlidingValue, persistedUpperValue]);
      updateArgs({
        ...args,
        marks: updateMarks(targetSlidingValue, benchmarkValue),
        trackStatus: SliderTrackStatus.Warning,
        value: [benchmarkValue, persistedUpperValue], // When equal to benchmarkValue set the segment.
        visibleDots: [2],
      });
    } else if (
      targetSlidingValue < persistedUpperValue &&
      targetSlidingValue > benchmarkValue
    ) {
      setTransientSlidingValues([targetSlidingValue, persistedUpperValue]);
      updateArgs({
        ...args,
        marks: updateMarks(targetSlidingValue, null, persistedUpperValue),
        trackStatus: SliderTrackStatus.Warning,
        value: [benchmarkValue, persistedUpperValue], // When in-between benchmarkValue and persistedUpperValue set the segment.
        visibleDots: [],
      });
    } else if (targetSlidingValue === persistedUpperValue) {
      setTransientSlidingValues([targetSlidingValue, persistedUpperValue]);
      updateArgs({
        ...args,
        marks: updateMarks(targetSlidingValue, null, persistedUpperValue),
        trackStatus: SliderTrackStatus.Success,
        value: [targetSlidingValue, persistedUpperValue], // When equal to persistedUpperValue, all segments are gray.
        visibleDots: [3],
      });
    } else {
      setTransientSlidingValues([
        transientSlidingValues[0],
        targetSlidingValue,
      ]);
      updateArgs({
        ...args,
        marks: updateMarks(targetSlidingValue),
        trackStatus: SliderTrackStatus.Success,
        value: [persistedUpperValue, targetSlidingValue], // Set all segments after the persistedUpperValue.
        visibleDots: [],
      });
    }
  };

  useMemo(() => {
    setMarkerVisible(targetSlidingValue > 0);
  }, []);

  useEffect(() => {
    if (targetSlidingValue >= 0.1 && targetSlidingValue < 2) {
      setSliderMinLabel('Learner');
    } else if (targetSlidingValue >= 2 && targetSlidingValue < 3) {
      setSliderMinLabel('Practitioner');
    } else if (targetSlidingValue >= 3 && targetSlidingValue < 4) {
      setSliderMinLabel('Professional');
    } else if (targetSlidingValue >= 4 && targetSlidingValue < 5) {
      setSliderMinLabel('Expert');
    } else if (targetSlidingValue === 5) {
      setSliderMinLabel('Worldclass');
    } else {
      setSliderMinLabel('Assess skill level');
    }
  }, [sliderMinLabel, targetSlidingValue]);

  const getOffset = (): number => {
    switch (args.size) {
      case SliderSize.Large:
        return -52;
      case SliderSize.Medium:
        return -42;
      case SliderSize.Small:
        return -32;
      default:
        return -42;
    }
  };

  return (
    <ConfigProvider
      icomoonIconSet={iconSet}
      themeOptions={{
        name: 'blue',
      }}
    >
      <Stack align="stretch" direction="vertical" fullWidth flexGap="xl">
        <div>
          <Slider
            {...args}
            hideTrack={!markerVisible}
            minLabel={sliderMinLabel}
            onChange={handleChangeRange}
            ref={sliderRef}
          />
          <Slider
            {...args}
            hideRail
            hideThumb={false}
            hideTrack
            marks={null}
            onChange={handleChangeTarget}
            readOnly={false}
            showLabels={false}
            style={{
              marginTop: getOffset(), // Layer above readOnly slider
            }}
            tooltipContent={`${targetSlidingValue}`}
            tooltipProps={{
              height: 24,
              offset: 20,
              placement: 'bottom',
              portal: true,
              style: { padding: '5px 12px 4px 12px' },
              width: 40,
            }}
            value={targetSlidingValue}
          />
        </div>
        <Stack direction="horizontal" flexGap="xl" justify="center" fullWidth>
          <PrimaryButton
            iconProps={{
              icomoonIconName: 'employee',
            }}
            onClick={updateValues}
            text={'Update active marker'}
            toggle
          />
        </Stack>
      </Stack>
    </ConfigProvider>
  );
};

export const Standard_Slider = Slider_Story.bind({});
export const Range_Slider = Range_Slider_Story.bind({});
export const Inline_Extemity_Labels = Inline_Extemity_Labels_Story.bind({});
export const Custom_Markers_Included = Custom_Markers_Included_Story.bind({});
export const Custom_Markers_Excluded = Custom_Markers_Excluded_Story.bind({});
export const Custom_Markers_With_Step = Custom_Markers_With_Step_Story.bind({});
export const Custom_Markers_Null_Step = Custom_Markers_Null_Step_Story.bind({});
export const Dots = Dots_Story.bind({});
export const Toggle_Thumb = Toggle_Thumb_Story.bind({});
export const With_Benchmark = With_Benchmark_Story.bind({});
export const Data_Inactive = Data_Inactive_Story.bind({});
export const Data_Active = Data_Active_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Standard_Slider',
  'Range_Slider',
  'Inline_Extemity_Labels',
  'Custom_Markers_Included',
  'Custom_Markers_Excluded',
  'Custom_Markers_With_Step',
  'Custom_Markers_Null_Step',
  'Dots',
  'Toggle_Thumb',
  'With_Benchmark',
  'Data_Inactive',
  'Data_Active',
];

const sliderArgs: Object = {
  allowDisabledFocus: false,
  ariaLabel: 'Slider',
  autoFocus: false,
  classNames: 'my-slider',
  configContextProps: {
    noDisabledContext: false,
    noSizeContext: false,
  },
  disabled: false,
  dots: false,
  dotClassNames: null,
  dotStyle: null,
  visibleDots: null,
  formItemInput: false,
  hideMax: false,
  hideMin: false,
  hideThumb: false,
  hideRail: false,
  hideTrack: false,
  hideValue: false,
  included: true,
  id: 'mySliderId',
  labelPosition: 'bottom',
  marks: null,
  max: 100,
  maxLabel: null,
  maxLabelStyle: null,
  min: 0,
  minLabel: null,
  minLabelStyle: null,
  name: 'mySlider',
  onChange: () => {
    console.log('changed');
  },
  railBorder: true,
  readOnly: false,
  showLabels: true,
  showMarkers: false,
  size: SliderSize.Medium,
  step: 1,
  style: {
    marginTop: 24,
  },
  trackBorder: true,
  tooltipContent: null,
  type: 'default',
  valueLabel: [null, null],
  'data-test-id': 'test-id',
};

Standard_Slider.args = {
  ...sliderArgs,
  autoFocus: true,
  showLabels: true,
  value: 20,
};

Range_Slider.args = {
  ...sliderArgs,
  showLabels: true,
  showMarkers: true,
  step: 20,
  value: [40, 80],
};

Inline_Extemity_Labels.args = {
  ...sliderArgs,
  autoFocus: true,
  labelPosition: 'inline',
  showLabels: true,
  value: 20,
};

Custom_Markers_Included.args = {
  ...sliderArgs,
  marks: {
    0: '0%',
    26: '26%',
    37: '37%',
    100: {
      style: {
        color: 'var(--red-secondary-color)',
      },
      label: <strong>100%</strong>,
    },
  },
  showLabels: false,
};

Custom_Markers_Excluded.args = {
  ...sliderArgs,
  included: false,
  marks: {
    0: '0%',
    26: '26%',
    37: '37%',
    100: {
      style: {
        color: 'var(--red-secondary-color)',
      },
      label: <strong>100%</strong>,
    },
  },
  showLabels: false,
};

Custom_Markers_With_Step.args = {
  ...sliderArgs,
  marks: {
    0: '0%',
    20: '20%',
    30: '30%',
    100: {
      style: {
        color: 'var(--red-secondary-color)',
      },
      label: <strong>100%</strong>,
    },
  },
  showLabels: false,
};

Custom_Markers_Null_Step.args = {
  ...sliderArgs,
  marks: {
    0: '0%',
    26: '26%',
    37: '37%',
    100: {
      style: {
        color: 'var(--red-secondary-color)',
      },
      label: <strong>100%</strong>,
    },
  },
  showLabels: false,
  step: null,
};

Dots.args = {
  ...sliderArgs,
  dots: true,
  showLabels: true,
  step: 10,
  value: 20,
};

Toggle_Thumb.args = {
  ...sliderArgs,
  showLabels: true,
  value: 20,
};

With_Benchmark.args = {
  ...sliderArgs,
  hideMax: true,
  hideMin: true,
  minLabelStyle: { textAlign: 'end', width: 96 },
  hideThumb: false,
  included: true,
  labelPosition: 'inline',
  marks: {
    3: roleBenchmarkInactiveMarker(),
  },
  max: 5,
  maxLabel: 'Worldclass',
  minLabel: 'Practitioner',
  showLabels: true,
  showMarkers: true,
  step: 0.1,
  trackStatus: SliderTrackStatus.Error,
  type: 'default',
  value: 0,
};

Data_Inactive.args = {
  ...sliderArgs,
  hideMax: true,
  hideMin: true,
  hideThumb: true,
  hideValue: true,
  included: false,
  labelPosition: 'inline',
  marks: {
    1: (
      <Tooltip
        content="Manager assessment (1)"
        offset={20}
        placement="bottom"
        portal
        style={{ padding: '5px 8px 4px 8px' }}
        theme={TooltipTheme.dark}
      >
        <div style={{ pointerEvents: 'all' }}>
          {upperAssessmentActiveMarker()}
        </div>
      </Tooltip>
    ),
    2: (
      <Tooltip
        content="Role benckmark (2)"
        offset={20}
        placement="bottom"
        portal
        style={{ padding: '5px 8px 4px 8px' }}
        theme={TooltipTheme.dark}
      >
        <div style={{ pointerEvents: 'all' }}>
          {roleBenchmarkInactiveMarker()}
        </div>
      </Tooltip>
    ),
    3: (
      <Tooltip
        content="Employee assessment (3)"
        offset={20}
        placement="bottom"
        portal
        style={{ padding: '5px 8px 4px 8px' }}
        theme={TooltipTheme.dark}
        maxWidth={148}
      >
        <div style={{ pointerEvents: 'all' }}>
          {lowerAssessmentActiveMarker()}
        </div>
      </Tooltip>
    ),
  },
  max: 5,
  maxLabel: 'Worldclass',
  minLabel: 'Professional',
  readOnly: true,
  showLabels: true,
  showMarkers: true,
  trackStatus: SliderTrackStatus.Success,
  type: 'data',
  value: [1, 3],
};

Data_Active.args = {
  ...sliderArgs,
  dots: false,
  dotClassNames: 'slider-dot',
  dotStyle: {
    backgroundColor: '#FFCD78',
    borderColor: '#C97E19',
  },
  visibleDots: [],
  hideMax: true,
  hideMin: true,
  hideThumb: true,
  hideValue: true,
  included: false,
  labelPosition: 'inline',
  marks: {
    2: roleBenchmarkInactiveMarker(),
    3: upperAssessmentInactiveMarker(),
  },
  min: 0,
  max: 5,
  step: 0.1,
  maxLabel: 'Worldclass',
  minLabel: 'Assess skill level',
  minLabelStyle: { textAlign: 'end', width: 96 },
  readOnly: true,
  showLabels: true,
  showMarkers: true,
  type: 'data',
  value: [0, 3],
};
