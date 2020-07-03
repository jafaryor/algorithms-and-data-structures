import {cutRod, memoizedCutRod, bottomUpCutRod} from '../rod-cutting';

describe('Rod Cutting Problem', () => {
    let rodLength: number;
    let optimalPrice: number;

    it('cutting rod of length 1', () => {
        rodLength = 1;
        optimalPrice = 1;
    });

    it('no rod is available', () => {
        rodLength = 0;
        optimalPrice = 0;
    });

    it('cutting rod of length 4', () => {
        rodLength = 4;
        optimalPrice = 10;
    });

    it('cutting rod of length 7', () => {
        rodLength = 6;
        optimalPrice = 17;
    });

    it('cutting rod of length 7', () => {
        rodLength = 7;
        optimalPrice = 18;
    });

    it('cutting rod of length 7', () => {
        rodLength = 8;
        optimalPrice = 22;
    });

    it('cutting rod of length 7', () => {
        rodLength = 9;
        optimalPrice = 25;
    });

    it('cutting rod of length 7', () => {
        rodLength = 10;
        optimalPrice = 30;
    });

    afterEach(() => {
        expect(cutRod(rodLength)).toEqual(optimalPrice);
        expect(memoizedCutRod(rodLength)).toEqual(optimalPrice);
        expect(bottomUpCutRod(rodLength)).toEqual(optimalPrice);
    });
});
