import React from 'react';
import { Icomoon, IcomoonSize, IcomoonProvider } from './index';
import iconSet from './selection.json';

export default {
    title: 'Icomoon',
    component: Icomoon,
};

export const Icons = () => (
    <IcomoonProvider value={iconSet}>
        <h1>Icons</h1>
        <p>X-Small</p>
        <Icomoon iconName="pencil" size={IcomoonSize.XSmall} />
        <br />
        <p>Large</p>
        <Icomoon iconName="pencil" size={IcomoonSize.Large} />
        <br />
        <p>Multicolor Icon</p>
        <Icomoon iconName="CareerHub" size={IcomoonSize.Large} />
    </IcomoonProvider>
);
