import pickAttrs from './pickAttrs';

describe('pickAttrs', () => {
    const originProps = {
        onClick: () => {},
        checked: true,
        'data-my': 1,
        'aria-this': 2,
        skip: true,
        role: 'button',
    };

    it('default', () => {
        expect(pickAttrs(originProps)).toEqual({
            onClick: null,
            checked: true,
            'data-my': 1,
            'aria-this': 2,
            role: 'button',
        });
    });

    it('aria only', () => {
        expect(pickAttrs(originProps, true)).toEqual({
            'aria-this': 2,
            role: 'button',
        });
    });

    it('attr only', () => {
        expect(pickAttrs(originProps, { attr: true })).toEqual({
            onClick: null,
            checked: true,
            role: 'button',
        });
    });

    it('aria & data', () => {
        expect(pickAttrs(originProps, { aria: true, data: true })).toEqual({
            'data-my': 1,
            'aria-this': 2,
            role: 'button',
        });
    });
});
