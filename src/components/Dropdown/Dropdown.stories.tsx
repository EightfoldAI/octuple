import React from 'react';
import { ButtonWidth, DefaultButton } from '../Button';
import { Dropdown } from './';

export default {
    title: 'Dropdown',
    component: Dropdown,
};

const Overlay = () => <DefaultButton buttonWidth={ButtonWidth.fill} />;

export const Dropdowns = () => (
    <>
        <h2>Dropdown</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropdown overlay={Overlay()}>
                <DefaultButton />
            </Dropdown>
            <Dropdown overlay={Overlay()} trigger="hover">
                <DefaultButton />
            </Dropdown>
        </div>
    </>
);
