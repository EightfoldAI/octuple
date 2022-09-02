import React, { Component, useState } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import MatchMediaMock from 'jest-matchmedia-mock';
import { mergeClasses } from '../../../shared/utilities';
import Form from '../';
import * as Util from '../util';
import { PrimaryButton } from '../../Button';
import { TextInput } from '../../Inputs';
import { Select } from '../../Select';
import { CheckBox } from '../../CheckBox';
import DatePicker from '../../DateTimePicker/DatePicker';
import { Modal } from '../../Modal';
import { ConfigProvider } from '../../ConfigProvider';
import zhCN from '../../Locale/zh_CN';
import { sleep } from '../../../tests/Utilities';
import { fireEvent, render } from '@testing-library/react';
import 'jest-specific-snapshot';

const { RangePicker } = DatePicker;

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

class ResizeObserver {
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
    disconnect() {
        // do nothing
    }
}

window.ResizeObserver = ResizeObserver;

describe('Form', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    async function change(container, index, value, executeMockTimer) {
        fireEvent.change(container.querySelectorAll('input')[index], {
            target: { value },
        });
        await sleep(200);

        if (executeMockTimer) {
            for (let i = 0; i < 10; i += 1) {
                act(() => {
                    jest.runAllTimers();
                });
            }
            await sleep(1);
        }
    }

    beforeEach(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        warnSpy.mockReset();
    });

    afterAll(() => {
        warnSpy.mockRestore();
    });

    describe('noStyle Form.Item', () => {
        test('work', async () => {
            jest.useFakeTimers();

            const onChange = jest.fn();

            const { container } = render(
                <Form>
                    <Form.Item>
                        <Form.Item
                            name="test"
                            initialValue="mia"
                            rules={[{ required: true }]}
                        >
                            <TextInput onChange={onChange} />
                        </Form.Item>
                    </Form.Item>
                </Form>
            );

            await change(container, 0, '', true);
            expect(
                container.querySelectorAll('.form-item-with-help')
            ).toBeTruthy();
            expect(
                container.querySelectorAll('.form-item-has-error')
            ).toBeTruthy();

            expect(onChange).toHaveBeenCalled();

            jest.useRealTimers();
        });

        test.skip('should clean up', async () => {
            jest.useFakeTimers();

            const Demo = () => {
                const [form] = Form.useForm();

                return (
                    <Form form={form} initialValues={{ aaa: '2' }}>
                        <Form.Item name="aaa">
                            <TextInput
                                onChange={async () => {
                                    await sleep(0);
                                    try {
                                        await form.validateFields();
                                    } catch (e) {
                                        // do nothing
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item shouldUpdate noStyle>
                            {() => {
                                const aaa = form.getFieldValue('aaa');

                                if (aaa === '1') {
                                    return (
                                        <Form.Item
                                            name="bbb"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'aaa',
                                                },
                                            ]}
                                        >
                                            <TextInput />
                                        </Form.Item>
                                    );
                                }

                                return (
                                    <Form.Item>
                                        <Form.Item
                                            name="ccc"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'ccc',
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <TextInput />
                                        </Form.Item>
                                    </Form.Item>
                                );
                            }}
                        </Form.Item>
                    </Form>
                );
            };

            const { container } = render(<Demo />);
            await change(container, 0, '1', true);
            expect(
                container.querySelector('.form-item-explain').textContent
            ).toEqual('aaa');
            await change(container, 0, '2', true);
            expect(
                container.querySelector('.form-item-explain').textContent
            ).toEqual('ccc');
            await change(container, 0, '1', true);
            expect(
                container.querySelector('.form-item-explain').textContent
            ).toEqual('aaa');

            jest.useRealTimers();
        });
    });

    test('`shouldUpdate` should work with render props', () => {
        mount(
            <Form>
                <Form.Item>{() => null}</Form.Item>
            </Form>
        );
        expect(warnSpy).toHaveBeenCalledWith(
            'Warning: Form.Item `children` of render props only work with `shouldUpdate` or `dependencies`.'
        );
    });
    test("`shouldUpdate` shouldn't work with `dependencies`", () => {
        mount(
            <Form>
                <Form.Item shouldUpdate dependencies={[]}>
                    {() => null}
                </Form.Item>
            </Form>
        );
        expect(warnSpy).toHaveBeenCalledWith(
            "Warning: Form.Item `shouldUpdate` and `dependencies` shouldn't be used together."
        );
    });

    test('`name` should not work with render props', () => {
        mount(
            <Form>
                <Form.Item name="test" shouldUpdate>
                    {() => null}
                </Form.Item>
            </Form>
        );
        expect(warnSpy).toHaveBeenCalledWith(
            "Warning: Form.Item Do not use `name` with `children` of render props since it's not a field."
        );
    });

    test('children is array has name props', () => {
        mount(
            <Form>
                <Form.Item name="test">
                    <div>one</div>
                    <div>two</div>
                </Form.Item>
            </Form>
        );
        expect(warnSpy).toHaveBeenCalledWith(
            'Warning: Form.Item `children` is array of render props cannot have `name`.'
        );
    });

    test('Form.Item should support data-*、aria-* and custom attribute', () => {
        const wrapper = mount(
            <Form>
                <Form.Item data-text="123" aria-hidden="true" cccc="bbbb">
                    text
                </Form.Item>
            </Form>
        );
        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/Form.attributesupport.shot'
        );
    });

    test('warning when use `name` but children is not validate element', () => {
        mount(
            <Form>
                <Form.Item name="warning">text</Form.Item>
            </Form>
        );
        expect(warnSpy).toHaveBeenCalledWith(
            'Warning: Form.Item `name` is only used for validate React element. If you are using Form.Item as layout display, please remove `name` instead.'
        );
    });

    test('dynamic change required', () => {
        const wrapper = mount(
            <Form>
                <Form.Item label="lola" name="lola" valuePropName="checked">
                    <input type="checkbox" />
                </Form.Item>
                <Form.Item
                    label="mia"
                    name="mia"
                    dependencies={['lola']}
                    rules={[
                        ({ getFieldValue }) => ({
                            required: getFieldValue('lola'),
                        }),
                    ]}
                >
                    <TextInput />
                </Form.Item>
            </Form>
        );

        expect(wrapper.find('.form-item-required')).toHaveLength(0);

        wrapper
            .find('input[type="checkbox"]')
            .simulate('change', { target: { checked: true } });
        wrapper.update();
        expect(wrapper.find('.form-item-required')).toHaveLength(1);
    });

    describe('should show related className when customize help', () => {
        test('normal', () => {
            const wrapper = mount(
                <Form>
                    <Form.Item help="good">
                        <TextInput />
                    </Form.Item>
                </Form>
            );

            expect(wrapper.exists('.form-item-with-help')).toBeTruthy();
        });

        test('empty string', () => {
            const wrapper = mount(
                <Form>
                    <Form.Item help="">
                        <TextInput />
                    </Form.Item>
                </Form>
            );

            expect(wrapper.exists('.form-item-with-help')).toBeTruthy();
        });
    });

    test.skip('Error change should work', async () => {
        jest.useFakeTimers();

        const { container } = render(
            <Form>
                <Form.Item
                    name="name"
                    rules={[
                        { required: true },
                        {
                            validator: (_, value) => {
                                if (value === 'p') {
                                    return Promise.reject(new Error('not a p'));
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                >
                    <TextInput />
                </Form.Item>
            </Form>
        );

        /* eslint-disable no-await-in-loop */
        for (let i = 0; i < 3; i += 1) {
            await change(container, 0, 'mia', true);
            await change(container, 0, '', true);
            expect(
                container.querySelector('.form-item-explain').textContent
            ).toEqual("'name' is required");

            await change(container, 0, 'p', true);
            await sleep(100);
            expect(
                container.querySelector('.form-item-explain').textContent
            ).toEqual('not a p');
        }
        /* eslint-enable */

        jest.useRealTimers();
    });

    test('should update help directly when provided', () => {
        function App() {
            const [message, updateMessage] = React.useState('');
            return (
                <Form>
                    <Form.Item label="hello" help={message}>
                        <TextInput />
                    </Form.Item>
                    <PrimaryButton
                        onClick={() => updateMessage('mia')}
                        text={'Update'}
                    />
                </Form>
            );
        }

        const wrapper = mount(<App />);
        wrapper.find('button').simulate('click');
        expect(
            wrapper.find('.form-item').first().hasClass('form-item-with-help')
        ).toBeTruthy();
        expect(wrapper.find('.form-item-explain').text()).toEqual('mia');
    });

    test('warning when use `dependencies` but `name` is empty & children is not a render props', () => {
        mount(
            <Form>
                <Form.Item dependencies={[]}>text</Form.Item>
            </Form>
        );
        expect(warnSpy).toHaveBeenCalledWith(
            'Warning: Form.Item Must set `name` or use render props when `dependencies` is set.'
        );
    });

    test.skip('not repeat render when Form.Item is not a real Field', async () => {
        const shouldNotRender = jest.fn();
        const StaticInput = () => {
            shouldNotRender();
            return <TextInput />;
        };

        const shouldRender = jest.fn();
        const DynamicInput = () => {
            shouldRender();
            return <TextInput />;
        };

        const formRef = React.createRef();

        mount(
            <div>
                <Form ref={formRef}>
                    <Form.Item>
                        <StaticInput />
                    </Form.Item>
                    <Form.Item name="lola">
                        <DynamicInput />
                    </Form.Item>
                </Form>
            </div>,
            {
                strictMode: false,
            }
        );

        expect(shouldNotRender).toHaveBeenCalledTimes(1);
        expect(shouldRender).toHaveBeenCalledTimes(1);

        formRef.current.setFieldListValues({ lola: 'mia' });
        await Promise.resolve();
        expect(shouldNotRender).toHaveBeenCalledTimes(1);
        expect(shouldRender).toHaveBeenCalledTimes(2);
    });

    test('empty help should also render', () => {
        const wrapper = mount(
            <Form.Item help="">
                <TextInput />
            </Form.Item>
        );
        expect(wrapper.find('.form-item-explain').length).toBeTruthy();
    });

    test.skip('Form.Item with `help` should display error style when validate failed', async () => {
        jest.useFakeTimers();

        const { container } = render(
            <Form>
                <Form.Item
                    name="test"
                    help="help"
                    initialValue="mia"
                    rules={[{ required: true, message: 'message' }]}
                >
                    <TextInput />
                </Form.Item>
            </Form>
        );

        await change(container, 0, '', true);
        expect(container.querySelector('.form-item-has-error')).toBeTruthy();
        expect(
            container.querySelector('.form-item-explain').textContent
        ).toEqual('help');

        jest.useRealTimers();
    });

    test.skip('clear validation message when ', async () => {
        jest.useFakeTimers();

        const { container } = render(
            <Form>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'message' }]}
                >
                    <TextInput />
                </Form.Item>
            </Form>
        );
        await change(container, 0, '1', true);
        expect(container.querySelector('.form-item-explain')).toBeFalsy();

        await change(container, 0, '', true);
        expect(container.querySelector('.form-item-explain')).toBeTruthy();

        await change(container, 0, '123', true);
        await sleep(800);
        expect(container.querySelector('.form-item-explain')).toBeFalsy();

        jest.useRealTimers();
    });

    test('`require` without `name`', () => {
        const wrapper = mount(
            <Form.Item label="test" required>
                <TextInput />
            </Form.Item>
        );

        expect(wrapper.find('.form-item-required')).toHaveLength(1);
    });

    test('0 is a validate Field', () => {
        const { container } = render(
            <Form.Item name={0}>
                <TextInput />
            </Form.Item>
        );

        expect(container.querySelector('.form-item')).toBeTruthy();
    });

    test('`null` triggers warning and is treated as `undefined`', () => {
        const wrapper = mount(
            <Form.Item name={null}>
                <TextInput />
            </Form.Item>
        );

        expect(wrapper.find('Field')).toHaveLength(0);
        expect(warnSpy).toHaveBeenCalledWith(
            'Warning: Form.Item: `name` property is `null`'
        );
    });

    test('Component.props.onChange is null', () => {
        // eslint-disable-next-line react/prefer-stateless-function
        class CustomComponent extends Component {
            static defaultProps = {
                onChange: null,
            };

            render() {
                return <input {...this.props} />;
            }
        }
        expect(() => {
            const wrapper = mount(
                <Form>
                    <Form.Item name="custom">
                        <CustomComponent />
                    </Form.Item>
                </Form>
            );
            wrapper.find(CustomComponent).simulate('change', { value: '123' });
        }).not.toThrow();
    });

    test('change `help` should not warning', () => {
        const Demo = () => {
            const [error, setError] = React.useState(null);

            return (
                <Form>
                    <Form.Item
                        help={error ? 'This is an error msg' : undefined}
                        validateStatus={error ? 'error' : ''}
                        label="Username"
                        name="username"
                    >
                        <TextInput />
                    </Form.Item>

                    <Form.Item>
                        <button type="button" onClick={() => setError(!error)}>
                            Trigger
                        </button>
                    </Form.Item>
                </Form>
            );
        };

        const { container } = render(<Demo />);
        fireEvent.click(container.querySelector('button'));

        expect(warnSpy).not.toHaveBeenCalled();
    });

    test('`label` support template', async () => {
        const wrapper = mount(
            // eslint-disable-next-line no-template-curly-in-string
            <Form validateMessages={{ required: '${label} is good!' }}>
                <Form.Item name="test" label="Mia" rules={[{ required: true }]}>
                    <TextInput />
                </Form.Item>
            </Form>
        );

        wrapper.find('form').simulate('submit');
        await sleep(100);
        wrapper.update();
        await sleep(100);
        expect(wrapper.find('.form-item-explain').first().text()).toEqual(
            'Mia is good!'
        );
    });

    test('should keep upper locale in nested ConfigProvider', async () => {
        const wrapper = mount(
            <ConfigProvider themeOptions={{ name: 'blue' }} locale={zhCN}>
                <Form>
                    <Form.Item
                        name="test"
                        label="Mia"
                        rules={[{ required: true }]}
                    >
                        <TextInput />
                    </Form.Item>
                </Form>
            </ConfigProvider>
        );

        wrapper.find('form').simulate('submit');
        await sleep(100);
        wrapper.update();
        await sleep(100);
        expect(wrapper.find('.form-item-explain').first().text()).toEqual(
            '请输入Mia'
        );
    });

    test('`name` support template when label is not provided', async () => {
        const wrapper = mount(
            // eslint-disable-next-line no-template-curly-in-string
            <Form validateMessages={{ required: '${label} is good!' }}>
                <Form.Item name="Mia" rules={[{ required: true }]}>
                    <TextInput />
                </Form.Item>
            </Form>
        );

        wrapper.find('form').simulate('submit');
        await sleep(100);
        wrapper.update();
        await sleep(100);
        expect(wrapper.find('.form-item-explain').first().text()).toEqual(
            'Mia is good!'
        );
    });

    test('`messageVariables` support validate', async () => {
        const wrapper = mount(
            // eslint-disable-next-line no-template-curly-in-string
            <Form validateMessages={{ required: '${label} is good!' }}>
                <Form.Item
                    name="test"
                    messageVariables={{ label: 'Mia' }}
                    rules={[{ required: true }]}
                >
                    <TextInput />
                </Form.Item>
            </Form>
        );

        wrapper.find('form').simulate('submit');
        await sleep(100);
        wrapper.update();
        await sleep(100);
        expect(wrapper.find('.form-item-explain').first().text()).toEqual(
            'Mia is good!'
        );
    });

    test('validation message should has alert role', async () => {
        const wrapper = mount(
            // eslint-disable-next-line no-template-curly-in-string
            <Form validateMessages={{ required: 'name is good!' }}>
                <Form.Item name="test" rules={[{ required: true }]}>
                    <TextInput />
                </Form.Item>
            </Form>
        );

        wrapper.find('form').simulate('submit');
        await sleep(100);
        wrapper.update();
        await sleep(100);
        expect(
            wrapper
                .find('.form-item-explain div')
                .getDOMNode()
                .getAttribute('role')
        ).toBe('alert');
    });

    test('return same form instance', () => {
        const instances = new Set();

        const App = () => {
            const [form] = Form.useForm();
            instances.add(form);
            const [, forceUpdate] = React.useState({});
            return (
                <button
                    type="button"
                    onClick={() => {
                        forceUpdate({});
                    }}
                >
                    Refresh
                </button>
            );
        };

        const wrapper = mount(<App />, {
            strictMode: false,
        });
        for (let i = 0; i < 5; i += 1) {
            wrapper.find('button').simulate('click');
        }
        expect(instances.size).toEqual(1);
    });

    test('avoid re-render', async () => {
        let renderTimes = 0;

        const MyInput = ({ value = '', ...props }) => {
            renderTimes += 1;
            return <input value={value} {...props} />;
        };

        const Demo = () => (
            <Form>
                <Form.Item name="username" rules={[{ required: true }]}>
                    <MyInput />
                </Form.Item>
            </Form>
        );

        const wrapper = mount(<Demo />, {
            strictMode: false,
        });
        renderTimes = 0;

        wrapper.find('input').simulate('change', {
            target: {
                value: 'a',
            },
        });

        await sleep();

        expect(renderTimes).toEqual(1);
        expect(wrapper.find('input').props().value).toEqual('a');
    });

    test('warning with `defaultValue`', () => {
        mount(
            <Form>
                <Form.Item name="lola">
                    <input defaultValue="should warning" />
                </Form.Item>
            </Form>
        );

        expect(warnSpy).toHaveBeenCalledWith(
            'Warning: Form.Item `defaultValue` will not work on controlled Field. You should use `initialValues` of Form instead.'
        );
    });

    test('Remove Field should also reset error', async () => {
        const Demo = ({ showA }) => (
            <Form>
                {showA ? (
                    <Form.Item name="a" help="error">
                        <TextInput />
                    </Form.Item>
                ) : (
                    <Form.Item name="b">
                        <TextInput />
                    </Form.Item>
                )}
            </Form>
        );

        const wrapper = mount(<Demo showA />);
        await Promise.resolve();
        expect(
            wrapper.find('.form-item').last().hasClass('form-item-with-help')
        ).toBeTruthy();

        wrapper.setProps({ showA: false });
        await Promise.resolve();
        wrapper.update();
        expect(
            wrapper.find('.form-item').last().hasClass('form-item-with-help')
        ).toBeFalsy();
    });

    test('no warning of initialValue & getValueProps & preserve', () => {
        render(
            <Form>
                <Form.Item
                    initialValue="mia"
                    getValueProps={() => null}
                    preserve={false}
                >
                    <TextInput />
                </Form.Item>
            </Form>
        );
        expect(warnSpy).not.toHaveBeenCalled();
    });

    test('should customize id work', () => {
        const wrapper = mount(
            <Form>
                <Form.Item name="lola">
                    <TextInput id="mia" />
                </Form.Item>
            </Form>
        );

        expect(wrapper.find('input').prop('id')).toContain('mia');
    });

    test('Form validateTrigger', () => {
        const wrapper = mount(
            <Form validateTrigger="onBlur">
                <Form.Item name="lola">
                    <TextInput />
                </Form.Item>
            </Form>
        );

        expect(wrapper.find('input').prop('onBlur')).toBeTruthy();
    });

    describe('Form item hidden', () => {
        test('should work', () => {
            const wrapper = mount(
                <Form>
                    <Form.Item name="lola" hidden>
                        <TextInput />
                    </Form.Item>
                </Form>
            );
            expect(wrapper.render()).toMatchSpecificSnapshot(
                './__snapshots__/Form.itemhidden.shot'
            );
        });

        test('noStyle should not work when hidden', () => {
            const wrapper = mount(
                <Form>
                    <Form.Item name="lola" hidden noStyle>
                        <TextInput />
                    </Form.Item>
                </Form>
            );
            expect(wrapper.render()).toMatchSpecificSnapshot(
                './__snapshots__/Form.nostylehidden.shot'
            );
        });
    });

    test('form should support disabled', () => {
        const wrapper = mount(
            <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 10 }}
                layout="horizontal"
                disabled
            >
                <Form.Item
                    label="Form disabled"
                    name="disabled"
                    valuePropName="checked"
                >
                    <CheckBox id={'disableCheckBox'} label={'disabled'} />
                </Form.Item>
                <Form.Item label="Input">
                    <TextInput />
                </Form.Item>
                <Form.Item label="Button">
                    <PrimaryButton text={'Button'} />
                </Form.Item>
            </Form>
        );

        expect(wrapper.render()).toMatchSpecificSnapshot(
            './__snapshots__/Form.disabled.shot'
        );
    });

    test.skip('Form Item element id will auto add form_item prefix if form name is empty and item name is in the black list', async () => {
        const mockFn = jest.spyOn(Util, 'getFieldId');
        const itemName = 'parentNode';
        // if form name is empty, and item name is parentNode, will get parentNode as id
        mockFn.mockImplementation(() => itemName);
        const Demo = () => {
            const [open, setOpen] = useState(false);
            return (
                <>
                    <Form>
                        <Form.Item name={itemName}>
                            <Select
                                classNames={'form_item_parentNode'}
                                defaultValue="lucy"
                                showDropdown={open}
                                options={[
                                    {
                                        text: 'Jack',
                                        value: 'jack',
                                    },
                                    {
                                        text: 'Lucy',
                                        value: 'lucy',
                                    },
                                    {
                                        text: 'Yiminghe',
                                        value: 'yiminghe',
                                    },
                                ]}
                                style={{ width: 120 }}
                            />
                        </Form.Item>
                    </Form>
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        {open ? 'show' : 'hidden'}
                    </button>
                </>
            );
        };

        const { container, rerender, unmount } = render(<Demo />, {
            attachTo: document.body,
        });
        expect(mockFn).toHaveBeenCalled();
        expect(Util.getFieldId()).toBe(itemName);

        // make sure input id is parentNode
        expect(container.querySelector(`#${itemName}`).length).toBeTruthy();
        act(() => {
            fireEvent.click(container.querySelector('button'));
        });
        expect(container.querySelector('button').textContent).toBe('show');

        mockFn.mockRestore();
        rerender(<Demo />);
        expect(
            container.querySelector(`#form_item_${itemName}`).length
        ).toBeTruthy();
        unmount();
    });

    describe('tooltip', () => {
        test('ReactNode', () => {
            const wrapper = mount(
                <Form>
                    <Form.Item label="lola" tooltip={<span>Mia</span>}>
                        <TextInput />
                    </Form.Item>
                </Form>
            );

            const tooltipProps = wrapper.find('Tooltip').props();
            expect(tooltipProps.content).toEqual(<span>Mia</span>);
        });

        test('config', () => {
            const wrapper = mount(
                <Form>
                    <Form.Item label="lola" tooltip={{ content: 'Mia' }}>
                        <TextInput />
                    </Form.Item>
                </Form>
            );

            const tooltipProps = wrapper.find('Tooltip').props();
            expect(tooltipProps.content).toEqual('Mia');
        });
    });

    test('warningOnly validate', async () => {
        const computeSpy = jest
            .spyOn(window, 'getComputedStyle')
            .mockImplementation(() => ({
                marginBottom: 32,
            }));

        const { container } = render(
            <Form>
                <Form.Item>
                    <Form.Item
                        name="required"
                        initialValue="mia"
                        rules={[
                            {
                                required: true,
                                message: 'message',
                                warningOnly: true,
                            },
                        ]}
                    >
                        <TextInput />
                    </Form.Item>
                </Form.Item>
            </Form>
        );

        fireEvent.click(container.querySelector('.clear-icon-button'));

        await sleep(0);
        computeSpy.mockRestore();

        expect(container.querySelector('.form-item-with-help')).toBeTruthy();
        expect(container.querySelector('.form-item-has-warning')).toBeTruthy();
    });

    test('not warning when remove on validate', async () => {
        jest.useFakeTimers();
        let rejectFn = null;

        const { container, unmount } = render(
            <Form>
                <Form.Item>
                    <Form.Item
                        noStyle
                        name="test"
                        initialValue="mia"
                        rules={[
                            {
                                validator: () =>
                                    new Promise((_, reject) => {
                                        rejectFn = reject;
                                    }),
                            },
                        ]}
                    >
                        <TextInput />
                    </Form.Item>
                </Form.Item>
            </Form>
        );

        await change(container, 0, '', true);

        unmount();

        // Delay validate failed
        rejectFn(new Error('delay failed'));

        expect(warnSpy).not.toHaveBeenCalled();

        jest.useRealTimers();
    });

    describe('form colon', () => {
        test('default colon', () => {
            const wrapper = mount(
                <Form>
                    <Form.Item label="Name">
                        <TextInput />
                    </Form.Item>
                </Form>
            );

            expect(wrapper.exists('.form-item-no-colon')).toBeFalsy();
        });

        test('set Form.Item colon false', () => {
            const wrapper = mount(
                <Form colon>
                    <Form.Item colon={false} label="Name">
                        <TextInput />
                    </Form.Item>
                </Form>
            );

            expect(wrapper.find('.form-item-no-colon')).toBeTruthy();
        });

        test('set Form colon false', () => {
            const wrapper = mount(
                <Form colon={false}>
                    <Form.Item label="Name">
                        <TextInput />
                    </Form.Item>
                </Form>
            );

            expect(wrapper.find('.form-item-no-colon')).toBeTruthy();
        });
    });

    test('useFormInstance', () => {
        let formInstance;
        let subFormInstance;

        const Sub = () => {
            const formSub = Form.useFormInstance();
            subFormInstance = formSub;

            return null;
        };

        const Demo = () => {
            const [form] = Form.useForm();
            formInstance = form;

            return (
                <Form form={form}>
                    <Sub />
                </Form>
            );
        };

        render(<Demo />);
        expect(subFormInstance).toBe(formInstance);
    });

    test.skip('noStyle should not affect status', () => {
        const Demo = () => (
            <Form>
                <Form.Item validateStatus="error" noStyle>
                    <Select classNames={'custom-select'} />
                </Form.Item>
                <Form.Item validateStatus="error">
                    <Form.Item noStyle>
                        <Select classNames={'custom-select-b'} />
                    </Form.Item>
                </Form.Item>
                <Form.Item validateStatus="error">
                    <Form.Item noStyle validateStatus="warning">
                        <Select classNames={'custom-select-c'} />
                    </Form.Item>
                </Form.Item>
                <Form.Item noStyle>
                    <Form.Item validateStatus="warning">
                        <Select classNames={'custom-select-d'} />
                    </Form.Item>
                </Form.Item>
            </Form>
        );
        const { container } = render(<Demo />);
        expect(
            container.querySelector('.custom-select')?.className
        ).not.toContain('status-error');
        expect(
            container.querySelector('.custom-select')?.className
        ).not.toContain('in-form-item');
        expect(
            container.querySelector('.custom-select-b')?.className
        ).toContain('status-error');
        expect(
            container.querySelector('.custom-select-b')?.className
        ).toContain('in-form-item');
        expect(
            container.querySelector('.custom-select-c')?.className
        ).toContain('status-error');
        expect(
            container.querySelector('.custom-select-c')?.className
        ).toContain('in-form-item');
        expect(
            container.querySelector('.custom-select-d')?.className
        ).toContain('status-warning');
        expect(
            container.querySelector('.custom-select-d')?.className
        ).toContain('in-form-item');
    });

    test('should not affect Surface UI children styles', () => {
        const Demo = () => (
            <Form>
                <Form.Item labelCol={4} validateStatus="error">
                    <Modal
                        visible={true}
                        body={<Select classNames={'modal-select'} />}
                    />
                </Form.Item>
            </Form>
        );
        const { container } = render(<Demo />, { container: document.body });
        expect(
            container.querySelector('.modal-select')?.className
        ).not.toContain('in-form-item');
        expect(
            container.querySelector('.modal-select')?.className
        ).not.toContain('status-error');
    });

    test('Form.Item.useStatus should work', async () => {
        const {
            Item: { useStatus },
        } = Form;

        const CustomInput = ({ classNames, value }) => {
            const { status } = useStatus();
            return (
                <div
                    className={mergeClasses([
                        classNames,
                        `custom-input-status-${status}`,
                    ])}
                >
                    {value}
                </div>
            );
        };

        const Demo = () => {
            const [form] = Form.useForm();

            return (
                <Form form={form} name="my-form">
                    <Form.Item name="required" rules={[{ required: true }]}>
                        <CustomInput
                            classNames="custom-input-required"
                            value=""
                        />
                    </Form.Item>
                    <Form.Item name="warning" validateStatus="warning">
                        <CustomInput classNames="custom-input-warning" />
                    </Form.Item>
                    <Form.Item name="normal">
                        <CustomInput classNames="custom-input" />
                    </Form.Item>
                    <CustomInput classNames="custom-input-wrong" />
                    <PrimaryButton
                        onClick={() => form.submit()}
                        classNames={'submit-button'}
                        text={'Submit'}
                    />
                </Form>
            );
        };

        const { container } = render(<Demo />);

        expect(
            container.querySelector('.custom-input-required')?.classList
        ).toContain('custom-input-status-');
        expect(
            container.querySelector('.custom-input-warning')?.classList
        ).toContain('custom-input-status-warning');
        expect(container.querySelector('.custom-input')?.classList).toContain(
            'custom-input-status-'
        );
        expect(
            container.querySelector('.custom-input-wrong')?.classList
        ).toContain('custom-input-status-undefined');
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringContaining(
                'Form.Item.useStatus should be used under Form.Item component.'
            )
        );
        fireEvent.click(container.querySelector('.submit-button'));
        await sleep(0);
        expect(
            container.querySelector('.custom-input-required')?.classList
        ).toContain('custom-input-status-error');
    });

    test('item bottom margin offset', async () => {
        const computeSpy = jest
            .spyOn(window, 'getComputedStyle')
            .mockImplementation(() => ({
                marginBottom: 32,
            }));

        const { container } = render(
            <Form>
                <Form.Item
                    name="required"
                    initialValue="mia"
                    rules={[{ required: true, message: 'message' }]}
                >
                    <TextInput />
                </Form.Item>
            </Form>
        );

        fireEvent.click(container.querySelector('.clear-icon-button'));

        await sleep(0);
        computeSpy.mockRestore();

        expect(
            container.querySelector('.form-item-margin-offset').style
                .marginBottom
        ).toBe('-32px');
    });
});
