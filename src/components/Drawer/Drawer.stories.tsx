import React, { useMemo, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Drawer, DrawerVariant } from './';
import { Button, ButtonVariant, ButtonWidth } from '../Button';
import { IconName } from '../Icon';

export default {
  title: 'Drawer',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Drawer</h1>
              <p>TBD</p>
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
  },
} as ComponentMeta<typeof Drawer>;

const Default_Story: ComponentStory<typeof Drawer> = (args) => {
  const [visible, setVisible] = useState<boolean>(args.visible);
  useMemo(() => setVisible(args.visible), [args.visible]);
  const onClose = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (!visible) {
      return;
    }
    setVisible(false);
  };
  const onOpen = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (visible) {
      return;
    }
    setVisible(true);
  };
  return (
    <>
      <Button
        onClick={visible ? (e) => onClose(e) : (e) => onOpen(e)}
        text={visible ? 'Close drawer' : 'Open drawer'}
        variant={ButtonVariant.Primary}
      />
      <Drawer
        {...args}
        footer={
          <div>
            <Button
              configContextProps={args.configContextProps}
              buttonWidth={ButtonWidth.fill}
              gradient={args.gradient}
              onClick={(e) => onClose(e)}
              text="Close"
              theme={args.theme}
              themeContainerId={args.themeContainerId}
              variant={ButtonVariant.Primary}
            />
          </div>
        }
        visible={visible}
        onVisibleChange={(visible) => setVisible(visible)}
      />
    </>
  );
};

const Hint_Story: ComponentStory<typeof Drawer> = (args) => {
  const [visible, setVisible] = useState<boolean>(args.visible);
  useMemo(() => setVisible(args.visible), [args.visible]);
  const onClose = (_event: React.MouseEvent<HTMLButtonElement>) => {
    if (!visible) {
      return;
    }
    setVisible(false);
  };
  return (
    <Drawer
      {...args}
      footer={
        <div>
          <Button
            configContextProps={args.configContextProps}
            buttonWidth={ButtonWidth.fill}
            gradient={args.gradient}
            onClick={(e) => onClose(e)}
            text="Close"
            theme={args.theme}
            themeContainerId={args.themeContainerId}
            variant={ButtonVariant.Primary}
          />
        </div>
      }
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
    />
  );
};

export const Default = Default_Story.bind({});
export const Header_Actions = Default_Story.bind({});
export const Hint = Hint_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = ['Default', 'Header_Actions', 'Hint'];

const drawerArgs: Object = {
  configContextProps: {
    noGradientContext: false,
    noThemeContext: false,
  },
  theme: '',
  themeContainerId: 'my-drawer-theme-container',
  gradient: false,
  maskClosable: false,
  overlay: false,
  children: (
    <div
      style={{
        color: 'var(--grey-background3-color)',
        fontSize: '18px',
        fontWeight: 500,
        lineHeight: '24px',
        textAlign: 'center',
      }}
    >
      Replace this with your own page level component or DS component
    </div>
  ),
  id: 'myDrawer',
  variant: DrawerVariant.Default,
  visible: false,
  footer: 'This is a footer',
  bodyPadding: true,
  headerPadding: true,
  scrollLock: true,
  firstFocusableSelector: null,
  lastFocusableSelector: null,
  skipFocusableSelectorsFromIndex: null,
  renderContentAlways: true,
  title: 'Header text',
  subTitle: 'Supporting text',
  zIndex: 1000,
  drawerStyle: {},
  parent: document.body,
  drawerWrapperClassNames: 'my-drawer-wrapper-class',
  drawerClassNames: 'my-drawer-class',
  headerClassNames: 'my-drawer-header-class',
  bodyClassNames: 'my-drawer-body-class',
  footerClassNames: 'my-drawer-footer-class',
  autoFocus: true,
  focusTrap: true,
  'data-testid': 'my-drawer-test-id',
};

Default.args = {
  ...drawerArgs,
};

Header_Actions.args = {
  ...drawerArgs,
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
  children: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
      finibus, magna eu dignissim posuere, elit metus eleifend diam, accumsan
      bibendum turpis erat in velit. Nulla vel purus sit amet massa malesuada
      molestie id eget ex. Donec in dictum nibh. Quisque in felis maximus,
      facilisis est vel, porttitor lectus. Morbi in vulputate augue, eu finibus
      augue. Morbi ut eros a arcu accumsan volutpat. Mauris at sem sit amet
      massa lobortis rutrum ac hendrerit erat. Pellentesque diam leo, bibendum
      at risus id, molestie condimentum odio. Duis ultrices leo nulla, ac
      ullamcorper urna pulvinar sit amet. Integer porta finibus odio, pretium
      interdum nunc ullamcorper id. Vestibulum quis urna sit amet nisi rhoncus
      dapibus a sed nibh. Sed vitae faucibus mi, at rutrum dui. Pellentesque
      consectetur neque vel magna consectetur porttitor. Quisque ultrices elit
      et elementum luctus. Suspendisse tristique elit maximus sodales
      ullamcorper. Duis ut orci nec augue auctor pharetra quis vel velit. Sed
      nulla nisl, tincidunt id nunc sed, hendrerit mollis quam. Maecenas rhoncus
      nisl in nisl faucibus finibus. Vestibulum quis blandit diam. Integer justo
      ipsum, tempus nec rutrum euismod, rutrum at magna. In hac habitasse platea
      dictumst. Maecenas quis leo commodo, eleifend ex eu, euismod magna. Nulla
      fermentum pulvinar blandit. Proin elementum neque at interdum varius.
      Maecenas vel augue lacus. Aenean id diam cursus, pellentesque tellus vel,
      eleifend nisl. Nullam lorem lorem, ultricies eu euismod id, consectetur et
      est. Mauris lobortis est nec magna gravida, ac pellentesque mauris
      tincidunt. Nunc ac arcu eu odio cursus molestie. Vivamus luctus
      sollicitudin interdum. Quisque non lacinia tortor. In erat neque, faucibus
      nec velit sed, tristique vehicula quam. Duis sit amet varius erat, vel
      convallis mi. Nullam congue at lorem ut tristique. Pellentesque tincidunt
      dignissim felis tincidunt varius. Maecenas molestie tincidunt tellus, in
      cursus urna efficitur sed. Sed volutpat tellus eget elit iaculis placerat.
      Sed tristique arcu id dolor volutpat aliquam. Aliquam pretium convallis
      ex, ut lacinia libero. Curabitur bibendum sed ante sit amet aliquet. Sed
      pulvinar libero quis nulla tempor dapibus. Nullam tristique iaculis
      fermentum. Aenean rutrum eleifend massa fringilla semper. Nunc suscipit
      varius leo, id rutrum justo fermentum vel. Quisque sed ipsum velit. Mauris
      magna sapien, pretium non ligula vel, finibus lobortis urna. Cras pretium
      laoreet eleifend. Morbi ut interdum tellus. Ut imperdiet tellus ut quam
      consectetur consectetur. Quisque at dictum turpis. Nulla ut dapibus diam.
      Mauris eget fringilla ligula. Nunc in tortor quis urna finibus ornare.
      Etiam posuere laoreet mollis. Nam accumsan, diam sit amet placerat
      pharetra, sapien velit congue leo, a varius nulla neque vitae arcu. Sed
      laoreet quam at facilisis volutpat. Interdum et malesuada fames ac ante
      ipsum primis in faucibus. Phasellus euismod leo ligula, eu finibus purus
      rhoncus in. Suspendisse in ligula elementum, congue est eu, feugiat massa.
      Duis sem arcu, vulputate id sodales at, accumsan eget nibh. Curabitur eu
      fermentum tellus. Donec ut consequat tellus. Nullam ullamcorper volutpat
      mi, eu dignissim augue convallis sed. Praesent id rhoncus felis.
      Vestibulum placerat sapien vel vestibulum vestibulum. Curabitur ultrices
      orci ut rutrum porta. Aliquam erat volutpat. Phasellus vel viverra turpis.
      Donec consectetur ullamcorper erat eget maximus. Maecenas augue massa,
      sodales vitae iaculis eget, consectetur in velit. Sed molestie iaculis
      sem, nec scelerisque tortor sollicitudin id. Quisque lobortis varius
      ipsum, eget scelerisque est mollis a. Pellentesque sodales erat orci, in
      euismod ante vestibulum in. Integer luctus laoreet aliquet. Suspendisse
      non neque velit. Integer rutrum egestas erat, a fermentum nisi consectetur
      sit amet. Nulla placerat pulvinar mi sed gravida. Proin cursus nisl ac
      libero sagittis, tempor tincidunt arcu tempus.
    </>
  ),
};

Hint.args = {
  ...drawerArgs,
  maskClosable: true,
  overlay: true,
  variant: DrawerVariant.Hint,
};
