import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcForm from '../';
import InfoField from './Common/InfoField';
import { changeValue, matchError } from './Common';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.Control', () => {
    test('fields', () => {
        const wrapper = mount(
            <OcForm>
                <InfoField name="username" />
            </OcForm>
        );

        wrapper.setProps({
            fields: [{ name: 'username', value: 'Bamboo' }],
        });
        wrapper.update();

        expect(wrapper.find('input').props().value).toEqual('Bamboo');
    });

    test('fully test', async () => {
        const Test = () => {
            const [fields, setFields] = React.useState([]);

            return (
                <OcForm
                    fields={fields}
                    onFieldsChange={(_, allFields) => {
                        setFields(allFields);
                    }}
                >
                    <InfoField name="test" rules={[{ required: true }]} />
                </OcForm>
            );
        };

        const wrapper = mount(<Test />);

        await changeValue(wrapper, '');
        matchError(wrapper, "'test' is required");
    });
});
