import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconName } from '../../Icon';
import {
    SearchBox,
    TextInputShape,
    TextInputSize,
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
                            <h1>Search Box</h1>
                            <p>
                                A search box provides an input field for
                                searching content within a site or app to find
                                specific items.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    There are four search box sizes that may be
                                    specified via the <b>size</b> prop and the{' '}
                                    <b>TextInputSize</b>:{' '}
                                    <b>TextInputSize.Flex</b>,{' '}
                                    <b>TextInputSize.Large</b>,{' '}
                                    <b>TextInputSize.Medium</b>,{' '}
                                    <b>TextInputSize.Small</b>.{' '}
                                    <b>TextInputSize.Flex</b> is the default and
                                    resizes the search box automatically with
                                    the viewport. To prevent this responsive
                                    behavior, give the search box a size.
                                </li>
                                <li>
                                    Don't build a custom search control based on
                                    the default text box or any other control.
                                </li>
                                <li>
                                    Use a search box without a parent container
                                    when it's not restricted to a certain width
                                    to accommodate other content. A search box
                                    may span the entire width of the space it's
                                    in.
                                </li>
                                <li>
                                    Use either a supplemental icon or image, but
                                    not both.
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Use placeholder text in the search box to
                                    describe what people can search for. For
                                    example, "Search", "Search files", or
                                    "Search contacts list".
                                </li>
                                <li>
                                    Although search entry points tend to be
                                    similarly visualized, they can provide
                                    access to results that range from broad to
                                    narrow. By effectively communicating the
                                    scope of a search, you can ensure that
                                    people's expectations are met by the
                                    capabilities of the search you're
                                    performing, which will reduce the
                                    possibility of frustration. The search entry
                                    point should be placed near the content
                                    being searched.
                                </li>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
                                </li>
                            </ul>
                            <label>Some common search scopes include:</label>
                            <ul>
                                <li>
                                    <b>Global</b>: Search across multiple
                                    sources of cloud and local content. Varied
                                    results include URLs, documents, media,
                                    actions, apps, and more.
                                </li>
                                <li>
                                    <b>Web</b>: Search a web index. Results
                                    include pages, entities, and answers.
                                </li>
                                <li>
                                    <b>My stuff</b>: Search across devices,
                                    cloud, social graphs, and more. Results are
                                    varied but are constrained by the connection
                                    to user accounts.
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
        inline: {
            options: [true, false],
            control: { type: 'inline-radio' },
        },
        inputWidth: {
            options: [TextInputWidth.fitContent, TextInputWidth.fill],
            control: { type: 'inline-radio' },
        },
        shape: {
            options: [
                TextInputShape.Rectangle,
                TextInputShape.Pill,
                TextInputShape.Underline,
            ],
            control: { type: 'inline-radio' },
        },
        size: {
            options: [
                TextInputSize.Flex,
                TextInputSize.Large,
                TextInputSize.Medium,
                TextInputSize.Small,
            ],
            control: { type: 'radio' },
        },
        theme: {
            options: ['light', 'dark'],
            control: { type: 'inline-radio' },
        },
        value: {
            control: { type: 'text' },
        },
    },
} as ComponentMeta<typeof SearchBox>;

const Search_Box_Story: ComponentStory<typeof SearchBox> = (args) => (
    <SearchBox {...args} />
);

export const Search_Box = Search_Box_Story.bind({});

Search_Box.args = {
    allowDisabledFocus: false,
    ariaLabel: 'Search',
    autoFocus: false,
    classNames: 'my-searchbox-class',
    clearButtonAriaLabel: 'Clear',
    disabled: false,
    iconProps: {
        path: IconName.mdiCardsHeart,
        color: 'red',
    },
    iconButtonProps: {
        allowDisabledFocus: false,
        disabled: false,
        iconProps: { path: IconName.mdiMagnify },
    },
    id: 'mySearchBoxId',
    inline: false,
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
    name: 'mySearchBox',
    placeholder: 'Search',
    shape: TextInputShape.Pill,
    size: TextInputSize.Medium,
    style: {},
    theme: TextInputTheme.light,
    waitInterval: 10,
};
