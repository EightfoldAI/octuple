import React, { FC } from 'react';
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
                        <hr />
                        <section>
                            <Stories includePrimary />
                        </section>
                    </article>
                </main>
            ),
        },
    },
} as ComponentMeta<typeof Tooltip>;

const Wrapper: FC = ({ children }) => (
    <div
        style={{
            display: 'flex',
            marginBottom: '16px',
            justifyContent: 'space-around',
        }}
    >
        {children}
    </div>
);

export const Tooltips: ComponentStory<typeof Tooltip> = () => (
    <div style={{ margin: 'auto', maxWidth: '60%', marginTop: '50px' }}>
        <Wrapper>
            <Tooltip content={'Light tooltip'}>
                <PrimaryButton
                    ariaLabel="Light bottom"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Light bottom"
                />
            </Tooltip>
            <Tooltip content={'Dark tooltip'} theme={TooltipTheme.dark}>
                <PrimaryButton
                    ariaLabel="Dark bottom"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Dark bottom"
                />
            </Tooltip>
        </Wrapper>
        <Wrapper>
            <Tooltip content={'Light tooltip'} placement={'top'}>
                <PrimaryButton
                    ariaLabel="Light top"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Light top"
                />
            </Tooltip>
            <Tooltip
                content={'Dark tooltip'}
                placement={'top'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Dark top"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Dark top"
                />
            </Tooltip>
        </Wrapper>
        <Wrapper>
            <Tooltip content={'Light tooltip'} placement={'right'}>
                <PrimaryButton
                    ariaLabel="Light right"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Light right"
                />
            </Tooltip>
            <Tooltip
                content={'Dark tooltip'}
                placement={'right'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Dark right"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Dark right"
                />
            </Tooltip>
        </Wrapper>
        <Wrapper>
            <Tooltip
                content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                placement={'left'}
            >
                <PrimaryButton
                    ariaLabel="Light left"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Light left"
                />
            </Tooltip>
            <Tooltip
                content={
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                }
                placement={'left'}
                theme={TooltipTheme.dark}
            >
                <PrimaryButton
                    ariaLabel="Dark left"
                    onClick={_alertClicked}
                    size={ButtonSize.Medium}
                    text="Dark left"
                />
            </Tooltip>
        </Wrapper>
    </div>
);

function _alertClicked(): void {}
