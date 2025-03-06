import { useState } from 'react';
import { useInterval } from '../../../../hooks/useInterval';
import { NudgeAnimation, NudgeProps } from '../Nudge.types';

export const useNudge = (
  disruptive: boolean,
  nudgeProps: NudgeProps,
  refs: React.MutableRefObject<any>[],
  styles: any
): void => {
  const [nudgeIterations, setNudgeIterations] = useState<number>(0);

  // If the condition meets the following:
  // 1) Not disruptive
  // 2) Nudge is enabled
  // 3) nudgeIterations is not equal to those passed from props multiplied by two
  // 4) The animation passed from props isn't conic
  //    - Conic animation implies its own intrinsic interval, thus the useInterval hook is not required,
  //      only enable/disable from nudgeProps.
  // give the delay the value of the delay passed from props divided by two.
  // The iterations passed from props are multiplied by two to simulate iteration delay
  // not provided by the CSS animation selector property. For every odd iteration,
  // add the CSS animation selector class, for every even, remove it.
  // If the conditional expression is not met, return null and
  // the useInterval hook will not schedule.
  const delay = (): number => {
    return !disruptive &&
      nudgeProps?.enabled &&
      nudgeIterations !== nudgeProps?.iterations * 2 &&
      nudgeProps?.animation !== NudgeAnimation.Conic
      ? nudgeProps?.delay / 2
      : null;
  };

  useInterval((): void => {
    setNudgeIterations(nudgeIterations + 1);
    if (Math.abs(nudgeIterations % 2) === 1) {
      if (nudgeProps?.animation === NudgeAnimation.Bounce) {
        refs[0]?.current.classList.add(styles[nudgeProps.animation]);
      } else {
        refs[1]?.current.classList.add(styles[nudgeProps?.animation]);
      }
    } else {
      if (nudgeProps?.animation === NudgeAnimation.Bounce) {
        refs[0]?.current.classList.remove(styles[nudgeProps.animation]);
      } else {
        refs[1]?.current.classList.remove(styles[nudgeProps?.animation]);
      }
    }
  }, delay());
};
