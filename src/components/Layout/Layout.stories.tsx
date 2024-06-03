import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Layout from './';
import { Navbar, NavbarContent } from '../Navbar';
import { Icon, IconName } from '../Icon';
import { Button, ButtonSize, ButtonVariant } from '../Button';
import { Link } from '../Link';
import { Dropdown } from '../Dropdown';
import { Avatar } from '../Avatar';
import { List } from '../List';
import { Stack } from '../Stack';

const { Article, Aside, Content, Footer, Header, Nav, Section } = Layout;

export default {
  title: 'Layout',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Layout</h1>
              <p>
                The page layout, font and UI chrome is handled by this
                component.
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
} as ComponentMeta<typeof Layout>;

const sampleList: string[] = [1, 2, 3, 4, 5].map((i) => `User ${i}`);

const Overlay = () => {
  return (
    <List
      items={sampleList}
      layout="vertical"
      renderItem={(item: string) => <p style={{ margin: '8px 0' }}>{item}</p>}
    />
  );
};

const ProfileDropdown = () => {
  const [visible, setVisibility] = useState(false);
  return (
    <Dropdown
      onVisibleChange={(isVisible) => setVisibility(isVisible)}
      overlay={<Overlay />}
      dropdownStyle={{ color: '#212121' }}
    >
      <div style={{ display: 'flex' }}>
        <Avatar
          src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"
          alt="random profile image"
          type="round"
        />
        <Icon path={IconName.mdiChevronDown} rotate={visible ? 180 : 0} />
      </div>
    </Dropdown>
  );
};
const getNavBar = (): JSX.Element => (
  <Navbar style={{ padding: 0 }}>
    <NavbarContent>
      <Link
        href="https://www.twitter.com"
        target="_self"
        variant="default"
        style={{ padding: '8px 20px', color: 'inherit' }}
      >
        Twitter
      </Link>
      <Link
        href="https://www.facebook.com"
        target="_self"
        variant="default"
        style={{ padding: '8px 20px', color: 'inherit' }}
      >
        Facebook
      </Link>
    </NavbarContent>
    <NavbarContent>
      <ProfileDropdown />
    </NavbarContent>
  </Navbar>
);

const Basic_Story: ComponentStory<typeof Layout> = (args) => (
  <Stack direction="vertical" flexGap="xxxl" justify="center" fullWidth>
    <Layout {...args}>
      <Nav>{getNavBar()}</Nav>
      <Header style={{ border: '1px solid #f6f7f8' }}>
        <h1>Header</h1>
      </Header>
      <Content
        style={{
          border: '1px solid #f6f7f8',
          lineHeight: '120px',
          minHeight: '120px',
        }}
      >
        <Section>
          <Article>
            <p style={{ lineHeight: '120px' }}>
              Content may be nested like so: Content, Section, then elements.
            </p>
          </Article>
        </Section>
      </Content>
      <Footer
        style={{
          border: '1px solid #f6f7f8',
          lineHeight: '48px',
          height: '80px',
        }}
      >
        Footer
      </Footer>
    </Layout>
    <Layout {...args}>
      <Header style={{ border: '1px solid #f6f7f8' }}>
        <h1>Header</h1>
      </Header>
      <Nav>{getNavBar()}</Nav>
      <Layout {...args}>
        <Aside
          style={{
            border: '1px solid #f6f7f8',
            lineHeight: '120px',
            minHeight: '120px',
          }}
        >
          Aside
        </Aside>
        <Section>
          <Article>
            <p style={{ lineHeight: '120px' }}>
              Content may be nested like so: Content, Section, then elements.
            </p>
          </Article>
        </Section>
      </Layout>
      <Footer
        style={{
          border: '1px solid #f6f7f8',
          lineHeight: '48px',
          height: '80px',
        }}
      >
        Footer
      </Footer>
    </Layout>
    <Layout {...args}>
      <Nav>{getNavBar()}</Nav>
      <Header style={{ border: '1px solid #f6f7f8' }}>
        <h1>Header</h1>
      </Header>
      <Layout {...args}>
        <Section>
          <Article>
            <p style={{ lineHeight: '120px' }}>
              Content may be nested like so: Content, Section, then elements.
            </p>
          </Article>
        </Section>
        <Aside
          style={{
            border: '1px solid #f6f7f8',
            lineHeight: '120px',
            minHeight: '120px',
          }}
        >
          Aside
        </Aside>
      </Layout>
      <Footer
        style={{
          border: '1px solid #f6f7f8',
          lineHeight: '48px',
          height: '80px',
        }}
      >
        Footer
      </Footer>
    </Layout>
    <Layout {...args}>
      <Aside style={{ border: '1px solid #f6f7f8', lineHeight: '352px' }}>
        Aside
      </Aside>
      <Layout {...args}>
        <Nav>{getNavBar()}</Nav>
        <Header style={{ border: '1px solid #f6f7f8' }}>
          <h1>Header</h1>
        </Header>
        <Content>
          <Section>
            <Article>
              <p style={{ lineHeight: '120px' }}>
                Content may be nested like so: Content, Section, then elements.
              </p>
            </Article>
          </Section>
        </Content>
        <Footer
          style={{
            border: '1px solid #f6f7f8',
            lineHeight: '48px',
            height: '80px',
          }}
        >
          Footer
        </Footer>
      </Layout>
    </Layout>
  </Stack>
);

const Fixed_Navbar_Story: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args} style={{ height: '294px' }}>
    <Nav
      style={{
        position: 'absolute',
        width: 'calc(100% - 32px)',
        zIndex: 1,
      }} // Update position selector value to 'fixed', will break docs view in Storybook, so use 'absolute'.
    >
      {getNavBar()}
    </Nav>
    <Layout
      {...args}
      style={{ marginTop: 60, height: '394px', overflowY: 'auto' }}
    >
      <Header style={{ border: '1px solid #f6f7f8', textAlign: 'center' }}>
        <h1>Header</h1>
      </Header>
      <Content
        style={{
          border: '1px solid #f6f7f8',
          lineHeight: '220px',
          minHeight: '220px',
          textAlign: 'center',
        }}
      >
        <Section>
          <Article>
            <p style={{ lineHeight: '220px' }}>
              Content may be nested like so: Content, Section, then elements.
            </p>
          </Article>
        </Section>
      </Content>
      <Footer
        style={{
          border: '1px solid #f6f7f8',
          lineHeight: '48px',
          height: '80px',
          textAlign: 'center',
        }}
      >
        Footer
      </Footer>
    </Layout>
  </Layout>
);

const Fixed_Aside_Story: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args}>
    <Aside
      style={{
        border: '1px solid #f6f7f8',
        overflow: 'auto',
        position: 'absolute', // Update position selector value to 'fixed', will break docs view in Storybook, so use 'absolute'.
        left: 0,
        top: 0,
        bottom: 0,
        paddingTop: 60,
      }}
    >
      Fixed Aside
    </Aside>
    <Layout {...args} style={{ marginLeft: 200 }}>
      <Header style={{ border: '1px solid #f6f7f8' }}>
        <h1>Header</h1>
      </Header>
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Section>
          <Article>
            <p style={{ textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et
              eros aliquet, lacinia velit id, volutpat velit. Ut porttitor,
              nulla quis malesuada vulputate, tortor nisl lacinia velit, a
              vulputate leo sem mattis neque. Nam facilisis, risus quis tempus
              lacinia, mi dolor rhoncus mi, a pulvinar urna enim sit amet odio.
              Nam aliquam pellentesque neque, a auctor velit ultricies ut. Nunc
              posuere elit vel molestie convallis. Aliquam erat volutpat. Fusce
              sit amet tempus libero. Morbi lobortis elit eu dolor eleifend
              hendrerit. Nullam at justo mattis, consequat nisi ut, cursus
              lectus. Nulla ac enim at quam pretium bibendum vitae eu dui. Nam
              sollicitudin mi et mollis pulvinar. Mauris vel mi nisi. Nulla
              pharetra massa vel efficitur ullamcorper. Nulla suscipit sapien in
              ultrices condimentum. Phasellus consectetur euismod sagittis.
              Suspendisse arcu mi, dignissim at libero eget, rutrum commodo
              tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Aliquam molestie, libero ac aliquam facilisis, urna nunc rhoncus
              nisl, vel faucibus elit tellus nec velit. Morbi tempor in risus
              vitae finibus. Vestibulum congue ut sapien hendrerit tincidunt.
              Integer scelerisque nisl eu orci mattis varius non at ante.
              Vivamus finibus varius tellus vel pretium. Nullam ipsum nunc,
              volutpat sit amet consectetur ac, lacinia vel massa. Praesent odio
              turpis, dictum sit amet iaculis id, scelerisque vel erat. Aliquam
              mollis malesuada nibh, quis convallis massa mattis id. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Pellentesque
              imperdiet mattis urna id cursus. Praesent sit amet pharetra
              libero, sed efficitur nibh. Mauris aliquam posuere egestas. Fusce
              tristique congue aliquet. Praesent pulvinar consectetur tempor.
              Donec justo mauris, finibus sed libero hendrerit, consectetur
              consequat dui. Fusce mauris augue, vestibulum nec consectetur id,
              fermentum sed felis. Pellentesque commodo magna sit amet lacus
              placerat, vel viverra urna convallis. Donec enim nisi, laoreet in
              mollis eu, lobortis vel tortor. Proin sit amet velit ut sem
              aliquet faucibus. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Donec luctus, ligula
              bibendum auctor condimentum, augue tortor viverra orci, ac
              hendrerit enim nulla vehicula orci. Fusce id turpis arcu. Sed
              maximus erat ligula, vitae molestie est accumsan ut. Sed eu
              scelerisque quam. Mauris vel massa quis elit rutrum volutpat non
              sit amet enim. Nunc rutrum metus nunc, eu fermentum nunc auctor
              at. Nullam commodo magna vitae porttitor porta. Cras egestas nisi
              ut arcu aliquam molestie sed ut mauris. Vestibulum eu risus et
              nibh varius commodo ut ut quam. Phasellus a fringilla erat.
              Quisque turpis magna, lacinia a dignissim vel, convallis in orci.
              Phasellus ac lorem viverra, efficitur massa in, ullamcorper leo.
              Donec et tempor neque. Suspendisse at sem velit. Phasellus pretium
              tincidunt felis nec viverra. Donec dapibus condimentum quam,
              dapibus pretium erat feugiat non. Aliquam at enim turpis. Aenean
              ac nulla lobortis, vulputate erat vel, semper orci. Mauris porta
              at arcu quis elementum. Morbi nec gravida odio. Suspendisse sed
              cursus neque, vitae euismod massa. Donec non velit pretium,
              posuere nisi id, molestie velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nulla et eros aliquet, lacinia velit
              id, volutpat velit. Ut porttitor, nulla quis malesuada vulputate,
              tortor nisl lacinia velit, a vulputate leo sem mattis neque. Nam
              facilisis, risus quis tempus lacinia, mi dolor rhoncus mi, a
              pulvinar urna enim sit amet odio. Nam aliquam pellentesque neque,
              a auctor velit ultricies ut. Nunc posuere elit vel molestie
              convallis. Aliquam erat volutpat. Fusce sit amet tempus libero.
              Morbi lobortis elit eu dolor eleifend hendrerit. Nullam at justo
              mattis, consequat nisi ut, cursus lectus. Nulla ac enim at quam
              pretium bibendum vitae eu dui. Nam sollicitudin mi et mollis
              pulvinar. Mauris vel mi nisi. Nulla pharetra massa vel efficitur
              ullamcorper. Nulla suscipit sapien in ultrices condimentum.
              Phasellus consectetur euismod sagittis. Suspendisse arcu mi,
              dignissim at libero eget, rutrum commodo tortor. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Aliquam molestie, libero ac
              aliquam facilisis, urna nunc rhoncus nisl, vel faucibus elit
              tellus nec velit. Morbi tempor in risus vitae finibus. Vestibulum
              congue ut sapien hendrerit tincidunt. Integer scelerisque nisl eu
              orci mattis varius non at ante. Vivamus finibus varius tellus vel
              pretium. Nullam ipsum nunc, volutpat sit amet consectetur ac,
              lacinia vel massa. Praesent odio turpis, dictum sit amet iaculis
              id, scelerisque vel erat. Aliquam mollis malesuada nibh, quis
              convallis massa mattis id. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Pellentesque imperdiet mattis urna id cursus.
              Praesent sit amet pharetra libero, sed efficitur nibh. Mauris
              aliquam posuere egestas. Fusce tristique congue aliquet. Praesent
              pulvinar consectetur tempor. Donec justo mauris, finibus sed
              libero hendrerit, consectetur consequat dui. Fusce mauris augue,
              vestibulum nec consectetur id, fermentum sed felis. Pellentesque
              commodo magna sit amet lacus placerat, vel viverra urna convallis.
              Donec enim nisi, laoreet in mollis eu, lobortis vel tortor. Proin
              sit amet velit ut sem aliquet faucibus. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec luctus, ligula bibendum auctor condimentum, augue tortor
              viverra orci, ac hendrerit enim nulla vehicula orci. Fusce id
              turpis arcu. Sed maximus erat ligula, vitae molestie est accumsan
              ut. Sed eu scelerisque quam. Mauris vel massa quis elit rutrum
              volutpat non sit amet enim. Nunc rutrum metus nunc, eu fermentum
              nunc auctor at. Nullam commodo magna vitae porttitor porta. Cras
              egestas nisi ut arcu aliquam molestie sed ut mauris. Vestibulum eu
              risus et nibh varius commodo ut ut quam. Phasellus a fringilla
              erat. Quisque turpis magna, lacinia a dignissim vel, convallis in
              orci. Phasellus ac lorem viverra, efficitur massa in, ullamcorper
              leo. Donec et tempor neque. Suspendisse at sem velit. Phasellus
              pretium tincidunt felis nec viverra. Donec dapibus condimentum
              quam, dapibus pretium erat feugiat non. Aliquam at enim turpis.
              Aenean ac nulla lobortis, vulputate erat vel, semper orci. Mauris
              porta at arcu quis elementum. Morbi nec gravida odio. Suspendisse
              sed cursus neque, vitae euismod massa. Donec non velit pretium,
              posuere nisi id, molestie velit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nulla et eros aliquet, lacinia velit
              id, volutpat velit. Ut porttitor, nulla quis malesuada vulputate,
              tortor nisl lacinia velit, a vulputate leo sem mattis neque. Nam
              facilisis, risus quis tempus lacinia, mi dolor rhoncus mi, a
              pulvinar urna enim sit amet odio. Nam aliquam pellentesque neque,
              a auctor velit ultricies ut. Nunc posuere elit vel molestie
              convallis. Aliquam erat volutpat. Fusce sit amet tempus libero.
              Morbi lobortis elit eu dolor eleifend hendrerit. Nullam at justo
              mattis, consequat nisi ut, cursus lectus. Nulla ac enim at quam
              pretium bibendum vitae eu dui. Nam sollicitudin mi et mollis
              pulvinar. Mauris vel mi nisi. Nulla pharetra massa vel efficitur
              ullamcorper. Nulla suscipit sapien in ultrices condimentum.
              Phasellus consectetur euismod sagittis. Suspendisse arcu mi,
              dignissim at libero eget, rutrum commodo tortor. Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Aliquam molestie, libero ac
              aliquam facilisis, urna nunc rhoncus nisl, vel faucibus elit
              tellus nec velit. Morbi tempor in risus vitae finibus. Vestibulum
              congue ut sapien hendrerit tincidunt. Integer scelerisque nisl eu
              orci mattis varius non at ante. Vivamus finibus varius tellus vel
              pretium. Nullam ipsum nunc, volutpat sit amet consectetur ac,
              lacinia vel massa. Praesent odio turpis, dictum sit amet iaculis
              id, scelerisque vel erat. Aliquam mollis malesuada nibh, quis
              convallis massa mattis id. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Pellentesque imperdiet mattis urna id cursus.
              Praesent sit amet pharetra libero, sed efficitur nibh. Mauris
              aliquam posuere egestas. Fusce tristique congue aliquet. Praesent
              pulvinar consectetur tempor. Donec justo mauris, finibus sed
              libero hendrerit, consectetur consequat dui. Fusce mauris augue,
              vestibulum nec consectetur id, fermentum sed felis. Pellentesque
              commodo magna sit amet lacus placerat, vel viverra urna convallis.
              Donec enim nisi, laoreet in mollis eu, lobortis vel tortor. Proin
              sit amet velit ut sem aliquet faucibus. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec luctus, ligula bibendum auctor condimentum, augue tortor
              viverra orci, ac hendrerit enim nulla vehicula orci. Fusce id
              turpis arcu. Sed maximus erat ligula, vitae molestie est accumsan
              ut. Sed eu scelerisque quam. Mauris vel massa quis elit rutrum
              volutpat non sit amet enim. Nunc rutrum metus nunc, eu fermentum
              nunc auctor at. Nullam commodo magna vitae porttitor porta. Cras
              egestas nisi ut arcu aliquam molestie sed ut mauris. Vestibulum eu
              risus et nibh varius commodo ut ut quam. Phasellus a fringilla
              erat. Quisque turpis magna, lacinia a dignissim vel, convallis in
              orci. Phasellus ac lorem viverra, efficitur massa in, ullamcorper
              leo. Donec et tempor neque. Suspendisse at sem velit. Phasellus
              pretium tincidunt felis nec viverra. Donec dapibus condimentum
              quam, dapibus pretium erat feugiat non. Aliquam at enim turpis.
              Aenean ac nulla lobortis, vulputate erat vel, semper orci. Mauris
              porta at arcu quis elementum. Morbi nec gravida odio. Suspendisse
              sed cursus neque, vitae euismod massa. Donec non velit pretium,
              posuere nisi id, molestie velit.
            </p>
          </Article>
        </Section>
      </Content>
      <Footer
        style={{
          border: '1px solid #f6f7f8',
          lineHeight: '48px',
          height: '80px',
        }}
      >
        Footer
      </Footer>
    </Layout>
  </Layout>
);

const Responsive_Story: ComponentStory<typeof Layout> = (args) => (
  <Layout {...args}>
    <Aside
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{ border: '1px solid #f6f7f8', lineHeight: '352px' }}
    >
      Aside
    </Aside>
    <Layout {...args}>
      <Nav>{getNavBar()}</Nav>
      <Header style={{ border: '1px solid #f6f7f8' }}>
        <h1>Header</h1>
      </Header>
      <Content>
        <Section>
          <Article>
            <p style={{ lineHeight: '120px' }}>
              Content may be nested like so: Content, Section, then elements.
            </p>
          </Article>
        </Section>
      </Content>
      <Footer
        style={{
          border: '1px solid #f6f7f8',
          lineHeight: '48px',
          height: '80px',
        }}
      >
        Footer
      </Footer>
    </Layout>
  </Layout>
);

const Trigger_Story: ComponentStory<typeof Layout> = (args) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout {...args}>
      <Aside
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ border: '1px solid #f6f7f8', lineHeight: '352px' }}
      >
        Aside
      </Aside>
      <Layout {...args}>
        <Header style={{ border: '1px solid #f6f7f8', textAlign: 'left' }}>
          <Button
            classNames={'trigger'}
            iconProps={{
              path: collapsed ? IconName.mdiBackBurger : IconName.mdiBackBurger,
              rotate: collapsed ? 180 : 0,
            }}
            size={ButtonSize.Large}
            onClick={() => setCollapsed(!collapsed)}
            variant={ButtonVariant.Neutral}
          />
        </Header>
        <Content>
          <Section>
            <Article>
              <p style={{ lineHeight: '120px' }}>
                Content may be nested like so: Content, Section, then elements.
              </p>
            </Article>
          </Section>
        </Content>
        <Footer
          style={{
            border: '1px solid #f6f7f8',
            lineHeight: '48px',
            height: '80px',
          }}
        >
          Footer
        </Footer>
      </Layout>
    </Layout>
  );
};

export const Basic = Basic_Story.bind({});
export const Fixed_Navbar = Fixed_Navbar_Story.bind({});
export const Fixed_Aside = Fixed_Aside_Story.bind({});
export const Responsive = Responsive_Story.bind({});
export const Trigger = Trigger_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Basic',
  'Fixed_Navbar',
  'Fixed_Aside',
  'Responsive',
  'Trigger',
];

const layoutArgs: Object = {
  octupleStyles: true,
  style: {
    border: '1px solid #f6f7f8',
    textAlign: 'center',
  },
};

Basic.args = {
  ...layoutArgs,
};

Fixed_Navbar.args = {
  ...layoutArgs,
};

Fixed_Aside.args = {
  ...layoutArgs,
};

Responsive.args = {
  ...layoutArgs,
};

Trigger.args = {
  ...layoutArgs,
};
