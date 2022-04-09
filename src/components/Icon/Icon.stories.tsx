import React from 'react';
import { Icon, IconName, IconSize } from './index';

export default {
    title: 'Icon',
    component: Icon,
};

export const Icons = () => (
    <>
        <h1>Icons</h1>
        <p>X-Small</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.XSmall} />
        <br />
        <p>Small</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.Small} />
        <br />
        <p>Medium</p>
        <Icon path={IconName.mdiCardsHeart} />
        <br />
        <p>Large</p>
        <Icon path={IconName.mdiCardsHeart} size={IconSize.Large} />
    </>
);
