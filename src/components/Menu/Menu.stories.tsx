import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Menu, MenuSize, MenuVariant } from './';
import { Dropdown } from '../Dropdown';
import { DefaultButton } from '../Button';

export default {
    title: 'Menu',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Menu</h1>
                            <p>
                                A Menu is a component that offers a grouped list
                                of choices to the person using the app.
                            </p>
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
        variant: {
            options: [
                MenuVariant.neutral,
                MenuVariant.primary,
                MenuVariant.disruptive,
            ],
            control: { type: 'radio' },
        },
        size: {
            options: [MenuSize.small, MenuSize.medium, MenuSize.large],
            control: { type: 'radio' },
        },
    },
} as ComponentMeta<typeof Menu>;

const Overlay = (args: any) => (
    <Menu
        {...args}
        items={[
            {
                text: 'Date',
                value: 'date 1',
                counter: '8',
            },
            {
                text: 'Thumbs up',
                value: 'date 1',
                disabled: true,
            },
            {
                text: 'School',
                value: 'date 1',
            },
            {
                text: 'Date',
                value: 'date 1',
            },
            {
                text: 'Thumbs up',
                value: 'date 1',
            },
            {
                text: 'School',
                value: 'date 1',
            },
            {
                text: 'Date',
                value: 'date 1',
            },
            {
                text: 'Thumbs up',
                value: 'date 1',
            },
            {
                text: 'School',
                value: 'date 1',
            },
        ]}
        onChange={(item) => {
            console.log(item);
        }}
    />
);

const Menu_Story: ComponentStory<typeof Menu> = (args) => (
    <Dropdown overlay={Overlay(args)}>
        <DefaultButton text={'Menu dropdown'} />
    </Dropdown>
);

export const Menus = Menu_Story.bind({});

Menus.args = {
    variant: MenuVariant.neutral,
    size: MenuSize.medium,
    classNames: 'my-menu-class',
    style: {},
    header: 'Header 4 is used here',
    subHeader: 'A short description if needed',
    itemClassNames: 'my-menu-item-class',
    cancelButtonProps: {
        ariaLabel: 'Cancel',
        classNames: 'my-cancel-btn-class',
        'data-test-id': 'my-cancel-btn-test-id',
        iconProps: null,
        id: 'myCancelButton',
        text: 'Cancel',
    },
    okButtonProps: {
        ariaLabel: 'Accept',
        classNames: 'my-accept-btn-class',
        'data-test-id': 'my-accept-btn-test-id',
        iconProps: null,
        id: 'myAcceptButton',
        text: 'Accept',
    },
    itemStyle: {},
    listType: 'ul',
};
