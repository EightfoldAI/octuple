import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MatchScore } from './index';

export default {
    title: 'Match Score',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Match Score</h1>
                            <p>
                                Match Score represent ratings via some ratio,
                                helping others make more informed decisions.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    Make it clear which item the Match Score
                                    pertains to by making sure the layout and
                                    grouping are clear when several items are on
                                    the page.
                                </li>
                                <li>
                                    Don't use the Match Score component for data
                                    that has a continuous range. Instead, use a
                                    slider.
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Use a 0-5 scoring system. Exceeding 5 is
                                    acceptable, but ideally paired with the
                                    label.
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
} as ComponentMeta<typeof MatchScore>;

const Default_Story: ComponentStory<typeof MatchScore> = (args) => (
    <MatchScore {...args} />
);

export const Default = Default_Story.bind({});

const Without_Label_Story: ComponentStory<typeof MatchScore> = (args) => (
    <MatchScore {...args} />
);

export const Without_Label = Without_Label_Story.bind({});

const matchScoreArgs: Object = {
    classNames: 'my-match-score-class',
    score: 3,
    total: 5,
    hideLabel: false,
    ariaLabel: 'score',
};

Default.args = {
    ...matchScoreArgs,
};

Without_Label.args = {
    ...matchScoreArgs,
    hideLabel: true,
};
