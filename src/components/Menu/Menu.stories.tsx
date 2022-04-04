import React from 'react';
import { Menu } from './';
import { DefaultButton } from '../Button';
import { Dropdown } from '../Dropdown/Dropdown';
import { IconName } from '../Icon';

export default {
    title: 'Menu',
    component: Menu,
};

export const Menus = () => (
    <>
        <h2>Menu</h2>
        <Menu
            items={[
                {
                    icon: IconName.mdiCalendar,
                    label: 'Date 1',
                    value: 'date 1',
                },
                {
                    icon: IconName.mdiCalendar,
                    label: 'Date 1',
                    value: 'date 1',
                },
                {
                    icon: IconName.mdiCalendar,
                    label: 'Date 1',
                    value: 'date 1',
                },
            ]}
        />
    </>
);
