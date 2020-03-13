import {BinaryNode} from '../binary-search-tree/node';

/**
 * Red-Black Tree Node.
 */
export class RedBlackNode<T> extends BinaryNode<T> {
    color: RedBlackColorEnum;

    constructor(key: number, value: T, color: RedBlackColorEnum = RedBlackColorEnum.BLACK, parent?: BinaryNode<T>, left?: BinaryNode<T>, right?: BinaryNode<T>) {
        super(key, value, parent, left, right);

        this.color = color;
    }
}

/**
 * Color of the Reb-Black tree Node.
 */
export enum RedBlackColorEnum {
    RED = 'red',
    BLACK = 'black',
}
