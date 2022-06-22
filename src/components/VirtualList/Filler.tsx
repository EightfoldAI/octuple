import React from 'react';
import { FillerProps } from './VirtualList.types';
import { ResizeObserver } from '../../shared/ResizeObserver/ResizeObserver';
import { mergeClasses } from '../../shared/utilities';

/**
 * Filler component to provide the scroll content real height.
 */
const Filler = React.forwardRef(
    (
        { height, offset, children, onInnerResize }: FillerProps,
        ref: React.Ref<HTMLDivElement>
    ) => {
        let outerStyle: React.CSSProperties = {};

        let innerStyle: React.CSSProperties = {
            display: 'flex',
            flexDirection: 'column',
        };

        if (offset !== undefined) {
            outerStyle = { height, position: 'relative', overflow: 'hidden' };

            innerStyle = {
                ...innerStyle,
                transform: `translateY(${offset}px)`,
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
            };
        }

        return (
            <div style={outerStyle}>
                <ResizeObserver
                    onResize={({ offsetHeight }) => {
                        if (offsetHeight && onInnerResize) {
                            onInnerResize();
                        }
                    }}
                >
                    <div
                        style={innerStyle}
                        className={mergeClasses(['virtual-list-holder-inner'])}
                        ref={ref}
                    >
                        {children}
                    </div>
                </ResizeObserver>
            </div>
        );
    }
);

Filler.displayName = 'Filler';

export default Filler;
