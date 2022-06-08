import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Stack } from './Stack';
import styles from './stack.stories.module.scss';

export default {
    title: 'Stack',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Stack</h1>
                            <p>
                                A Stack is a container-type component that
                                abstracts the implementation of a flexbox in
                                order to define the layout of its children
                                components.
                            </p>
                            <h2>Properties</h2>
                            <ul>
                                <li>
                                    Direction: Determines whether the stacking
                                    of children components is horizontal or
                                    vertical. By default the Stack component is
                                    horizontal, but can be turned vertical by
                                    updating the direction property when using
                                    the component.
                                </li>
                                <li>
                                    Alignment: How the children components are
                                    aligned inside the container. This is
                                    controlled via the Align property.
                                </li>
                                <li>
                                    Spacing: Refers to the space that exists
                                    between children components inside the
                                    Stack. This is controlled via the gap
                                    property.
                                </li>
                                <li>
                                    Justification: Sets the justification of the
                                    children components.
                                </li>
                                <li>
                                    Wrapping: How children components should
                                    wrap.
                                </li>
                            </ul>
                            <p>
                                Stacks can be nested inside one another in order
                                to be able to configure the layout of the
                                application as desired.
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
        direction: {
            options: ['vertical', 'horizontal'],
            control: { type: 'inline-radio' },
        },
        justify: {
            options: [
                'flex-start',
                'flex-end',
                'center',
                'space-between',
                'space-around',
                'space-evenly',
            ],
            control: { type: 'select' },
        },
        align: {
            options: [
                'stretch',
                'center',
                'flex-start',
                'flex-end',
                'baseline',
                'initial',
                'inherit',
            ],
            control: { type: 'select' },
        },
        wrap: {
            options: ['wrap', 'nowrap', 'wrap-reverse'],
            control: { type: 'radio' },
        },
        gap: {
            options: [
                'xxxs',
                'xxs',
                'xs',
                's',
                'm',
                'l',
                'xl',
                'xxl',
                'xxl',
                'xxxl',
            ],
            control: { type: 'select' },
        },
    },
} as ComponentMeta<typeof Stack>;

const Horizontal_Story: ComponentStory<typeof Stack> = (args) => {
    return <Stack {...args}>{args.children}</Stack>;
};

export const Horizontal = Horizontal_Story.bind({});

const Vertical_Story: ComponentStory<typeof Stack> = (args) => {
    return <Stack {...args}>{args.children}</Stack>;
};

export const Vertical = Vertical_Story.bind({});

const Responsive_Story: ComponentStory<typeof Stack> = (args) => {
    return <Stack {...args}>{args.children}</Stack>;
};

export const Responsive = Responsive_Story.bind({});

const Sample_Nav_List_Story: ComponentStory<typeof Stack> = (args) => {
    return <Stack {...args}>{args.children}</Stack>;
};

export const Sample_Nav_List = Sample_Nav_List_Story.bind({});

const stackArgs: Object = {
    fullWidth: false,
    direction: 'horizontal',
    justify: '',
    inline: false,
    align: '',
    wrap: '',
    gap: '',
    style: {
        backgroundColor: 'aquamarine',
    },
    classNames: 'my-stack-class',
    breakpoints: {},
    children: (
        <>
            <div
                style={{
                    height: '200px',
                    width: '200px',
                    backgroundColor: 'mediumpurple',
                }}
            />
            <div
                style={{
                    height: '200px',
                    width: '200px',
                    backgroundColor: 'mediumpurple',
                }}
            />
            <div
                style={{
                    height: '200px',
                    width: '200px',
                    backgroundColor: 'mediumpurple',
                }}
            />
        </>
    ),
};

Horizontal.args = {
    ...stackArgs,
    gap: 'm',
};

Vertical.args = {
    ...stackArgs,
    direction: 'vertical',
    gap: 'l',
};

Responsive.args = {
    ...stackArgs,
    direction: 'vertical',
    gap: 'l',
    breakpoints: {
        xsmall: {
            gap: 'xxxs',
            direction: 'vertical',
        },
        small: {
            gap: 's',
            direction: 'vertical',
        },
        medium: {
            gap: 'xl',
            direction: 'horizontal',
        },
        large: {
            gap: 'xxxl',
            direction: 'horizontal',
        },
    },
};

Sample_Nav_List.args = {
    ...stackArgs,
    classNames: styles.navListContainer,
    direction: 'horizontal',
    wrap: 'wrap',
    breakpoints: {
        small: {
            direction: 'vertical',
        },
    },
    style: {},
    children: (
        <>
            <Stack direction="vertical" gap="m" classNames={styles.group}>
                <h3>Title</h3>
                <Stack direction="vertical" gap="xs">
                    <p>subheading</p>
                    <p>subheading</p>
                </Stack>
            </Stack>
            <Stack direction="vertical" gap="m" classNames={styles.group}>
                <h3>Title</h3>
                <Stack direction="vertical" gap="xs">
                    <p>subheading</p>
                    <p>subheading</p>
                    <p>subheading</p>
                    <p>subheading</p>
                </Stack>
            </Stack>
            <Stack direction="vertical" gap="m" classNames={styles.group}>
                <h3>Title</h3>
                <Stack direction="vertical" gap="xs">
                    <p>subheading</p>
                    <p>subheading</p>
                </Stack>
            </Stack>
            <Stack direction="vertical" gap="m" classNames={styles.group}>
                <h3>Title</h3>
                <Stack direction="vertical" gap="xs">
                    <p>subheading</p>
                    <p>subheading</p>
                    <p>subheading</p>
                </Stack>
            </Stack>
            <Stack direction="vertical" gap="m" classNames={styles.group}>
                <h3>Title</h3>
                <Stack direction="vertical" gap="xs">
                    <p>subheading</p>
                    <p>subheading</p>
                    <p>subheading</p>
                    <p>subheading</p>
                </Stack>
            </Stack>
            <Stack direction="vertical" gap="m" classNames={styles.group}>
                <h3>Title</h3>
                <Stack direction="vertical" gap="xs">
                    <p>subheading</p>
                    <p>subheading</p>
                    <p>subheading</p>
                </Stack>
            </Stack>
        </>
    ),
};
