import { Stack } from "..";

/**
 * Dijkstra's Two-Stack Algorithm for Arithmetic Expression Evaluation.
 * @example
 *      ( 1 + ( ( 2 + 3 ) * ( 4 * 5 ) ) )
 *      ( 1 + ( 5 * ( 4 * 5 ) ) )
 *      ( 1 + ( 5 * 20 ) )
 *      ( 1 + 100 )
 *      101
 * @note Priority to operator can be given via parenthesis.
 *       The function does not recognize the default priority
 *       of operators. Like priority of "*" is higher than "+".
 * @note Support | + | - | * | / | sqrt |
 * @note A white space should present between operators and value.
 * @complexity O(n)
 */
export function evaluateArithmeticExpression(expression: string): number {
    let operator: string;
    let value: number;
    const operators = new Stack<string>();
    const values = new Stack<number>();
    const inputs = expression.split(" ") as string[];

    for (const input of inputs) {
        // Ignore left parenthesis.
        if (input === "(") continue;
        else if (isOperator(input)) operators.push(input);
        else if (input === ")") {
            operator = operators.pop()!;
            value = values.pop()!;

            // Apply the math operator.
            switch (operator) {
                case "+":
                    value = values.pop()! + value;
                    break;
                case "-":
                    value = values.pop()! - value;
                    break;
                case "*":
                    value = values.pop()! * value;
                    break;
                case "/":
                    value = values.pop()! / value;
                    break;
                case "sqrt":
                    value = Math.sqrt(value);
                    break;
            }

            values.push(value);
        }
        else values.push(Number(input));
    }

    return values.pop()!;
}


/**
 * Checks if the input is an arithmetic operator.
 * @complexity O(1)
 */
function isOperator(input: string): boolean {
    return input === "+" || input === "-" || input === "*" || input === "/" || input === "sqrt";
}
