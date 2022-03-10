import * as React from 'react';
import { classNames } from '../../../shared/utilities';
import { ButtonSize, IButtonProps } from '../index';
import '../../../styles/main.scss';

export class DefaultButton extends React.Component<IButtonProps, {}> {
    public render(): JSX.Element {
        const {
            allowDisabledFocus,
            ariaLabel,
            checked,
            classes,
            disabled,
            onClick,
            text,
            size,
            styles
          } = this.props;
          const buttonClassNames: string = classNames({
            'button': true,
            'button1 button-padding-1': size === ButtonSize.Large,
            'button2 button-padding-2': size === ButtonSize.Medium,
            'button3 button-padding-3': size === ButtonSize.Small,
            'button-default': true
        });
        return (
            <button
                aria-label={ariaLabel}
                defaultChecked={checked}
                className={buttonClassNames + ' ' + classes}
                disabled={disabled}
                onClick={onClick}
                style={styles}>
                {text}
            </button>
        );
    }
}