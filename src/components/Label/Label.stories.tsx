import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Label, LabelSize } from './index';

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
} as ComponentMeta<typeof Label>;

export const Labels: ComponentStory<typeof Label> = () => {
    return (
        <>
            <h1>Labels</h1>
            <p>Large</p>
            <Label
                labelIconButtonProps={{
                    show: true,
                    toolTipContent: 'A tooltip',
                    toolTipPlacement: 'top',
                    onClick: () => _alertClicked(),
                }}
                size={LabelSize.Large}
                text="Label"
            />
            <br />
            <br />
            <p>Medium</p>
            <Label
                labelIconButtonProps={{
                    show: true,
                    toolTipContent: 'A tooltip',
                    toolTipPlacement: 'top',
                    onClick: () => _alertClicked(),
                }}
                size={LabelSize.Medium}
                text="Label"
            />
            <br />
            <br />
            <p>Small</p>
            <Label
                labelIconButtonProps={{
                    show: true,
                    toolTipContent: 'A tooltip',
                    toolTipPlacement: 'top',
                    onClick: () => _alertClicked(),
                }}
                size={LabelSize.Small}
                text="Label"
            />
            <br />
            <br />
        </>
    );
};

function _alertClicked(): void {
    alert('Clicked');
}
