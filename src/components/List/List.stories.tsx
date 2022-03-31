import React from 'react';
import { List } from './';

export default {
    title: 'List',
    component: List,
};

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

export const Default = () => (
    <>
        <h2>List vertical</h2>
        <List<User>
            items={sampleList}
            renderItem={(item) => (
                <div>
                    <h3>{item.name}</h3>
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
                    <h4>Footer</h4>
                </div>
            }
            itemStyle={{ padding: '8px 16px' }}
        />
        <br />
        <br />
        <br />
        <h2>List horizontal</h2>
        <List<User>
            items={sampleList}
            renderItem={(item) => (
                <div>
                    <h3>{item.name}</h3>
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
                    <h4>Footer</h4>
                </div>
            }
            itemStyle={{ padding: '8px 16px' }}
            layout={'horizontal'}
        />
    </>
);
