import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    CheckboxValueType,
    RadioButton,
    RadioButtonValue,
    RadioGroup,
} from '../index';

export default {
    title: 'Radio Button',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Radio Group</h1>
                            <p>
                                Radio buttons (RadioGroup) let people select a
                                single option from two or more choices.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    Use radio buttons when there are two to
                                    seven options, you have enough screen space,
                                    and the options are important enough to be a
                                    good use of that screen space.
                                </li>
                                <li>
                                    If there are more than seven options, use a
                                    drop-down menu instead.
                                </li>
                                <li>
                                    To give people a way to select more than one
                                    option, use check boxes instead.
                                </li>
                                <li>
                                    If a default option is recommended for most
                                    people in most situations, use a drop-down
                                    menu instead.
                                </li>
                                <li>
                                    Align radio buttons vertically instead of
                                    horizontally, if possible. Horizontal
                                    alignment is harder to read and localize. If
                                    there are only two mutually exclusive
                                    options, combine them into a single check
                                    box or toggle. For example, use a check box
                                    for "I agree" statements instead of radio
                                    buttons for "I agree" and "I disagree".
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    List the options in a logical order, such as
                                    most likely to be selected to least,
                                    simplest operation to most complex, or least
                                    risk to most. Listing options in
                                    alphabetical order isn't recommended because
                                    the order will change when the text is
                                    localized.
                                </li>
                                <li>
                                    Select the safest (to prevent loss of data
                                    or system access), most secure, and most
                                    private option as the default. If safety and
                                    security aren't factors, select the most
                                    likely or convenient option.
                                </li>
                                <li>
                                    Use a phrase for the label, rather than a
                                    full sentence.
                                </li>
                                <li>
                                    Make sure to give people the option to not
                                    make a choice. For example, include a "None"
                                    option.
                                </li>
                                <li>
                                    When using ChoiceGroup with images, keep
                                    text short (ideally one or two words), since
                                    overflowing text will be cut off.
                                    Translation to other languages and
                                    user-applied text styles can often cause
                                    label text to end up longer than the English
                                    label with author styles.
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
        onChange: {
            action: 'change',
        },
    },
} as ComponentMeta<typeof RadioButton>;

const RadioButton_Story: ComponentStory<typeof RadioButton> = (args) => (
    <RadioButton {...args} />
);

export const Radio_Button = RadioButton_Story.bind({});

const RadioGroup_Story: ComponentStory<typeof RadioGroup> = (args) => {
    const [selected, setSelected] = useState<RadioButtonValue>('Radio1');
    return (
        <RadioGroup
            {...args}
            value={selected}
            onChange={(e) => {
                setSelected(e.target.value);
            }}
        />
    );
};

export const Radio_Group = RadioGroup_Story.bind({});

const radioButtonArgs: Object = {
    allowDisabledFocus: false,
    ariaLabel: 'Label',
    label: 'Label',
    checked: false,
    classNames: 'my-radiobutton-class',
    disabled: false,
    name: 'myRadioButtonName',
    value: 'Label',
    id: 'myRadioButtonId',
};

Radio_Button.args = {
    ...radioButtonArgs,
};

Radio_Group.args = {
    items: [1, 2, 3].map((i) => ({
        value: `Radio${i}`,
        label: `Radio${i}`,
        name: 'group',
        id: `oea2exk-${i}`,
    })),
};
