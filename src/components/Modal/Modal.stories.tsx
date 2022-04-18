import React, { useState } from 'react';
import { Modal, ModalSize } from './';
import { PrimaryButton } from '../Button';

export default {
    title: 'Modal',
    component: Modal,
};

export const Default = () => {
    const [visible, setVisible] = useState<Record<string, boolean>>({});
    return (
        <>
            <h1>Modal (large)</h1>
            <PrimaryButton
                text={'Open modal'}
                onClick={() =>
                    setVisible({
                        large: true,
                    })
                }
            />
            <Modal
                visible={visible.large}
                size={ModalSize.large}
                onClose={() => setVisible({})}
                header={'Header 4 used in this modal'}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the modal. The modal body text can wrap to multiple lines.'
                }
            />
            <h1>Modal (medium)</h1>
            <PrimaryButton
                text={'Open modal'}
                onClick={() =>
                    setVisible({
                        medium: true,
                    })
                }
            />
            <Modal
                visible={visible.medium}
                onClose={() => setVisible({})}
                header={'Header 4 used in this modal'}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the modal. The modal body text can wrap to multiple lines.'
                }
            />
            <h1>Modal (small)</h1>
            <PrimaryButton
                text={'Open modal'}
                onClick={() =>
                    setVisible({
                        small: true,
                    })
                }
            />
            <Modal
                visible={visible.small}
                onClose={() => setVisible({})}
                header={'Header 4 used in this modal'}
                size={ModalSize.small}
                body={
                    'Body 2 which is at 16px font size is used here in the body section of the modal. The modal body text can wrap to multiple lines.'
                }
            />
        </>
    );
};
