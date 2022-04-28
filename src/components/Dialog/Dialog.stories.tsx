import React, { useState } from 'react';
import { Dialog, DialogSize } from './';
import { PrimaryButton } from '../Button';

export default {
    title: 'Dialog',
    component: Dialog,
};

export const Default = () => {
    const [visible, setVisible] = useState<Record<string, boolean>>({});
    return (
        <>
            <h1>Dialog (medium)</h1>
            <PrimaryButton
                text={'Open dialog'}
                onClick={() =>
                    setVisible({
                        medium: true,
                    })
                }
            />
            <Dialog
                visible={visible.medium}
                onClose={() => setVisible({})}
                header={'Header 4 used in this dialog'}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the dialog. The dialog body text can wrap to multiple lines.'
                }
                okButtonProps={{
                    text: 'Accept',
                }}
                cancelButtonProps={{
                    text: 'Cancel',
                }}
                onOk={() => setVisible({})}
                onCancel={() => setVisible({})}
            />
            <h1>Dialog (small)</h1>
            <PrimaryButton
                text={'Open dialog'}
                onClick={() =>
                    setVisible({
                        small: true,
                    })
                }
            />
            <Dialog
                visible={visible.small}
                onClose={() => setVisible({})}
                header={'Header 4 used in this dialog'}
                size={DialogSize.small}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the dialog. The dialog body text can wrap to multiple lines.'
                }
                okButtonProps={{
                    text: 'Accept',
                    disruptive: true,
                }}
                cancelButtonProps={{
                    text: 'Cancel',
                    disruptive: true,
                }}
                onOk={() => setVisible({})}
                onCancel={() => setVisible({})}
            />
        </>
    );
};
