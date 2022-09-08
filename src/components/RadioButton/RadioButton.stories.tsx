import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Label } from '../Label';
import { RadioButton, RadioButtonValue, RadioGroup } from './';
import { LabelAlign, LabelPosition, SelectorSize } from '../CheckBox';
import { Stack } from '../Stack';

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
        labelPosition: {
            options: [LabelPosition.End, LabelPosition.Start],
            control: { type: 'inline-radio' },
        },
        labelAlign: {
            options: [LabelAlign.Start, LabelAlign.Center, LabelAlign.End],
            control: { type: 'inline-radio' },
        },
        layout: {
            options: ['vertical', 'horizontal'],
            control: { type: 'inline-radio' },
        },
        size: {
            options: [
                SelectorSize.Flex,
                SelectorSize.Large,
                SelectorSize.Medium,
                SelectorSize.Small,
            ],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof RadioButton>;

const RadioButton_Story: ComponentStory<typeof RadioButton> = (args) => {
    const [selected, setSelected] = useState<RadioButtonValue>('label1');

    const radioChangeHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected(e.target.value);
    };

    return (
        <RadioButton
            {...args}
            checked={selected === 'Label1'}
            onChange={radioChangeHandler}
        />
    );
};

export const Radio_Button = RadioButton_Story.bind({});

const RadioButtonLongText_Story: ComponentStory<typeof RadioButton> = (
    args
) => {
    const [selected, setSelected] = useState<RadioButtonValue>('label1');

    const radioChangeHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected(e.target.value);
    };

    return (
        <div style={{ width: 200 }}>
            <RadioButton
                {...args}
                checked={selected === 'Label1'}
                onChange={radioChangeHandler}
            />
        </div>
    );
};

export const Radio_Button_Long_Text = RadioButtonLongText_Story.bind({});

const RadioGroup_Story: ComponentStory<typeof RadioGroup> = (args) => {
    const [selected1, setSelected1] = useState<RadioButtonValue>(args.value);

    const radioChangeGroupHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected1(e.target.value);
    };

    return (
        <RadioGroup
            {...args}
            value={selected1}
            onChange={radioChangeGroupHandler}
        />
    );
};

export const Radio_Group = RadioGroup_Story.bind({});

const Bespoke_RadioGroup_Story: ComponentStory<typeof RadioButton> = (args) => {
    const [selected2a, setSelected2a] = useState<RadioButtonValue>('label1');
    const [selected2b, setSelected2b] = useState<RadioButtonValue>('label1');

    const radioChangeGroupAHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected2a(e.target.value);
    };

    const radioChangeGroupBHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected2b(e.target.value);
    };

    return (
        <Stack direction="vertical" gap="m">
            <Label text="Group 1" />
            <RadioButton
                {...args}
                ariaLabel={'Label 1'}
                checked={selected2a === 'label1'}
                id={'myBespokeRadioGroup1-Id1'}
                label={'Label 1'}
                name={'bespokeGroup1'}
                onChange={radioChangeGroupAHandler}
                value={'label1'}
            />
            <RadioButton
                {...args}
                ariaLabel={'Label 2'}
                checked={selected2a === 'label2'}
                id={'myBespokeRadioGroup1-Id2'}
                label={'Label 2'}
                name={'bespokeGroup1'}
                onChange={radioChangeGroupAHandler}
                value={'label2'}
            />
            <RadioButton
                {...args}
                ariaLabel={'Label 3'}
                checked={selected2a === 'label3'}
                id={'myBespokeRadioGroup1-Id3'}
                label={'Label 3'}
                name={'bespokeGroup1'}
                onChange={radioChangeGroupAHandler}
                value={'label3'}
            />
            <Label text="Group 2" />
            <RadioButton
                {...args}
                ariaLabel={'Label 1'}
                checked={selected2b === 'label1'}
                id={'myBespokeRadioGroup2-Id1'}
                label={'Label 1'}
                name={'bespokeGroup2'}
                onChange={radioChangeGroupBHandler}
                value={'label1'}
            />
            <RadioButton
                {...args}
                ariaLabel={'Label 2'}
                checked={selected2b === 'label2'}
                id={'myBespokeRadioGroup2-Id2'}
                label={'Label 2'}
                name={'bespokeGroup2'}
                onChange={radioChangeGroupBHandler}
                value={'label2'}
            />
            <RadioButton
                {...args}
                ariaLabel={'Label 3'}
                checked={selected2b === 'label3'}
                id={'myBespokeRadioGroup2-Id3'}
                label={'Label 3'}
                name={'bespokeGroup2'}
                onChange={radioChangeGroupBHandler}
                value={'label3'}
            />
        </Stack>
    );
};

export const Bespoke_Radio_Group = Bespoke_RadioGroup_Story.bind({});

const RadioButton_With_Custom_Label_Story: ComponentStory<
    typeof RadioButton
> = (args) => {
    const [selected, setSelected] = useState<RadioButtonValue>('label1');

    const radioChangeHandler = (
        e?: React.ChangeEvent<HTMLInputElement>
    ): void => {
        setSelected(e.target.value);
    };

    return (
        <RadioButton
            {...args}
            checked={selected === 'Label1'}
            onChange={radioChangeHandler}
        />
    );
};

export const RadioButton_With_Custom_Label =
    RadioButton_With_Custom_Label_Story.bind({});

const RadioGroup_With_Custom_Label_Story: ComponentStory<typeof RadioGroup> = (
    args
) => {
    const [selected3, setSelected3] = useState<RadioButtonValue>(args.value);
    return (
        <RadioGroup
            {...args}
            value={selected3}
            onChange={(e) => {
                args.onChange(e);
                setSelected3(e.target.value);
            }}
        />
    );
};

export const RadioGroup_With_Custom_Label =
    RadioGroup_With_Custom_Label_Story.bind({});

const radioButtonArgs: Object = {
    allowDisabledFocus: false,
    ariaLabel: 'Label',
    checked: false,
    classNames: 'my-radiobutton-class',
    disabled: false,
    id: 'myRadioButtonId',
    label: 'Label',
    labelPosition: LabelPosition.End,
    labelAlign: LabelAlign.Center,
    name: 'myRadioButtonName',
    size: SelectorSize.Medium,
    value: 'Label1',
};

Radio_Button.args = {
    ...radioButtonArgs,
};

Radio_Button_Long_Text.args = {
    ...radioButtonArgs,
    label: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
};

Radio_Group.args = {
    allowDisabledFocus: false,
    ariaLabel: 'Radio Group',
    disabled: false,
    items: [1, 2, 3].map((i: number) => ({
        ariaLabel: `Radio${i}`,
        id: `oea2exk-${i}`,
        label: `Radio${i}`,
        name: 'group1',
        value: `Radio${i}`,
    })),
    layout: 'vertical',
    size: SelectorSize.Medium,
    value: 'Radio1',
};

Bespoke_Radio_Group.args = {
    ...radioButtonArgs,
};

RadioButton_With_Custom_Label.args = {
    ...radioButtonArgs,
    label: (
        <div>
            <div style={{ fontWeight: 'bold' }}>Line one with some text</div>
            <div>
                Line two with some details about the above text. This could be a
                description or summary of some sort.
            </div>
        </div>
    ),
};

RadioGroup_With_Custom_Label.args = {
    allowDisabledFocus: false,
    ariaLabel: 'Radio Group Custom',
    disabled: false,
    items: [1, 2, 3].map((i: number) => ({
        ariaLabel: `Radio${i}`,
        checked: i === 1,
        id: `qgc4gzm-${i}`,
        label: (
            <div>
                <div style={{ fontWeight: 'bold' }}>
                    Line one with some text
                </div>
                <div>
                    Line two with some details about the above text. This could
                    be a description or summary of some sort.
                </div>
            </div>
        ),
        name: 'group3',
        value: `Radio${i}`,
    })),
    layout: 'vertical',
    size: SelectorSize.Medium,
    value: 'Radio1',
};
