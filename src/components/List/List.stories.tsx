import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { List } from './';

export default {
    title: 'List',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>List</h1>
                            <p>
                                A list provides a base component for rendering
                                sets of items. It's agnostic of layout, and
                                selection management.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
                                </li>
                            </ul>
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
} as ComponentMeta<typeof List>;

interface User {
    name: string;
    summary: string;
    img: string;
}

const sampleList: User[] = [1, 2, 3, 4, 5].map((i) => ({
    name: `User ${i}`,
    summary: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    img: '',
}));

export const Lists: ComponentStory<typeof List> = () => {
    return (
        <>
            <h1>List vertical</h1>
            <List<User>
                items={sampleList}
                renderItem={(item) => (
                    <div>
                        <p>{item.name}</p>
                        <div>{item.summary}</div>
                    </div>
                )}
                header={
                    <div style={{ paddingLeft: '16px' }}>
                        <h2>Header</h2>
                    </div>
                }
                footer={
                    <div style={{ paddingLeft: '16px' }}>
                        <h3>Footer</h3>
                    </div>
                }
                itemStyle={{ padding: '8px 16px' }}
            />
            <br />
            <br />
            <br />
            <h1>List horizontal</h1>
            <List<User>
                items={sampleList}
                renderItem={(item) => (
                    <div>
                        <p>{item.name}</p>
                        <div>{item.summary}</div>
                    </div>
                )}
                header={
                    <div style={{ paddingLeft: '16px' }}>
                        <h2>Header</h2>
                    </div>
                }
                footer={
                    <div style={{ paddingLeft: '16px' }}>
                        <h3>Footer</h3>
                    </div>
                }
                itemStyle={{ padding: '8px 16px' }}
                layout={'horizontal'}
            />
        </>
    );
};
