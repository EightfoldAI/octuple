import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import OcForm, { OcField } from '../';

Enzyme.configure({ adapter: new Adapter() });

describe('OcForm.OcField', () => {
    test('field remount should trigger constructor again', () => {
        const Demo = ({ visible }: { visible: boolean }) => {
            const [form] = OcForm.useForm();

            const fieldNode = <OcField name="lola" initialValue="mia" />;

            return <OcForm form={form}>{visible ? fieldNode : null}</OcForm>;
        };

        // First mount
        const wrapper = mount(<Demo visible />);
        const instance = wrapper.find('OcField').instance() as any;
        expect(instance.cancelRegisterFunc).toBeTruthy();

        // Hide
        wrapper.setProps({ visible: false });
        expect(instance.cancelRegisterFunc).toBeFalsy();

        // Mount again
        wrapper.setProps({ visible: true });
        expect(instance.cancelRegisterFunc).toBeFalsy();
        expect(
            (wrapper.find('OcField').instance() as any).cancelRegisterFunc
        ).toBeTruthy();
    });
});
