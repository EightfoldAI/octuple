import React from 'react';
import OriginCSSMotion from './CSSMotion';
import type { CSSMotionProps } from './CSSMotion.types';
import {
    MOTION_PROP_NAMES,
    CSSMotionListProps,
    CSSMotionListState,
} from './CSSMotion.types';
import { supportTransition } from './Utilities/motion';
import {
    STATUS_ADD,
    STATUS_KEEP,
    STATUS_REMOVE,
    STATUS_REMOVED,
    diffKeys,
    parseKeys,
} from './Utilities/diff';

/**
 * Generate a CSSMotionList component with config
 * @param transitionSupport No need since CSSMotionList no longer depends on transition support
 * @param CSSMotion CSSMotion component
 */
export function genCSSMotionList(
    transitionSupport?: boolean,
    CSSMotion = OriginCSSMotion
): React.ComponentClass<CSSMotionListProps> {
    class CSSMotionList extends React.Component<
        CSSMotionListProps,
        CSSMotionListState
    > {
        static defaultProps = {
            component: 'div',
        };

        state: CSSMotionListState = {
            keyEntities: [],
        };

        static getDerivedStateFromProps(
            { keys }: CSSMotionListProps,
            { keyEntities }: CSSMotionListState
        ) {
            const parsedKeyObjects = parseKeys({ keys });
            const mixedKeyEntities = diffKeys(keyEntities, parsedKeyObjects);

            return {
                keyEntities: mixedKeyEntities.filter((entity) => {
                    const prevEntity = keyEntities.find(
                        ({ key }) => entity.key === key
                    );

                    // Remove if already mark as removed
                    if (
                        prevEntity &&
                        prevEntity.status === STATUS_REMOVED &&
                        entity.status === STATUS_REMOVE
                    ) {
                        return false;
                    }
                    return true;
                }),
            };
        }

        // ZombieJ: Return the count of rest keys. It's safe to refactor if need more info.
        removeKey = (removeKey: React.Key) => {
            const { keyEntities } = this.state;
            const nextKeyEntities = keyEntities.map((entity) => {
                if (entity.key !== removeKey) return entity;
                return {
                    ...entity,
                    status: STATUS_REMOVED,
                };
            });

            this.setState({
                keyEntities: nextKeyEntities,
            });

            return nextKeyEntities.filter(
                ({ status }) => status !== STATUS_REMOVED
            ).length;
        };

        render() {
            const { keyEntities } = this.state;
            const {
                component,
                children,
                onVisibleChanged,
                onAllRemoved,
                ...restProps
            } = this.props;

            const Component = component || React.Fragment;

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const _transitionSupport = transitionSupport;

            const motionProps: CSSMotionProps = {};
            MOTION_PROP_NAMES.forEach((prop) => {
                (motionProps as any)[prop] = (restProps as any)[prop];
                delete (restProps as any)[prop];
            });
            delete restProps.keys;

            return (
                <Component {...restProps}>
                    {keyEntities.map(({ status, ...eventProps }) => {
                        const visible =
                            status === STATUS_ADD || status === STATUS_KEEP;
                        return (
                            <CSSMotion
                                {...motionProps}
                                key={eventProps.key}
                                visible={visible}
                                eventProps={eventProps}
                                onVisibleChanged={(changedVisible: boolean) => {
                                    onVisibleChanged?.(changedVisible, {
                                        key: eventProps.key,
                                    });

                                    if (!changedVisible) {
                                        const restKeysCount = this.removeKey(
                                            eventProps.key
                                        );

                                        if (
                                            restKeysCount === 0 &&
                                            onAllRemoved
                                        ) {
                                            onAllRemoved();
                                        }
                                    }
                                }}
                            >
                                {children}
                            </CSSMotion>
                        );
                    })}
                </Component>
            );
        }
    }

    return CSSMotionList;
}

export default genCSSMotionList(supportTransition);
