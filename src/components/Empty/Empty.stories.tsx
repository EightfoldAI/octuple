import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Empty, EmptyMode } from './';
import { Icon, IconName } from '../Icon';

export default {
    title: 'Empty',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Empty</h1>
                            <p>An Empty state placeholder.</p>
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
        mode: {
            options: [
                EmptyMode.data,
                EmptyMode.error,
                EmptyMode.messages,
                EmptyMode.search,
                EmptyMode.tasks,
            ],
            control: { type: 'select' },
        },
    },
} as ComponentMeta<typeof Empty>;

const Empty_Story: ComponentStory<typeof Empty> = (args) => <Empty {...args} />;

export const No_Data = Empty_Story.bind({});
export const Error_State = Empty_Story.bind({});
export const Empty_Messages = Empty_Story.bind({});
export const No_Search_Results = Empty_Story.bind({});
export const Tasks_Complete = Empty_Story.bind({});
export const Custom_Image = Empty_Story.bind({});

const emptyArgs: Object = {
    description: 'More detail on how might the user be able to get around this',
    mode: EmptyMode.data,
    style: {},
    title: 'Short Message Here',
};

No_Data.args = {
    ...emptyArgs,
};

Error_State.args = {
    ...emptyArgs,
    mode: EmptyMode.error,
};

Empty_Messages.args = {
    ...emptyArgs,
    mode: EmptyMode.messages,
};

No_Search_Results.args = {
    ...emptyArgs,
    mode: EmptyMode.search,
};

Tasks_Complete.args = {
    ...emptyArgs,
    mode: EmptyMode.tasks,
};

Custom_Image.args = {
    ...emptyArgs,
    image: (
        <Icon color="#8ED0FA" path={IconName.mdiWrenchOutline} size="120px" />
    ),
    imageStyle: {},
    mode: '',
};
