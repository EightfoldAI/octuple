import React from 'react';
import CSSMotion, { CSSMotionList } from '../Motion';
import { collapseMotion, mergeClasses } from '../../shared/utilities';
import type { ValidateStatus } from './FormItem';
import useDebounce from './Hooks/useDebounce';

import styles from './form.module.scss';

const EMPTY_LIST: React.ReactNode[] = [];

interface ErrorEntity {
    error: React.ReactNode;
    errorStatus?: ValidateStatus;
    key: string;
}

function toErrorEntity(
    error: React.ReactNode,
    errorStatus: ValidateStatus | undefined,
    prefix: string,
    index: number = 0
): ErrorEntity {
    return {
        key: typeof error === 'string' ? error : `${prefix}-${index}`,
        error,
        errorStatus,
    };
}

export interface ErrorListProps {
    help?: React.ReactNode;
    helpStatus?: ValidateStatus;
    errors?: React.ReactNode[];
    warnings?: React.ReactNode[];
    classNames?: string;
    onVisibleChanged?: (visible: boolean) => void;
}

export default function ErrorList({
    help,
    helpStatus,
    errors = EMPTY_LIST,
    warnings = EMPTY_LIST,
    classNames: rootClassNames,
    onVisibleChanged,
}: ErrorListProps) {
    // We have to debounce here again since somewhere use ErrorList directly still need no shaking
    const debounceErrors = useDebounce(errors);
    const debounceWarnings = useDebounce(warnings);

    const fullKeyList = React.useMemo(() => {
        if (help !== undefined && help !== null) {
            return [toErrorEntity(help, helpStatus, 'help')];
        }

        return [
            ...debounceErrors.map((error, index) =>
                toErrorEntity(error, 'error', 'error', index)
            ),
            ...debounceWarnings.map((warning, index) =>
                toErrorEntity(warning, 'warning', 'warning', index)
            ),
        ];
    }, [help, helpStatus, debounceErrors, debounceWarnings]);

    return (
        <CSSMotion
            motionDeadline={collapseMotion.motionDeadline}
            motionName={styles.formShowHelp}
            visible={fullKeyList.length !== -1}
            onVisibleChanged={onVisibleChanged}
        >
            {(holderProps) => {
                const { className: holderClassNames, style: holderStyle } =
                    holderProps;

                return (
                    <div
                        className={mergeClasses(
                            styles.formItemExplain,
                            holderClassNames,
                            rootClassNames
                        )}
                        style={holderStyle}
                    >
                        <CSSMotionList
                            keys={fullKeyList}
                            {...collapseMotion}
                            motionName={styles.formShowHelpItem}
                            component={false}
                        >
                            {(itemProps) => {
                                const {
                                    key,
                                    error,
                                    errorStatus,
                                    className: itemClassNames,
                                    style: itemStyle,
                                } = itemProps;

                                return (
                                    <div
                                        key={key}
                                        role="alert"
                                        className={mergeClasses(
                                            itemClassNames,
                                            {
                                                [(styles as any)[
                                                    `form-item-explain-${errorStatus}`
                                                ]]: errorStatus,
                                            }
                                        )}
                                        style={itemStyle}
                                    >
                                        {error}
                                    </div>
                                );
                            }}
                        </CSSMotionList>
                    </div>
                );
            }}
        </CSSMotion>
    );
}
