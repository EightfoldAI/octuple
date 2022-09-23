import React, { useRef, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ConfigProvider } from '../ConfigProvider';
import { Icon, IconName } from '../Icon';
import { Navbar, NavbarContent } from './';
import { Link } from '../Link';
import { Dropdown } from '../Dropdown';
import { Avatar } from '../Avatar';
import { List } from '../List';

export default {
    title: 'Navbar',
    parameters: {
        docs: {
            page: (): JSX.Element => (
                <main>
                    <article>
                        <section>
                            <h1>Navbar</h1>
                            <p>
                                A navigation bar is a section of a graphical
                                user interface intended to aid visitors in
                                accessing information. Navigation bars are
                                implemented in file browsers, web browsers and
                                as a design element of some web sites.
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
    argTypes: {},
} as ComponentMeta<typeof Navbar>;

const sampleList: string[] = [1, 2, 3, 4, 5].map((i) => `User ${i}`);

const Overlay = () => {
    return (
        <List
            items={sampleList}
            layout="vertical"
            renderItem={(item: string) => (
                <div style={{ margin: '8px' }}>{item}</div>
            )}
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
                <Icon
                    path={IconName.mdiChevronDown}
                    rotate={visible ? 180 : 0}
                />
            </div>
        </Dropdown>
    );
};

const Basic_Story: ComponentStory<typeof Navbar> = (args) => {
    return (
        <ConfigProvider
            themeOptions={{
                name: 'blue',
            }}
        >
            <div style={{ height: '250px' }}>
                <Navbar {...args}>
                    <NavbarContent>
                        <Link
                            href="https://eightfold.ai"
                            target="_blank"
                            variant="default"
                            style={{ padding: '8px 20px', color: 'inherit' }}
                        >
                            Eightfold
                        </Link>
                    </NavbarContent>
                    <NavbarContent>
                        <ProfileDropdown />
                    </NavbarContent>
                </Navbar>
            </div>
        </ConfigProvider>
    );
};

const Theme_Story: ComponentStory<typeof Navbar> = (args) => {
    const linkRef = useRef(null);
    return (
        <ConfigProvider
            themeOptions={{
                name: 'nav',
                customTheme: {
                    navbarTheme: {
                        background: '#3E5334',
                        textColor: '#EAD7A4',
                        textHoverColor: '#3E5334',
                        textHoverBackground: '#8FA394',
                    },
                },
            }}
        >
            <div style={{ height: '250px' }}>
                <Navbar {...args}>
                    <NavbarContent>
                        <Link
                            ref={linkRef}
                            href="https://eightfold.ai"
                            target="_blank"
                            variant="primary"
                            style={{
                                backgroundColor: 'transparent',
                                color: 'var(--navbar-text-color)',
                                padding: '8px 20px',
                            }}
                            onMouseEnter={() => {
                                linkRef.current.style.backgroundColor =
                                    'var(--navbar-text-hover-background)';
                                linkRef.current.style.color =
                                    'var(--navbar-text-hover-color)';
                            }}
                            onMouseLeave={() => {
                                linkRef.current.style.backgroundColor =
                                    'transparent';
                                linkRef.current.style.color =
                                    'var(--navbar-text-color)';
                            }}
                        >
                            Eightfold
                        </Link>
                    </NavbarContent>
                    <NavbarContent>
                        <ProfileDropdown />
                    </NavbarContent>
                </Navbar>
            </div>
        </ConfigProvider>
    );
};

export const Basic = Basic_Story.bind({});
export const Theme = Theme_Story.bind({});

Basic.args = {};
Theme.args = {};
