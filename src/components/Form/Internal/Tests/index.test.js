import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcForm, { OcField, useForm } from '../';
import { changeValue, getField, matchError } from './Common';
import InfoField, { Input } from './Common/InfoField';
import timeout from './Common/timeout';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.Basic', () => {
    describe('create form', () => {
        function renderContent() {
            return (
                <div>
                    <OcField name="lola">
                        <Input />
                    </OcField>
                    <OcField name="mia">{() => null}</OcField>
                    <InfoField />
                </div>
            );
        }

        test('sub component', () => {
            const wrapper = mount(<OcForm>{renderContent()}</OcForm>);
            expect(wrapper.find('form')).toBeTruthy();
            expect(wrapper.find('input').length).toBe(2);
        });

        describe('component', () => {
            test('without dom', () => {
                const wrapper = mount(
                    <OcForm component={false}>{renderContent()}</OcForm>
                );
                expect(wrapper.find('form').length).toBe(0);
                expect(wrapper.find('input').length).toBe(2);
            });

            test('use string', () => {
                const wrapper = mount(
                    <OcForm component="pre">{renderContent()}</OcForm>
                );
                expect(wrapper.find('form').length).toBe(0);
                expect(wrapper.find('pre').length).toBe(1);
                expect(wrapper.find('input').length).toBe(2);
            });

            test('use component', () => {
                const MyComponent = ({ children }) => <div>{children}</div>;
                const wrapper = mount(
                    <OcForm component={MyComponent}>{renderContent()}</OcForm>
                );
                expect(wrapper.find('form').length).toBe(0);
                expect(wrapper.find(MyComponent).length).toBe(1);
                expect(wrapper.find('input').length).toBe(2);
            });
        });

        describe('render props', () => {
            test('normal', () => {
                const wrapper = mount(<OcForm>{renderContent}</OcForm>);
                expect(wrapper.find('form')).toBeTruthy();
                expect(wrapper.find('input').length).toBe(2);
            });

            test('empty', () => {
                const wrapper = mount(<OcForm>{() => null}</OcForm>);
                expect(wrapper.find('form')).toBeTruthy();
            });
        });
    });

    test('fields touched', async () => {
        let form;

        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <InfoField name="username" />
                    <InfoField name="password" />
                    <OcField>{() => null}</OcField>
                </OcForm>
            </div>
        );

        expect(form.isListTouched()).toBeFalsy();
        expect(form.isListTouched(['username', 'password'])).toBeFalsy();

        await changeValue(getField(wrapper, 0), 'Mia');
        expect(form.isListTouched()).toBeTruthy();
        expect(form.isListTouched(['username', 'password'])).toBeTruthy();
        expect(form.isListTouched(true)).toBeFalsy();
        expect(form.isListTouched(['username', 'password'], true)).toBeFalsy();

        await changeValue(getField(wrapper, 1), 'Light');
        expect(form.isListTouched()).toBeTruthy();
        expect(form.isListTouched(['username', 'password'])).toBeTruthy();
        expect(form.isListTouched(true)).toBeTruthy();
        expect(form.isListTouched(['username', 'password'], true)).toBeTruthy();
    });

    describe('reset form', () => {
        function resetTest(name, ...args) {
            test(name, async () => {
                let form;
                const onReset = jest.fn();
                const onMeta = jest.fn();

                const wrapper = mount(
                    <div>
                        <OcForm
                            ref={(instance) => {
                                form = instance;
                            }}
                        >
                            <OcField
                                name="username"
                                rules={[{ required: true }]}
                                onReset={onReset}
                                onMetaChange={onMeta}
                            >
                                <Input />
                            </OcField>
                        </OcForm>
                    </div>
                );

                await changeValue(getField(wrapper, 'username'), 'Mia');
                expect(form.getFieldValue('username')).toEqual('Mia');
                expect(form.getFieldError('username')).toEqual([]);
                expect(form.isTouched('username')).toBeTruthy();
                expect(onMeta).toHaveBeenCalledWith(
                    expect.objectContaining({
                        touched: true,
                        errors: [],
                        warnings: [],
                    })
                );
                expect(onReset).not.toHaveBeenCalled();
                onMeta.mockRestore();
                onReset.mockRestore();

                form.resetFields(...args);
                expect(form.getFieldValue('username')).toEqual(undefined);
                expect(form.getFieldError('username')).toEqual([]);
                expect(form.isTouched('username')).toBeFalsy();
                expect(onMeta).toHaveBeenCalledWith(
                    expect.objectContaining({
                        touched: false,
                        errors: [],
                        warnings: [],
                    })
                );
                expect(onReset).toHaveBeenCalled();
                onMeta.mockRestore();
                onReset.mockRestore();

                await changeValue(getField(wrapper, 'username'), '');
                expect(form.getFieldValue('username')).toEqual('');
                expect(form.getFieldError('username')).toEqual([
                    "'username' is required",
                ]);
                expect(form.isTouched('username')).toBeTruthy();
                expect(onMeta).toHaveBeenCalledWith(
                    expect.objectContaining({
                        touched: true,
                        errors: ["'username' is required"],
                        warnings: [],
                    })
                );
                expect(onReset).not.toHaveBeenCalled();
                onMeta.mockRestore();
                onReset.mockRestore();

                form.resetFields(...args);
                expect(form.getFieldValue('username')).toEqual(undefined);
                expect(form.getFieldError('username')).toEqual([]);
                expect(form.isTouched('username')).toBeFalsy();
                expect(onMeta).toHaveBeenCalledWith(
                    expect.objectContaining({
                        touched: false,
                        errors: [],
                        warnings: [],
                    })
                );
                expect(onReset).toHaveBeenCalled();
            });
        }

        resetTest('with field name', ['username']);
        resetTest('without field name');

        test('not affect others', async () => {
            let form;

            const wrapper = mount(
                <div>
                    <OcForm
                        ref={(instance) => {
                            form = instance;
                        }}
                    >
                        <OcField name="username" rules={[{ required: true }]}>
                            <Input />
                        </OcField>

                        <OcField name="password" rules={[{ required: true }]}>
                            <Input />
                        </OcField>
                    </OcForm>
                </div>
            );

            await changeValue(getField(wrapper, 'username'), 'Mia');
            await changeValue(getField(wrapper, 'password'), '');
            form.resetFields(['username']);

            expect(form.getFieldValue('username')).toEqual(undefined);
            expect(form.getFieldError('username')).toEqual([]);
            expect(form.isTouched('username')).toBeFalsy();
            expect(form.getFieldValue('password')).toEqual('');
            expect(form.getFieldError('password')).toEqual([
                "'password' is required",
            ]);
            expect(form.isTouched('password')).toBeTruthy();
        });

        test('remove OcField should trigger onMetaChange', () => {
            const onMetaChange = jest.fn();
            const wrapper = mount(
                <OcForm>
                    <OcField name="username" onMetaChange={onMetaChange}>
                        <Input />
                    </OcField>
                </OcForm>
            );

            wrapper.unmount();
            expect(onMetaChange).toHaveBeenCalledWith(
                expect.objectContaining({ destroy: true })
            );
        });
    });

    test('should throw if no OcForm in use', () => {
        const warnSpy = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {});

        mount(
            <OcField>
                <Input />
            </OcField>
        );

        expect(warnSpy).toHaveBeenCalledWith(
            'Warning: Can not find FormContext. Please make sure you wrap Field under Form.'
        );

        warnSpy.mockRestore();
    });

    test('keep origin input function', async () => {
        const onChange = jest.fn();
        const onValuesChange = jest.fn();
        const wrapper = mount(
            <OcForm onValuesChange={onValuesChange}>
                <OcField name="username">
                    <Input onChange={onChange} />
                </OcField>
            </OcForm>
        );

        await changeValue(getField(wrapper), 'Mia');
        expect(onValuesChange).toHaveBeenCalledWith(
            { username: 'Mia' },
            { username: 'Mia' }
        );
        expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({ target: { value: 'Mia' } })
        );
    });

    test('onValuesChange should not return fully value', async () => {
        const onValuesChange = jest.fn();

        const Demo = ({ showField = true }) => (
            <OcForm
                onValuesChange={onValuesChange}
                initialValues={{ lola: 'little' }}
            >
                {showField && (
                    <OcField name="lola">
                        <Input />
                    </OcField>
                )}
                <OcField name="mia">
                    <Input />
                </OcField>
            </OcForm>
        );

        const wrapper = mount(<Demo />);
        await changeValue(getField(wrapper, 'mia'), 'cute');
        expect(onValuesChange).toHaveBeenCalledWith(expect.anything(), {
            lola: 'little',
            mia: 'cute',
        });

        onValuesChange.mockReset();
        wrapper.setProps({ showField: false });
        await changeValue(getField(wrapper, 'mia'), 'little');
        expect(onValuesChange).toHaveBeenCalledWith(expect.anything(), {
            mia: 'little',
        });
    });
    test('should call onReset fn, when the button is clicked', async () => {
        const resetFn = jest.fn();
        const wrapper = mount(
            <OcForm onReset={resetFn}>
                <InfoField name={'user'}>
                    <Input />
                </InfoField>
                <button type="reset">reset</button>
            </OcForm>
        );
        await changeValue(getField(wrapper), 'Mia');
        wrapper.find('button').simulate('reset');
        await timeout();
        expect(resetFn).toHaveBeenCalledTimes(1);
        const { value } = wrapper.find('input').props();
        expect(value).toEqual('');
    });
    test('submit', async () => {
        const onFinish = jest.fn();
        const onFinishFailed = jest.fn();

        const wrapper = mount(
            <OcForm onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <InfoField name="user" rules={[{ required: true }]}>
                    <Input />
                </InfoField>
                <button type="submit">submit</button>
            </OcForm>
        );

        // Not trigger
        wrapper.find('button').simulate('submit');
        await timeout();
        wrapper.update();
        matchError(wrapper, "'user' is required");
        expect(onFinish).not.toHaveBeenCalled();
        expect(onFinishFailed).toHaveBeenCalledWith({
            errorFields: [
                {
                    name: ['user'],
                    errors: ["'user' is required"],
                    warnings: [],
                },
            ],
            outOfDate: false,
            values: {},
        });

        onFinish.mockReset();
        onFinishFailed.mockReset();

        // Trigger
        await changeValue(getField(wrapper), 'Mia');
        wrapper.find('button').simulate('submit');
        await timeout();
        matchError(wrapper, false);
        expect(onFinish).toHaveBeenCalledWith({ user: 'Mia' });
        expect(onFinishFailed).not.toHaveBeenCalled();
    });

    test('valuePropName', async () => {
        let form;
        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <OcField name="check" valuePropName="checked">
                        <Input type="checkbox" />
                    </OcField>
                </OcForm>
            </div>
        );

        wrapper
            .find('input[type="checkbox"]')
            .simulate('change', { target: { checked: true } });
        await timeout();
        expect(form.getFieldListValues()).toEqual({ check: true });

        wrapper
            .find('input[type="checkbox"]')
            .simulate('change', { target: { checked: false } });
        await timeout();
        expect(form.getFieldListValues()).toEqual({ check: false });
    });

    test('getValueProps', async () => {
        const wrapper = mount(
            <div>
                <OcForm initialValues={{ test: 'mia' }}>
                    <OcField
                        name="test"
                        getValueProps={(val) => ({ lola: val })}
                    >
                        <span className="anything" />
                    </OcField>
                </OcForm>
            </div>
        );

        expect(wrapper.find('.anything').props().lola).toEqual('mia');
    });

    describe('shouldUpdate', () => {
        test('work', async () => {
            let isAllTouched;
            let hasError;

            const wrapper = mount(
                <OcForm>
                    <OcField name="username" rules={[{ required: true }]}>
                        <Input />
                    </OcField>
                    <OcField name="password" rules={[{ required: true }]}>
                        <Input />
                    </OcField>
                    <OcField shouldUpdate>
                        {(_, __, { getFieldListErrors, isListTouched }) => {
                            isAllTouched = isListTouched(true);
                            hasError = getFieldListErrors().filter(
                                ({ errors }) => errors.length
                            ).length;

                            return null;
                        }}
                    </OcField>
                </OcForm>
            );

            await changeValue(getField(wrapper, 'username'), '');
            expect(isAllTouched).toBeFalsy();
            expect(hasError).toBeTruthy();

            await changeValue(getField(wrapper, 'username'), 'Mia');
            expect(isAllTouched).toBeFalsy();
            expect(hasError).toBeFalsy();

            await changeValue(getField(wrapper, 'password'), 'Light');
            expect(isAllTouched).toBeTruthy();
            expect(hasError).toBeFalsy();

            await changeValue(getField(wrapper, 'password'), '');
            expect(isAllTouched).toBeTruthy();
            expect(hasError).toBeTruthy();
        });

        test('true will force one more update', async () => {
            let renderPhase = 0;

            const wrapper = mount(
                <OcForm initialValues={{ username: 'lola' }}>
                    <OcField name="username">
                        <Input />
                    </OcField>
                    <OcField shouldUpdate>
                        {(_, __, form) => {
                            renderPhase += 1;
                            return (
                                <span
                                    id="holder"
                                    data-touched={form.isListTouched(true)}
                                    data-value={form.getFieldListValues()}
                                />
                            );
                        }}
                    </OcField>
                </OcForm>
            );

            const props = wrapper.find('#holder').props();
            expect(renderPhase).toEqual(2);
            expect(props['data-touched']).toBeFalsy();
            expect(props['data-value']).toEqual({ username: 'lola' });
        });
    });

    describe('setFields', () => {
        test('should work', () => {
            let form;
            const wrapper = mount(
                <div>
                    <OcForm
                        ref={(instance) => {
                            form = instance;
                        }}
                    >
                        <InfoField name="username">
                            <Input />
                        </InfoField>
                    </OcForm>
                </div>
            );

            form.setFields([
                {
                    name: 'username',
                    touched: false,
                    validating: true,
                    errors: ['Set It!'],
                },
            ]);
            wrapper.update();

            matchError(wrapper, 'Set It!');
            expect(wrapper.find('.validating').length).toBeTruthy();
            expect(form.isListTouched()).toBeFalsy();
        });

        test('should trigger by setField', () => {
            const triggerUpdate = jest.fn();
            const formRef = React.createRef();

            const wrapper = mount(
                <div>
                    <OcForm ref={formRef}>
                        <OcField
                            shouldUpdate={(prev, next) =>
                                prev.value !== next.value
                            }
                        >
                            {() => {
                                triggerUpdate();
                                return <input />;
                            }}
                        </OcField>
                    </OcForm>
                </div>
            );
            wrapper.update();
            triggerUpdate.mockReset();

            // Not trigger render
            formRef.current.setFields([
                { name: 'others', value: 'no need to update' },
            ]);
            wrapper.update();
            expect(triggerUpdate).not.toHaveBeenCalled();

            // Trigger render
            formRef.current.setFields([
                { name: 'value', value: 'should update' },
            ]);
            wrapper.update();
            expect(triggerUpdate).toHaveBeenCalled();
        });
    });

    test('render props get meta', () => {
        let called1 = false;
        let called2 = false;

        mount(
            <OcForm>
                <OcField name="Light">
                    {(_, meta) => {
                        expect(meta.name).toEqual(['Light']);
                        called1 = true;
                        return null;
                    }}
                </OcField>
                <OcField name={['Mia', 'Best']}>
                    {(_, meta) => {
                        expect(meta.name).toEqual(['Mia', 'Best']);
                        called2 = true;
                        return null;
                    }}
                </OcField>
            </OcForm>
        );

        expect(called1).toBeTruthy();
        expect(called2).toBeTruthy();
    });

    test('setFieldListValues should clean up status', async () => {
        let form;
        let currentMeta;

        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <OcField
                        name="normal"
                        rules={[{ validator: () => new Promise(() => {}) }]}
                    >
                        {(control, meta) => {
                            currentMeta = meta;
                            return <Input {...control} />;
                        }}
                    </OcField>
                </OcForm>
            </div>
        );

        // Init
        expect(form.getFieldValue('normal')).toBe(undefined);
        expect(form.isTouched('normal')).toBeFalsy();
        expect(form.getFieldError('normal')).toEqual([]);
        expect(currentMeta.validating).toBeFalsy();

        // Set it
        form.setFieldListValues({
            normal: 'Light',
        });

        expect(form.getFieldValue('normal')).toBe('Light');
        expect(form.isTouched('normal')).toBeTruthy();
        expect(form.getFieldError('normal')).toEqual([]);
        expect(currentMeta.validating).toBeFalsy();

        // Input it
        await changeValue(getField(wrapper), 'Mia');

        expect(form.getFieldValue('normal')).toBe('Mia');
        expect(form.isTouched('normal')).toBeTruthy();
        expect(form.getFieldError('normal')).toEqual([]);
        expect(currentMeta.validating).toBeTruthy();

        // Set it again
        form.setFieldListValues({
            normal: 'Light',
        });

        expect(form.getFieldValue('normal')).toBe('Light');
        expect(form.isTouched('normal')).toBeTruthy();
        expect(form.getFieldError('normal')).toEqual([]);
        expect(currentMeta.validating).toBeFalsy();
    });

    test('filtering fields by meta', async () => {
        let form;

        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <InfoField name="username" />
                    <InfoField name="password" />
                    <OcField>{() => null}</OcField>
                </OcForm>
            </div>
        );

        expect(
            form.getFieldListValues(null, (meta) => {
                expect(Object.keys(meta)).toEqual([
                    'touched',
                    'validating',
                    'errors',
                    'warnings',
                    'name',
                ]);
                return false;
            })
        ).toEqual({});

        expect(form.getFieldListValues(null, () => true)).toEqual(
            form.getFieldListValues()
        );
        expect(form.getFieldListValues(null, (meta) => meta.touched)).toEqual(
            {}
        );

        await changeValue(getField(wrapper, 0), 'Mia');
        expect(form.getFieldListValues(null, () => true)).toEqual(
            form.getFieldListValues()
        );
        expect(form.getFieldListValues(null, (meta) => meta.touched)).toEqual({
            username: 'Mia',
        });
        expect(
            form.getFieldListValues(['username'], (meta) => meta.touched)
        ).toEqual({
            username: 'Mia',
        });
        expect(
            form.getFieldListValues(['password'], (meta) => meta.touched)
        ).toEqual({});
    });

    test('should not crash when return value contains target field', async () => {
        const CustomInput = ({ value, onChange }) => {
            const onInputChange = (e) => {
                onChange({
                    value: e.target.value,
                    target: 'string',
                });
            };
            return <Input value={value} onChange={onInputChange} />;
        };
        const wrapper = mount(
            <OcForm>
                <OcField name="user">
                    <CustomInput />
                </OcField>
            </OcForm>
        );
        expect(() => {
            wrapper
                .find('Input')
                .simulate('change', { event: { target: { value: 'Light' } } });
        }).not.toThrowError();
    });

    test('setFieldListValues for List should work', () => {
        const Demo = () => {
            const [form] = useForm();

            const handelReset = () => {
                form.setFieldListValues({
                    users: [],
                });
            };

            const initialValues = {
                users: [{ name: '11' }, { name: '22' }],
            };

            return (
                <OcForm
                    form={form}
                    initialValues={initialValues}
                    name="dynamic_form_nest_item"
                    autoComplete="off"
                >
                    <OcForm.OcList name="users">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <OcField
                                        key={key}
                                        {...restField}
                                        name={[name, 'name']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing name',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Name" />
                                    </OcField>
                                ))}
                            </>
                        )}
                    </OcForm.OcList>
                    <OcField>
                        <button className="reset-btn" onClick={handelReset}>
                            reset
                        </button>
                    </OcField>
                </OcForm>
            );
        };

        const wrapper = mount(<Demo />);
        expect(wrapper.find('input').first().getDOMNode().value).toBe('11');
        wrapper.find('.reset-btn').first().simulate('click');
        expect(wrapper.find('input').length).toBe(0);
    });

    test('setFieldListValues should work for multiple Select', () => {
        const Select = ({ value, defaultValue }) => {
            return (
                <div className="select-div">
                    {(value || defaultValue || []).toString()}
                </div>
            );
        };

        const Demo = () => {
            const [formInstance] = OcForm.useForm();

            React.useEffect(() => {
                formInstance.setFieldListValues({ selector: ['K1', 'K2'] });
            }, [formInstance]);

            return (
                <OcForm form={formInstance}>
                    <OcField initialValue="K1" name="selector">
                        <Select />
                    </OcField>
                </OcForm>
            );
        };

        const wrapper = mount(<Demo />);
        expect(wrapper.find('.select-div').text()).toBe('K1,K2');
    });

    test('remount should not clear current value', () => {
        let refForm;

        const Demo = ({ remount }) => {
            const [form] = OcForm.useForm();
            refForm = form;

            let node = (
                <OcForm form={form} initialValues={{ name: 'little' }}>
                    <OcField name="name">
                        <Input />
                    </OcField>
                </OcForm>
            );

            if (remount) {
                node = <div>{node}</div>;
            }

            return node;
        };

        const wrapper = mount(<Demo />);
        refForm.setFieldListValues({ name: 'mia' });
        wrapper.update();

        expect(wrapper.find('input').prop('value')).toEqual('mia');

        wrapper.setProps({ remount: true });
        wrapper.update();

        expect(wrapper.find('input').prop('value')).toEqual('mia');
    });

    test('setFieldValue', () => {
        const formRef = React.createRef();

        const Demo = () => (
            <OcForm
                ref={formRef}
                initialValues={{ list: ['mia', 'little', 'lola'] }}
            >
                <OcForm.OcList name="list">
                    {(fields) =>
                        fields.map((field) => (
                            <OcField key={field.key} {...field}>
                                <Input />
                            </OcField>
                        ))
                    }
                </OcForm.OcList>

                <OcField name={['nest', 'target']} initialValue="nested">
                    <Input />
                </OcField>
            </OcForm>
        );

        const wrapper = mount(<Demo />);
        expect(
            wrapper.find('input').map((input) => input.prop('value'))
        ).toEqual(['mia', 'little', 'lola', 'nested']);

        // Set
        formRef.current.setFieldValue(['list', 1], 'tiny');
        formRef.current.setFieldValue(['nest', 'target'], 'match');
        wrapper.update();

        expect(
            wrapper.find('input').map((input) => input.prop('value'))
        ).toEqual(['mia', 'tiny', 'lola', 'match']);
    });
});
