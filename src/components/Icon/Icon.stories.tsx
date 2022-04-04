import React from 'react';
import { Icon, IconName, IconSize } from './index';

export default {
    title: 'Icon',
    component: Icon,
};

export const Icons = () => (
    <>
        <h1>Icons</h1>
        <h2>X-Small</h2>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.XSmall} />
        <br />
        <br />
        <h2>Small</h2>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.Small} />
        <br />
        <br />
        <h2>Medium</h2>
        <Icon path={IconName.mdiCardsHeart} />
        <br />
        <br />
        <h2>Large</h2>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.Large} />
    </>
);
