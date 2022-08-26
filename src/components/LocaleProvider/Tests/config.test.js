import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from 'react-dom/test-utils';
import { sleep } from '../../../tests/Utilities';
import { ConfigProvider } from '../../ConfigProvider';
import zhCN from '../zh_CN';
import enUS from '../en_US';
import { fireEvent, render } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

describe('Locale Provider demo', () => {
    test('change type', async () => {
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
                            <ConfigProvider locale={enUS}>
                                <span>Sure</span>
                            </ConfigProvider>
                        )}
                        {type === 'dashboard' && (
                            <ConfigProvider locale={zhCN}>
                                <span>确 定</span>
                            </ConfigProvider>
                        )}
                    </div>
                </div>
            );
        };
        const { container } = render(<BasicExample />);

        fireEvent.click(container.querySelector('.about'));
        await act(async () => {
            jest.runAllTimers();
            await sleep();
        });

        expect(container.querySelector('span').textContent).toBe('Sure');

        fireEvent.click(container.querySelector('.dashboard'));
        await act(async () => {
            jest.runAllTimers();
            await sleep();
        });

        expect(container.querySelector('span').textContent).toBe('确 定');
        jest.useRealTimers();
    });
});
