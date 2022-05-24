import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge } from './';

export default {
    title: 'Badge',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Badge</h1>
                            <p>
                                Badges normally appear in proximity to
                                notifications, labels, or user avatars with
                                eye-catching appeal, typically displaying a
                                count.
                            </p>
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
} as ComponentMeta<typeof Badge>;

const badges = [1, 2, 100, 1000];

export const Badges: ComponentStory<typeof Badge> = () => {
    return (
        <>
            <h2>Badge</h2>
            <p></p>
            <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
                {badges.map((badge) => (
                    <Badge key={badge}>{badge}</Badge>
                ))}
            </div>
            <h2>Badge (active)</h2>
            <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
                {badges.map((badge) => (
                    <Badge key={badge} active={true}>
                        {badge}
                    </Badge>
                ))}
            </div>
            <h2>Badge disruptive (active)</h2>
            <div
                style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
            >
                {badges.map((badge) => (
                    <Badge key={badge} active={true} disruptive={true}>
                        {badge}
                    </Badge>
                ))}
            </div>
        </>
    );
};
