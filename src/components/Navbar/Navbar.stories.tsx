import React, { useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Icon, IconName } from '../Icon';
import { Navbar } from './';
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
                <p style={{ margin: '8px 0' }}>{item}</p>
            )}
        />
    );
};

const Dropdown_Story = () => {
    const [visible, setVisibility] = useState(false);
    return (
        <Dropdown
            onVisibleChange={(isVisible) => setVisibility(isVisible)}
            overlay={<Overlay />}
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

const Navbar_Div_Story: ComponentStory<typeof Navbar> = (args) => {
    return (
        <div style={{ height: '250px' }}>
            <Navbar
                {...args}
                style={{ display: 'flex', justifyContent: 'space-between' }}
            >
                <div style={{ display: 'flex' }}>
                    <Link
                        href="https://www.twitter.com"
                        target="_self"
                        variant="default"
                        style={{ padding: '8px 20px' }}
                    >
                        Twitter
                    </Link>
                    <Link
                        href="https://www.facebook.com"
                        target="_self"
                        variant="default"
                        style={{ padding: '8px 20px' }}
                    >
                        Facebook
                    </Link>
                </div>
                <div style={{ display: 'flex' }}>
                    <Dropdown_Story />
                </div>
            </Navbar>
        </div>
    );
};

export const Navbar_Div = Navbar_Div_Story.bind({});

Navbar_Div.args = {};
