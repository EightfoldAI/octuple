import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { ArgumentArray, mergeClasses } from '../../shared/utilities';
import { OcBaseProps } from '../OcBase';

type AtomProps<T = {}, U = React.Ref<any>> = T &
    OcBaseProps<U> & {
        of: keyof HTMLElementTagNameMap;
        classes: ArgumentArray;
        children?: any;
        style?: React.CSSProperties;
    };

export const Atom = React.forwardRef(
    ({ of, children, classes = [], ...props }, ref): JSX.Element => {
        const computedClassName = mergeClasses(classes);
        return React.createElement(
            of,
            { ...props, ref, className: computedClassName },
            children
        );
    }
) as <T, U = any>(
    props: Omit<AtomProps<T, U>, 'ref'> & { ref?: React.Ref<U> }
) => JSX.Element;
