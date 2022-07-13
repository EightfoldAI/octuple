import type {
    CSSMotionProps,
    MotionEndEventHandler,
    MotionEventHandler,
} from '../../components/Motion';
import type { MotionEvent } from '../../components/Motion/CSSMotion.types';
import { tuple } from './types';

const getCollapsedHeight: MotionEventHandler = () => ({
    height: 0,
    opacity: 0,
});
const getRealHeight: MotionEventHandler = (node) => {
    const { scrollHeight } = node;
    return { height: scrollHeight, opacity: 1 };
};
const getCurrentHeight: MotionEventHandler = (node) => ({
    height: node ? node.offsetHeight : 0,
});
const skipOpacityTransition: MotionEndEventHandler = (_, event: MotionEvent) =>
    event?.deadline === true ||
    (event as TransitionEvent).propertyName === 'height';

const collapseMotion: CSSMotionProps = {
    motionName: 'motion-collapse',
    onAppearStart: getCollapsedHeight,
    onEnterStart: getCollapsedHeight,
    onAppearActive: getRealHeight,
    onEnterActive: getRealHeight,
    onLeaveStart: getCurrentHeight,
    onLeaveActive: getCollapsedHeight,
    onAppearEnd: skipOpacityTransition,
    onEnterEnd: skipOpacityTransition,
    onLeaveEnd: skipOpacityTransition,
    motionDeadline: 500,
};

const SelectPlacements = tuple(
    'bottomLeft',
    'bottomRight',
    'topLeft',
    'topRight'
);
export type SelectCommonPlacement = typeof SelectPlacements[number];

const getTransitionDirection = (
    placement: SelectCommonPlacement | undefined
) => {
    if (
        placement !== undefined &&
        (placement === 'topLeft' || placement === 'topRight')
    ) {
        return `slide-down`;
    }
    return `slide-up`;
};

const getTransitionName = (motion: string, transitionName?: string) => {
    if (transitionName !== undefined) {
        return transitionName;
    }
    return motion;
};
export { getTransitionName, getTransitionDirection };
export default collapseMotion;
