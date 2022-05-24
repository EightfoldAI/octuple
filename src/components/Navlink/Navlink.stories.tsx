import React from 'react';
import { Icon, IconName } from '../Icon';
import { Navlink, LinkTarget, StackOrder } from './';

export default {
    title: 'Navlink',
    component: Navlink,
};

export const Default = () => (
    <>
        <h2>Navlink</h2>

        <Navlink url="https://www.twitter.com">Twitter</Navlink>

        <h2>Primary Navlink Stacked Columnwise</h2>
        <Navlink
            url="https://www.facebook.com"
            stackOrder={StackOrder.column}
            variant="primary"
            style={{ maxWidth: '100px' }}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </Navlink>
        <h2>Navlink with default behavior disabled</h2>
        <Navlink
            url="https://www.facebook.com"
            onClick={(e) => e.preventDefault()}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </Navlink>
        <h2>Primary Navlink with target='_blank'</h2>
        <Navlink
            url="https://www.facebook.com"
            variant="primary"
            target={LinkTarget.blank}
            style={{ maxWidth: '100px' }}
        >
            <Icon path={IconName.mdiAccount} />
            User Profile
        </Navlink>
    </>
);
