import React, { useState } from 'react';
import { ButtonTextAlign, ButtonWidth, DefaultButton } from '../Button';
import { Icon, IconName } from '../Icon';
import { Dropdown } from './';

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

export const Dropdowns = () => {
    const [visible, setVisibility] = useState(false);

    return (
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
                    onVisibleChange={(isVisible) => setVisibility(isVisible)}
                >
                    <div style={{ display: 'flex' }}>
                        Hover bottom end
                        <Icon
                            path={IconName.mdiChevronDown}
                            rotate={visible ? 180 : 0}
                        />
                    </div>
                </Dropdown>
            </div>
        </>
    );
};
