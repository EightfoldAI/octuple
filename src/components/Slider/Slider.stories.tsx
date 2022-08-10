import React, { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Stack } from '../Stack';

import { Slider } from './';

export default {
    title: 'Slider',
    component: Slider,
} as ComponentMeta<typeof Slider>;

const Slider_Story: ComponentStory<typeof Slider> = (args) => {
    const [transientSlidingValue, setTransientSlidingValue] =
        useState<number>(2);

    const handleChange = (val: number): void => {
        setTransientSlidingValue(val);
    };

    return (
        <Stack direction="vertical" gap="xl" style={{ width: '100%' }}>
            <Slider
                {...args}
                value={transientSlidingValue}
                onChange={handleChange}
            />
            <Stack
                direction="horizontal"
                gap="xl"
                justify="center"
                style={{ width: '100%' }}
            >
                <div>{transientSlidingValue}</div>
            </Stack>
        </Stack>
    );
};

const Range_Slider_Story: ComponentStory<typeof Slider> = (args) => {
    const [transientSlidingValues, setTransientSlidingValues] = useState<
        number[]
    >([110, 150]);

    const handleChange = (vals: number[]): void => {
        setTransientSlidingValues(vals);
    };

    return (
        <Stack
            align="stretch"
            direction="vertical"
            gap="xl"
            justify="center"
            style={{ width: '100%' }}
        >
            <Slider
                {...args}
                value={transientSlidingValues}
                onChange={handleChange}
            />
            <Stack
                direction="horizontal"
                gap="xl"
                justify="center"
                style={{ width: '100%' }}
            >
                <div>{transientSlidingValues[0]}</div>
                <div>{transientSlidingValues[1]}</div>
            </Stack>
        </Stack>
    );
};

const sliderArgs: Object = {
    ariaLabel: 'Slider',
    autoFocus: false,
    classNames: 'my-slider',
    disabled: false,
    id: 'mySliderId',
    min: 100,
    max: 200,
    name: 'mySlider',
    onChange: () => {
        console.log('changed');
    },
};

export const StandardSlider = Slider_Story.bind({});
StandardSlider.args = {
    ...sliderArgs,
    autoFocus: true,
    min: 1,
    max: 5,
    showLabels: true,
    showMarkers: true,
    value: 2,
};

export const RangeSlider = Range_Slider_Story.bind({});
RangeSlider.args = {
    ...sliderArgs,
    min: 0,
    showLabels: true,
    showMarkers: true,
    step: 10,
    value: [110, 150],
};
