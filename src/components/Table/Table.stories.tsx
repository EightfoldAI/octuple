import React, { Component, FC, useEffect, useRef, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Link } from '../Link';
import { Stack } from '../Stack';
import { Avatar } from '../Avatar';
import Table from './index';
import { TableSize } from './Table.types';
import type { ColumnsType } from './Table.types';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { VariableSizeGrid as Grid } from 'react-window';
import { mergeClasses } from '../../shared/utilities';
import { PaginationLayoutOptions } from '../Pagination';
import { Tooltip, TooltipTheme } from '../Tooltip';

export default {
    title: 'Table',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Table</h1>
                            <p>
                                A table displays columns and rows of data.
                                Specify the <code>dataSource</code> of Table as
                                an array of data objects.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>
                                    You may add borders, title and footer for
                                    table.
                                </li>
                                <li>
                                    There are three sizes: <code>small</code>,{' '}
                                    <code>medium</code>, and <code>large</code>.
                                </li>
                                <li>The header and/or columns may be fixed.</li>
                                <li>
                                    Group table head with{' '}
                                    <code>columns[n].children</code>.
                                </li>
                                <li>
                                    The pagination may be positioned using a
                                    simple array:{' '}
                                    <code>['topRight', 'none']</code>, or{' '}
                                    <code>['none', bottomRight']</code>
                                </li>
                                <li>
                                    Rows may be selectable by marking the first
                                    column as a selectable via a property in
                                    your <code>dataSource</code>. You can use{' '}
                                    <code>rowSelection.type</code> to set
                                    selection type. Default is{' '}
                                    <code>checkbox</code>.
                                </li>
                                <li>
                                    Rows may be expandable via the{' '}
                                    <code>expandableConfig</code> prop.
                                </li>
                                <li>
                                    Ellipsis cell content via setting{' '}
                                    <code>column.ellipsis</code>. Ellipsis cell
                                    content via setting{' '}
                                    <code>column.ellipsis.showTitle</code>, use
                                    a <code>Tooltip</code> with its{' '}
                                    <code>portaled</code> prop enabled instead
                                    of the html title attribute.
                                </li>
                                <li>
                                    Table column title supports{' '}
                                    <code>colSpan</code> that set in column.
                                    Table cell supports <code>colSpan</code> and{' '}
                                    <code>rowSpan</code> that set in render
                                    return object. When each of them is set to
                                    0, the cell will not be rendered.
                                </li>
                                <li>
                                    Display tree structure data in Table when
                                    there is field key children in{' '}
                                    <code>dataSource</code>, customize{' '}
                                    <code>childrenColumnName</code> property to
                                    avoid tree table structure. You can control
                                    the indent width by setting{' '}
                                    <code>indentSize</code>.
                                </li>
                                <li>Tables may be nested.</li>
                                <li>
                                    Set <code>Summary</code> content by{' '}
                                    <code>summary</code> prop. You can fixed it
                                    by setting the <code>Table.Summary</code>{' '}
                                    <code>fixed</code> prop.
                                </li>
                            </ul>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Display a collection of structured data.
                                </li>
                                <li>Sort, search, paginate, filter data.</li>
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

interface DataType {
    key: React.Key;
    name: string;
    profile: string[];
    initials: string;
    title: string;
    tel: string;
    phone: string;
    location: string;
    level: number;
    description?: string;
    children?: DataType[];
}

interface ExpandedDataType {
    key: React.Key;
    availability: string;
    details: string;
    reviewed: string;
}

const data: DataType[] = [
    {
        key: '1',
        name: 'Anamika Musafir',
        profile: ['Anamika Musafir', 'AM', 'Beacon, NY'],
        initials: 'AM',
        title: 'Senior Sales Engineer',
        tel: '123456',
        phone: '123456',
        location: 'Beacon, NY',
        level: 78,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '2',
        name: 'Chandra Garg',
        profile: ['Chandra Garg', 'CG', 'Delhi, Delhi'],
        initials: 'CG',
        title: 'Sales Executive',
        tel: '123456',
        phone: '123456',
        location: 'Delhi, Delhi',
        level: 86,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '3',
        name: 'Clarey Fike',
        profile: ['Clarey Fike', 'CF', 'New York, NA'],
        initials: 'CF',
        title: 'Regional Sales VP',
        tel: '123456',
        phone: '123456',
        location: 'New York, NA',
        level: 95,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '4',
        name: 'Cobbey Deevey',
        profile: ['Cobbey Deevey', 'CD', 'Atlanta, GA'],
        initials: 'CD',
        title: 'Sales Director',
        tel: '123456',
        phone: '123456',
        location: 'Atlanta, GA',
        level: 66,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '5',
        name: 'Dave Shaw',
        profile: ['Dave Shaw', 'DS', 'San Diego, USA'],
        initials: 'DS',
        title: 'Sales Engineer Manager',
        tel: '123456',
        phone: '123456',
        location: 'San Diego, USA',
        level: 72,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '6',
        name: 'Farida Ashfaq',
        profile: ['Farida Ashfaq', 'FA', 'Mumbai, Maharashtra'],
        initials: 'FA',
        title: 'Sales Executive',
        tel: '123456',
        phone: '123456',
        location: 'Mumbai, Maharashtra',
        level: 97,
        description: null,
    },
    {
        key: '7',
        name: 'Frank Baptist',
        profile: ['Frank Baptist', 'FB', 'Houston, Texas Area'],
        initials: 'FB',
        title: 'Sales Engineer',
        tel: '123456',
        phone: '123456',
        location: 'Houston, Texas Area',
        level: 87,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '8',
        name: 'Jerome Feng',
        profile: ['Jerome Feng', 'JF', 'Irvine, CA'],
        initials: 'JF',
        title: 'Sales Engineer',
        tel: '123456',
        phone: '123456',
        location: 'Irvine, CA',
        level: 88,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '9',
        name: 'Julie Tharoor',
        profile: ['Julie Tharoor', 'JT', 'Bangalore, Karnataka'],
        initials: 'JT',
        title: 'Sales Executive',
        tel: '123456',
        phone: '123456',
        location: 'Bangalore, Karnataka',
        level: 52,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '10',
        name: 'Nikita Gagan',
        profile: ['Nikita Gagan', 'NG', 'Delhi, Delhi'],
        initials: 'NG',
        title: 'Sales Executive',
        tel: '123456',
        phone: '123456',
        location: 'Delhi, Delhi',
        level: 97,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '11',
        name: 'Peter Rege',
        profile: ['Peter Rege', 'PR'],
        initials: 'PR',
        title: 'Sales Representative',
        tel: '123456',
        phone: '123456',
        location: null,
        level: 97,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '12',
        name: 'Revathi Roy',
        profile: ['Revathi Roy', 'RR', 'San Francisco Bay Area'],
        initials: 'RR',
        title: 'Senior Sales Engineer',
        tel: '123456',
        phone: '123456',
        location: 'San Francisco Bay Area',
        level: 74,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '13',
        name: 'Urbanus Laurens',
        profile: ['Urbanus Laurens', 'UL', 'Salt Lake City, UT'],
        initials: 'UL',
        title: 'Account Executive',
        tel: '123456',
        phone: '123456',
        location: 'Salt Lake City, UT',
        level: 76,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '14',
        name: 'Vance Renner',
        profile: ['Vance Renner', 'VR', 'St Louis, MO'],
        initials: 'VR',
        title: 'Senior Account Executive',
        tel: '123456',
        phone: '123456',
        location: 'St Louis, MO',
        level: 90,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '15',
        name: 'Zarla Greener',
        profile: ['Zarla Greener', 'ZG', 'Chicago, IL'],
        initials: 'ZG',
        title: 'Sales Manager',
        tel: '123456',
        phone: '123456',
        location: 'Chicago, IL',
        level: 79,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
        key: '16',
        name: 'Dave Doe',
        profile: ['Dave Doe', 'DS', 'San Diego, USA'],
        initials: 'DS',
        title: 'Sales Engineer Manager',
        tel: '123456',
        phone: '123456',
        location: 'San Diego, USA',
        level: 72,
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
];

const colSpanData: DataType[] = [
    {
        key: '1',
        name: 'Anamika Musafir',
        profile: ['Anamika Musafir', 'AM', 'Beacon, NY'],
        initials: 'AM',
        title: 'Senior Sales Engineer',
        tel: '123456',
        phone: '123456',
        location: 'Beacon, NY',
        level: 78,
    },
    {
        key: '2',
        name: 'Chandra Garg',
        profile: ['Chandra Garg', 'CG', 'Delhi, Delhi'],
        initials: 'CG',
        title: 'Sales Executive',
        tel: '123456',
        phone: '123456',
        location: 'Delhi, Delhi',
        level: 86,
    },
    {
        key: '3',
        name: 'Clarey Fike',
        profile: ['Clarey Fike', 'CF', 'New York, NA'],
        initials: 'CF',
        title: 'Regional Sales VP',
        tel: '123456',
        phone: '123456',
        location: 'New York, NA',
        level: 95,
    },
    {
        key: '4',
        name: 'Cobbey Deevey',
        profile: ['Cobbey Deevey', 'CD', 'Atlanta, GA'],
        initials: 'CD',
        title: 'Sales Director',
        tel: '123456',
        phone: '123456',
        location: 'Atlanta, GA',
        level: 66,
    },
    {
        key: '5',
        name: 'Dave Shaw',
        profile: ['Dave Shaw', 'DS', 'San Diego, USA'],
        initials: 'DS',
        title: 'Sales Engineer Manager',
        tel: '123456',
        phone: '123456',
        location: 'San Diego, USA',
        level: 72,
    },
];

const treeData: DataType[] = [
    {
        key: 1,
        name: 'Anamika Musafir',
        profile: ['Anamika Musafir', 'AM', 'Beacon, NY'],
        initials: 'AM',
        title: 'Senior Sales Engineer',
        tel: '123456',
        phone: '123456',
        location: 'Beacon, NY',
        level: 78,
        children: [
            {
                key: 11,
                name: 'Chandra Garg',
                profile: ['Chandra Garg', 'CG', 'Delhi, Delhi'],
                initials: 'CG',
                title: 'Sales Executive',
                tel: '123456',
                phone: '123456',
                location: 'Delhi, Delhi',
                level: 86,
            },
            {
                key: 12,
                name: 'Clarey Fike',
                profile: ['Clarey Fike', 'CF', 'New York, NA'],
                initials: 'CF',
                title: 'Regional Sales VP',
                tel: '123456',
                phone: '123456',
                location: 'New York, NA',
                level: 95,
                children: [
                    {
                        key: 121,
                        name: 'Cobbey Deevey',
                        profile: ['Cobbey Deevey', 'CD', 'Atlanta, GA'],
                        initials: 'CD',
                        title: 'Sales Director',
                        tel: '123456',
                        phone: '123456',
                        location: 'Atlanta, GA',
                        level: 66,
                    },
                ],
            },
            {
                key: 13,
                name: 'Dave Shaw',
                profile: ['Dave Shaw', 'DS', 'San Diego, USA'],
                initials: 'DS',
                title: 'Sales Engineer Manager',
                tel: '123456',
                phone: '123456',
                location: 'San Diego, USA',
                level: 72,
                children: [
                    {
                        key: 131,
                        name: 'Zarla Greener',
                        profile: ['Zarla Greener', 'ZG', 'Chicago, IL'],
                        initials: 'ZG',
                        title: 'Sales Manager',
                        tel: '123456',
                        phone: '123456',
                        location: 'Chicago, IL',
                        level: 79,
                        children: [
                            {
                                key: 1311,
                                name: 'Urbanus Laurens',
                                profile: [
                                    'Urbanus Laurens',
                                    'UL',
                                    'Salt Lake City, UT',
                                ],
                                initials: 'UL',
                                title: 'Account Executive',
                                tel: '123456',
                                phone: '123456',
                                location: 'Salt Lake City, UT',
                                level: 76,
                            },
                            {
                                key: 1312,
                                name: 'Vance Renner',
                                profile: ['Vance Renner', 'VR', 'St Louis, MO'],
                                initials: 'VR',
                                title: 'Senior Account Executive',
                                tel: '123456',
                                phone: '123456',
                                location: 'St Louis, MO',
                                level: 90,
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: 2,
        name: 'Dave Doe',
        profile: ['Dave Doe', 'DS', 'San Diego, USA'],
        initials: 'DS',
        title: 'Sales Engineer Manager',
        tel: '123456',
        phone: '123456',
        location: 'San Diego, USA',
        level: 72,
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
                <Avatar alt={text[0]} theme="green" type="round">
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

const sharedOnCell = (_: DataType, index: number) => {
    if (index === 4) {
        return { colSpan: 0 };
    }

    return {};
};

const colSpanCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
        onCell: (_, index) => ({
            colSpan: (index as number) < 4 ? 1 : 5,
        }),
    },
    {
        title: 'Level',
        dataIndex: 'level',
        onCell: sharedOnCell,
    },
    {
        title: 'Home phone',
        colSpan: 2,
        dataIndex: 'tel',
        onCell: (_, index) => {
            if (index === 2) {
                return { rowSpan: 2 };
            }
            if (index === 3) {
                return { rowSpan: 0 };
            }
            if (index === 4) {
                return { colSpan: 0 };
            }

            return {};
        },
    },
    {
        title: 'Phone',
        colSpan: 0,
        dataIndex: 'phone',
        onCell: sharedOnCell,
    },
    {
        title: 'Location',
        dataIndex: 'location',
        onCell: sharedOnCell,
    },
];

const ellipsisCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
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
    {
        title: 'Column 3',
        key: '3',
        dataIndex: 'location',
        width: 72,
        ellipsis: true,
    },
    {
        title: 'Column 4',
        key: '4',
        dataIndex: 'location',
        width: 72,
        ellipsis: true,
    },
    {
        title: 'Column 5',
        key: '5',
        dataIndex: 'location',
        width: 72,
        ellipsis: true,
    },
    {
        title: 'Column 6',
        dataIndex: 'location',
        key: '6',
        width: 72,
        ellipsis: true,
    },
    {
        title: 'Column 7',
        key: '7',
        dataIndex: 'location',
        width: 72,
        ellipsis: true,
    },
    {
        title: 'Column 8',
        key: '8',
        dataIndex: 'location',
        width: 72,
        ellipsis: true,
    },
];

const ellipsisTooltipCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
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
    {
        title: 'Column 3',
        key: '3',
        dataIndex: 'location',
        width: 72,
        ellipsis: {
            showTitle: false,
        },
        render: (location: string) => (
            <Tooltip content={location} portal theme={TooltipTheme.dark}>
                {location}
            </Tooltip>
        ),
    },
    {
        title: 'Column 4',
        key: '4',
        dataIndex: 'location',
        width: 72,
        ellipsis: {
            showTitle: false,
        },
        render: (location: string) => (
            <Tooltip content={location} portal theme={TooltipTheme.dark}>
                {location}
            </Tooltip>
        ),
    },
    {
        title: 'Column 5',
        key: '5',
        dataIndex: 'location',
        width: 72,
        ellipsis: {
            showTitle: false,
        },
        render: (location: string) => (
            <Tooltip content={location} portal theme={TooltipTheme.dark}>
                {location}
            </Tooltip>
        ),
    },
    {
        title: 'Column 6',
        dataIndex: 'location',
        key: '6',
        width: 72,
        ellipsis: {
            showTitle: false,
        },
        render: (location: string) => (
            <Tooltip content={location} portal theme={TooltipTheme.dark}>
                {location}
            </Tooltip>
        ),
    },
    {
        title: 'Column 7',
        key: '7',
        dataIndex: 'location',
        width: 72,
        ellipsis: {
            showTitle: false,
        },
        render: (location: string) => (
            <Tooltip content={location} portal theme={TooltipTheme.dark}>
                {location}
            </Tooltip>
        ),
    },
    {
        title: 'Column 8',
        key: '8',
        dataIndex: 'location',
        width: 72,
        ellipsis: {
            showTitle: false,
        },
        render: (location: string) => (
            <Tooltip content={location} portal theme={TooltipTheme.dark}>
                {location}
            </Tooltip>
        ),
    },
];

const filterCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
                    {text[1]}
                </Avatar>
                <Stack direction="vertical" gap="xxs">
                    <Link variant="primary">{text[0]}</Link>
                    {text[2]}
                </Stack>
            </Stack>
        ),
        filters: [
            {
                text: 'Dave',
                value: 'Dave',
            },
            {
                text: 'Nikita',
                value: 'Nikita',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Shaw',
                        value: 'Shaw',
                    },
                    {
                        text: 'Gagan',
                        value: 'Gagan',
                    },
                ],
            },
        ],
        filterMode: 'tree',
        filterSearch: true,
        onFilter: (value: string, profile) => profile.name.indexOf(value) === 0,
    },
    {
        title: 'Level',
        dataIndex: 'level',
    },
];

const fixedCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
        fixed: 'left',
        width: 144,
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
                    {text[1]}
                </Avatar>
                <Stack direction="vertical" gap="xxs">
                    <Link variant="primary">{text[0]}</Link>
                    {text[2]}
                </Stack>
            </Stack>
        ),
        fixed: 'left',
        width: 320,
    },
    {
        title: 'Level',
        key: 'level',
        dataIndex: 'level',
        width: 72,
    },
    {
        title: 'Column 3',
        key: '3',
        dataIndex: 'location',
        width: 124,
    },
    {
        title: 'Column 4',
        key: '4',
        dataIndex: 'location',
        width: 124,
    },
    {
        title: 'Column 5',
        key: '5',
        dataIndex: 'location',
        width: 124,
    },
    {
        title: 'Column 6',
        dataIndex: 'location',
        key: '6',
        width: 124,
    },
    {
        title: 'Column 7',
        key: '7',
        dataIndex: 'location',
        width: 124,
    },
    {
        title: 'Column 8',
        key: '8',
        dataIndex: 'location',
        width: 124,
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 88,
        render: () => <Link variant="primary">Action</Link>,
    },
];

const groupingCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
        fixed: 'left',
        width: 144,
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
                    {text[1]}
                </Avatar>
                <Stack direction="vertical" gap="xxs">
                    <Link variant="primary">{text[0]}</Link>
                    {text[2]}
                </Stack>
            </Stack>
        ),
        fixed: 'left',
        width: 320,
    },
    {
        title: 'Level',
        key: 'level',
        dataIndex: 'level',
        width: 72,
        align: 'center',
    },
    {
        classNames: 'grouped-th',
        title: 'Pipeline',
        key: 'pipeline',
        dataIndex: 'pipeline',
        width: 256,
        children: [
            {
                title: 'Grouped 1',
                key: '1',
                dataIndex: 'Grouped 1',
                width: 128,
            },
            {
                title: 'Grouped 2',
                key: '2',
                dataIndex: 'Grouped 2',
                width: 128,
            },
        ],
    },
    {
        classNames: 'grouped-th',
        title: 'Plan',
        key: 'plan',
        dataIndex: 'plan',
        width: 512,
        children: [
            {
                title: 'Grouped 5',
                key: '5',
                dataIndex: 'Grouped 5',
                width: 128,
            },
            {
                title: 'Grouped 6',
                dataIndex: 'Grouped 6',
                key: '6',
                width: 128,
            },
            {
                title: 'Grouped 7',
                key: '7',
                dataIndex: 'Grouped 7',
                width: 128,
            },
            {
                title: 'Grouped 8',
                key: '8',
                dataIndex: 'Grouped 8',
                width: 128,
            },
        ],
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 88,
        render: () => <Link variant="primary">Action</Link>,
    },
];

const orderSelectAndExpandCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
    },
    Table.EXPAND_COLUMN,
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
                    {text[1]}
                </Avatar>
                <Stack direction="vertical" gap="xxs">
                    <Link variant="primary">{text[0]}</Link>
                    {text[2]}
                </Stack>
            </Stack>
        ),
    },
    Table.SELECTION_COLUMN,
    {
        title: 'Level',
        dataIndex: 'level',
    },
];

const sortCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
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
        sorter: (a, b) => a.level - b.level,
        sortDirections: ['ascend', 'descend'],
    },
];

const treeCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        width: '12%',
    },
    {
        title: 'Location',
        dataIndex: 'location',
        width: '30%',
        key: 'location',
    },
];

const responsiveCols: ColumnsType<DataType> = [
    {
        title: 'Role (Show always)',
        dataIndex: 'title',
    },
    {
        title: 'Profile (show at medium)',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
                    {text[1]}
                </Avatar>
                <Stack direction="vertical" gap="xxs">
                    <Link variant="primary">{text[0]}</Link>
                    {text[2]}
                </Stack>
            </Stack>
        ),
        responsive: ['md'],
    },
    {
        title: 'Level (Show at large)',
        dataIndex: 'level',
        responsive: ['lg'],
    },
];

const sortMultipleCols: ColumnsType<DataType> = [
    {
        title: 'Role',
        dataIndex: 'title',
        sorter: {
            compare: (a, b) => a.title.localeCompare(b.title),
            multiple: 3,
        },
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Profile',
        dataIndex: 'profile',
        render: (text: string[]) => (
            <Stack direction="horizontal" gap="s">
                <Avatar alt={text[0]} theme="green" type="round">
                    {text[1]}
                </Avatar>
                <Stack direction="vertical" gap="xxs">
                    <Link variant="primary">{text[0]}</Link>
                    {text[2]}
                </Stack>
            </Stack>
        ),
        sorter: {
            compare: (a, b) => a.profile[0].localeCompare(b.profile[0]),
            multiple: 2,
        },
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Level',
        dataIndex: 'level',
        sorter: {
            compare: (a, b) => a.level - b.level,
            multiple: 1,
        },
        sortDirections: ['ascend', 'descend'],
    },
];

const virtualCols = [
    { title: 'A', dataIndex: 'key', width: 150 },
    { title: 'B', dataIndex: 'key' },
    { title: 'C', dataIndex: 'key' },
    { title: 'D', dataIndex: 'key' },
    { title: 'E', dataIndex: 'key', width: 200 },
    { title: 'F', dataIndex: 'key', width: 100 },
];

const virtualData = Array.from({ length: 100000 }, (_, key) => ({ key }));

const expandedRowRender = () => {
    const columns: ColumnsType<ExpandedDataType> = [
        {
            title: 'Availability',
            dataIndex: 'availability',
            key: 'availability',
        },
        { title: 'Details', dataIndex: 'details', key: 'details' },
        { title: 'Reviewed', dataIndex: 'reviewed', key: 'reviewed' },
    ];

    const data: ExpandedDataType[] = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i,
            availability: 'Available',
            details: 'Some details about this profile.',
            reviewed: 'Yes',
        });
    }
    return (
        <Table
            bordered
            columns={columns}
            dataSource={data}
            pagination={false}
            size={TableSize.Small}
        />
    );
};

const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            'selectedRows: ',
            selectedRows
        );
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Cobbey Deevey',
        profile: record.name,
    }),
};

const Table_Base_Story: ComponentStory<typeof Table> = (args) => {
    return <Table {...args} />;
};

const Table_Wrapped_Story: ComponentStory<typeof Table> = (args) => {
    return (
        <div style={{ width: 900, height: 2000 }}>
            <Table {...args} />
        </div>
    );
};

const VirtualTable = (props: Parameters<typeof Table>[0]) => {
    const { columns, scroll } = props;
    const [tableWidth, setTableWidth] = useState(0);

    const widthColumnCount = columns!.filter(({ width }) => !width).length;
    const mergedColumns = columns!.map((column) => {
        if (column.width) {
            return column;
        }

        return {
            ...column,
            width: Math.floor(tableWidth / widthColumnCount),
        };
    });

    const gridRef = useRef<any>();
    const [connectObject] = useState<any>(() => {
        const obj = {};
        Object.defineProperty(obj, 'scrollLeft', {
            get: () => null,
            set: (scrollLeft: number) => {
                if (gridRef.current) {
                    gridRef.current.scrollTo({ scrollLeft });
                }
            },
        });

        return obj;
    });

    const resetVirtualGrid = () => {
        gridRef.current?.resetAfterIndices({
            columnIndex: 0,
            shouldForceUpdate: true,
        });
    };

    useEffect(() => resetVirtualGrid, [tableWidth]);

    const renderVirtualList = (
        rawData: object[],
        { scrollbarSize, ref, onScroll }: any
    ) => {
        ref.current = connectObject;
        const totalHeight = rawData.length * 54;

        return (
            <Grid
                ref={gridRef}
                className="virtual-grid"
                columnCount={mergedColumns.length}
                columnWidth={(index: number) => {
                    const { width } = mergedColumns[index];
                    return totalHeight > scroll!.y! &&
                        index === mergedColumns.length - 1
                        ? (width as number) - scrollbarSize - 1
                        : (width as number);
                }}
                height={scroll!.y as number}
                rowCount={rawData.length}
                rowHeight={() => 54}
                width={tableWidth}
                onScroll={({ scrollLeft }: { scrollLeft: number }) => {
                    onScroll({ scrollLeft });
                }}
            >
                {({
                    columnIndex,
                    rowIndex,
                    style,
                }: {
                    columnIndex: number;
                    rowIndex: number;
                    style: React.CSSProperties;
                }) => (
                    <div
                        className={mergeClasses([
                            'virtual-table-cell',
                            {
                                'virtual-table-cell-last':
                                    columnIndex === mergedColumns.length - 1,
                            },
                        ])}
                        style={style}
                    >
                        {
                            (rawData[rowIndex] as any)[
                                (mergedColumns as any)[columnIndex].dataIndex
                            ]
                        }
                    </div>
                )}
            </Grid>
        );
    };

    return (
        <ResizeObserver
            onResize={({ width }) => {
                setTableWidth(width);
            }}
        >
            <Table
                {...props}
                classNames="virtual-table"
                columns={mergedColumns}
                pagination={false}
                components={{
                    body: renderVirtualList,
                }}
            />
        </ResizeObserver>
    );
};

const Page_Sizes_Story: ComponentStory<typeof Table> = (args) => {
    const n: any[] = [];
    const total = 1000;

    const [r, setR] = useState(n);

    for (let i = 0; i < total; i++) {
        n.push({ key: i });
    }

    const getColumns = () => {
        return [
            {
                title: 'Key',
                dataIndex: 'key',
                width: 300,
                render: (value: any) => {
                    console.log('row rendered');
                    return value;
                },
            },
        ];
    };
    return (
        <Table
            {...args}
            title={() => (
                <div className="i18n-messages-table-title">
                    <h3>{'Data'}</h3>
                </div>
            )}
            dataSource={r}
            sticky
            columns={getColumns()}
            emptyTextDetails=""
            emptyText={'No data found'}
            pagination={{
                layout: [
                    PaginationLayoutOptions.Sizes,
                    PaginationLayoutOptions.Total,
                    PaginationLayoutOptions.Next,
                    PaginationLayoutOptions.Previous,
                    PaginationLayoutOptions.Pager,
                ],
                pageSizes: [5, 10, 20],
                selfControlled: false,
                total: r?.length,
            }}
            scroll={{
                y: 2000,
            }}
        />
    );
};

export const Basic = Table_Base_Story.bind({});
export const Bordered = Table_Base_Story.bind({});
export const Cell_Bordered = Table_Base_Story.bind({});
export const Header_Bordered = Table_Base_Story.bind({});
export const Inner_Bordered = Table_Base_Story.bind({});
export const Outer_Bordered = Table_Base_Story.bind({});
export const Row_Bordered = Table_Base_Story.bind({});
export const Small = Table_Base_Story.bind({});
export const Medium = Table_Base_Story.bind({});
export const Large = Table_Base_Story.bind({});
export const Empty = Table_Base_Story.bind({});
export const Header_Grouping = Table_Base_Story.bind({});
export const Header_And_Footer = Table_Base_Story.bind({});
export const Fixed_Header = Table_Wrapped_Story.bind({});
export const Fixed_Columns = Table_Wrapped_Story.bind({});
export const Fixed_Columns_and_Header = Table_Wrapped_Story.bind({});
export const Selection = Table_Base_Story.bind({});
export const Expandable_Row = Table_Base_Story.bind({});
export const Order_Select_And_Expand_Column = Table_Base_Story.bind({});
export const Colspan_Rows = Table_Base_Story.bind({});
export const Sort = Table_Base_Story.bind({});
export const Sort_Multiple = Table_Base_Story.bind({});
export const Summary = Table_Base_Story.bind({});
export const Filter = Table_Base_Story.bind({});
export const Ellipsis = Table_Base_Story.bind({});
export const Ellipsis_With_Tooltip = Table_Base_Story.bind({});
export const Responsive = Table_Base_Story.bind({});
export const Tree = Table_Base_Story.bind({});
export const Nested = Table_Base_Story.bind({});
export const Page_Sizes = Page_Sizes_Story.bind({});

export const Virtual_List: FC = () => {
    return (
        <VirtualTable
            columns={virtualCols}
            dataSource={virtualData}
            scroll={{ y: 320, x: 900 }}
        />
    );
};

const tableArgs: Object = {
    alternateRowColor: true,
    headerClassName: 'my-header',
    bordered: true,
    classNames: 'my-table-class',
    id: 'myTableId',
    columns: basicCols,
    dataSource: data,
    pagination: {
        position: ['none', 'bottomRight'],
        layout: [
            PaginationLayoutOptions.Total,
            PaginationLayoutOptions.Sizes,
            PaginationLayoutOptions.Previous,
            PaginationLayoutOptions.Pager,
            PaginationLayoutOptions.Next,
            PaginationLayoutOptions.Jumper,
        ],
        pageSizes: [8, 16],
        total: 16,
    },
};

Basic.args = {
    ...tableArgs,
    bordered: false,
};

Bordered.args = {
    ...tableArgs,
};

Cell_Bordered.args = {
    ...tableArgs,
    bordered: false,
    cellBordered: true,
};

Header_Bordered.args = {
    ...tableArgs,
    bordered: false,
    headerBordered: true,
    headerBottomBordered: false,
};

Inner_Bordered.args = {
    ...tableArgs,
    bordered: false,
    innerBordered: true,
};

Outer_Bordered.args = {
    ...tableArgs,
    bordered: false,
    outerBordered: true,
};

Row_Bordered.args = {
    ...tableArgs,
    bordered: false,
    rowBordered: true,
};

Small.args = {
    ...tableArgs,
    size: TableSize.Small,
};

Medium.args = {
    ...tableArgs,
    size: TableSize.Medium,
};

Large.args = {
    ...tableArgs,
    size: TableSize.Large,
};

Empty.args = {
    bordered: true,
    columns: null,
    dataSource: null,
};

Header_Grouping.args = {
    ...tableArgs,
    scroll: { x: 900 },
    columns: groupingCols,
};

Header_And_Footer.args = {
    ...tableArgs,
    title: () => 'Header',
    footer: () => 'Footer',
};

Fixed_Header.args = {
    ...tableArgs,
    scroll: { y: 320 },
    sticky: true,
};

Fixed_Columns.args = {
    ...tableArgs,
    columns: fixedCols,
    scroll: { x: 900 },
    style: {
        width: '100%',
    },
};

Fixed_Columns_and_Header.args = {
    ...tableArgs,
    columns: fixedCols,
    scroll: { x: 900, y: 320 },
    style: {
        width: '100%',
    },
    sticky: true,
};

Selection.args = {
    ...tableArgs,
    rowSelection: {
        type: 'checkbox',
        ...rowSelection,
    },
};

Expandable_Row.args = {
    ...tableArgs,
    expandableConfig: {
        expandedRowRender: (record: DataType) => (
            <p style={{ margin: 0 }}>{record.description}</p>
        ),
        rowExpandable: (record: DataType) => record.name !== 'Farida Ashfaq',
    },
};

Order_Select_And_Expand_Column.args = {
    ...tableArgs,
    columns: orderSelectAndExpandCols,
    rowSelection: {
        type: 'checkbox',
        ...rowSelection,
    },
    expandableConfig: {
        expandedRowRender: (record: DataType) => (
            <p style={{ margin: 0 }}>{record.description}</p>
        ),
        rowExpandable: (record: DataType) => record.name !== 'Farida Ashfaq',
    },
};

Colspan_Rows.args = {
    ...tableArgs,
    columns: colSpanCols,
    dataSource: colSpanData,
    pagination: false,
};

Sort.args = {
    ...tableArgs,
    columns: sortCols,
};

Sort_Multiple.args = {
    ...tableArgs,
    columns: sortMultipleCols,
};

Summary.args = {
    ...tableArgs,
    summary: (): JSX.Element => (
        <Table.Summary fixed>
            <Table.Summary.Row>
                <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                    This is a summary content
                </Table.Summary.Cell>
            </Table.Summary.Row>
        </Table.Summary>
    ),
};

Filter.args = {
    ...tableArgs,
    columns: filterCols,
};

Ellipsis.args = {
    ...tableArgs,
    columns: ellipsisCols,
};

Ellipsis_With_Tooltip.args = {
    ...tableArgs,
    columns: ellipsisTooltipCols,
};

Responsive.args = {
    ...tableArgs,
    columns: responsiveCols,
};

Tree.args = {
    ...tableArgs,
    columns: treeCols,
    dataSource: treeData,
    pagination: false,
};

Nested.args = {
    ...tableArgs,
    expandableConfig: {
        expandedRowRender,
    },
};

Page_Sizes.args = {
    ...tableArgs,
};
