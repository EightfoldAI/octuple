import React from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card, CardType } from './';
import { IconName } from '../Icon';
import { Avatar } from '../Avatar';
import { Pill } from '../Pills';
import { ButtonShape, SecondaryButton } from '../Button';

export default {
  title: 'Card',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Card</h1>
              <p>
                A card can be used to display content. The content may consist
                of multiple elements in its header, body and footer.
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
} as ComponentMeta<typeof Card>;

const Card_Story: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const BaseCard = Card_Story.bind({});
export const CustomCard = Card_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = ['BaseCard', 'CustomCard'];

const baseCardArgs: Object = {
  dropShadow: true,
  style: {},
  classNames: 'my-card-class',
  icon: IconName.mdiInformation,
  type: CardType.list,
  headerButtonProps: {
    iconProps: {
      path: IconName.mdiBookmark,
    },
  },
  headerTitle: <div>Senior UX Designer</div>,
  bodyListOneProps: {
    iconProps: {
      path: IconName.mdiCheck,
      color: 'green',
      style: { marginRight: '2px' },
    },
    type: 'list',
    contents: [
      {
        showIcon: true,
        label: 'Matched Skill',
      },
      {
        showIcon: true,
        label: 'Matched Skill',
      },
      {
        showIcon: true,
        label: 'Matched Skill',
      },
      {
        showIcon: false,
        label: 'Other Skill',
      },
      {
        showIcon: false,
        label: 'Other Skill',
      },
    ],
  },
  bodyListTwoProps: {
    iconProps: {
      path: IconName.mdiCheck,
      color: 'green',
    },
    type: 'pills',
    contents: [
      {
        showIcon: false,
        label: 'Department',
      },
      {
        showIcon: false,
        label: 'Urgent Hire',
      },
    ],
  },
  bodyListOnePillProps: {
    theme: 'grey',
  },
  bodyListTwoPillProps: {
    theme: 'grey',
  },
  subHeaderSeparatorIcon: IconName.mdiCircle,
  subHeaderProps: ['Company', 'Job Location'],
  footerProps: [
    {
      iconProps: {
        path: IconName.mdiWeb,
        color: 'blue',
        style: { marginRight: '2px' },
      },
      text: 'Strong match',
    },
    {
      iconProps: {
        path: IconName.mdiCheck,
        color: 'green',
        style: { marginRight: '2px' },
      },
      text: 'Applied',
    },
  ],
};

BaseCard.args = {
  ...baseCardArgs,
};

CustomCard.args = {
  ...baseCardArgs,
  width: '360px',
  height: '520px',
  children: (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <Avatar
        theme="green"
        children="AB"
        type="round"
        size="80px"
        fontSize="36px"
        style={{ margin: '12px auto' }}
      />
      <div
        style={{
          marginBottom: '12px',
          fontSize: '24px',
          fontWeight: '600',
        }}
      >
        John Doe
      </div>
      <div
        style={{
          marginBottom: '34px',
          fontSize: '18px',
          fontWeight: '400',
        }}
      >
        Senior Quality Engineer
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '24px',
          fontSize: '18px',
          fontWeight: '400',
        }}
      >
        <div>
          <div style={{ opacity: '50%', marginBottom: '5px' }}>
            Time in role
          </div>
          <div>2.5 y</div>
        </div>
        <div>
          <div style={{ opacity: '50%', marginBottom: '5px' }}>
            Skills | Skill gaps
          </div>
          <div>73 | 0</div>
        </div>
      </div>
      <div
        style={{
          textAlign: 'start',
          marginBottom: '34px',
          fontSize: '18px',
          fontWeight: '400',
          marginLeft: '35px',
        }}
      >
        <div
          style={{
            textAlign: 'start',
            marginBottom: '8px',
            fontSize: '18px',
            fontWeight: '400',
          }}
        >
          Last manager assessment
        </div>
        <div>Oct 1, 2022</div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          marginBottom: '48px',
        }}
      >
        <Pill label="Leadership Potential" theme="blueViolet" />
        <Pill label="High Risk" theme="violetRed" />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <SecondaryButton text="Add Development Plan" />
        <SecondaryButton
          iconProps={{ path: IconName.mdiDotsVertical }}
          shape={ButtonShape.Round}
        />
      </div>
    </div>
  ),
};
