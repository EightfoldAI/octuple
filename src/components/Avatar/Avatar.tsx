import React, { FC } from 'react';

// Styles:
import styles from './avatar.module.scss';
import { AvatarProps, AvatarFallbackProps } from './';
import { mergeClasses } from '../../shared/utilities';

export const AVATAR_COLORS = [
    {
        backgroundColor: '#FFC6C6',
        borderColor: '#FFA3A3',
        color: '#993838',
    },
    {
        backgroundColor: '#D9DCE1',
        borderColor: '#BEC2CA',
        color: '#4F5666',
    },
    {
        backgroundColor: '#FCC8E7',
        borderColor: '#F3A5D4',
        color: '#943D71',
    },
    {
        backgroundColor: '#BCE4FF',
        borderColor: '#8ED0FA',
        color: '#146DA6',
    },
    {
        backgroundColor: '#FFE3B0',
        borderColor: '#FFCD78',
        color: '#9D6309',
    },
    {
        backgroundColor: '#B9F4E4',
        borderColor: '#8CE1CA',
        color: '#2B715F',
    },
    {
        backgroundColor: '#CACFFC',
        borderColor: '#A9B0F5',
        color: '#414996',
    },
    {
        backgroundColor: '#EAD3E8',
        borderColor: '#DAB4D6',
        color: '#7E3A77',
    },
];

const AvatarFallback: FC<AvatarFallbackProps> = ({
    fallbackText,
    size,
    onClick,
    classNames,
    fontSize = 18,
}) => {
    const avatarColors = AVATAR_COLORS;

    const avatarColorSet =
        avatarColors[Math.floor(Math.random() * 100) % avatarColors.length];

    const divStyle = {
        width: `${size}px`,
        height: `${size}px`,
        minWidth: `${size}px`,
        minHeight: `${size}px`,
        fontSize: `${fontSize}px`,
        border: `1px solid ${avatarColorSet.borderColor}`,
        ...avatarColorSet,
    };
    const wordsInName = fallbackText.split(' ');
    const firstTwoWordsInName = wordsInName.slice(0, 2);
    const initials = firstTwoWordsInName.map((word) => word[0]).join('');

    const avatarStyle = mergeClasses([styles.profileImageFallback, classNames]);

    return (
        <div className={avatarStyle} onClick={onClick} style={divStyle}>
            <span>{initials || ''}</span>
        </div>
    );
};

export const Avatar: FC<AvatarProps> = (props) => {
    const {
        classNames,
        imageProps: { src: imageSouce, alt: imageAltText } = {},
        supportFallback,
        size = 32,
        onClick,
        type = 'square',
    } = props;

    const imageStyle = mergeClasses([
        styles.imageStyle,
        classNames,
        { [styles.roundImage]: type === 'round' },
    ]);

    if (imageSouce) {
        return (
            <img
                src={imageSouce}
                className={imageStyle}
                alt={imageAltText}
                width={size}
                height={size}
                onClick={onClick}
            />
        );
    }
    if (supportFallback) {
        return <AvatarFallback {...props} classNames={imageStyle} />;
    }
    return null;
};

export default Avatar;
