import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Modal, ModalSize } from './';
import { Button, ButtonVariant } from '../Button';
import { IconName } from '../Icon';

export default {
  title: 'Modal',
  component: Modal,
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Modals</h1>
              <p>
                Modals are temporary pop-ups that take focus from the page or
                app and require people to interact with them. Unlike a dialog
                box (Dialog), a modal should be used for hosting lengthy
                content, such as privacy statements or license agreements, or
                for asking people to perform complex or multiple actions, such
                as changing settings.
              </p>
              <h2>Best practices</h2>
              <h3>Layout</h3>
              <ul>
                <li>
                  Use a variable width with a minimum width of 288 pixels.
                </li>
                <li>
                  Use a variable height with a minimum height of 172 pixels.
                </li>
                <li>
                  Center vertically and horizontally in the available space.
                </li>
                <li>
                  Always have at least one focusable element inside a modal.
                </li>
                <li>
                  Disruptive modals should be used very sparingly, only when
                  it's critical for people to make a choice or provide
                  information before they can proceed.
                </li>
                <li>
                  Provide a clear way for people to dismiss the control, such as
                  a Close button, which should always go in the upper right
                  corner.
                </li>
              </ul>
              <h3>Content</h3>
              <ul>
                <li>
                  Use sentence-style capitalization—only capitalize the first
                  word.
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
      options: [
        ModalSize.fullscreen,
        ModalSize.large,
        ModalSize.medium,
        ModalSize.small,
      ],
      control: { type: 'select' },
    },
    theme: {
      options: [
        'red',
        'redOrange',
        'orange',
        'yellow',
        'yellowGreen',
        'green',
        'blueGreen',
        'blue',
        'blueViolet',
        'violet',
        'violetRed',
        'grey',
      ],
      control: 'select',
    },
    positionStrategy: {
      options: ['absolute', 'fixed'],
      control: { type: 'inline-radio' },
    },
  },
} as ComponentMeta<typeof Modal>;

const Modal_Story: ComponentStory<typeof Modal> = (args) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button
        text={'Open modal'}
        onClick={() => setVisible(true)}
        variant={ButtonVariant.Primary}
      />
      <Modal {...args} onClose={() => setVisible(false)} visible={visible} />
    </>
  );
};

const Scrollable_Story: ComponentStory<typeof Modal> = (args) => {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <>
      <Button
        text={'Open modal'}
        onClick={() => setVisible(true)}
        variant={ButtonVariant.Primary}
      />
      <Modal
        {...args}
        onClose={() => setVisible(false)}
        visible={visible}
        actions={
          <>
            <Button
              configContextProps={args.configContextProps}
              gradient={args.gradient}
              onClick={() => setVisible(false)}
              text={'Close'}
              theme={args.theme}
              themeContainerId={args.themeContainerId}
            />
            <Button
              configContextProps={args.configContextProps}
              gradient={args.gradient}
              onClick={() => setVisible(false)}
              text={'OK'}
              theme={args.theme}
              themeContainerId={args.themeContainerId}
              variant={ButtonVariant.Primary}
            />
          </>
        }
      />
    </>
  );
};

export const Small = Modal_Story.bind({});
export const Medium = Modal_Story.bind({});
export const Large = Modal_Story.bind({});
export const XLarge = Modal_Story.bind({});
export const Fullscreen = Modal_Story.bind({});
export const Scrollable = Scrollable_Story.bind({});
export const Header_Actions = Modal_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Small',
  'Medium',
  'Large',
  'XLarge',
  'Fullscreen',
  'Scrollable',
  'Header_Actions',
];

const modalArgs: Object = {
  size: ModalSize.small,
  actionsClassNames: 'my-modal-actions-class',
  body: 'Body 2 which is at 16px font size is used here in the body section of the modal. The modal body text can wrap to multiple lines.',
  bodyClassNames: 'my-modal-body-class',
  bodyPadding: true,
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  gradient: false,
  theme: '',
  themeContainerId: 'my-modal-theme-container',
  firstFocusableSelector: null,
  lastFocusableSelector: null,
  skipFocusableSelectorsFromIndex: null,
  renderContentAlways: true,
  'data-test-id': 'my-modal-test-id',
  header: 'Header 4 used in this modal',
  headerClassNames: 'my-modal-header-class',
  modalClassNames: 'my-modal-class',
  modalWrapperClassNames: 'my-modal-wrapper-class',
  overlay: true,
  parent: document.body,
  zIndex: 1000,
  maskClosable: false,
  positionStrategy: 'absolute',
};

Small.args = {
  ...modalArgs,
};

Medium.args = {
  ...modalArgs,
  size: ModalSize.medium,
};

Large.args = {
  ...modalArgs,
  size: ModalSize.large,
};

XLarge.args = {
  ...modalArgs,
  size: ModalSize.xLarge,
};

Fullscreen.args = {
  ...modalArgs,
  size: ModalSize.fullscreen,
};

Scrollable.args = {
  ...modalArgs,
  size: ModalSize.medium,
  body: (
    <>
      <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        finibus, magna eu dignissim posuere, elit metus eleifend diam, accumsan
        bibendum turpis erat in velit. Nulla vel purus sit amet massa malesuada
        molestie id eget ex. Donec in dictum nibh. Quisque in felis maximus,
        facilisis est vel, porttitor lectus. Morbi in vulputate augue, eu
        finibus augue. Morbi ut eros a arcu accumsan volutpat. Mauris at sem sit
        amet massa lobortis rutrum ac hendrerit erat. Pellentesque diam leo,
        bibendum at risus id, molestie condimentum odio. Duis ultrices leo
        nulla, ac ullamcorper urna pulvinar sit amet. Integer porta finibus
        odio, pretium interdum nunc ullamcorper id. Vestibulum quis urna sit
        amet nisi rhoncus dapibus a sed nibh. Sed vitae faucibus mi, at rutrum
        dui. Pellentesque consectetur neque vel magna consectetur porttitor.
        Quisque ultrices elit et elementum luctus. Suspendisse tristique elit
        maximus sodales ullamcorper. Duis ut orci nec augue auctor pharetra quis
        vel velit. Sed nulla nisl, tincidunt id nunc sed, hendrerit mollis quam.
        Maecenas rhoncus nisl in nisl faucibus finibus. Vestibulum quis blandit
        diam. Integer justo ipsum, tempus nec rutrum euismod, rutrum at magna.
        In hac habitasse platea dictumst. Maecenas quis leo commodo, eleifend ex
        eu, euismod magna. Nulla fermentum pulvinar blandit. Proin elementum
        neque at interdum varius. Maecenas vel augue lacus. Aenean id diam
        cursus, pellentesque tellus vel, eleifend nisl. Nullam lorem lorem,
        ultricies eu euismod id, consectetur et est. Mauris lobortis est nec
        magna gravida, ac pellentesque mauris tincidunt. Nunc ac arcu eu odio
        cursus molestie. Vivamus luctus sollicitudin interdum. Quisque non
        lacinia tortor. In erat neque, faucibus nec velit sed, tristique
        vehicula quam. Duis sit amet varius erat, vel convallis mi. Nullam
        congue at lorem ut tristique. Pellentesque tincidunt dignissim felis
        tincidunt varius. Maecenas molestie tincidunt tellus, in cursus urna
        efficitur sed. Sed volutpat tellus eget elit iaculis placerat. Sed
        tristique arcu id dolor volutpat aliquam. Aliquam pretium convallis ex,
        ut lacinia libero. Curabitur bibendum sed ante sit amet aliquet. Sed
        pulvinar libero quis nulla tempor dapibus. Nullam tristique iaculis
        fermentum. Aenean rutrum eleifend massa fringilla semper. Nunc suscipit
        varius leo, id rutrum justo fermentum vel. Quisque sed ipsum velit.
        Mauris magna sapien, pretium non ligula vel, finibus lobortis urna. Cras
        pretium laoreet eleifend. Morbi ut interdum tellus. Ut imperdiet tellus
        ut quam consectetur consectetur. Quisque at dictum turpis. Nulla ut
        dapibus diam. Mauris eget fringilla ligula. Nunc in tortor quis urna
        finibus ornare. Etiam posuere laoreet mollis. Nam accumsan, diam sit
        amet placerat pharetra, sapien velit congue leo, a varius nulla neque
        vitae arcu. Sed laoreet quam at facilisis volutpat. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Phasellus euismod leo
        ligula, eu finibus purus rhoncus in. Suspendisse in ligula elementum,
        congue est eu, feugiat massa. Duis sem arcu, vulputate id sodales at,
        accumsan eget nibh. Curabitur eu fermentum tellus. Donec ut consequat
        tellus. Nullam ullamcorper volutpat mi, eu dignissim augue convallis
        sed. Praesent id rhoncus felis. Vestibulum placerat sapien vel
        vestibulum vestibulum. Curabitur ultrices orci ut rutrum porta. Aliquam
        erat volutpat. Phasellus vel viverra turpis. Donec consectetur
        ullamcorper erat eget maximus. Maecenas augue massa, sodales vitae
        iaculis eget, consectetur in velit. Sed molestie iaculis sem, nec
        scelerisque tortor sollicitudin id. Quisque lobortis varius ipsum, eget
        scelerisque est mollis a. Pellentesque sodales erat orci, in euismod
        ante vestibulum in. Integer luctus laoreet aliquet. Suspendisse non
        neque velit. Integer rutrum egestas erat, a fermentum nisi consectetur
        sit amet. Nulla placerat pulvinar mi sed gravida. Proin cursus nisl ac
        libero sagittis, tempor tincidunt arcu tempus.
      </span>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
        finibus, magna eu dignissim posuere, elit metus eleifend diam, accumsan
        bibendum turpis erat in velit. Nulla vel purus sit amet massa malesuada
        molestie id eget ex. Donec in dictum nibh. Quisque in felis maximus,
        facilisis est vel, porttitor lectus. Morbi in vulputate augue, eu
        finibus augue. Morbi ut eros a arcu accumsan volutpat. Mauris at sem sit
        amet massa lobortis rutrum ac hendrerit erat. Pellentesque diam leo,
        bibendum at risus id, molestie condimentum odio. Duis ultrices leo
        nulla, ac ullamcorper urna pulvinar sit amet. Integer porta finibus
        odio, pretium interdum nunc ullamcorper id. Vestibulum quis urna sit
        amet nisi rhoncus dapibus a sed nibh. Sed vitae faucibus mi, at rutrum
        dui. Pellentesque consectetur neque vel magna consectetur porttitor.
        Quisque ultrices elit et elementum luctus. Suspendisse tristique elit
        maximus sodales ullamcorper. Duis ut orci nec augue auctor pharetra quis
        vel velit. Sed nulla nisl, tincidunt id nunc sed, hendrerit mollis quam.
        Maecenas rhoncus nisl in nisl faucibus finibus. Vestibulum quis blandit
        diam. Integer justo ipsum, tempus nec rutrum euismod, rutrum at magna.
        In hac habitasse platea dictumst. Maecenas quis leo commodo, eleifend ex
        eu, euismod magna. Nulla fermentum pulvinar blandit. Proin elementum
        neque at interdum varius. Maecenas vel augue lacus. Aenean id diam
        cursus, pellentesque tellus vel, eleifend nisl. Nullam lorem lorem,
        ultricies eu euismod id, consectetur et est. Mauris lobortis est nec
        magna gravida, ac pellentesque mauris tincidunt. Nunc ac arcu eu odio
        cursus molestie. Vivamus luctus sollicitudin interdum. Quisque non
        lacinia tortor. In erat neque, faucibus nec velit sed, tristique
        vehicula quam. Duis sit amet varius erat, vel convallis mi. Nullam
        congue at lorem ut tristique. Pellentesque tincidunt dignissim felis
        tincidunt varius. Maecenas molestie tincidunt tellus, in cursus urna
        efficitur sed. Sed volutpat tellus eget elit iaculis placerat. Sed
        tristique arcu id dolor volutpat aliquam. Aliquam pretium convallis ex,
        ut lacinia libero. Curabitur bibendum sed ante sit amet aliquet. Sed
        pulvinar libero quis nulla tempor dapibus. Nullam tristique iaculis
        fermentum. Aenean rutrum eleifend massa fringilla semper. Nunc suscipit
        varius leo, id rutrum justo fermentum vel. Quisque sed ipsum velit.
        Mauris magna sapien, pretium non ligula vel, finibus lobortis urna. Cras
        pretium laoreet eleifend. Morbi ut interdum tellus. Ut imperdiet tellus
        ut quam consectetur consectetur. Quisque at dictum turpis. Nulla ut
        dapibus diam. Mauris eget fringilla ligula. Nunc in tortor quis urna
        finibus ornare. Etiam posuere laoreet mollis. Nam accumsan, diam sit
        amet placerat pharetra, sapien velit congue leo, a varius nulla neque
        vitae arcu. Sed laoreet quam at facilisis volutpat. Interdum et
        malesuada fames ac ante ipsum primis in faucibus. Phasellus euismod leo
        ligula, eu finibus purus rhoncus in. Suspendisse in ligula elementum,
        congue est eu, feugiat massa. Duis sem arcu, vulputate id sodales at,
        accumsan eget nibh. Curabitur eu fermentum tellus. Donec ut consequat
        tellus. Nullam ullamcorper volutpat mi, eu dignissim augue convallis
        sed. Praesent id rhoncus felis. Vestibulum placerat sapien vel
        vestibulum vestibulum. Curabitur ultrices orci ut rutrum porta. Aliquam
        erat volutpat. Phasellus vel viverra turpis. Donec consectetur
        ullamcorper erat eget maximus. Maecenas augue massa, sodales vitae
        iaculis eget, consectetur in velit. Sed molestie iaculis sem, nec
        scelerisque tortor sollicitudin id. Quisque lobortis varius ipsum, eget
        scelerisque est mollis a. Pellentesque sodales erat orci, in euismod
        ante vestibulum in. Integer luctus laoreet aliquet. Suspendisse non
        neque velit. Integer rutrum egestas erat, a fermentum nisi consectetur
        sit amet. Nulla placerat pulvinar mi sed gravida. Proin cursus nisl ac
        libero sagittis, tempor tincidunt arcu tempus.
      </p>
    </>
  ),
};

Header_Actions.args = {
  ...modalArgs,
  actionButtonOneProps: {
    iconProps: { path: IconName.mdiCogOutline },
  },
  actionButtonTwoProps: {
    iconProps: {
      path: IconName.mdiHistory,
    },
  },
  actionButtonThreeProps: {
    iconProps: { path: IconName.mdiDatabaseArrowDownOutline },
  },
  headerButtonProps: {
    path: IconName.mdiArrowLeftThick,
  },
  size: ModalSize.medium,
};
