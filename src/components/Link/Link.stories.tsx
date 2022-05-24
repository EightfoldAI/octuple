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
                        <hr />
                        <section>
                            <Stories includePrimary />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Link>;

export const Default: ComponentStory<typeof Link> = () => (
    <>
        <h2>Link</h2>

        <Link href="https://www.twitter.com">Twitter</Link>

        <h2>Primary Link Stacked Columnwise</h2>
        <Link
            href="https://www.facebook.com"
            variant="primary"
            style={{ maxWidth: '100px' }}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </Link>
        <h2>Link with default behavior disabled</h2>
        <Link
            href="https://www.facebook.com"
            onClick={(e) => e.preventDefault()}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </Link>
    </>
);
