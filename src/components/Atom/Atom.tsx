import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ArgumentArray, mergeClasses } from '../../shared/utilities';
import { OcBaseProps } from '../OcBase';

interface AtomProps<T> extends OcBaseProps<T> {
    of: keyof HTMLElementTagNameMap;
    classes: ArgumentArray;
}

export const Atom = React.forwardRef(
    (
        { of, children, classes = [], ...props }: AtomProps<HTMLElement>,
        ref?: React.Ref<any>
    ): JSX.Element => {
        const computedClassName = mergeClasses(classes);
        return React.createElement(
            of,
            { ...props, ref, className: computedClassName },
            children
        );
    }
);
