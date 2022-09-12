import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Dialog, DialogSize } from './';
import { PrimaryButton } from '../Button';
import { DialogHelper as dialogHelper } from './DialogHelper';

export default {
    title: 'Dialog',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Dialog</h1>
                            <p>
                                A dialog is a temporary pop-up that takes focus
                                from the page or app and requires people to
                                interact with it. It's primarily used for
                                confirming actions, such as deleting a file, or
                                asking people to make a choice.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Layout</h3>
                            <ul>
                                <li>Don't use more than three buttons.</li>
                                <li>
                                    Dialogs consist of a header, body, and
                                    footer.
                                </li>
                                <li>
                                    Validate that people's entries are
                                    acceptable before closing the dialog box.
                                    Show an inline validation error near the
                                    field they must correct.
                                </li>
                                <li>
                                    Disruptive dialogs should be used very
                                    sparingly, only when it is critical that
                                    people make a choice or provide information
                                    before they can proceed. Disruptive dialogs
                                    are generally used for irreversible or
                                    potentially destructive tasks. They're
                                    typically paired with an overlay without a
                                    light dismiss.
                                </li>
                            </ul>
                            <h3>Header</h3>
                            <ul>
                                <li>Locks to the top of the dialog.</li>
                                <li>
                                    May include an icon to the left of the
                                    title.
                                </li>
                                <li>
                                    Includes a Close button in the top-right
                                    corner.
                                </li>
                            </ul>
                            <h3>Body</h3>
                            <ul>
                                <li>
                                    The body is a flexible container that can
                                    house a wide variety of components, content,
                                    and formatting.
                                </li>
                                <li>Content can scroll.</li>
                            </ul>
                            <h3>Footer</h3>
                            <ul>
                                <li>
                                    Lock buttons to the bottom of the dialog.
                                </li>
                                <li>
                                    Include one primary button. A secondary
                                    button is optional.
                                </li>
                            </ul>
                            <h2>Content</h2>
                            <h2>Title</h2>
                            <ul>
                                <li>Keep the title as concise as possible.</li>
                                <li>Don't use periods at the end of titles.</li>
                                <li>
                                    This mandatory content should explain the
                                    main information in a clear, concise, and
                                    specific statement or question. For example,
                                    “Delete this file?” instead of “Are you
                                    sure?”
                                </li>
                                <li>
                                    The title shouldn't be a description of the
                                    body content. For example, don't use “Error”
                                    as a title. Instead, use an informative
                                    statement like “Your session ended.”
                                </li>
                                <li>
                                    Use sentence-style capitalization—only
                                    capitalize the first word.
                                </li>
                            </ul>
                            <h2>Body copy (optional)</h2>
                            <ul>
                                <li>Don't restate the title in the body.</li>
                                <li>Use ending punctuation on sentences.</li>
                                <li>
                                    Use actionable language, with the most
                                    important information at the beginning.
                                </li>
                                <li>
                                    Use the optional body content area for
                                    additional info or instructions, if needed.
                                    Only include information needed to help
                                    people make a decision.
                                </li>
                            </ul>
                            <h2>Button labels</h2>
                            <ul>
                                <li>
                                    Write button labels that are specific
                                    responses to the main information in the
                                    title. The title “Delete this file?” could
                                    have buttons labeled “Delete” and “Cancel”.
                                </li>
                                <li>
                                    Be concise. Limit labels to one or two
                                    words. Usually a single verb is best.
                                    Include a noun if there is any room for
                                    interpretation about what the verb means.
                                    For example, “Delete” or “Delete file”.
                                </li>
                            </ul>
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
        size: {
            options: [DialogSize.medium, DialogSize.small],
            control: { type: 'inline-radio' },
        },
        positionStrategy: {
            options: ['absolute', 'fixed'],
            control: { type: 'inline-radio' },
        },
    },
} as ComponentMeta<typeof Dialog>;

const Medium_Story: ComponentStory<typeof Dialog> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                text={'Open dialog'}
                onClick={() => setVisible(true)}
            />
            <Dialog
                visible={visible}
                onClose={() => setVisible(false)}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                {...args}
            />
        </>
    );
};

export const Medium = Medium_Story.bind({});

const Small_Story: ComponentStory<typeof Dialog> = (args) => {
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <PrimaryButton
                disruptive={args.okButtonProps.disruptive}
                text={'Open dialog'}
                onClick={() => setVisible(true)}
            />
            <Dialog
                visible={visible}
                onClose={() => setVisible(false)}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                {...args}
            />
        </>
    );
};

export const Small = Small_Story.bind({});

const DialogHelper_Story: ComponentStory<typeof Dialog> = (args) => (
    <>
        <PrimaryButton
            text={'Open dialog'}
            onClick={() => dialogHelper.show({ ...args })}
        />
    </>
);

export const DialogHelper = DialogHelper_Story.bind({});

const dialogArgs: Object = {
    size: DialogSize.medium,
    actionsClassNames: 'my-dialog-actions-class',
    body: 'Body 2 which is at 16px font size is used here in the body section of the dialog. The dialog body text can wrap to multiple lines.',
    bodyClassNames: 'my-dialog-body-class',
    bodyPadding: true,
    cancelButtonProps: {
        ariaLabel: 'Cancel',
        classNames: 'my-cancel-btn-class',
        'data-test-id': 'my-cancel-btn-test-id',
        iconProps: null,
        id: 'myCancelButton',
        text: 'Cancel',
    },
    'data-test-id': 'my-dialog-test-id',
    dialogClassNames: 'my-dialog-class',
    dialogWrapperClassNames: 'my-dialog-wrapper-class',
    header: 'Header 4 used in this dialog',
    headerClassNames: 'my-dialog-header-class',
    maskClosable: true,
    overlay: true,
    okButtonProps: {
        ariaLabel: 'OK',
        classNames: 'my-ok-btn-class',
        'data-test-id': 'my-ok-btn-test-id',
        iconProps: null,
        id: 'myOkButton',
        text: 'OK',
    },
    parent: document.body,
    zIndex: 1000,
    positionStrategy: 'absolute',
};

Medium.args = {
    ...dialogArgs,
};

Small.args = {
    ...dialogArgs,
    size: DialogSize.small,
    cancelButtonProps: {
        ariaLabel: 'Cancel',
        classNames: 'my-cancel-btn-class',
        'data-test-id': 'my-cancel-btn-test-id',
        disruptive: true,
        iconProps: null,
        id: 'myCancelButton',
        text: 'Cancel',
    },
    okButtonProps: {
        ariaLabel: 'Accept',
        classNames: 'my-accept-btn-class',
        'data-test-id': 'my-accept-btn-test-id',
        disruptive: true,
        iconProps: null,
        id: 'myAcceptButton',
        text: 'Accept',
    },
};

DialogHelper.args = {
    ...dialogArgs,
};
