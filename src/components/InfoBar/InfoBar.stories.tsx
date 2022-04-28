import React from 'react';
import { InfoBar, InfoBarType } from './';

export default {
    title: 'InfoBar',
    component: InfoBar,
};

export const Default = () => {
    const infoBarTypes: InfoBarType[] = [
        InfoBarType.disruptive,
        InfoBarType.warning,
        InfoBarType.positive,
        InfoBarType.neutral,
    ];

    return (
        <div>
            <h1>InfoBars</h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                }}
            >
                {infoBarTypes.map((infoBarType) => (
                    <InfoBar
                        content={'Body2 is used inside here.'}
                        type={infoBarType}
                    />
                ))}
            </div>
        </div>
    );
};
