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

export const Default: ComponentStory<typeof MatchScore> = () => {
    return (
        <div>
            <MatchScore score={0} />
            <br />
            <MatchScore score={0.5} />
            <br />
            <MatchScore score={1} />
            <br />
            <MatchScore score={1.5} />
            <br />
            <MatchScore score={2} />
            <br />
            <MatchScore score={2.5} />
            <br />
            <MatchScore score={3} />
            <br />
            <MatchScore score={3.5} />
            <br />
            <MatchScore score={4} />
            <br />
            <MatchScore score={4.5} />
            <br />
            <MatchScore score={5} />
            <br />
            <MatchScore score={20} />
        </div>
    );
};

export const Without_Label: ComponentStory<typeof MatchScore> = () => {
    return (
        <div>
            <MatchScore score={0} hideLabel />
            <br />
            <MatchScore score={0.5} hideLabel />
            <br />
            <MatchScore score={1} hideLabel />
            <br />
            <MatchScore score={1.5} hideLabel />
            <br />
            <MatchScore score={2} hideLabel />
            <br />
            <MatchScore score={2.5} hideLabel />
            <br />
            <MatchScore score={3} hideLabel />
            <br />
            <MatchScore score={3.5} hideLabel />
            <br />
            <MatchScore score={4} hideLabel />
            <br />
            <MatchScore score={4.5} hideLabel />
            <br />
            <MatchScore score={5} hideLabel />
            <br />
            <MatchScore score={20} hideLabel />
        </div>
    );
};
