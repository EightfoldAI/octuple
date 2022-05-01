import React from 'react';
import { Slider } from './';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
    title: 'Slider',
    component: Slider,
} as ComponentMeta<typeof Slider>;

export const Sliders: ComponentStory<typeof Slider> = () => {
    let sliderVal = 100;

    return (
        <>
            <h1>Basic Slider</h1>
            <Slider min={0} max={400} value={sliderVal} />
            <br />
            <br />

            <h1>Value Hidden</h1>
            <div className="slider-story-wrapper">
                <Slider min={0} max={400} value={sliderVal} showValue={false} />
            </div>
            <br />
            <br />

            <h1>Disabled</h1>
            <div className="slider-story-wrapper">
                <Slider min={0} max={400} value={sliderVal} disabled={true} />
            </div>
        </>
    );
};
