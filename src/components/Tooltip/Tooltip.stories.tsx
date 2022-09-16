import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ButtonSize, PrimaryButton } from '../Button';
import { Tooltip, TooltipTheme } from './';

export default {
    title: 'Tooltip',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Tooltips</h1>
                            <p>
                                A good tooltip briefly describes unlabeled
                                controls or provides a bit of additional
                                information about labeled controls, when this is
                                useful. It can also help customers navigate the
                                UI by offering additional—not
                                redundant—information about control labels,
                                icons, and links. A tooltip should always add
                                valuable information; use sparingly.
                            </p>
                            <h2>Best practices</h2>
                            <h3>Content</h3>
                            <ul>
                                <li>
                                    Don't use a tooltip to restate a button name
                                    that's already shown in the UI.
                                </li>
                                <li>
                                    When a control or UI element is unlabeled,
                                    use a simple, descriptive noun phrase. For
                                    example: “Upload resume”. Only capitalize
                                    the first word (unless a subsequent word is
                                    a proper noun), and don't use a period.
                                </li>
                                <li>
                                    For a disabled control that could use an
                                    explanation, provide a brief description of
                                    the state in which the control will be
                                    enabled. For example: “This feature is
                                    available for line charts.”
                                </li>
                                <li>
                                    Only use periods for complete sentences.
                                </li>
                            </ul>
                            <label htmlFor="explaination">
                                For a UI label that needs some explanation:
                            </label>
                            <ul id="explaination">
                                <li>
                                    Briefly describe what you can do with the UI
                                    element.
                                </li>
                                <li>
                                    Use the imperative verb form. For example,
                                    "Find text in this file" (not "Finds text in
                                    this file").
                                </li>
                                <li>
                                    Don't include end punctuation unless there
                                    is at least one complete sentence.
                                </li>
                            </ul>
                            <label htmlFor="truncation">
                                For a truncated label or a label that's likely
                                to truncate in some languages:
                            </label>
                            <ul id="truncation">
                                <li>
                                    Provide the untruncated label in the
                                    tooltip.
                                </li>
                                <li>
                                    Don't provide a tooltip if the untruncated
                                    info is provided elsewhere on the page or
                                    flow.
                                </li>
                                <li>
                                    Optional: On another line, provide a
                                    clarifying description, but only if needed.
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
        placement: {
            options: [
                'top',
                'right',
                'bottom',
                'left',
                'top-start',
                'top-end',
                'right-start',
                'right-end',
                'bottom-start',
                'bottom-end',
                'left-start',
                'left-end',
            ],
            control: { type: 'select' },
        },
        positionStrategy: {
            options: ['absolute', 'fixed'],
            control: { type: 'inline-radio' },
        },
        theme: {
            options: ['light', 'dark'],
            control: { type: 'inline-radio' },
        },
        portal: {
            options: [true, false],
            control: { type: 'inline-radio' },
        },
    },
} as ComponentMeta<typeof Tooltip>;

const Tooltip_Story: ComponentStory<typeof Tooltip> = (args) => (
    <Tooltip {...args} />
);

export const Tooltips = Tooltip_Story.bind({});

Tooltips.args = {
    offset: 8,
    theme: TooltipTheme.light,
    content: 'This is a Tooltip.',
    placement: 'bottom',
    disabled: false,
    visibleArrow: true,
    classNames: 'my-tooltip-class',
    openDelay: 0,
    hideAfter: 0,
    tabIndex: 0,
    positionStrategy: 'absolute',
    portal: false,
    portalId: 'my-portal-id',
    portalRoot: null,
    children: (
        <PrimaryButton
            ariaLabel="Show Tooltip"
            size={ButtonSize.Medium}
            text="Show Tooltip"
        />
    ),
};
