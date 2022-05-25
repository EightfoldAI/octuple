import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConfigProvider } from '../ConfigProvider';
import { Icon, IconName, IconSize } from './index';
import iconSet from './selection.json';

export default {
    title: 'Icon',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Icons</h1>
                            <p>
                                In a user interface, an icon is an image that
                                represents an application, a capability, or some
                                other concept or specific entity with meaning
                                for the user. An icon is usually selectable but
                                can also be a non-selectable mono-color svg
                                path, such as a company's logo.
                            </p>
                            <p>
                                For a list of available icons, take a look at{' '}
                                <a
                                    href="https://github.com/EightfoldAI/octuple/blob/main/src/components/Icon/mdi.ts"
                                    target="_bank"
                                >
                                    the enumerated list
                                </a>
                                . You may contribute additional icons by sending
                                a{' '}
                                <a
                                    href="https://github.com/EightfoldAI/octuple/pulls"
                                    target="_bank"
                                ></a>
                                pull request
                                <a />, or by using a custom svg path as the path
                                prop value. To pick an icon visit the{' '}
                                <a
                                    href="https://materialdesignicons.com/"
                                    target="_blank"
                                >
                                    MDI site
                                </a>
                                . You may also contribute custom mono-line,
                                mono-color icons by providing an svg path with a
                                custom name like "mdiMyIcon".
                            </p>
                            <h2>Best practices</h2>
                            <h3>Do</h3>
                            <ul>
                                <li>
                                    Adjust to proper size to highlight
                                    importance but not occupying too much space.
                                </li>
                                <li>Be simple and concise.</li>
                                <li>
                                    Provide an ariaLabel (and setrole="img") for
                                    screen reader users if the icon is not
                                    accompanied by text that conveys the same
                                    meaning.
                                </li>
                            </ul>
                            <h3>Don't</h3>
                            <ul>
                                <li>Use Icons to show pictures.</li>
                                <li>Use photos or long sentences as icons.</li>
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
} as ComponentMeta<typeof Icon>;

export const Icons: ComponentStory<typeof Icon> = () => (
    <>
        <h1>Icons</h1>
        <p>X-Small</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.XSmall} />
        <br />
        <p>Small</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.Small} />
        <br />
        <p>Medium</p>
        <Icon path={IconName.mdiCardsHeart} />
        <br />
        <p>Large</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.Large} />
    </>
);

export const IcomoonIcons: ComponentStory<typeof Icon> = () => (
    <ConfigProvider
        icomoonIconSet={iconSet}
        themeOptions={{
            name: 'blue',
        }}
    >
        <h1>Icons</h1>
        <p>X-Small</p>
        <Icon icomoonIconName="pencil" size={IconSize.XSmall} />
        <br />
        <p>Large</p>
        <Icon icomoonIconName="pencil" size={IconSize.Large} />
        <br />
        <p>Multicolor Icon</p>
        <Icon icomoonIconName="CareerHub" size={IconSize.Large} />
    </ConfigProvider>
);
