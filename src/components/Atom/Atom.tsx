import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ArgumentArray, mergeClasses } from '../../shared/utilities';
import { OcBaseProps } from '../OcBase';

interface AtomProps<T> extends OcBaseProps<T> {
    of: keyof HTMLElementTagNameMap;
    classes: ArgumentArray;
}

export const Atom = React.forwardRef(
    ({ of, children, classes = [], ...props }, ref): JSX.Element => {
        const computedClassName = mergeClasses(classes);
        return React.createElement(
            of,
            { ...props, ref, className: computedClassName },
            children
        );
    }
) as <T>(props: AtomProps<T> & { ref?: React.Ref<unknown> }) => JSX.Element;
