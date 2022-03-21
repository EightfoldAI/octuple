import React from 'react';
import { Icon, IconName, IconSize } from './index';

export default {
    title: 'Icon',
    component: Icon,
};

export const Icons = () => (
    <>
        <h2>Icons</h2>
        <p>X-Small</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.XSmall} />
        <p>Small</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.Small} />
        <p>Medium</p>
        <Icon path={IconName.mdiCardsHeart} />
        <p>Large</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.Large} />
    </>
);
