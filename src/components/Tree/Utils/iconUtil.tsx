import React from 'react';
import { mergeClasses } from '../../../shared/utilities';
import type { OcTreeNodeProps, SwitcherIcon } from '../Tree.types';
import { isValidElement, cloneElement } from '../../../shared/reactNode';
import { Icon, IconName, IconSize } from '../../Icon';
import { Spinner, SpinnerSize } from '../../Spinner';

import styles from '../Styles/tree.module.scss';

export default function renderSwitcherIcon(
    switcherIcon: SwitcherIcon,
    showLine: boolean | { showLeafIcon: boolean } | undefined,
    treeNodeProps: OcTreeNodeProps
): React.ReactNode {
    const { isLeaf, expanded, loading } = treeNodeProps;

    if (loading) {
        return (
            <Spinner
                classNames={styles.treeSwitcherLoadingIcon}
                size={SpinnerSize.Small}
            />
        );
    }
    let showLeafIcon;
    if (showLine && typeof showLine === 'object') {
        showLeafIcon = showLine.showLeafIcon;
    }
    if (isLeaf) {
        if (showLine) {
            if (typeof showLine === 'object' && !showLeafIcon) {
                return <span className={styles.treeSwitcherLeafLine} />;
            }
            return (
                <Icon
                    classNames={styles.treeSwitcherLineIcon}
                    path={IconName.mdiFileDocumentOutline}
                    size={IconSize.Small}
                />
            );
        }
        return null;
    }

    const switcherCls = styles.treeSwitcherIcon;

    const switcher =
        typeof switcherIcon === 'function'
            ? switcherIcon({ expanded: !!expanded })
            : switcherIcon;

    if (switcher && isValidElement(switcher)) {
        return cloneElement(switcher, {
            className: mergeClasses([
                (switcher as any).props.className || '',
                switcherCls,
            ]),
        });
    }

    if (switcher) {
        return switcher;
    }

    if (showLine) {
        return expanded ? (
            <Icon
                classNames={styles.treeSwitcherLineIcon}
                path={IconName.mdiMinusBoxOutline}
                size={IconSize.Small}
            />
        ) : (
            <Icon
                classNames={styles.treeSwitcherLineIcon}
                path={IconName.mdiPlusBoxOutline}
                size={IconSize.Small}
            />
        );
    }
    return (
        <Icon
            classNames={switcherCls}
            path={IconName.mdiChevronDown}
            size={IconSize.Small}
        />
    );
}
