import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { StoryFn, Meta } from '@storybook/react';
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
                A Spinner is an outline of a circle which animates around itself
                indicating to the user that things are processing. A Spinner is
                shown when it's unsure how long a task will take making it the
                indeterminate version of a Progress Indicator. They can be
                various sizes, located inline with content or centered. They
                generally appear after an action is being processed or
                committed. They are subtle and generally do not take up much
                space, but are transitions from the completed task.
              </p>
              <h2>Best practices</h2>
              <h3>Do</h3>
              <ul>
                <li>Use a Spinner when a task is not immediate.</li>
                <li>Use one Spinner at a time.</li>
                <li>
                  Descriptive verbs are appropriate under a Spinner and as its
                  ariaLabel to help the user understand what's happening. Ie:
                  Saving, processing, updating.
                </li>
                <li>
                  Use a Spinner when confirming a change has been made or a task
                  is being processed.
                </li>
              </ul>
              <h3>Don't</h3>
              <ul>
                <li>Don't use a Spinner when performing immediate tasks.</li>
                <li>Don't show multiple Spinners at the same time.</li>
                <li>
                  Don't include more than a few words when paired with a
                  Spinner.
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
    size: {
      options: [SpinnerSize.Default, SpinnerSize.Large, SpinnerSize.Small],
      control: { type: 'select' },
    },
  },
} as Meta<typeof Spinner>;

const Spinner_Story: StoryFn<typeof Spinner> = (args) => <Spinner {...args} />;

export const Default = Spinner_Story.bind({});

Default.args = {
  size: SpinnerSize.Default,
  classNames: 'my-spinner-class',
};
