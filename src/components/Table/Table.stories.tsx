import React, { Component, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { Avatar } from '../Avatar';
import Table from './index';
import { ColumnsType } from './Internal/OcTable.types';

export default {
    title: 'Table',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Table</h1>
                            <p>Docs</p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li></li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li></li>
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
    argTypes: {},
} as ComponentMeta<typeof Component>;

type TablePaginationPosition =
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomCenter'
    | 'bottomRight';

const topOptions = [
    { label: 'topLeft', value: 'topLeft' },
    { label: 'topCenter', value: 'topCenter' },
    { label: 'topRight', value: 'topRight' },
    { label: 'none', value: 'none' },
];

const bottomOptions = [
    { label: 'bottomLeft', value: 'bottomLeft' },
    { label: 'bottomCenter', value: 'bottomCenter' },
    { label: 'bottomRight', value: 'bottomRight' },
    { label: 'none', value: 'none' },
];

interface DataType {
    key: React.Key;
    name: string;
    profile: string[];
    initials: string;
    title: string;
    location: string;
    level: number;
}

const data: DataType[] = [
    {
        key: '1',
        name: 'Anamika Musafir',
        profile: ['Anamika Musafir', 'AM', 'Beacon, NY'],
        initials: 'AM',
        title: 'Senior Sales Engineer',
        location: 'Beacon, NY',
        level: 78,
    },
    {
        key: '2',
        name: 'Chandra Garg',
        profile: ['Chandra Garg', 'CG', 'Delhi, Delhi'],
        initials: 'CG',
        title: 'Sales Executive',
        location: 'Delhi, Delhi',
        level: 86,
    },
    {
        key: '3',
        name: 'Clarey Fike',
        profile: ['Clarey Fike', 'CF', 'New York, NA'],
        initials: 'CF',
        title: 'Regional Sales VP',
        location: 'New York, NA',
        level: 95,
    },
    {
        key: '4',
        name: 'Cobbey Deevey',
        profile: ['Cobbey Deevey', 'CD', 'Atlanta, GA'],
        initials: 'CD',
        title: 'Sales Director',
        location: 'Atlanta, GA',
        level: 66,
    },
    {
        key: '5',
        name: 'Dave Shaw',
        profile: ['Dave Shaw', 'DS', 'San Diego, USA'],
        initials: 'DS',
        title: 'Sales Engineer Manager',
        location: 'San Diego, USA',
        level: 72,
    },
    {
        key: '6',
        name: 'Farida Ashfaq',
        profile: ['Farida Ashfaq', 'FA', 'Mumbai, Maharashtra'],
        initials: 'FA',
        title: 'Sales Executive',
        location: 'Mumbai, Maharashtra',
        level: 97,
    },
    {
        key: '7',
        name: 'Frank Baptist',
        profile: ['Frank Baptist', 'FB', 'Houston, Texas Area'],
        initials: 'FB',
        title: 'Sales Engineer',
        location: 'Houston, Texas Area',
        level: 87,
    },
    {
        key: '8',
        name: 'Jerome Feng',
        profile: ['Jerome Feng', 'JF', 'Irvine, CA'],
        initials: 'JF',
        title: 'Sales Engineer',
        location: 'Irvine, CA',
        level: 88,
    },
    {
        key: '9',
        name: 'Julie Tharoor',
        profile: ['Julie Tharoor', 'JT', 'Bangalore, Karnataka'],
        initials: 'JT',
        title: 'Sales Executive',
        location: 'Bangalore, Karnataka',
        level: 52,
    },
    {
        key: '10',
        name: 'Nikita Gagan',
        profile: ['Nikita Gagan', 'NG', 'Delhi, Delhi'],
        initials: 'NG',
        title: 'Sales Executive',
        location: 'Delhi, Delhi',
        level: 97,
    },
    {
        key: '11',
        name: 'Peter Rege',
        profile: ['Peter Rege', 'PR'],
        initials: 'PR',
        title: 'Sales Representative',
        location: null,
        level: 97,
    },
    {
        key: '12',
        name: 'Revathi Roy',
        profile: ['Revathi Roy', 'RR', 'San Francisco Bay Area'],
        initials: 'RR',
        title: 'Senior Sales Engineer',
        location: 'San Francisco Bay Area',
        level: 74,
    },
    {
        key: '13',
        name: 'Urbanus Laurens',
        profile: ['Urbanus Laurens', 'UL', 'Salt Lake City, UT'],
        initials: 'UL',
        title: 'Account Executive',
        location: 'Salt Lake City, UT',
        level: 76,
    },
    {
        key: '14',
        name: 'Vance Renner',
        profile: ['Vance Renner', 'VR', 'St Louis, MO'],
        initials: 'VR',
        title: 'Senior Account Executive',
        location: 'St Louis, MO',
        level: 90,
    },
    {
        key: '15',
        name: 'Zarla Greener',
        profile: ['Zarla Greener', 'ZG', 'Chicago, IL'],
        initials: 'ZG',
        title: 'Sales Manager',
        location: 'Chicago, IL',
        level: 79,
    },
];

const basicCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} type="round">
                    {text[1]}
                </Avatar>
                <Stack direction="vertical" gap="xxs">
                    <Link variant="primary">{text[0]}</Link>
                    {text[2]}
                </Stack>
            </Stack>
        ),
    },
    {
        title: 'Level',
        dataIndex: 'level',
    },
];

const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        );
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const Basic_Story: ComponentStory<typeof Table> = (args) => {
    return <Table {...args} />;
};

export const Basic = Basic_Story.bind({});

const tableArgs: Object = {
    rowSelection: {
        ...rowSelection,
    },
    columns: basicCols,
    dataSource: data,
    pagination: {
        position: 'bottomRight',
    },
    // scroll: { x: 1200, y: 180 },
    // style: {
    //     width: '100%',
    // },
};

Basic.args = {
    ...tableArgs,
};
