import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconName } from '../../Icon';
import {
    TextInput,
    TextInputShape,
    TextInputTheme,
    TextInputWidth,
} from '../index';

export default {
    title: 'Input',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Text Input</h1>
                            <p>
                                Text inputs give people a way to enter and edit
                                text. They're used in forms, modal dialogs,
                                tables, and other surfaces where text input is
                                required.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    Use a multiline text area component when
                                    long entries are expected.
                                </li>
                                <li>
                                    Don't place a text input in the middle of a
                                    sentence, because the sentence structure
                                    might not make sense in all languages. For
                                    example, "Remind me in [textinput] weeks"
                                    should instead read, "Remind me in this many
                                    weeks: [textinput]".
                                </li>
                                <li>
                                    Format the text input for the expected
                                    entry. For example, when someone needs to
                                    enter a phone number, use an input mask to
                                    indicate that three sets of digits should be
                                    entered.
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Include a short label above the text input
                                    to communicate what information should be
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
                                <li>
                                    Text inputs may be numbers only, allowing
                                    someone to incrementally adjust a numerical
                                    value in small steps. Make sure to include a
                                    label indicating what value the input
                                    changes.
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
        shape: {
            options: [TextInputShape.Rectangle, TextInputShape.Pill],
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
} as ComponentMeta<typeof TextInput>;

const Text_Input_Story: ComponentStory<typeof TextInput> = (args) => {
    const [val, setVal] = useState(args.value);
    return <TextInput {...args} value={val} onChange={(e) => setVal(e.target.value)} />
};

export const Text_Input = Text_Input_Story.bind({});

Text_Input.args = {
    allowDisabledFocus: false,
    ariaLabel: 'Sample text',
    autoFocus: false,
    classNames: 'my-textinput-class',
    clearButtonAriaLabel: 'Clear',
    disabled: false,
    htmltype: 'text',
    iconProps: {
        path: IconName.mdiCardsHeart,
        color: 'red',
    },
    iconButtonProps: {
        allowDisabledFocus: false,
        disabled: false,
        iconProps: { path: IconName.mdiFilter },
    },
    id: 'myTextInputId',
    inputWidth: TextInputWidth.fitContent,
    labelProps: {
        labelIconButtonProps: {
            show: true,
            toolTipContent: 'tooltip',
        },
        text: 'Label',
    },
    maxlength: 100,
    minlength: 0,
    name: 'myTextInput',
    numbersOnly: false,
    placeholder: 'Placeholder text',
    required: false,
    shape: TextInputShape.Pill,
    style: {},
    theme: TextInputTheme.light,
    waitInterval: 10,
};
