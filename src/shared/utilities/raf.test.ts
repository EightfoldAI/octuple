import { wrapperRaf } from './raf';

describe('wrapperRaf', () => {
    it('test Wrapper Raf', (done) => {
        jest.useRealTimers();

        let bamboo = false;
        wrapperRaf(() => {
            bamboo = true;
        });

        expect(bamboo).toBe(false);

        wrapperRaf(() => {
            expect(bamboo).toBe(true);
            done();
        });
    });

    it('cancel', (done) => {
        let bamboo = false;

        const id = wrapperRaf(() => {
            bamboo = true;
        }, 2);

        wrapperRaf.cancel(id);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    expect(bamboo).toBeFalsy();
                    done();
                });
            });
        });
    });

    it('multiple times', (done) => {
        let bamboo = false;

        wrapperRaf(() => {
            bamboo = true;
        }, 2);

        expect(bamboo).toBeFalsy();

        requestAnimationFrame(() => {
            expect(bamboo).toBeFalsy();

            requestAnimationFrame(() => {
                expect(bamboo).toBeTruthy();
                done();
            });
        });
    });
});
