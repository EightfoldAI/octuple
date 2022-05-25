import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CheckBox, CheckBoxGroup } from '../index';

export default {
    title: 'Check Box',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Check Box</h1>
                            <p>
                                Check boxes (CheckBox) give people a way to
                                select one or more items from a group, or switch
                                between two mutually exclusive options (checked
                                or unchecked, on or off).
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    Use a single check box when there's only one
                                    selection to make or choice to confirm.
                                    Selecting a blank check box selects it.
                                    Selecting it again clears the check box.
                                </li>
                                <li>
                                    Use multiple check boxes when one or more
                                    options can be selected from a group. Unlike
                                    radio buttons, selecting one check box will
                                    not clear another check box.
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Separate two groups of check boxes with
                                    headings rather than positioning them one
                                    after the other.
                                </li>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
                                </li>
                                <li>
                                    Don't use end punctuation (unless the check
                                    box label absolutely requires multiple
                                    sentences).
                                </li>
                                <li>
                                    Use a sentence fragment for the label,
                                    rather than a full sentence.
                                </li>
                                <li>
                                    Make it easy for people to understand what
                                    will happen if they select or clear a check
                                    box.
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
} as ComponentMeta<typeof CheckBox>;

export const Box = () => {
    const checkboxGroupItems = [
        {
            checked: true,
            name: 'group',
            value: 'First',
            id: 'test-1',
        },
        {
            checked: true,
            name: 'group',
            value: 'Second',
            id: 'test-2',
        },
        {
            checked: true,
            name: 'group',
            value: 'Third',
            id: 'test-3',
        },
    ];

    return (
        <>
            <h1>Check Boxes</h1>
            <h2>Default Check Box</h2>
            <CheckBox checked={true} id="test-4" />
            <h2>Label Check Box</h2>
            <CheckBox checked={true} value="Label" id="test-5" />
            <h2>Check Box Groups</h2>
            <CheckBoxGroup items={checkboxGroupItems} />
        </>
    );
};

const checkBoxArgs: Object = {
    allowDisabledFocus: false,
    ariaLabel: 'CheckBox',
    checked: false,
    defaultChecked: false,
    disabled: false,
    name: 'myCheckBoxName',
    value: '',
    id: 'myCheckBoxId',
};

// Primary.args = {
//     ...buttonArgs,
//     ariaLabel: 'Primary Button',
//     text: 'Primary Button',
// };

// Secondary.args = {
//     ...buttonArgs,
//     ariaLabel: 'Secondary Button',
//     text: 'Secondary Button',
// };

// Default.args = {
//     ...buttonArgs,
//     ariaLabel: 'Default Button',
//     text: 'Default Button',
// };
