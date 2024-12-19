import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, ButtonSize, ButtonVariant } from '../Button';
import { Tooltip, TooltipTheme, TooltipTouchInteraction } from './';
import { Label, LabelSize } from '../Label';
import { Stack } from '../Stack';
import { Truncate } from '../Truncate';

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
                A good tooltip briefly describes unlabeled controls or provides
                a bit of additional information about labeled controls, when
                this is useful. It can also help customers navigate the UI by
                offering additional—not redundant—information about control
                labels, icons, and links. A tooltip should always add valuable
                information; use sparingly.
              </p>
              <h2>Best practices</h2>
              <h3>Content</h3>
              <ul>
                <li>
                  Don't use a tooltip to restate a button name that's already
                  shown in the UI.
                </li>
                <li>
                  When a control or UI element is unlabeled, use a simple,
                  descriptive noun phrase. For example: “Upload resume”. Only
                  capitalize the first word (unless a subsequent word is a
                  proper noun), and don't use a period.
                </li>
                <li>
                  For a disabled control that could use an explanation, provide
                  a brief description of the state in which the control will be
                  enabled. For example: “This feature is available for line
                  charts.”
                </li>
                <li>Only use periods for complete sentences.</li>
              </ul>
              <label htmlFor="explaination">
                For a UI label that needs some explanation:
              </label>
              <ul id="explaination">
                <li>Briefly describe what you can do with the UI element.</li>
                <li>
                  Use the imperative verb form. For example, "Find text in this
                  file" (not "Finds text in this file").
                </li>
                <li>
                  Don't include end punctuation unless there is at least one
                  complete sentence.
                </li>
              </ul>
              <label htmlFor="truncation">
                For a truncated label or a label that's likely to truncate in
                some languages:
              </label>
              <ul id="truncation">
                <li>Provide the untruncated label in the tooltip.</li>
                <li>
                  Don't provide a tooltip if the untruncated info is provided
                  elsewhere on the page or flow.
                </li>
                <li>
                  Optional: On another line, provide a clarifying description,
                  but only if needed.
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
    trigger: {
      options: ['click', 'hover', 'contextmenu'],
      control: { type: 'radio' },
    },
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
    triggerAbove: {
      options: [true, false],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Tooltip>;

const Tooltip_Story: ComponentStory<typeof Tooltip> = (args) => (
  <Tooltip {...args} />
);

const Truncation_Detection_Story: ComponentStory<typeof Tooltip> = (args) => {
  const [truncationStatus, setTruncationStatus] = useState<
    Record<string, boolean>
  >({});
  const handleTruncationChange = (id: string, isTruncated: boolean) => {
    setTruncationStatus((prev: Record<string, boolean>) => ({
      ...prev,
      [id]: isTruncated,
    }));
  };
  return (
    <Stack direction="vertical" flexGap="xl">
      <Stack direction="vertical" flexGap="xs">
        <Label
          size={LabelSize.Large}
          text="With no truncation the Tooltip disables itself using enableTruncationDetection"
        />
        <Tooltip
          {...args}
          content="Short content"
          disabled={!truncationStatus['truncate1']}
        >
          <Truncate
            id="truncate1"
            onTruncateChange={handleTruncationChange}
            text="Short content"
          />
        </Tooltip>
      </Stack>
      <Stack direction="vertical" flexGap="xs">
        <Label
          size={LabelSize.Large}
          text="With truncation the Tooltip enables itself"
        />
        <Tooltip
          {...args}
          content="Very long content that will definitely be truncated using enableTruncationDetection and another very long content that will definitely be truncated using enableTruncationDetection"
          disabled={!truncationStatus['truncate2']}
          maxWidth={300}
          width={300}
        >
          <Truncate
            id="truncate2"
            onTruncateChange={handleTruncationChange}
            text="Very long content that will definitely be truncated using enableTruncationDetection and another very long content that will definitely be truncated using enableTruncationDetection"
          />
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export const Basic = Tooltip_Story.bind({});
export const Truncation_Detection = Truncation_Detection_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = ['Basic', 'Truncation_Detection'];

Basic.args = {
  offset: 8,
  theme: TooltipTheme.light,
  content: 'This is a Tooltip.',
  closeOnOutsideClick: true,
  closeOnReferenceClick: true,
  closeOnTooltipClick: false,
  placement: 'bottom',
  disableContextMenu: false,
  disabled: false,
  visibleArrow: true,
  animate: true,
  bordered: false,
  dropShadow: true,
  id: 'myTooltipId',
  classNames: 'my-tooltip-class',
  openDelay: 0,
  hideAfter: 200,
  tabIndex: -1,
  trigger: 'hover',
  triggerAbove: false,
  touchInteraction: TooltipTouchInteraction.TapAndHold,
  positionStrategy: 'absolute',
  portal: false,
  portalId: 'my-portal-id',
  portalRoot: null,
  children: (
    <Button
      onClick={() => {
        console.log('clicked');
      }}
      size={ButtonSize.Medium}
      text="Show Tooltip"
      variant={ButtonVariant.Primary}
    />
  ),
  height: null,
};

Truncation_Detection.args = {
  offset: 8,
  theme: TooltipTheme.light,
  closeOnOutsideClick: true,
  closeOnReferenceClick: true,
  closeOnTooltipClick: false,
  placement: 'bottom',
  disableContextMenu: false,
  disabled: false,
  visibleArrow: true,
  animate: true,
  bordered: false,
  dropShadow: true,
  id: 'myTooltipId',
  classNames: 'my-tooltip-class',
  openDelay: 0,
  hideAfter: 200,
  tabIndex: -1,
  trigger: 'hover',
  triggerAbove: false,
  touchInteraction: TooltipTouchInteraction.TapAndHold,
  portal: false,
  portalId: 'my-portal-id',
  portalRoot: null,
  height: null,
};
