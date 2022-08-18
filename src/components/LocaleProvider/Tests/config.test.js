import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import { sleep } from '../../../tests/Utilities';
import { ConfigProvider } from '../../ConfigProvider';
import zhCN from '../zh_CN';

Enzyme.configure({ adapter: new Adapter() });

class Demo extends React.Component {
    static defaultProps = {};

    componentDidMount() {
        if (this.props.type === 'dashboard') {
        }
    }

    render() {
        return <div>{this.props.type}</div>;
    }
}

describe('Locale Provider demo', () => {
    it('change type', async () => {
        jest.useFakeTimers();

        const BasicExample = () => {
            const [type, setType] = React.useState('');
            return (
                <div>
                    <a className="about" onClick={() => setType('about')}>
                        about
                    </a>
                    <a
                        className="dashboard"
                        onClick={() => setType('dashboard')}
                    >
                        dashboard
                    </a>
                    <div>
                        {type === 'about' && (
                            <ConfigProvider locale={zhCN}>
                                <Demo type="about" />
                            </ConfigProvider>
                        )}
                        {type === 'dashboard' && (
                            <ConfigProvider locale={zhCN}>
                                <Demo type="dashboard" />
                            </ConfigProvider>
                        )}
                    </div>
                </div>
            );
        };
        const wrapper = mount(<BasicExample />);

        wrapper.find('.about').at(0).simulate('click');
        await act(async () => {
            jest.runAllTimers();
            await sleep();
        });

        wrapper.find('.dashboard').at(0).simulate('click');
        await act(async () => {
            jest.runAllTimers();
            await sleep();
        });

        expect(
            document.body.querySelectorAll('.button span')[0].textContent
        ).toBe('确 定');
        jest.useRealTimers();
    });
});
