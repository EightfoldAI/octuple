import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Label, LabelSize } from './index';
import { ButtonShape } from '../Button';

export default {
    title: 'Label',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Label</h1>
                            <p>
                                Labels give a name or title to a control or
                                group of controls, including text fields, check
                                boxes, combo boxes, radio buttons, and drop-down
                                menus.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    Labels should be close to the control
                                    they're paired with.
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Labels should describe the purpose of the
                                    control.
                                </li>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
                                </li>
                                <li>Be short and concise.</li>
                                <li>Use nouns or short noun phrases.</li>
                                <li>
                                    Don't use labels as instructional text. For
                                    example, "Click to get started".
                                </li>
                            </ul>
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
            options: [
                LabelSize.Flex,
                LabelSize.Large,
                LabelSize.Medium,
                LabelSize.Small,
            ],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof Label>;

const Label_Story: ComponentStory<typeof Label> = (args) => <Label {...args} />;

export const Basic = Label_Story.bind({});
export const Default_Info_Button = Label_Story.bind({});
export const Custom_Button = Label_Story.bind({});

Basic.args = {
    text: 'This is a label',
    size: LabelSize.Medium,
    classNames: 'my-label-class',
    colon: false,
    htmlFor: '',
};

Default_Info_Button.args = {
    text: 'This is a label',
    size: LabelSize.Medium,
    labelIconButtonProps: {
        show: true,
        toolTipContent: 'A tooltip',
        toolTipPlacement: 'right',
        onClick: () => _alertClicked(),
    },
    classNames: 'my-label-class',
    colon: false,
    htmlFor: '',
};

Custom_Button.args = {
    text: 'This is a label',
    size: LabelSize.Medium,
    labelIconButtonProps: {
        iconProps: {
            path: null,
        },
        shape: ButtonShape.Pill,
        show: true,
        style: {
            marginLeft: 8,
            marginTop: -8,
        },
        text: 'Learn more',
        onClick: () => _alertClicked(),
    },
    classNames: 'my-label-class',
    colon: false,
    htmlFor: '',
};

function _alertClicked(): void {
    alert('Clicked');
}
