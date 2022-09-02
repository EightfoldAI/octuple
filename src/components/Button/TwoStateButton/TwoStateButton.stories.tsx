import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    BaseButton,
    ButtonShape,
    ButtonSize,
    ButtonTextAlign,
    ButtonWidth,
    TwoStateButton,
} from '../';
import { IconName } from '../../Icon';

export default {
    title: 'Button',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Two State Button</h1>
                            <p>
                                Like toggle button, Two State buttons require
                                the <b>toggle</b> attribute in addition to{' '}
                                <b>checked</b>. Two State button's visual state
                                is different than a basic Toggle button.
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
        buttonWidth: {
            options: [ButtonWidth.fitContent, ButtonWidth.fill],
            control: { type: 'inline-radio' },
        },
        onClick: {
            action: 'click',
        },
        shape: {
            options: [
                ButtonShape.Rectangle,
                ButtonShape.Pill,
                ButtonShape.Round,
            ],
            control: { type: 'inline-radio' },
        },
        size: {
            options: [
                ButtonSize.Flex,
                ButtonSize.Large,
                ButtonSize.Medium,
                ButtonSize.Small,
            ],
            control: { type: 'radio' },
        },
        theme: {
            options: ['light', 'dark'],
            control: { type: 'inline-radio' },
        },
    },
} as ComponentMeta<typeof BaseButton>;

const Two_State_Button_Story: ComponentStory<typeof TwoStateButton> = (
    args
) => <TwoStateButton {...args} />;

export const Two_State_Button = Two_State_Button_Story.bind({});

Two_State_Button.args = {
    counter: '8',
    alignText: ButtonTextAlign.Center,
    allowDisabledFocus: false,
    ariaLabel: 'Two State Button',
    buttonWidth: ButtonWidth.fitContent,
    checked: false,
    classNames: 'my-two-state-btn-class',
    disabled: false,
    disruptive: false,
    dropShadow: false,
    iconOneProps: {
        path: IconName.mdiCardsHeart,
        ariaHidden: true,
        classNames: 'my-two-state-btn-icon-one',
        id: 'myTwoStateButtonIconOne',
        role: 'presentation',
        rotate: 0,
        spin: false,
        vertical: false,
        'data-test-id': 'myTwoStateButtonIconOneTestId',
    },
    iconTwoProps: {
        path: IconName.mdiChevronDown,
        ariaHidden: true,
        classNames: 'my-two-state-btn-icon-two',
        id: 'myTwoStateButtonIconTwo',
        role: 'presentation',
        rotate: 0,
        spin: false,
        vertical: false,
        'data-test-id': 'myTwoStateButtonIconTwoTestId',
    },
    id: 'myTwoStateButton',
    shape: ButtonShape.Pill,
    size: ButtonSize.Medium,
    style: {},
    text: 'Two State Button',
    toggle: true,
};
