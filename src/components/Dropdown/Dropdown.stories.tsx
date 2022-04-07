import React from 'react';
import { ButtonWidth, DefaultButton } from '../Button';
import { Dropdown } from './';

export default {
    title: 'Dropdown',
    component: Dropdown,
};

const Overlay = () => (
    <div>
        <DefaultButton buttonWidth={ButtonWidth.fill} />
        <DefaultButton buttonWidth={ButtonWidth.fill} />
        <DefaultButton buttonWidth={ButtonWidth.fill} />
    </div>
);

export const Dropdowns = () => (
    <>
        <h2>Dropdown</h2>
        <div style={{ display: 'flex', gap: '20%' }}>
            <Dropdown overlay={Overlay()}>
                <DefaultButton text={'Click bottom start'} />
            </Dropdown>
            <Dropdown
                overlay={Overlay()}
                trigger="hover"
                placement="bottom-end"
            >
                <DefaultButton text={'Hover bottom end'} />
            </Dropdown>
        </div>
    </>
);
