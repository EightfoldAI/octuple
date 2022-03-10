import * as React from 'react';
import { classNames } from '../../../shared/utilities';
import { ButtonSize, IButtonProps } from '../index';
import '../../../styles/main.scss';

export class PrimaryButton extends React.Component<IButtonProps, {}> {
    public render(): JSX.Element {
        const {
            allowDisabledFocus,
            ariaLabel,
            checked,
            classes,
            disabled,
            disruptive,
            icon,
            onClick,
            text,
            size,
            styles
          } = this.props;
        const buttonClassNames: string = classNames({
            'button': true,
            'button-padding-1': size === ButtonSize.Large,
            'button-padding-2': size === ButtonSize.Medium,
            'button-padding-3': size === ButtonSize.Small,
            'button-primary': true,
            'button-primary-disruptive': disruptive,
            classes: classes && classes !== ''
        });
        const buttonIconClassNames: string = classNames({
            'icon-1-material': size === ButtonSize.Large,
            'icon-2-material': size === ButtonSize.Medium,
            'icon-3-material': size === ButtonSize.Small
        });
        const buttonSpacerClassNames: string = classNames({
            'spacer': true,
            'button-spacer-1': size === ButtonSize.Large,
            'button-spacer-2': size === ButtonSize.Medium,
            'button-spacer-3': size === ButtonSize.Small
        });
        const buttonTextClassNames: string = classNames({
            'button1': size === ButtonSize.Large,
            'button2': size === ButtonSize.Medium,
            'button3': size === ButtonSize.Small
        });
        const iconPropsExist: boolean = icon && icon !== '';
        const textPropsExist: boolean = text && text !== '';
        return (
            <button
                aria-label={ariaLabel}
                defaultChecked={checked}
                className={buttonClassNames}
                disabled={disabled}
                onClick={onClick}
                style={styles}>
                {iconPropsExist && !textPropsExist &&
                    this.getButtonIcon(buttonIconClassNames, icon)
                }
                {iconPropsExist && textPropsExist &&
                    <span className='flex-structure-horizontal'>
                        {this.getButtonIcon(buttonIconClassNames, icon)}
                        <span className={buttonSpacerClassNames}></span>
                        {this.getButtonText(buttonTextClassNames, text)}
                    </span>
                }
                {!iconPropsExist && textPropsExist &&
                    this.getButtonText(buttonTextClassNames, text)
                }
                {!iconPropsExist && !textPropsExist &&
                    this.getButtonText(buttonTextClassNames, 'Primary Button')
                }
            </button>
        );
    }
    private getButtonIcon = (buttonIconClassNames: string, icon: string): JSX.Element => {
        return (
            <span className='icon'>
                <span className={buttonIconClassNames}>
                    <i className={'mdi ' + icon}></i>
                </span>
            </span>
        );
    }
    private getButtonText = (buttonTextClassNames: string, text: string): JSX.Element => {
        return (
            <span className={buttonTextClassNames}>{text}</span>
        );
    }
}