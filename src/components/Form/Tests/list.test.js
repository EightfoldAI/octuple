import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import MatchMediaMock from 'jest-matchmedia-mock';
import Form from '..';
import { PrimaryButton } from '../../Button';
import { TextInput } from '../../Inputs';
import { sleep } from '../../../tests/Utilities';
import { fireEvent, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia;

describe('Form.List', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    async function change(wrapper, index, value) {
        fireEvent.change(wrapper.getElementsByTagName('input')[index], {
            target: { value },
        });
        await sleep();
    }

    function testList(name, renderField) {
        test(name, async () => {
            jest.useFakeTimers();

            const { container } = render(
                <Form>
                    <Form.List name="list">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => renderField(field))}
                                <PrimaryButton
                                    classNames="add"
                                    onClick={add}
                                    text={'Add'}
                                />
                                <PrimaryButton
                                    classNames="remove-0"
                                    onClick={() => {
                                        remove(0);
                                    }}
                                    text={'Remove 0'}
                                />
                                <PrimaryButton
                                    classNames="remove-1"
                                    onClick={() => {
                                        remove(1);
                                    }}
                                    text={'Remove 1'}
                                />
                            </>
                        )}
                    </Form.List>
                </Form>
            );

            function operate(className) {
                act(() => {
                    fireEvent.click(container.querySelector(className));
                    jest.runAllTimers();
                });
            }

            operate('.add');
            expect(container.getElementsByTagName('input').length).toBe(1);

            operate('.add');
            expect(container.getElementsByTagName('input').length).toBe(2);

            operate('.add');
            expect(container.getElementsByTagName('input').length).toBe(3);

            await change(container, 2, '');
            for (let i = 0; i < 10; i += 1) {
                act(() => {
                    jest.runAllTimers();
                });
            }

            operate('.remove-0');
            expect(container.getElementsByTagName('input').length).toBe(2);

            operate('.remove-1');
            expect(container.getElementsByTagName('input').length).toBe(1);

            jest.useRealTimers();
        });
    }

    testList('operation correctly', (field) => (
        <Form.Item {...field} rules={[{ required: true }]}>
            <TextInput />
        </Form.Item>
    ));

    testList('nest noStyle', (field) => (
        <Form.Item key={field.key}>
            <Form.Item noStyle {...field} rules={[{ required: true }]}>
                <TextInput />
            </Form.Item>
        </Form.Item>
    ));

    // TODO: Need to investigate this as @testing-library/react fireEvent does not provide a workaround.
    test.skip('correct onFinish values', async () => {
        async function click(wrapper, className) {
            fireEvent.click(wrapper.querySelector(className));
        }

        const onFinish = jest.fn().mockImplementation(() => {});

        const { container } = render(
            <Form
                onFinish={(v) => {
                    if (typeof v.list[0] === 'object') {
                        /* SyntheticEvent is being passed as an value here. */
                        v = new Error('We expect value to be a primitive here');
                    }
                    onFinish(v);
                }}
            >
                <Form.List name="list">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map((field) => (
                                // key is in a field
                                // eslint-disable-next-line react/jsx-key
                                <Form.Item {...field}>
                                    <TextInput />
                                </Form.Item>
                            ))}
                            <PrimaryButton
                                classNames="add"
                                onClick={add}
                                text={'Add'}
                            />
                            <PrimaryButton
                                classNames="remove"
                                onClick={() => remove(0)}
                                text={'Remove'}
                            />
                        </>
                    )}
                </Form.List>
            </Form>
        );

        await click(container, '.add');
        await change(container, 0, 'input1');
        fireEvent.submit(container.querySelector('form'));
        await sleep();
        expect(onFinish).toHaveBeenLastCalledWith({ list: ['input1'] });

        await click(container, '.add');
        await change(container, 1, 'input2');
        await click(container, '.add');
        await change(container, 2, 'input3');
        fireEvent.submit(container.querySelector('form'));
        await sleep();
        expect(onFinish).toHaveBeenLastCalledWith({
            list: ['input1', 'input2', 'input3'],
        });

        await click(container, '.remove'); // will remove first input
        fireEvent.submit(container.querySelector('form'));
        await sleep();
        expect(onFinish).toHaveBeenLastCalledWith({
            list: ['input2', 'input3'],
        });
    });

    test('list errors', async () => {
        jest.useFakeTimers();

        let operation;
        const { container } = render(
            <Form>
                <Form.List
                    name="list"
                    rules={[
                        {
                            validator: async (_, value) => {
                                if (value.length < 2) {
                                    return Promise.reject(
                                        new Error('At least 2')
                                    );
                                }
                            },
                        },
                    ]}
                >
                    {(_, opt, { errors }) => {
                        operation = opt;
                        return <Form.ErrorList errors={errors} />;
                    }}
                </Form.List>
            </Form>
        );

        async function addItem() {
            await act(async () => {
                operation.add();
                await sleep(100);
                jest.runAllTimers();
            });

            act(() => {
                jest.runAllTimers();
            });
        }

        await addItem();
        expect(
            container.querySelector('.form-item-explain div').innerHTML
        ).toEqual('At least 2');

        await addItem();
        expect(
            container.getElementsByClassName('form-item-explain div')
        ).toHaveLength(0);

        jest.useRealTimers();
    });

    test('should render empty without errors', () => {
        const { container } = render(<Form.ErrorList />);
        expect(container.firstChild).toMatchSnapshot();
    });

    test('no warning when reset in validate', async () => {
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {});

        const Demo = () => {
            const [form] = Form.useForm();

            React.useEffect(() => {
                form.setFieldListValues({
                    list: [1],
                });
            }, []);

            return (
                <Form form={form}>
                    <Form.List name="list">
                        {(fields) =>
                            fields.map((field) => (
                                <Form.Item key={field.key} {...field}>
                                    <TextInput />
                                </Form.Item>
                            ))
                        }
                    </Form.List>
                    <button
                        id="validate"
                        type="button"
                        onClick={() => {
                            form.validateFields().then(() => {
                                form.resetFields();
                            });
                        }}
                    >
                        Validate
                    </button>
                </Form>
            );
        };

        const { container } = render(<Demo />);
        fireEvent.click(container.querySelector('button'));

        await sleep();

        expect(errorSpy).not.toHaveBeenCalled();

        errorSpy.mockRestore();
    });
});
