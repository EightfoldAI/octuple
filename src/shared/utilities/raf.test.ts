import { requestAnimationFrameWrapper } from './';

describe('requestAnimationFrameWrapper', () => {
    it('test Wrapper Raf', (done) => {
        jest.useRealTimers();

        let bamboo = false;
        requestAnimationFrameWrapper(() => {
            bamboo = true;
        });

        expect(bamboo).toBe(false);

        requestAnimationFrameWrapper(() => {
            expect(bamboo).toBe(true);
            done();
        });
    });

    it('cancel', (done) => {
        let bamboo = false;

        const id = requestAnimationFrameWrapper(() => {
            bamboo = true;
        }, 2);

        requestAnimationFrameWrapper.cancel(id);

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

        requestAnimationFrameWrapper(() => {
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
