import {evaluateArithmeticExpression} from '../arithmetic-expression-evaluation';

describe('Evaluation of Math Expression', () => {
    it('Case 01', () => {
        expect(
            evaluateArithmeticExpression('( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )'),
        ).toEqual(101);
    });

    it('Case 02', () => {
        expect(
            evaluateArithmeticExpression('( ( 2 + sqrt ( 4 ) ) / 2 )'),
        ).toEqual(2);
    });

    it('Case 03', () => {
        expect(
            evaluateArithmeticExpression('( ( 20 - sqrt ( 16 ) ) * 1 )'),
        ).toEqual(16);
    });
});
