import React from 'react';
import { Slider } from './';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Slider',
    component: Slider,
} as ComponentMeta<typeof Slider>;

export const Sliders: ComponentStory<typeof Slider> = () => (
    <Slider min={0} max={400} value={200} />
);
