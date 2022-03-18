import React from 'react';
import { IconSize, OctupleIcon } from './index';
import { mdiHeart } from './index';

export default {
    title: 'Icon',
    component: OctupleIcon,
};

export const Icons = () => (
    <>
        <h2>Icons</h2>
        <p>X-Small</p>
        <OctupleIcon icon={mdiHeart} size={IconSize.XSmall} />
        <p>Small</p>
        <OctupleIcon icon={mdiHeart} size={IconSize.Small} />
        <p>Medium</p>
        <OctupleIcon icon={mdiHeart} size={IconSize.Medium} />
        <p>Large</p>
        <OctupleIcon icon={mdiHeart} size={IconSize.Large} />
    </>
);
