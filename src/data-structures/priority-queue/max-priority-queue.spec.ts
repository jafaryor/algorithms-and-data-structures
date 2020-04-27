import {HeapNode} from '../heap/node';
import {MaxPriorityQueue} from './';

describe('MaxPriorityQueue', () => {
    const nodes = turnIntoHeapNodes([5, 2, 9, 1, 4, 6, 7]);
    const queue = new MaxPriorityQueue<string>(nodes);

    it('max should be root', () => {
        expect(queue.max).toEqual({
            key: 9,
            value: '9',
        });
    });

    it('should increase the priority', () => {
        queue.increasePriority(4, 10);

        expect(queue.max).toEqual({
            key: 10,
            value: '2',
        });
    });

    it('should extract the max', () => {
        expect(queue.extractMax()).toEqual({
            key: 10,
            value: '2',
        });

        expect(queue.max).toEqual({
            key: 9,
            value: '9',
        });
    });

    it('should decrease the priority', () => {
        queue.decreasePriority(1, 0);

        expect(queue.getHeapNodes()[1]).toEqual({
            key: 4,
            value: '4',
        });
    });

    it('should increase priority of root', () => {
        queue.increasePriority(0, 10);

        expect(queue.max).toEqual({
            key: 10,
            value: '9',
        });
    });

    it('should decrease priority of leaf', () => {
        queue.decreasePriority(3, -1);

        expect(queue.getHeapNodes()[3]).toEqual({
            key: -1,
            value: '1',
        });
    });

    afterEach(() => {
        expect(isValidMaxPriorityQueue(queue)).toBe(true);
    });
});

/**
 * Turns the array of numbers into array of heap nodes.
 */
function turnIntoHeapNodes(nodes: number[]): Array<HeapNode<string>> {
    return nodes.map(
        (node: number) => new HeapNode<string>(node, node.toString())
    );
}

/**
 * Checks if the Max Priority Queue is valid.
 */
function isValidMaxPriorityQueue(queue: MaxPriorityQueue<string>): boolean {
    const nodes = queue.getHeapNodes();
    const getLeftChild = (index: number) => nodes[2 * index + 1];
    const getRightChild = (index: number) => nodes[2 * index + 2];
    let left: HeapNode<string> | undefined;
    let right: HeapNode<string> | undefined;

    return nodes.reduce(
        (isValid: boolean, parent: HeapNode<string>, index: number) => {
            left = getLeftChild(index);
            right = getRightChild(index);

            return (
                isValid &&
                (left ? parent.key > left.key : true) &&
                (right ? parent.key > right.key : true)
            );
        },
        true
    );
}
