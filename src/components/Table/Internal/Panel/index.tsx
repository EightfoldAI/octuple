import React from 'react';
import { TitleProps } from './Panel.types';

function Panel({ classNames, children }: TitleProps) {
    return <div className={classNames}>{children}</div>;
}

export default Panel;
