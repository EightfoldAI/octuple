import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {
    snack,
    Snackbar,
    SnackbarContainer,
    SnackbarPosition,
    SnackbarType,
} from './';
import { ButtonSize, DefaultButton } from '../Button';
import { InfoBarType } from '../InfoBar';

export default {
    title: 'Snack Bar',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Snack Bar</h1>
                            <p>
                                Snack bars are a type of component we can use to
                                provide quick responses back to someone. There
                                are two different types of snackbars;
                                auto-dismissable and user-dismissable. Depending
                                on the context of the response, they provide a
                                call-to-action for people to act upon.{' '}
                            </p>
                        </section>
                        <br />
                        <hr />
                        <br />
                        <section>
                            <Stories includePrimary />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Snackbar>;

export const Snack_Bars: ComponentStory<typeof Snackbar> = () => {
    let snackIndex = 1;

    const snackbarPositions: SnackbarPosition[] = [
        'top-center',
        'top-left',
        'top-right',
        'bottom-center',
        'bottom-left',
        'bottom-right',
    ];

    const snackbarTypes: InfoBarType[] = [
        InfoBarType.disruptive,
        InfoBarType.warning,
        InfoBarType.positive,
        InfoBarType.neutral,
    ];

    const serveSnacks = (position: SnackbarPosition) => {
        const type: SnackbarType =
            snackbarTypes[Math.floor(Math.random() * snackbarTypes.length)];
        snack.serve({
            content:
                'Body 2 is used in this snackbar. This should be straight forward but can wrap up to two lines if needed.',
            type,
            position,
            closable: !Math.round(Math.random()),
        });
        snackIndex += 1;
    };

    return (
        <div>
            <h1>Snack Bars</h1>
            {snackbarPositions.map((position) => (
                <DefaultButton
                    key={position}
                    text={`Serve snack ${position.split('-').join(' ')}`}
                    onClick={() => serveSnacks(position)}
                    size={ButtonSize.Small}
                />
            ))}
            <DefaultButton
                text={`Serve snack with action`}
                onClick={() => {
                    snack.serve({
                        content:
                            'Body 2 is used in this snackbar. This should be straight forward but can wrap up to two lines if needed.',
                        actionButtonProps: {
                            text: 'Action',
                            onClick: () => {
                                console.log('hi i was clicked');
                            },
                        },
                    });
                }}
                size={ButtonSize.Small}
            />
            <SnackbarContainer />
        </div>
    );
};
