import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonTextAlign, ButtonWidth, DefaultButton } from '../Button';
import { Icon, IconName } from '../Icon';
import { Dropdown } from './';

export default {
    title: 'Dropdown',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Dropdown</h1>
                            <p>
                                A dropdown is a list in which the selected item
                                is always visible while other items are visible
                                on demand by clicking a dropdown button.
                                Dropdowns are typically used for forms.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    Use a dropdown when there are multiple
                                    choices that can be collapsed under one
                                    title, if the list of items is too long, or
                                    when space is constrained.
                                </li>
                                <li>
                                    Use a dropdown when the selected option is
                                    more important than the alternatives (in
                                    contrast to radio buttons where all the
                                    choices are visible, putting equal emphasis
                                    on all options).
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
                                </li>
                                <li>
                                    The dropdown trigger element should describe
                                    what can be found in the list of options.
                                </li>
                                <li>
                                    Use shortened statements or single words as
                                    list options.
                                </li>
                                <li>
                                    If there isn't a default option, use "Select
                                    an option" as placeholder text.
                                </li>
                                <li>If "None" is an option, include it.</li>
                                <li>
                                    Write the choices using parallel
                                    construction. For example, start with the
                                    same part of speech or verb tense.
                                </li>
                            </ul>
                        </section>
                        <hr />
                        <section>
                            <Stories includePrimary />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Dropdown>;

const Overlay = () => (
    <div>
        <DefaultButton
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
        />
        <DefaultButton
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
        />
        <DefaultButton
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
        />
    </div>
);

export const Dropdowns: ComponentStory<typeof Dropdown> = () => {
    const [visible, setVisibility] = useState(false);

    return (
        <>
            <h2>Dropdown</h2>
            <div style={{ display: 'flex', gap: '20%' }}>
                <Dropdown overlay={Overlay()}>
                    <DefaultButton text={'Click button start'} />
                </Dropdown>
                <Dropdown
                    overlay={Overlay()}
                    trigger="hover"
                    placement="bottom-end"
                    onVisibleChange={(isVisible) => setVisibility(isVisible)}
                >
                    <div style={{ display: 'flex' }}>
                        Hover div
                        <Icon
                            path={IconName.mdiChevronDown}
                            rotate={visible ? 180 : 0}
                        />
                    </div>
                </Dropdown>
                <Dropdown
                    overlay={Overlay()}
                    placement="bottom-end"
                    onVisibleChange={(isVisible) => setVisibility(isVisible)}
                >
                    <div style={{ display: 'flex' }}>Click div</div>
                </Dropdown>
                <Dropdown
                    overlay={Overlay()}
                    placement="bottom-end"
                    trigger="contextmenu"
                    onVisibleChange={(isVisible) => setVisibility(isVisible)}
                >
                    <div style={{ display: 'flex' }}>Contextmenu div</div>
                </Dropdown>
            </div>
        </>
    );
};
