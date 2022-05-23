import React from 'react';
import { Icon, IconName, IconSize } from './index';
import { ConfigProvider } from '../ConfigProvider';
import iconSet from './selection.json';

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

export const IcomoonIcons = () => (
    <ConfigProvider
        icomoonIconSet={iconSet}
        themeOptions={{
            name: 'blue',
        }}
    >
        <h1>Icons</h1>
        <p>X-Small</p>
        <Icon icomoonIconName="pencil" size={IconSize.XSmall} />
        <br />
        <p>Large</p>
        <Icon icomoonIconName="pencil" size={IconSize.Large} />
        <br />
        <p>Multicolor Icon</p>
        <Icon icomoonIconName="CareerHub" size={IconSize.Large} />
    </ConfigProvider>
);
