import React from 'react';
import { IconName } from '../../Icon';
import { TextArea, TextInputShape } from '../index';

export default {
    title: 'Text Area',
    component: TextArea,
};

export const Area = () => (
    <>
        <p>Text Area no expand (Rectangle)</p>
        <TextArea label="Label" />
        <p>Text Area with expand (Rectangle)</p>
        <TextArea label="Label" enableExpand={true} />
    </>
);
