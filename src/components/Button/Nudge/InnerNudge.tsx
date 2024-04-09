'use client';

import React, { FC, Ref } from 'react';
import { NudgeAnimation, InnerNudgeProps } from './';

export const InnerNudge: FC<InnerNudgeProps> = React.forwardRef(
  (props: InnerNudgeProps, ref: Ref<HTMLSpanElement>) => {
    const { classNames, disruptive, id, nudgeProps, style, ...rest } = props;

    // Bounce is an outer nudge, applied to the parent.
    // Depending on the nature of the CSS animation, a determination
    // will be made if inner/outer.
    // In the future, there may be an outer `Nudge` component wrapper.
    return (
      <>
        {!disruptive &&
          nudgeProps?.enabled &&
          nudgeProps?.animation !== NudgeAnimation.Bounce && (
            <span
              {...rest}
              aria-hidden="true"
              className={classNames}
              id={id}
              ref={ref}
              style={style ? style : null}
            />
          )}
      </>
    );
  }
);
