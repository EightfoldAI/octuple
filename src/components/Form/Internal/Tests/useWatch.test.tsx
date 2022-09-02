import React, { useState } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import type { OcFormInstance } from '../';
import { OcList } from '../';
import OcForm, { OcField } from '../';
import timeout from './Common/timeout';
import { act } from 'react-dom/test-utils';
import { Input } from './Common/InfoField';
import { stringify } from '../useWatch';

Enzyme.configure({ adapter: new Adapter() });

describe('useWatch', () => {
    let staticForm: OcFormInstance<any>;

    test('field initialValue', async () => {
        const Demo = () => {
            const [form] = OcForm.useForm();
            const nameValue = OcForm.useWatch<string>('name', form);

            return (
                <div>
                    <OcForm form={form}>
                        <OcField name="name" initialValue="mia">
                            <Input />
                        </OcField>
                    </OcForm>
                    <div className="values">{nameValue}</div>
                </div>
            );
        };
        await act(async () => {
            const wrapper = mount(<Demo />);
            await timeout();
            expect(wrapper.find('.values').text()).toEqual('mia');
        });
    });

    test('form initialValue', async () => {
        const Demo = () => {
            const [form] = OcForm.useForm();
            const nameValue = OcForm.useWatch<string>(['name'], form);

            return (
                <div>
                    <OcForm
                        form={form}
                        initialValues={{ name: 'mia', other: 'other' }}
                    >
                        <OcField name="name">
                            <Input />
                        </OcField>
                    </OcForm>
                    <div className="values">{nameValue}</div>
                </div>
            );
        };
        await act(async () => {
            const wrapper = mount(<Demo />);
            await timeout();
            expect(wrapper.find('.values').text()).toEqual('mia');
        });
    });

    test('change value with form api', async () => {
        const Demo = () => {
            const [form] = OcForm.useForm();
            const nameValue = OcForm.useWatch<string>(['name'], form);

            return (
                <div>
                    <OcForm
                        form={form}
                        ref={(instance) => {
                            staticForm = instance;
                        }}
                    >
                        <OcField name="name">
                            <Input />
                        </OcField>
                    </OcForm>
                    <div className="values">{nameValue}</div>
                </div>
            );
        };
        await act(async () => {
            const wrapper = mount(<Demo />);
            await timeout();
            staticForm.setFields([{ name: 'name', value: 'little' }]);
            expect(wrapper.find('.values').text()).toEqual('little');

            staticForm.setFieldListValues({ name: 'lola' });
            expect(wrapper.find('.values').text()).toEqual('lola');

            staticForm.resetFields();
            expect(wrapper.find('.values').text()).toEqual('');
        });
    });

    describe('unmount', () => {
        test('basic', async () => {
            const Demo = ({ visible }: { visible: boolean }) => {
                const [form] = OcForm.useForm();
                const nameValue = OcForm.useWatch<string>(['name'], form);

                return (
                    <div>
                        <OcForm form={form} initialValues={{ name: 'mia' }}>
                            {visible && (
                                <OcField name="name">
                                    <Input />
                                </OcField>
                            )}
                        </OcForm>
                        <div className="values">{nameValue}</div>
                    </div>
                );
            };

            await act(async () => {
                const wrapper = mount(<Demo visible />);
                await timeout();

                expect(wrapper.find('.values').text()).toEqual('mia');

                wrapper.setProps({ visible: false });
                expect(wrapper.find('.values').text()).toEqual('');

                wrapper.setProps({ visible: true });
                expect(wrapper.find('.values').text()).toEqual('mia');
            });
        });

        test('nest children component', async () => {
            const DemoWatch = () => {
                OcForm.useWatch(['name']);

                return (
                    <OcField name="name">
                        <Input />
                    </OcField>
                );
            };

            const Demo = ({ visible }: { visible: boolean }) => {
                const [form] = OcForm.useForm();
                const nameValue = OcForm.useWatch<string>(['name'], form);

                return (
                    <div>
                        <OcForm form={form} initialValues={{ name: 'mia' }}>
                            {visible && <DemoWatch />}
                        </OcForm>
                        <div className="values">{nameValue}</div>
                    </div>
                );
            };

            await act(async () => {
                const wrapper = mount(<Demo visible />);
                await timeout();

                expect(wrapper.find('.values').text()).toEqual('mia');

                wrapper.setProps({ visible: false });
                expect(wrapper.find('.values').text()).toEqual('');

                wrapper.setProps({ visible: true });
                expect(wrapper.find('.values').text()).toEqual('mia');
            });
        });
    });

    test('list', async () => {
        const Demo = () => {
            const [form] = OcForm.useForm();
            const users = OcForm.useWatch<string[]>(['users'], form) || [];

            return (
                <OcForm
                    form={form}
                    style={{ border: '1px solid red', padding: 15 }}
                >
                    <div className="values">{JSON.stringify(users)}</div>
                    <OcList name="users" initialValue={['mia', 'lola']}>
                        {(fields, { remove }) => {
                            return (
                                <div>
                                    {fields.map((field, index) => (
                                        <OcField
                                            {...field}
                                            key={field.key}
                                            rules={[{ required: true }]}
                                        >
                                            {(control) => (
                                                <div>
                                                    <Input {...control} />
                                                    <a
                                                        className="remove"
                                                        onClick={() =>
                                                            remove(index)
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </OcField>
                                    ))}
                                </div>
                            );
                        }}
                    </OcList>
                </OcForm>
            );
        };
        await act(async () => {
            const wrapper = mount(<Demo />);
            await timeout();
            expect(wrapper.find('.values').text()).toEqual(
                JSON.stringify(['mia', 'lola'])
            );

            wrapper.find('.remove').at(0).simulate('click');
            await timeout();
            expect(wrapper.find('.values').text()).toEqual(
                JSON.stringify(['lola'])
            );
        });
    });

    test('no more render time', () => {
        let renderTime = 0;

        const Demo = () => {
            const [form] = OcForm.useForm();
            const name = OcForm.useWatch<string>('name', form);

            renderTime += 1;

            return (
                <OcForm form={form}>
                    <OcField name="name">
                        <Input />
                    </OcField>
                    <OcField name="age">
                        <Input />
                    </OcField>
                    <div className="value">{name}</div>
                </OcForm>
            );
        };

        const wrapper = mount(<Demo />);
        expect(renderTime).toEqual(1);

        wrapper
            .find('input')
            .first()
            .simulate('change', {
                target: {
                    value: 'mia',
                },
            });
        expect(renderTime).toEqual(2);

        wrapper
            .find('input')
            .last()
            .simulate('change', {
                target: {
                    value: '123',
                },
            });
        expect(renderTime).toEqual(2);

        wrapper
            .find('input')
            .last()
            .simulate('change', {
                target: {
                    value: '123456',
                },
            });
        expect(renderTime).toEqual(2);
    });

    test('typescript', () => {
        type FieldType = {
            main?: string;
            name?: string;
            age?: number;
            gender?: boolean;
            demo?: string;
            demo2?: string;
            id?: number;
            demo1?: { demo2?: { demo3?: { demo4?: string } } };
        };

        const Demo = () => {
            const [form] = OcForm.useForm<FieldType>();
            const values = OcForm.useWatch([], form);
            const main = OcForm.useWatch('main', form);
            const age = OcForm.useWatch(['age'], form);
            const demo1 = OcForm.useWatch(['demo1'], form);
            const demo2 = OcForm.useWatch(['demo1', 'demo2'], form);
            const demo3 = OcForm.useWatch(['demo1', 'demo2', 'demo3'], form);
            const demo4 = OcForm.useWatch(
                ['demo1', 'demo2', 'demo3', 'demo4'],
                form
            );
            const demo5 = OcForm.useWatch(
                ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'],
                form
            );
            const more = OcForm.useWatch(['age', 'name', 'gender'], form);
            const demo = OcForm.useWatch<string>(['demo']);

            return (
                <>
                    {JSON.stringify({
                        values,
                        main,
                        age,
                        demo1,
                        demo2,
                        demo3,
                        demo4,
                        demo5,
                        more,
                        demo,
                    })}
                </>
            );
        };

        mount(<Demo />);
    });

    test('not trigger effect', () => {
        let updateA = 0;
        let updateB = 0;

        const Demo = () => {
            const [form] = OcForm.useForm();
            const userA = OcForm.useWatch(['a'], form);
            const userB = OcForm.useWatch(['b'], form);

            React.useEffect(() => {
                updateA += 1;
                console.log('Update A', userA);
            }, [userA]);
            React.useEffect(() => {
                updateB += 1;
                console.log('Update B', userB);
            }, [userB]);

            return (
                <OcForm form={form}>
                    <OcField name={['a', 'name']}>
                        <Input />
                    </OcField>
                    <OcField name={['b', 'name']}>
                        <Input />
                    </OcField>
                </OcForm>
            );
        };

        const wrapper = mount(<Demo />);

        console.log('Change!');
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: 'mia' } });

        expect(updateA > updateB).toBeTruthy();
    });

    test('mount while unmount', () => {
        const Demo = () => {
            const [form] = OcForm.useForm();
            const [type, setType] = useState(true);
            const name = OcForm.useWatch<string>('name', form);

            return (
                <OcForm form={form}>
                    <button type="button" onClick={() => setType((c) => !c)}>
                        type
                    </button>
                    {type && (
                        <OcField name="name" key="a">
                            <Input />
                        </OcField>
                    )}
                    {!type && (
                        <OcField name="name" key="b">
                            <Input />
                        </OcField>
                    )}
                    <div className="value">{name}</div>
                </OcForm>
            );
        };

        const wrapper = mount(<Demo />);
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: 'mia' } });
        wrapper.find('button').at(0).simulate('click');
        expect(wrapper.find('.value').text()).toEqual('mia');
    });
    test('stringify error', () => {
        const obj: any = {};
        obj.name = obj;
        const str = stringify(obj);
        expect(typeof str === 'number').toBeTruthy();
    });
});
