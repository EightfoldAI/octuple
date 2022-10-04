import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card, CardType } from './';
import { IconName } from '../Icon';

export default {
    title: 'Card',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Card</h1>
                            <p>TBD</p>
                        </section>
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Card>;

const Base_Card_Story: ComponentStory<typeof Card> = (args) => (
    <Card {...args} />
);

export const BaseCard = Base_Card_Story.bind({});

const cardArgs: Object = {
    style: {},
    classNames: 'my-card-class',
    icon: IconName.mdiInformation,
    type: CardType.list,
    headerButtonProps: {
        iconProps: {
            path: IconName.mdiBookmark,
        },
    },
    headerTitle: <div>Senior UX Designer</div>,
    bodyListOneProps: {
        iconProps: {
            path: IconName.mdiCheck,
            color: 'green',
        },
        type: 'list',
        contents: [
            {
                showIcon: true,
                label: 'Matched Skill',
            },
            {
                showIcon: true,
                label: 'Matched Skill',
            },
            {
                showIcon: true,
                label: 'Matched Skill',
            },
            {
                showIcon: false,
                label: 'Other Skill',
            },
            {
                showIcon: false,
                label: 'Other Skill',
            },
        ],
    },
    bodyListTwoProps: {
        iconProps: {
            path: IconName.mdiCheck,
            color: 'green',
        },
        type: 'pills',
        contents: [
            {
                showIcon: false,
                label: 'Department',
            },
            {
                showIcon: false,
                label: 'Urgent Hire',
            },
        ],
    },
    bodyListOnePillProps: {
        theme: 'grey',
    },
    bodyListTwoPillProps: {
        theme: 'grey',
    },
    subHeaderSeparatorIcon: IconName.mdiCircle,
    subHeaderProps: ['Company', 'Job Location'],
    footerProps: [
        {
            iconProps: {
                path: IconName.mdiWeb,
                color: 'blue',
            },
            text: 'Strong match',
        },
        {
            iconProps: {
                path: IconName.mdiCheck,
                color: 'green',
            },
            text: 'Applied',
        },
    ],
};

BaseCard.args = {
    ...cardArgs,
};
