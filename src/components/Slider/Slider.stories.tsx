import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Slider, SliderSize } from './';
import { Stack } from '../Stack';
import { Col, Row } from '../Grid';
import { PrimaryButton } from '../Button';

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
    <Stack align="stretch" direction="vertical" fullWidth gap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <div>{transientSlidingAValue}</div>
      </Stack>
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
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <div>{transientSlidingBValue}</div>
      </Stack>
    </Stack>
  );
};

const Range_Slider_Story: ComponentStory<typeof Slider> = (args) => {
  const [transientSlidingAValues, setTransientSlidingAValues] = useState<
    number[]
  >([40, 80]);
  const [transientSlidingBValues, setTransientSlidingBValues] = useState<
    number[]
  >([40, 80]);

  const handleChangeA = (vals: number[]): void => {
    setTransientSlidingAValues(vals);
  };

  const handleChangeB = (vals: number[]): void => {
    setTransientSlidingBValues(vals);
  };

  return (
    <Stack align="stretch" direction="vertical" fullWidth gap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValues}
      />
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <div>{transientSlidingAValues[0]}</div>
        <div>{transientSlidingAValues[1]}</div>
      </Stack>
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
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <div>{transientSlidingBValues[0]}</div>
        <div>{transientSlidingBValues[1]}</div>
      </Stack>
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
    <Stack align="stretch" direction="vertical" fullWidth gap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <div>{transientSlidingAValue}</div>
      </Stack>
      <Slider
        {...args}
        onChange={handleChangeB}
        showMarkers
        step={20}
        style={{ marginTop: 100 }}
        value={transientSlidingBValues}
      />
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <div>{transientSlidingBValues[0]}</div>
        <div>{transientSlidingBValues[1]}</div>
      </Stack>
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
    <Stack align="stretch" direction="vertical" fullWidth gap="xl">
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
    <Stack align="stretch" direction="vertical" fullWidth gap="xl">
      <Slider
        {...args}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <div>{transientSlidingAValue}</div>
      </Stack>
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
    <Stack align="stretch" direction="vertical" fullWidth gap="xl">
      <Slider
        {...args}
        hideThumb={thumbHidden}
        onChange={handleChangeA}
        value={transientSlidingAValue}
      />
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <div>{transientSlidingAValue}</div>
      </Stack>
      <Stack direction="horizontal" gap="xl" justify="center" fullWidth>
        <PrimaryButton
          onClick={toggleThumbVisibility}
          text={thumbHidden ? 'Show thumb' : 'Hide thumb'}
          toggle
        />
      </Stack>
    </Stack>
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
  formItemInput: false,
  hideMax: false,
  hideMin: false,
  hideThumb: false,
  hideValue: false,
  id: 'mySliderId',
  labelPosition: 'bottom',
  marks: null,
  max: 100,
  maxLabel: null,
  min: 0,
  minLabel: null,
  name: 'mySlider',
  onChange: () => {
    console.log('changed');
  },
  readOnly: false,
  showLabels: true,
  showMarkers: false,
  size: SliderSize.Medium,
  step: 1,
  style: {
    marginTop: 24,
  },
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
        color: 'var(--red-color-70)',
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
        color: 'var(--red-color-70)',
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
        color: 'var(--red-color-70)',
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
        color: 'var(--red-color-70)',
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
