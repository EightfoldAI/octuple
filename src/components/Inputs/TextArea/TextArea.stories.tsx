import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TextArea, TextInputWidth } from '../index';

export default {
    title: 'Text Area',
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
                        <br />
                        <hr />
                        <br />
                        <section>
                            <Stories includePrimary />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof TextArea>;

export const Text_Areas: ComponentStory<typeof TextArea> = () => {
    return (
        <>
            <h1>Text Areas</h1>
            <p>Text Area No Expand Stretch (Rectangle)</p>
            <TextArea
                labelProps={{ text: 'Label' }}
                inputWidth={TextInputWidth.fill}
            />
            <br />
            <br />
            <p>Text Area No Expand With Icon Button (Rectangle)</p>
            <TextArea
                labelProps={{
                    labelIconButtonProps: {
                        show: true,
                        toolTipContent: 'A tooltip',
                        toolTipPlacement: 'top',
                        onClick: _alertClicked,
                    },
                    text: 'Label',
                }}
            />
            <br />
            <br />
            <p>Text Area with expand (Rectangle)</p>
            <TextArea labelProps={{ text: 'Label' }} enableExpand={true} />
            <br />
            <br />
        </>
    );
};

function _alertClicked(): void {
    alert('Clicked');
}
