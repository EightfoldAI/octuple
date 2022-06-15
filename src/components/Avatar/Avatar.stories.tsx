import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconName } from '../Icon';
import { Avatar } from './';

export default {
    title: 'Avatar',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Avatar</h1>
                            <p>
                                Avatars may be used to represent people or
                                objects and supports images, Icons, or
                                characters.
                            </p>
                        </section>
                        <section>
                            <Stories includePrimary title="" />
                        </section>
                    </article>
                </main>
            ),
        },
    },
    argTypes: {
        type: {
            options: ['round', 'square'],
            control: { type: 'inline-radio' },
        },
    },
} as ComponentMeta<typeof Avatar>;

const imageProps = {
    src: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
    alt: 'random profile image',
};

const iconProps = {
    path: IconName.mdiBell,
};

const Avatar_Default_Story: ComponentStory<typeof Avatar> = (args) => (
    <Avatar {...args} />
);

export const Avatar_Default = Avatar_Default_Story.bind({});

const Avatar_Icon_Story: ComponentStory<typeof Avatar> = (args) => (
    <Avatar {...args} />
);

export const Avatar_Icon = Avatar_Icon_Story.bind({});

const Avatar_Round_Story: ComponentStory<typeof Avatar> = (args) => (
    <Avatar {...args} />
);

export const Avatar_Round = Avatar_Round_Story.bind({});

const Avatar_Round_Icon_Story: ComponentStory<typeof Avatar> = (args) => (
    <Avatar {...args} />
);

export const Avatar_Round_Icon = Avatar_Round_Icon_Story.bind({});

const Avatar_Fallback_Theme_Story: ComponentStory<typeof Avatar> = (args) => (
    <Avatar {...args} theme="green" />
);

export const Avatar_Fallback_Theme = Avatar_Fallback_Theme_Story.bind({});

const Avatar_Fallback_Hashing_Story: ComponentStory<typeof Avatar> = (args) => (
    <Avatar {...args} hashingFunction={() => 3} />
);

export const Avatar_Fallback_Hashing = Avatar_Fallback_Hashing_Story.bind({});

const avatarArgs: Object = {
    children: 'JD',
    classNames: 'my-avatar-class',
    'data-test-id': 'my-avatar-test-id',
    size: '40px',
    type: 'square',
    style: {},
    fontSize: '18px',
};

Avatar_Default.args = {
    ...avatarArgs,
    src: imageProps.src,
    alt: imageProps.alt,
};

Avatar_Icon.args = {
    ...avatarArgs,
    iconProps: {
        path: IconName.mdiBell,
    },
    style: {
        backgroundColor: 'var(--accent-color-20)',
    },
};

Avatar_Round.args = {
    ...avatarArgs,
    src: imageProps.src,
    alt: imageProps.alt,
    type: 'round',
};

Avatar_Round_Icon.args = {
    ...avatarArgs,
    iconProps: {
        path: IconName.mdiBell,
    },
    style: {
        backgroundColor: 'var(--accent-color-20)',
    },
    type: 'round',
};

Avatar_Fallback_Theme.args = {
    ...avatarArgs,
    children: 'AB',
    type: 'round',
};

Avatar_Fallback_Hashing.args = {
    ...avatarArgs,
    children: 'HF',
    type: 'round',
};
