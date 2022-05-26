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
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Badge>;

const Badge_Default_Story: ComponentStory<typeof Badge> = (args) => (
    <Badge {...args} />
);

export const Badge_Default = Badge_Default_Story.bind({});

const Badge_Active_Story: ComponentStory<typeof Badge> = (args) => (
    <Badge {...args} />
);

export const Badge_Active = Badge_Active_Story.bind({});

const Badge_Disruptive_Story: ComponentStory<typeof Badge> = (args) => (
    <Badge {...args} />
);

export const Badge_Disruptive = Badge_Disruptive_Story.bind({});

const badgeArgs: Object = {
    active: false,
    classNames: 'my-badge-class',
    style: {},
    children: '8',
    disruptive: false,
};

Badge_Default.args = {
    ...badgeArgs,
};

Badge_Active.args = {
    ...badgeArgs,
    active: true,
};

Badge_Disruptive.args = {
    ...badgeArgs,
    active: true,
    disruptive: true,
};
