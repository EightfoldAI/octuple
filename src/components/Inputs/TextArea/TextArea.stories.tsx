import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextArea, TextInputTheme, TextInputWidth } from '../index';

export default {
    title: 'Input',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Text Area</h1>
                            <p>
                                Text areas give people a way to enter and edit
                                text. They're used in forms, modal dialogs,
                                tables, and other surfaces where multiline text
                                input is required.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    Use a single line text input component when
                                    short entries are expected.
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Include a short label above the text area to
                                    communicate what information should be
                                    entered. Don't use placeholder text instead
                                    of a label. Placeholder text poses a variety
                                    of accessibility issues (including possible
                                    problems with color/contrast, and people
                                    thinking the form input is already filled
                                    out).
                                </li>
                                <li>
                                    When part of a form, make it clear which
                                    fields are required vs. optional. If the
                                    input is required, add an asterisk "*" to
                                    the label. For screen readers, make sure the
                                    aria-required property is set to true.
                                </li>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
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
        inputWidth: {
            options: [TextInputWidth.fitContent, TextInputWidth.fill],
            control: { type: 'inline-radio' },
        },
        theme: {
            options: ['light', 'dark'],
            control: { type: 'inline-radio' },
        },
        value: {
            control: { type: 'text' },
        },
    },
} as ComponentMeta<typeof TextArea>;

const Text_Area_Story: ComponentStory<typeof TextArea> = (args) => (
    <TextArea {...args} />
);

export const Text_Area = Text_Area_Story.bind({});

Text_Area.args = {
    allowDisabledFocus: false,
    ariaLabel: 'Sample text',
    autoFocus: false,
    classNames: 'my-textarea-class',
    disabled: false,
    enableExpand: true,
    htmltype: 'text',
    id: 'myTextAreaId',
    inputWidth: TextInputWidth.fitContent,
    labelProps: {
        labelIconButtonProps: {
            show: true,
            toolTipContent: 'tooltip',
        },
        text: 'Label',
    },
    maxlength: 300,
    minlength: 0,
    name: 'myTextArea',
    placeholder: 'Placeholder text',
    required: false,
    style: {},
    textAreaCols: 50,
    textAreaRows: 5,
    theme: TextInputTheme.light,
    waitInterval: 10,
};
