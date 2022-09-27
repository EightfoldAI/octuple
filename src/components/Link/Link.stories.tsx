import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon, IconName } from '../Icon';
import { Link } from './';

export default {
    title: 'Link',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Link</h1>
                            <p>
                                Links lead to another part of an app, other
                                pages, or help articles. They can also be used
                                to initiate commands.
                            </p>
                            <h2>Content</h2>
                            <ul>
                                <li>
                                    People should be able to accurately predict
                                    the result of selecting a link based on its
                                    link text and optional tooltip.
                                </li>
                                <li>
                                    Use descriptive, actionable link text when
                                    possible. Avoid using URLs as link text.
                                </li>
                                <li>
                                    Don't use if the action is destructive or
                                    irreversible. Links aren't appropriate for
                                    commands with significant consequences.
                                </li>
                                <li>
                                    Keep discrete links far enough apart that
                                    people can differentiate between them and
                                    easily select each one.
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
        variant: {
            options: ['default', 'primary'],
            control: { type: 'inline-radio' },
        },
        onClick: {
            action: 'click',
        },
    },
} as ComponentMeta<typeof Link>;

const Default_Story: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Default = Default_Story.bind({});

const Primary_Story: ComponentStory<typeof Link> = (args) => <Link {...args} />;

export const Primary = Primary_Story.bind({});

const Default_Disabled_Story: ComponentStory<typeof Link> = (args) => (
    <Link {...args} />
);

export const Default_Disabled = Default_Disabled_Story.bind({});

const linkArgs: Object = {
    href: 'https://eightfold.ai',
    classNames: 'my-link-class',
    children: 'Eightfold',
    target: '_self',
    variant: 'default',
    style: {},
};

Default.args = {
    ...linkArgs,
};

Primary.args = {
    ...linkArgs,
    href: 'https://eightfold.ai',
    variant: 'primary',
    style: {
        maxWidth: '100px',
    },
    children: (
        <span
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </span>
    ),
};

Default_Disabled.args = {
    ...linkArgs,
    href: 'https://eightfold.ai',
    onClick: (e: React.MouseEvent) => e.preventDefault(),
    children: (
        <span
            style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </span>
    ),
};
