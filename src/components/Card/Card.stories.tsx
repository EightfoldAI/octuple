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

const List_Story: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const List = List_Story.bind({});

const Carousel_Story: ComponentStory<typeof Card> = (args) => (
    <Card {...args} />
);

export const Carousel = Carousel_Story.bind({});

const cardArgs: Object = {
    actionButtonProps: {
        ariaLabel: 'Action',
        classNames: 'my-action-btn-class',
        'data-test-id': 'my-action-btn-test-id',
        iconProps: null,
        id: 'myActionButton',
        text: 'Action',
    },
    name: 'Body2 is used inside here.',
    style: {},
    classNames: 'my-card-class',
    icon: IconName.mdiCheckCircle,
    role: 'presentation',
    type: CardType.list,
};

List.args = {
    ...cardArgs,
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
    subHeaderOne: 'Company',
    subHeaderTwo: 'Job Location',
};

Carousel.args = {
    ...cardArgs,
};
