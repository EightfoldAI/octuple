import React, { FC, Ref } from 'react';
import { ModalProps, ModalSize } from './Modal.types';
import { mergeClasses } from '../../shared/utilities';
import { BaseDialog } from '../Dialog/BaseDialog/BaseDialog';

import styles from './modal.module.scss';

export const Modal: FC<ModalProps> = React.forwardRef(
  (
    {
      size = ModalSize.medium,
      headerClassNames,
      bodyClassNames,
      actionsClassNames,
      modalClassNames,
      modalWrapperClassNames,
      ...rest
    },
    ref: Ref<HTMLDivElement>
  ) => {
    const modalClasses: string = mergeClasses([
      styles.modal,
      modalClassNames,
      { [styles.small]: size === ModalSize.small },
      { [styles.medium]: size === ModalSize.medium },
      { [styles.large]: size === ModalSize.large },
      { [styles.xLarge]: size === ModalSize.xLarge },
      { [styles.fullscreen]: size === ModalSize.fullscreen },
    ]);

    const headerClasses: string = mergeClasses([
      styles.header,
      'header4',
      headerClassNames,
    ]);

    const bodyClasses: string = mergeClasses([styles.body, bodyClassNames]);

    const actionsClasses: string = mergeClasses([
      styles.footer,
      actionsClassNames,
    ]);

    return (
      <BaseDialog
        {...rest}
        ref={ref}
        dialogWrapperClassNames={modalWrapperClassNames}
        dialogClassNames={modalClasses}
        headerClassNames={headerClasses}
        bodyClassNames={bodyClasses}
        actionsClassNames={actionsClasses}
      />
    );
  }
);
