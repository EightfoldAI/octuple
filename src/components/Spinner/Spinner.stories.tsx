import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Spinner, SpinnerSize } from './';

export default {
    title: 'Spinner',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Spinner</h1>
                            <p>
                                A Spinner is an outline of a circle which
                                animates around itself indicating to the user
                                that things are processing. A Spinner is shown
                                when it's unsure how long a task will take
                                making it the indeterminate version of a
                                Progress Indicator. They can be various sizes,
                                located inline with content or centered. They
                                generally appear after an action is being
                                processed or committed. They are subtle and
                                generally do not take up much space, but are
                                transitions from the completed task.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Do</h3>
                            <ul>
                                <li>
                                    Use a Spinner when a task is not immediate.
                                </li>
                                <li>Use one Spinner at a time.</li>
                                <li>
                                    Descriptive verbs are appropriate under a
                                    Spinner and as its ariaLabel to help the
                                    user understand what's happening. Ie:
                                    Saving, processing, updating.
                                </li>
                                <li>
                                    Use a Spinner when confirming a change has
                                    been made or a task is being processed.
                                </li>
                            </ul>
                            <h3>Don't</h3>
                            <ul>
                                <li>
                                    Don't use a Spinner when performing
                                    immediate tasks.
                                </li>
                                <li>
                                    Don't show multiple Spinners at the same
                                    time.
                                </li>
                                <li>
                                    Don't include more than a few words when
                                    paired with a Spinner.
                                </li>
                            </ul>
                        </section>
                        <br />
                        <hr />
                        <br />
                        <section>
                            <Stories includePrimary />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Spinner>;

export const Spinners: ComponentStory<typeof Spinner> = () => {
    return (
        <>
            <h1>Spinners</h1>
            <p>Small</p>
            <Spinner size={SpinnerSize.Small} />
            <p>Default</p>
            <Spinner />
            <p>Large</p>
            <Spinner size={SpinnerSize.Large} />
        </>
    );
};
