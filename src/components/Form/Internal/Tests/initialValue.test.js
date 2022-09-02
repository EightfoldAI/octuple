import React, { useState } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcForm, { OcField, useForm, OcList } from '../';
import { Input } from './Common/InfoField';
import { changeValue, getField } from './Common';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.InitialValues', () => {
    test('works', () => {
        let form;

        const wrapper = mount(
            <div>
                <OcForm
                    ref={(instance) => {
                        form = instance;
                    }}
                    initialValues={{
                        username: 'Lola',
                        path1: { path2: 'Mia' },
                    }}
                >
                    <OcField name="username">
                        <Input />
                    </OcField>
                    <OcField name={['path1', 'path2']}>
                        <Input />
                    </OcField>
                </OcForm>
            </div>
        );

        expect(form.getFieldListValues()).toEqual({
            username: 'Lola',
            path1: {
                path2: 'Mia',
            },
        });
        expect(form.getFieldListValues(['username'])).toEqual({
            username: 'Lola',
        });
        expect(form.getFieldListValues(['path1'])).toEqual({
            path1: {
                path2: 'Mia',
            },
        });
        expect(
            form.getFieldListValues(['username', ['path1', 'path2']])
        ).toEqual({
            username: 'Lola',
            path1: {
                path2: 'Mia',
            },
        });
        expect(
            getField(wrapper, 'username').find('input').props().value
        ).toEqual('Lola');
        expect(
            getField(wrapper, ['path1', 'path2']).find('input').props().value
        ).toEqual('Mia');
    });

    test('update and reset should use new initialValues', () => {
        let form;
        let mountCount = 0;

        const TestInput = (props) => {
            React.useEffect(() => {
                mountCount += 1;
            }, []);

            return <Input {...props} />;
        };

        const Test = ({ initialValues }) => (
            <OcForm
                ref={(instance) => {
                    form = instance;
                }}
                initialValues={initialValues}
            >
                <OcField name="username">
                    <Input />
                </OcField>
                <OcField name="email">
                    <TestInput />
                </OcField>
            </OcForm>
        );

        const wrapper = mount(<Test initialValues={{ username: 'Mia' }} />);
        expect(form.getFieldListValues()).toEqual({
            username: 'Mia',
        });
        expect(
            getField(wrapper, 'username').find('input').props().value
        ).toEqual('Mia');

        // Should not change it
        wrapper.setProps({ initialValues: { username: 'Lola' } });
        wrapper.update();
        expect(form.getFieldListValues()).toEqual({
            username: 'Mia',
        });
        expect(
            getField(wrapper, 'username').find('input').props().value
        ).toEqual('Mia');

        // Should change it
        form.resetFields();
        wrapper.update();
        expect(mountCount).toEqual(1);
        expect(form.getFieldListValues()).toEqual({
            username: 'Lola',
        });
        expect(
            getField(wrapper, 'username').find('input').props().value
        ).toEqual('Lola');
    });

    test("initialValues shouldn't be modified if preserve is false", () => {
        const formValue = {
            test: 'test',
            users: [{ first: 'aaa', last: 'bbb' }],
        };

        let refForm;

        const Demo = () => {
            const [form] = OcForm.useForm();
            const [show, setShow] = useState(false);

            refForm = form;

            return (
                <>
                    <button
                        className="test-button"
                        onClick={() => setShow((prev) => !prev)}
                    >
                        switch show
                    </button>
                    {show && (
                        <OcForm
                            form={form}
                            initialValues={formValue}
                            preserve={false}
                        >
                            <OcField shouldUpdate>
                                {() => (
                                    <OcField name="test" preserve={false}>
                                        <Input />
                                    </OcField>
                                )}
                            </OcField>
                            <OcList name="users">
                                {(fields) => (
                                    <>
                                        {fields.map(
                                            ({ key, name, ...restField }) => (
                                                <React.Fragment key={key}>
                                                    <OcField
                                                        {...restField}
                                                        name={[name, 'first']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Missing first name',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            className="first-name-input"
                                                            placeholder="First Name"
                                                        />
                                                    </OcField>
                                                    <OcField
                                                        {...restField}
                                                        name={[name, 'last']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'Missing last name',
                                                            },
                                                        ]}
                                                    >
                                                        <Input placeholder="Last Name" />
                                                    </OcField>
                                                </React.Fragment>
                                            )
                                        )}
                                    </>
                                )}
                            </OcList>
                        </OcForm>
                    )}
                </>
            );
        };

        const wrapper = mount(<Demo />);
        wrapper.find('button').simulate('click');
        expect(formValue.users[0].last).toEqual('bbb');

        wrapper.find('button').simulate('click');
        expect(formValue.users[0].last).toEqual('bbb');
        console.log('Form Value:', refForm.getFieldListValues(true));

        wrapper.find('button').simulate('click');
        wrapper.update();

        expect(formValue.users[0].first).toEqual('aaa');
    });

    describe('OcField with initialValue', () => {
        test('should not replace user input', async () => {
            const Test = () => {
                const [show, setShow] = React.useState(false);

                return (
                    <OcForm>
                        {show && (
                            <OcField name="test" initialValue="lola">
                                <Input />
                            </OcField>
                        )}
                        <button
                            type="button"
                            onClick={() => {
                                setShow(!show);
                            }}
                        />
                    </OcForm>
                );
            };

            const wrapper = mount(<Test />);
            wrapper.find('button').simulate('click');
            wrapper.update();

            // First mount should reset value
            expect(wrapper.find('input').props().value).toEqual('lola');

            // Do not reset value when value already exist
            await changeValue(wrapper, 'mia');
            expect(wrapper.find('input').props().value).toEqual('mia');

            wrapper.find('button').simulate('click');
            wrapper.find('button').simulate('click');
            wrapper.update();
            expect(wrapper.find('input').props().value).toEqual('mia');
        });

        test('form reset should work', async () => {
            const Test = () => {
                const [form] = useForm();
                const [initVal, setInitVal] = React.useState(undefined);

                return (
                    <OcForm form={form}>
                        <OcField name="mia" initialValue={initVal}>
                            <Input />
                        </OcField>
                        <button
                            type="button"
                            onClick={() => {
                                form.resetFields();
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setInitVal('lola');
                            }}
                        />
                    </OcForm>
                );
            };

            const wrapper = mount(<Test />);
            expect(wrapper.find('input').props().value).toEqual('');

            // User input
            await changeValue(wrapper, 'story');
            expect(wrapper.find('input').props().value).toEqual('story');

            // First reset will get nothing
            wrapper.find('button').first().simulate('click');
            expect(wrapper.find('input').props().value).toEqual('');

            // Change field initialValue and reset
            wrapper.find('button').last().simulate('click');
            wrapper.find('button').first().simulate('click');
            expect(wrapper.find('input').props().value).toEqual('lola');
        });

        test('reset by namePath', async () => {
            const Test = () => {
                const [form] = useForm();

                return (
                    <OcForm form={form}>
                        <OcField name="mia" initialValue="lola">
                            <Input />
                        </OcField>
                        <button
                            type="button"
                            onClick={() => {
                                form.resetFields(['mia']);
                            }}
                        />
                    </OcForm>
                );
            };

            const wrapper = mount(<Test />);
            await changeValue(wrapper, 'story');
            expect(wrapper.find('input').props().value).toEqual('story');

            wrapper.find('button').simulate('click');
            expect(wrapper.find('input').props().value).toEqual('lola');
        });

        test('ignore dynamic initialValue', () => {
            const Test = () => {
                const [initVal, setInitVal] = React.useState('mia');
                return (
                    <OcForm>
                        <OcField name="test" initialValue={initVal}>
                            <Input />
                        </OcField>
                        <button
                            type="button"
                            onClick={() => {
                                setInitVal('lola');
                            }}
                        />
                    </OcForm>
                );
            };

            const wrapper = mount(<Test />);
            expect(wrapper.find('input').props().value).toEqual('mia');

            wrapper.find('button').simulate('click');
            expect(wrapper.find('input').props().value).toEqual('mia');
        });

        test('not initialValue when not mount', () => {
            let formInstance;

            const Test = () => {
                const [form] = OcForm.useForm();
                formInstance = form;

                const fieldNode = <OcField name="mia" initialValue="lola" />;

                expect(fieldNode).toBeTruthy();

                return (
                    <OcForm form={form}>
                        <OcField name="lola" initialValue="mia">
                            {(control) => {
                                expect(control.value).toEqual('mia');
                                return null;
                            }}
                        </OcField>
                    </OcForm>
                );
            };

            const wrapper = mount(<Test />);

            expect(formInstance.getFieldListValues()).toEqual({ lola: 'mia' });

            wrapper.unmount();
        });
    });
});
