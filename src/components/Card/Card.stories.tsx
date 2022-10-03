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
    headerIcon: IconName.mdiCardsHeart,
    headerButtonProps: {
        path: IconName.mdiCardsHeart,
    },
    header: <div>Senior UX Designer</div>,
    bodyListOneProps: {
        type: 'list',
        contents: [
            'Matched Skill',
            'Matched Skill',
            'Matched Skill',
            'Other Skill',
            'Other Skill',
        ],
    },
    bodyListTwoProps: {
        type: 'pills',
        contents: ['Department', 'Urgent Hire'],
    },
    subHeaderProps: ['Company', 'Job Location'],
    footerProps: [
        {
            icon: IconName.mdiAccountCircle,
            text: 'Strong match',
        },
        {
            icon: IconName.mdiCheck,
            text: 'Applied',
        },
    ],
};

BaseCard.args = {
    ...cardArgs,
};
