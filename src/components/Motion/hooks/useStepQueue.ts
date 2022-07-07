import React, { useLayoutEffect } from 'react';
import { useSafeState } from '../../../hooks/useState';
import type { StepStatus, MotionStatus } from '../CSSMotion.types';
import {
    STEP_PREPARE,
    STEP_ACTIVE,
    STEP_START,
    STEP_ACTIVATED,
    STEP_NONE,
} from '../CSSMotion.types';
import { useNextFrame } from './useNextFrame';

const STEP_QUEUE: StepStatus[] = [
    STEP_PREPARE,
    STEP_START,
    STEP_ACTIVE,
    STEP_ACTIVATED,
];

/** Skip current step */
export const SkipStep = false as const;
/** Current step should be update in */
export const DoStep = true as const;

export function isActive(step: StepStatus) {
    return step === STEP_ACTIVE || step === STEP_ACTIVATED;
}

export const useStepQueue = (
    status: MotionStatus,
    callback: (
        step: StepStatus
    ) => Promise<void> | void | typeof SkipStep | typeof DoStep
): [() => void, StepStatus] => {
    const [step, setStep] = useSafeState<StepStatus>(STEP_NONE);

    const [nextFrame, cancelNextFrame] = useNextFrame();

    function startQueue() {
        setStep(STEP_PREPARE, true);
    }

    useLayoutEffect(() => {
        if (step !== STEP_NONE && step !== STEP_ACTIVATED) {
            const index = STEP_QUEUE.indexOf(step);
            const nextStep = STEP_QUEUE[index + 1];

            const result = callback(step);

            if (result === SkipStep) {
                // Skip when no needed
                setStep(nextStep, true);
            } else {
                // Do as frame for step update
                nextFrame((info) => {
                    function doNext() {
                        // Skip since current queue is ood
                        if (info.isCanceled()) return;

                        setStep(nextStep, true);
                    }

                    if (result === true) {
                        doNext();
                    } else {
                        // Only promise should be async
                        Promise.resolve(result).then(doNext);
                    }
                });
            }
        }
    }, [status, step]);

    React.useEffect(
        () => () => {
            cancelNextFrame();
        },
        []
    );

    return [startQueue, step];
};
