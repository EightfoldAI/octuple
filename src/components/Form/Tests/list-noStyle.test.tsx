import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import MatchMediaMock from 'jest-matchmedia-mock';
import { act } from 'react-dom/test-utils';
import Form from '../';
import { TextInput } from '../../Inputs';
import type { FormListOperation } from '../Form.types';
import { sleep } from '../../../tests/Utilities';

Enzyme.configure({ adapter: new Adapter() });

let matchMedia: any;

describe('Form.List.NoStyle', () => {
    beforeAll(() => {
        matchMedia = new MatchMediaMock();
    });

    afterEach(() => {
        matchMedia.clear();
    });

    it('nest error should clean up', async () => {
        jest.useFakeTimers();

        let operation: FormListOperation;

        const wrapper = mount(
            <Form>
                <Form.List name="users">
                    {(fields, op) => {
                        operation = op;

                        return fields.map((field) => (
                            <Form.Item key={field.key}>
                                <Form.Item
                                    {...field}
                                    name={[field.name, 'first']}
                                    rules={[{ required: true }]}
                                    noStyle
                                >
                                    <TextInput />
                                </Form.Item>
                            </Form.Item>
                        ));
                    }}
                </Form.List>
            </Form>
        );

        // Add two
        async function addItem() {
            await act(async () => {
                operation!.add();
                await sleep(100);
                jest.runAllTimers();
                wrapper.update();
            });
        }

        addItem();
        addItem();

        // Submit
        await act(async () => {
            wrapper.find('form').simulate('submit');
            await sleep(100);
            jest.runAllTimers();
            wrapper.update();
        });

        // Remove first field
        await act(async () => {
            operation!.remove(0);
            await sleep(100);
            jest.runAllTimers();
            wrapper.update();
        });

        // Match error message
        expect(wrapper.find('.form-item-explain-error').text()).toEqual(
            "'users.1.first' is required"
        );

        jest.useRealTimers();
    });
});
