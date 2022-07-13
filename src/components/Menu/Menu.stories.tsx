import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Menu, MenuItemType, MenuSize, MenuVariant } from './';
import { Dropdown } from '../Dropdown';
import { DefaultButton } from '../Button';
import { RadioGroup } from '../RadioButton';
import { IconName } from '../Icon';

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
        onChange: {
            action: 'click',
        },
    },
} as ComponentMeta<typeof Menu>;

const Overlay = (args: any) => (
    <Menu
        {...args}
        items={[
            {
                iconProps: {
                    path: IconName.mdiCalendar,
                },
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
                iconProps: {
                    path: IconName.mdiCalendar,
                },
                text: 'Date',
                value: 'date 1',
                counter: '8',
            },
            {
                text: 'Thumbs up',
                value: 'date 1',
            },
            {
                iconProps: {
                    path: IconName.mdiCalendar,
                },
                text: 'Date',
                value: 'date 1',
                counter: '8',
            },
            {
                text: 'Thumbs up',
                value: 'date 1',
            },
            {
                type: MenuItemType.subHeader,
                text: 'Menu Type links',
            },
            {
                type: MenuItemType.link,
                text: 'Twitter link',
                href: 'https://twitter.com',
                target: '_blank',
            },
            {
                type: MenuItemType.link,
                text: 'Facebook link',
                href: 'https://facebook.com',
                target: '_blank',
            },
            {
                type: MenuItemType.subHeader,
                text: 'Menu type custom',
            },
            {
                type: MenuItemType.custom,
                render: ({ onChange }) => (
                    <RadioGroup
                        {...{
                            ariaLabel: 'Radio Group',
                            value: 'Radio1',
                            items: [1, 2, 3].map((i) => ({
                                value: `Radio${i}`,
                                label: `Radio${i}`,
                                name: 'group',
                                id: `oea2exk-${i}`,
                            })),
                            layout: 'vertical',
                        }}
                        onChange={onChange}
                    />
                ),
            },
        ]}
        onChange={(item) => {
            args.onChange(item);
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
