/* eslint-disable no-template-curly-in-string */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import OcForm, { OcField, useForm } from '../';
import InfoField, { Input } from './Common/InfoField';
import { changeValue, matchError, getField } from './Common';
import timeout from './Common/timeout';
import { OcFormInstance, ValidateMessages } from '../OcForm.types';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.Validate', () => {
    test('required', async () => {
        let form: OcFormInstance<any>;
        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <InfoField name="username" rules={[{ required: true }]} />
                </OcForm>
            </div>
        );

        await changeValue(wrapper, '');
        matchError(wrapper, true);
        expect(form.getFieldError('username')).toEqual([
            "'username' is required",
        ]);
        expect(form.getFieldListErrors()).toEqual([
            {
                name: ['username'],
                errors: ["'username' is required"],
                warnings: [],
            },
        ]);

        // Contains not exists
        expect(form.getFieldListErrors(['username', 'not-exist'])).toEqual([
            {
                name: ['username'],
                errors: ["'username' is required"],
                warnings: [],
            },
            {
                name: ['not-exist'],
                errors: [],
                warnings: [],
            },
        ]);
    });

    describe('validateMessages', () => {
        function renderForm(messages: ValidateMessages, fieldProps = {}) {
            return mount(
                <OcForm validateMessages={messages}>
                    <InfoField
                        name="username"
                        rules={[{ required: true }]}
                        {...fieldProps}
                    />
                </OcForm>
            );
        }

        test('template message', async () => {
            const wrapper = renderForm({ required: "You miss '${name}'!" });

            await changeValue(wrapper, '');
            matchError(wrapper, "You miss 'username'!");
        });

        test('function message', async () => {
            const wrapper = renderForm({ required: () => 'Mia & Lola' });

            await changeValue(wrapper, '');
            matchError(wrapper, 'Mia & Lola');
        });

        test('messageVariables', async () => {
            const wrapper = renderForm(
                { required: "You miss '${label}'!" },
                {
                    messageVariables: {
                        label: 'Lola&Mia',
                    },
                }
            );

            await changeValue(wrapper, '');
            matchError(wrapper, "You miss 'Lola&Mia'!");
        });
    });

    describe('customize validator', () => {
        test('work', async () => {
            const wrapper = mount(
                <OcForm>
                    <InfoField
                        name="username"
                        rules={[
                            {
                                async validator(_, value) {
                                    if (value !== 'mia') {
                                        return Promise.reject(
                                            new Error('should be mia!')
                                        );
                                    }
                                    return '';
                                },
                            },
                        ]}
                    />
                </OcForm>
            );

            // Wrong value
            await changeValue(wrapper, 'lola');
            matchError(wrapper, 'should be mia!');

            // Correct value
            await changeValue(wrapper, 'mia');
            matchError(wrapper, false);
        });

        test('should error if throw in validate', async () => {
            const errorSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});
            const wrapper = mount(
                <OcForm>
                    <InfoField
                        name="username"
                        rules={[
                            {
                                validator() {
                                    throw new Error('without thinking');
                                },
                            },
                        ]}
                    />
                </OcForm>
            );

            await changeValue(wrapper, 'lola');
            matchError(wrapper, "Validation error on field 'username'");

            const consoleErr = String(errorSpy.mock.calls[0][0]);
            expect(consoleErr).toBe('Error: without thinking');

            errorSpy.mockRestore();
        });
    });

    test('fail validate if throw', async () => {
        const wrapper = mount(
            <OcForm>
                <InfoField
                    name="username"
                    rules={[
                        {
                            validator() {
                                throw new Error('OPS');
                            },
                        },
                    ]}
                />
            </OcForm>
        );

        // Wrong value
        await changeValue(wrapper, 'lola');
        matchError(wrapper, "Validation error on field 'username'");
    });

    describe('callback', () => {
        test('when if not return promise', async () => {
            const wrapper = mount(
                <OcForm>
                    <InfoField
                        name="username"
                        rules={[
                            {
                                validator(_, _value, callback) {
                                    callback();
                                },
                            },
                        ]}
                    />
                </OcForm>
            );

            await changeValue(wrapper, 'lola');
        });

        test('when both promise & callback exist', async () => {
            const wrapper = mount(
                <OcForm>
                    <InfoField
                        name="username"
                        rules={[
                            {
                                async validator(_, __, callback) {
                                    callback();
                                    return new Promise(() => {});
                                },
                            },
                        ]}
                    />
                </OcForm>
            );

            await changeValue(wrapper, 'lola');
        });
    });

    describe('validateTrigger', () => {
        test('normal', async () => {
            let form: OcFormInstance<any>;
            const wrapper = mount(
                <div>
                    <OcForm
                        ref={(instance) => {
                            form = instance;
                        }}
                    >
                        <InfoField
                            name="test"
                            validateTrigger={['onBlur', 'onChange']}
                            rules={[
                                { required: true, validateTrigger: 'onBlur' },
                                {
                                    validator: async () => {
                                        throw new Error('Not pass');
                                    },
                                    validateTrigger: 'onChange',
                                },
                            ]}
                        >
                            <Input />
                        </InfoField>
                    </OcForm>
                </div>
            );

            await changeValue(getField(wrapper, 'test'), '');
            expect(form.getFieldError('test')).toEqual(['Not pass']);

            wrapper.find('input').simulate('blur');
            await timeout();
            expect(form.getFieldError('test')).toEqual(["'test' is required"]);
        });

        test('change validateTrigger', async () => {
            let form: OcFormInstance<any>;

            const Test = ({ init = false }) => (
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <OcField
                        name="title"
                        validateTrigger={init ? 'onChange' : 'onBlur'}
                        rules={[
                            { required: true, message: 'Title is required' },
                            {
                                min: 3,
                                message: 'Title should be 3+ characters',
                            },
                        ]}
                    >
                        <Input />
                    </OcField>
                </OcForm>
            );

            const wrapper = mount(<Test />);

            getField(wrapper).simulate('blur');
            await timeout();
            expect(form.getFieldError('title')).toEqual(['Title is required']);

            wrapper.setProps({ init: true });
            await changeValue(getField(wrapper), '1');
            expect(form.getFieldValue('title')).toBe('1');
            expect(form.getFieldError('title')).toEqual([
                'Title should be 3+ characters',
            ]);
        });

        test('form context', async () => {
            const wrapper = mount(
                <OcForm validateTrigger="onBlur">
                    <InfoField name="test" rules={[{ required: true }]} />
                </OcForm>
            );

            // Not trigger validate since OcForm set `onBlur`
            await changeValue(getField(wrapper), '');
            matchError(wrapper, false);

            // Trigger onBlur
            wrapper.find('input').simulate('blur');
            await timeout();
            wrapper.update();
            matchError(wrapper, true);

            // Update OcForm context
            wrapper.setProps({ validateTrigger: 'onChange' });
            await changeValue(getField(wrapper), '1');
            matchError(wrapper, false);
        });
    });

    describe('validate only accept exist fields', () => {
        test('skip init value', async () => {
            let form: OcFormInstance<any>;
            const onFinish = jest.fn();

            const wrapper = mount(
                <div>
                    <OcForm
                        onFinish={onFinish}
                        ref={(instance) => {
                            form = instance;
                        }}
                        initialValues={{ user: 'lola', pass: 'mia' }}
                    >
                        <InfoField name="user">
                            <Input />
                        </InfoField>
                        <button type="submit">submit</button>
                    </OcForm>
                </div>
            );

            // Validate callback
            expect(await form.validateFields(['user'])).toEqual({
                user: 'lola',
            });
            expect(await form.validateFields()).toEqual({ user: 'lola' });

            // Submit callback
            wrapper.find('button').simulate('submit');
            await timeout();
            expect(onFinish).toHaveBeenCalledWith({ user: 'lola' });
        });

        test('remove from fields', async () => {
            const onFinish = jest.fn();
            const wrapper = mount(
                <OcForm
                    onFinish={onFinish}
                    initialValues={{
                        switch: true,
                        ignore: 'test',
                    }}
                >
                    <InfoField name="switch" valuePropName="checked">
                        <Input type="checkbox" className="switch" />
                    </InfoField>
                    <OcField shouldUpdate>
                        {(_, __, { getFieldValue }) =>
                            getFieldValue('switch') && (
                                <InfoField name="ignore">
                                    <Input className="ignore" />
                                </InfoField>
                            )
                        }
                    </OcField>
                    <button type="submit">submit</button>
                </OcForm>
            );

            // Submit callback
            wrapper.find('button').simulate('submit');
            await timeout();
            expect(onFinish).toHaveBeenCalledWith({
                switch: true,
                ignore: 'test',
            });
            onFinish.mockReset();

            // Hide one
            wrapper.find('input.switch').simulate('change', {
                target: {
                    checked: false,
                },
            });
            wrapper.find('button').simulate('submit');
            await timeout();
            expect(onFinish).toHaveBeenCalledWith({ switch: false });
        });

        test('validateFields should not pass when validateFirst is set', async () => {
            let form: OcFormInstance<any>;

            mount(
                <div>
                    <OcForm
                        ref={(instance) => {
                            form = instance;
                        }}
                    >
                        <InfoField
                            name="user"
                            validateFirst
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </InfoField>
                    </OcForm>
                </div>
            );

            // Validate callback
            await new Promise((resolve) => {
                let failed = false;
                form.validateFields()
                    .catch(() => {
                        failed = true;
                    })
                    .then(() => {
                        expect(failed).toBeTruthy();
                        resolve('');
                    });
            });
        });
    });

    test('should error in console if user script failed', async () => {
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const wrapper = mount(
            <OcForm
                onFinish={() => {
                    throw new Error('should console this');
                }}
                initialValues={{ user: 'lola' }}
            >
                <InfoField name="user">
                    <Input />
                </InfoField>
            </OcForm>
        );

        wrapper.find('form').simulate('submit');
        await timeout();
        expect(errorSpy.mock.calls[0][0].message).toEqual(
            'should console this'
        );

        errorSpy.mockRestore();
    });

    describe('validateFirst', () => {
        test('work', async () => {
            let form: OcFormInstance<any>;
            let canEnd = false;
            const onFinish = jest.fn();

            const wrapper = mount(
                <div>
                    <OcForm
                        ref={(instance) => {
                            form = instance;
                        }}
                        onFinish={onFinish}
                    >
                        <InfoField
                            name="username"
                            validateFirst
                            rules={[
                                // Follow promise will never end
                                { required: true },
                                {
                                    validator: () =>
                                        new Promise((resolve) => {
                                            if (canEnd) {
                                                resolve('');
                                            }
                                        }),
                                },
                            ]}
                        />
                    </OcForm>
                </div>
            );

            // Not pass
            await changeValue(wrapper, '');
            matchError(wrapper, true);
            expect(form.getFieldError('username')).toEqual([
                "'username' is required",
            ]);
            expect(form.getFieldListErrors()).toEqual([
                {
                    name: ['username'],
                    errors: ["'username' is required"],
                    warnings: [],
                },
            ]);
            expect(onFinish).not.toHaveBeenCalled();

            // Should pass
            canEnd = true;
            await changeValue(wrapper, 'test');
            wrapper.find('form').simulate('submit');
            await timeout();

            matchError(wrapper, false);
            expect(onFinish).toHaveBeenCalledWith({ username: 'test' });
        });

        [
            {
                name: 'serialization',
                first: true,
                second: false,
                validateFirst: true,
            },
            {
                name: 'parallel',
                first: true,
                second: true,
                validateFirst: 'parallel' as const,
            },
        ].forEach(({ name, first, second, validateFirst }) => {
            test(name, async () => {
                let ruleFirst = false;
                let ruleSecond = false;

                const wrapper = mount(
                    <OcForm>
                        <InfoField
                            name="username"
                            validateFirst={validateFirst}
                            rules={[
                                {
                                    validator: async () => {
                                        ruleFirst = true;
                                        await timeout();
                                        throw new Error('failed first');
                                    },
                                },
                                {
                                    validator: async () => {
                                        ruleSecond = true;
                                        await timeout();
                                        throw new Error('failed second');
                                    },
                                },
                            ]}
                        />
                    </OcForm>
                );

                await changeValue(wrapper, 'test');
                await timeout();

                wrapper.update();
                matchError(wrapper, 'failed first');

                expect(ruleFirst).toEqual(first);
                expect(ruleSecond).toEqual(second);
            });
        });
    });

    test('switch to remove errors', async () => {
        const Demo = () => {
            const [checked, setChecked] = React.useState(true);

            return (
                <OcForm>
                    <button
                        type="button"
                        onClick={() => {
                            setChecked(!checked);
                        }}
                    />
                    <InfoField
                        name={checked ? 'username' : 'age'}
                        rules={
                            checked
                                ? [
                                      {
                                          validator(_rule, _value, callback) {
                                              callback('Integer number only!');
                                          },
                                      },
                                  ]
                                : []
                        }
                    />
                </OcForm>
            );
        };
        const wrapper = mount(<Demo />);

        await changeValue(wrapper, '233');
        matchError(wrapper, true);

        wrapper.find('button').simulate('click');
        wrapper.update();
        matchError(wrapper, false);
    });

    test('submit should trigger OcField re-render', () => {
        const renderProps = jest.fn().mockImplementation(() => null);

        const Demo = () => {
            const [form] = useForm();

            return (
                <OcForm form={form}>
                    <OcField
                        name="test"
                        rules={[
                            {
                                validator: async () =>
                                    Promise.reject(new Error('Failed')),
                            },
                        ]}
                    >
                        {renderProps}
                    </OcField>
                    <button
                        type="button"
                        onClick={() => {
                            form.submit();
                        }}
                    />
                </OcForm>
            );
        };

        const wrapper = mount(<Demo />);
        renderProps.mockReset();

        // Should trigger validating
        wrapper.find('button').simulate('click');
        expect(renderProps.mock.calls[0][1]).toEqual(
            expect.objectContaining({ validating: true })
        );
    });

    test('renderProps should use latest rules', async () => {
        let failedTriggerTimes = 0;
        let passedTriggerTimes = 0;

        interface FormStore {
            username: string;
            password: string;
        }

        const Demo = () => (
            <OcForm>
                <InfoField name="username" />
                <OcForm.OcField<FormStore>
                    shouldUpdate={(prev, cur) => prev.username !== cur.username}
                >
                    {(_, __, { getFieldValue }) => {
                        const value = getFieldValue('username');

                        if (value === 'removed') {
                            return null;
                        }

                        return (
                            <InfoField
                                dependencies={['username']}
                                name="password"
                                rules={
                                    value !== 'lola'
                                        ? [
                                              {
                                                  validator: async () => {
                                                      failedTriggerTimes += 1;
                                                      throw new Error('Failed');
                                                  },
                                              },
                                          ]
                                        : [
                                              {
                                                  validator: async () => {
                                                      passedTriggerTimes += 1;
                                                  },
                                              },
                                          ]
                                }
                            />
                        );
                    }}
                </OcForm.OcField>
            </OcForm>
        );

        const wrapper = mount(<Demo />);

        expect(failedTriggerTimes).toEqual(0);
        expect(passedTriggerTimes).toEqual(0);

        // Failed of second input
        await changeValue(getField(wrapper, 1), '');
        matchError(getField(wrapper, 2), true);

        expect(failedTriggerTimes).toEqual(1);
        expect(passedTriggerTimes).toEqual(0);

        // Changed first to trigger update
        await changeValue(getField(wrapper, 0), 'lola');
        matchError(getField(wrapper, 2), false);

        expect(failedTriggerTimes).toEqual(1);
        expect(passedTriggerTimes).toEqual(1);

        // Remove should not trigger validate
        await changeValue(getField(wrapper, 0), 'removed');

        expect(failedTriggerTimes).toEqual(1);
        expect(passedTriggerTimes).toEqual(1);
    });

    test('validate support recursive', async () => {
        let form: OcFormInstance<any>;
        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                >
                    <InfoField
                        name={['username', 'do']}
                        rules={[{ required: true }]}
                    />
                    <InfoField
                        name={['username', 'list']}
                        rules={[{ required: true }]}
                    />
                </OcForm>
            </div>
        );

        wrapper
            .find('input')
            .at(0)
            .simulate('change', { target: { value: '' } });
        await act(async () => {
            await timeout();
        });
        wrapper.update();

        try {
            const values = await form.validateFields(['username']);
            expect(values.username.do).toBe('');
        } catch (error) {
            expect(error.errorFields.length).toBe(2);
        }

        const values = await form.validateFields(['username']);
        expect(values.username.do).toBe('');
    });

    test('not trigger validator', async () => {
        const wrapper = mount(
            <div>
                <OcForm>
                    <InfoField name="user" rules={[{ required: true }]} />
                </OcForm>
            </div>
        );
        await changeValue(getField(wrapper, 0), ['lola']);
        matchError(wrapper, false);
    });
});
/* eslint-enable no-template-curly-in-string */
