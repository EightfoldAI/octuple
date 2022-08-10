import React, { useState } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import Layout from '../';
import { IconName } from '../../Icon';
import { Menu } from '../../Menu';
import { fireEvent, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

const { Article, Aside, Content, Footer, Header, Nav, Section } = Layout;

describe('Layout', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('detect the aside as children', () => {
        const wrapper = mount(
            <Layout>
                <Aside>Aside</Aside>
                <Content>Content</Content>
            </Layout>
        );
        expect(wrapper.find('.layout-has-aside')).toBeTruthy();
    });

    test('umount from multiple asides', async () => {
        const App = () => {
            const [hide1, setHide1] = useState(false);
            const [hide2, setHide2] = useState(false);
            return (
                <Layout>
                    {hide1 ? null : <Aside>Aside</Aside>}
                    {hide2 ? null : <Aside>Aside</Aside>}
                    <Content>
                        <button
                            className="button1"
                            onClick={() => setHide1(true)}
                            type="button"
                        >
                            hide aside 1
                        </button>
                        <button
                            className="button2"
                            onClick={() => setHide2(true)}
                            type="button"
                        >
                            hide aside 2
                        </button>
                    </Content>
                </Layout>
            );
        };
        const { container } = render(<App />);
        expect(container.querySelector('.layout-has-aside')).toBeTruthy();
        fireEvent.click(container.querySelector('.button1'));
        expect(container.querySelector('.layout-has-aside')).toBeTruthy();
        fireEvent.click(container.querySelector('.button2'));
        expect(container.querySelector('.layout-has-aside')).toBeFalsy();
    });

    test('detect the aside inside the children', async () => {
        const wrapper = mount(
            <Layout>
                <div>
                    <Aside>Aside</Aside>
                </div>
                <Content>Content</Content>
            </Layout>
        );
        expect(wrapper.find('.layout-has-aside')).toBeTruthy();
    });

    test('detect layout-aside-has-trigger class in aside when layout-aside-trigger div tag exists', async () => {
        const wrapper = mount(
            <Layout>
                <div>
                    <Aside collapsible>Aside</Aside>
                </div>
                <Content>Content</Content>
            </Layout>
        );
        expect(wrapper.find('.layout-aside-has-trigger')).toBeTruthy();
    });

    test('should have 50% width of sidebar', async () => {
        const { container } = render(
            <Layout>
                <div>
                    <Aside width="50%">Aside</Aside>
                </div>
                <Content>Content</Content>
            </Layout>
        );
        expect(container.querySelector('.layout-aside').style.width).toBe(
            '50%'
        );
        expect(container.querySelector('.layout-aside').style.flex).toBe(
            '0 0 50%'
        );
    });

    describe('zeroWidth', () => {
        test('detect layout-aside-zero-width class in aside when its width is 0%', async () => {
            const wrapper = mount(
                <Layout>
                    <div>
                        <Aside width="0%">Aside</Aside>
                    </div>
                    <Content>Content</Content>
                </Layout>
            );
            expect(wrapper.find('.layout-aside-zero-width')).toBeTruthy();
        });

        describe('should collapsible', () => {
            test('uncontrolled', () => {
                const onCollapse = jest.fn();

                const { container } = render(
                    <Layout>
                        <Aside
                            collapsible
                            breakpoint="lg"
                            collapsedWidth="0"
                            onCollapse={onCollapse}
                        >
                            Aside
                        </Aside>
                        <Content>Content</Content>
                    </Layout>
                );

                onCollapse.mockReset();
                fireEvent.click(
                    container.querySelector('.layout-aside-zero-width-trigger')
                );
                expect(onCollapse).toHaveBeenCalledTimes(1);
            });

            test('controlled', () => {
                const Demo = () => {
                    const [collapsed, setCollapsed] = React.useState(true);

                    return (
                        <Layout>
                            <Aside
                                collapsed={collapsed}
                                collapsible
                                breakpoint="lg"
                                collapsedWidth="0"
                                onCollapse={setCollapsed}
                            >
                                Aside
                            </Aside>
                            <Content>Content</Content>
                        </Layout>
                    );
                };

                const { container } = render(<Demo />);
                expect(container.querySelector('.layout-aside')).toBeTruthy();
                fireEvent.click(
                    container.querySelector('.layout-aside-zero-width-trigger')
                );
                expect(
                    container.querySelector('.layout-aside').style.width
                ).toBe('0px');
            });
        });
    });

    test('renders string width correctly', () => {
        const { asFragment } = render(<Aside width="200">Aside</Aside>);
        expect(asFragment().firstChild).toMatchSnapshot();
    });

    test('should be controlled by collapsed', () => {
        const { asFragment, rerender } = render(<Aside>Aside</Aside>);
        expect(asFragment().firstChild).toMatchSnapshot();
        rerender(<Aside collapsed>Aside</Aside>);
        expect(asFragment().firstChild).toMatchSnapshot();
    });

    test('should not add layout-has-aside when `hasAside` is `false`', () => {
        const { container } = render(
            <Layout hasAside={false}>
                <Aside>Aside</Aside>
            </Layout>
        );
        expect(
            container
                .querySelector('.layout')
                .className.includes('layout-has-aside')
        ).toBe(false);
    });
});

describe('Aside', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    test('should trigger onBreakpoint', async () => {
        const onBreakpoint = jest.fn();

        render(
            <Aside breakpoint="md" onBreakpoint={onBreakpoint}>
                Aside
            </Aside>
        );
        expect(onBreakpoint).toBeCalled();
    });

    test('zeroWidthTriggerStyle should work', () => {
        const { container } = render(
            <Aside
                collapsedWidth={0}
                collapsible
                zeroWidthTriggerStyle={{ background: '#F96' }}
            >
                <Menu
                    items={[
                        {
                            iconProps: { path: IconName.mdiCardsHeart },
                            text: 'nav 1',
                            value: 'nav 1',
                        },
                    ]}
                />
            </Aside>
        );
        expect(
            container.querySelector('.layout-aside-zero-width-trigger').style
                .background
        ).toEqual('rgb(255, 153, 102)');
    });

    test('should be able to customize zero width trigger by trigger prop', () => {
        const wrapper = mount(
            <Aside
                collapsedWidth={0}
                collapsible
                trigger={<span className="my-trigger" />}
            >
                <Menu
                    items={[
                        {
                            iconProps: { path: IconName.mdiCardsHeart },
                            text: 'nav 1',
                            value: 'nav 1',
                        },
                    ]}
                />
            </Aside>
        );
        expect(
            wrapper.find('.layout-aside-zero-width-trigger').find('.my-trigger')
        ).toBeTruthy();
    });

    [
        'Article',
        'Aside',
        'Content',
        'Footer',
        'Header',
        'Layout',
        'Nav',
        'Section',
    ].forEach((tag) => {
        const ComponentMap = {
            Article,
            Aside,
            Content,
            Footer,
            Header,
            Layout,
            Nav,
            Section,
        };
        test(`should get ${tag} element from ref`, () => {
            const ref = React.createRef();
            const onSelect = jest.fn();
            const Component = ComponentMap[tag];

            mount(
                <Component onSelect={onSelect} ref={ref}>
                    {tag}
                </Component>
            );

            if (ref.current.Layout) {
                expect(ref.current instanceof HTMLDivElement).toBe(true);
            } else {
                expect(ref.current instanceof HTMLElement).toBe(true);
            }
        });
    });
});
