import React from 'react';
import { ButtonTextAlign, ButtonWidth, DefaultButton } from '../Button';
import { Dropdown } from './';
import { IconName } from '../Icon';

export default {
    title: 'Dropdown',
    component: Dropdown,
};

const Overlay = () => (
    <div>
        <DefaultButton
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
        />
        <DefaultButton
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
        />
        <DefaultButton
            alignText={ButtonTextAlign.Left}
            buttonWidth={ButtonWidth.fill}
        />
    </div>
);

export const Dropdowns = () => (
    <>
        <h2>Dropdown</h2>
        <div style={{ display: 'flex', gap: '20%' }}>
            <Dropdown overlay={Overlay()}>Click bottom start</Dropdown>
            <Dropdown
                overlay={Overlay()}
                trigger="hover"
                placement="bottom-end"
                iconProps={{
                    path: IconName.mdiChevronDown,
                }}
            >
                Hover bottom end
            </Dropdown>
        </div>
    </>
);
