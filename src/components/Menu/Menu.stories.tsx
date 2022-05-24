import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from './';
import { IconName } from '../Icon';
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
} as ComponentMeta<typeof Menu>;

const Overlay = (disruptive: boolean) => (
    <Menu
        onChange={(item) => {
            console.log(item);
        }}
        disruptive={disruptive}
        items={[
            {
                iconProps: { path: IconName.mdiCalendar },
                text: 'Date',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiThumbUpOutline },
                text: 'Thumbs up',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiSchool },
                text: 'School',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiCalendar },
                text: 'Date',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiThumbUpOutline },
                text: 'Thumbs up',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiSchool },
                text: 'School',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiCalendar },
                text: 'Date',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiThumbUpOutline },
                text: 'Thumbs up',
                value: 'date 1',
            },
            {
                iconProps: { path: IconName.mdiSchool },
                text: 'School',
                value: 'date 1',
            },
        ]}
    />
);

export const Menus: ComponentStory<typeof Menu> = () => {
    return (
        <>
            <p>Menu</p>
            <Dropdown overlay={Overlay(false)}>
                <DefaultButton text={'Menu dropdown'} />
            </Dropdown>
            <br />
            <br />
            <br />
            <p>Menu (disruptive)</p>
            <Dropdown overlay={Overlay(true)}>
                <DefaultButton text={'Menu dropdown'} disruptive />
            </Dropdown>
        </>
    );
};
