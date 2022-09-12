import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { DialogProps, DialogSize } from './Dialog.types';
import { Dialog } from './Dialog';
import { generateId } from '../../shared/utilities';

const uniqueId: string = generateId();

function createWrapperAndAppendToBody(wrapperId: string): HTMLDivElement {
    const existingElement = document.getElementById(
        wrapperId
    ) as HTMLDivElement;
    if (document.getElementById(wrapperId)) {
        return existingElement;
    }
    const wrapperElement = document.createElement('div');
    wrapperElement.setAttribute('id', wrapperId);
    document.body.appendChild(wrapperElement);
    return wrapperElement;
}

const $dialog = (props: DialogProps, containerId: string = uniqueId) => {
    const element: HTMLDivElement = createWrapperAndAppendToBody(
        containerId ?? uniqueId
    );
    render(
        <Dialog
            {...props}
            visible
            parent={element}
            onClose={(e) => {
                props?.onClose?.(e);
                unmountComponentAtNode(element);
            }}
        />,
        element
    );
};

export const DialogHelper = {
    show: $dialog,
    showSmall: (props: DialogProps, containerId: string = uniqueId) =>
        $dialog(
            {
                ...props,
                size: DialogSize.small,
            },
            containerId
        ),
    showMedium: (props: DialogProps, containerId: string = uniqueId) =>
        $dialog(
            {
                ...props,
                size: DialogSize.medium,
            },
            containerId
        ),
    close: (containerId: string = uniqueId) =>
        unmountComponentAtNode(document.getElementById(containerId)),
};
