import React, { memo, useContext, useRef, useState } from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import LocaleProvider from '../';
import LocaleContext from '../Context';

Enzyme.configure({ adapter: new Adapter() });

const defaultLocale = {
    locale: 'locale',
};

// we use'memo' here in order to only render inner component while context changed.
const CacheInner = memo(() => {
    const countRef = useRef(0);
    countRef.current++;
    // subscribe locale context
    useContext(LocaleContext);
    return (
        <div>
            Child Rendering Count:{' '}
            <span id="child_count">{countRef.current}</span>
        </div>
    );
});

const CacheOuter = () => {
    // We use 'useState' here in order to trigger parent component rendering.
    const [count, setCount] = useState(1);
    const handleClick = () => {
        setCount(count + 1);
    };
    // During each rendering phase, the cached context value returned from method 'LocaleProvider#getMemoizedContextValue' will take effect.
    // So 'CacheInner' component won't rerender.
    return (
        <div>
            <button type="button" onClick={handleClick} id="parent_btn">
                Click
            </button>
            Parent Rendering Count: <span id="parent_count">{count}</span>
            <LocaleProvider locale={defaultLocale}>
                <CacheInner />
            </LocaleProvider>
        </div>
    );
};

it("Rendering on LocaleProvider won't trigger rendering on child component.", () => {
    const wrapper = mount(<CacheOuter />);
    wrapper.find('#parent_btn').at(0).simulate('click');
    expect(wrapper.find('#parent_count').text()).toBe('2');
    // child component won't rerender
    expect(wrapper.find('#child_count').text()).toBe('1');
    wrapper.find('#parent_btn').at(0).simulate('click');
    expect(wrapper.find('#parent_count').text()).toBe('3');
    // child component won't rerender
    expect(wrapper.find('#child_count').text()).toBe('1');
});
