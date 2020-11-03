import {HeapNode} from '../heap/node';
import {MinPriorityQueue} from './';

describe('MinPriorityQueue', () => {
    const queue = new MinPriorityQueue<string>([]);

    it('should be empty', () => {
        expect(queue.isEmpty()).toBe(true);
    });

    it('min should be root', () => {
        insertNodes(queue, [5, 2, 8, 3, 1, 7]);

        expect(queue.min).toEqual({
            key: 1,
            value: '1',
        });
    });

    it('should increase the priority of a node with children', () => {
        queue.increasePriority(1, -1);

        expect(queue.min).toEqual({
            key: -1,
            value: '2',
        });
    });

    it('should extract the min', () => {
        expect(queue.extractMin()).toEqual({
            key: -1,
            value: '2',
        });

        expect(queue.min).toEqual({
            key: 1,
            value: '1',
        });
    });

    it('should increase priority of a leaf', () => {
        queue.increasePriority(4, -1);

        expect(queue.min).toEqual({
            key: -1,
            value: '8',
        });
    });

    it('should decrease the priority of the root', () => {
        queue.decreasePriority(0, 2);

        expect(queue.getHeapNodes()[1]).toEqual({
            key: 2,
            value: '8',
        });
    });

    it('should make the node a leaf', () => {
        queue.decreasePriority(1, 9);

        expect(queue.getHeapNodes()[4]).toEqual({
            key: 9,
            value: '8',
        });
    });

    afterEach(() => {
        expect(isValidMinPriorityQueue(queue)).toBe(true);
    });
});

/**
 * Inserts a bunch of nodes in a loop.
 */
function insertNodes(queue: MinPriorityQueue<string>, nodes: number[]): void {
    nodes.forEach((node: number) => {
        queue.insert(new HeapNode<string>(node, node.toString()));
    });
}

/**
 * Checks if the Min Priority Queue is valid.
 */
function isValidMinPriorityQueue(queue: MinPriorityQueue<string>): boolean {
    const nodes = queue.getHeapNodes();
    const getLeftChild = (index: number) => nodes[2 * index + 1];
    const getRightChild = (index: number) => nodes[2 * index + 2];
    let left: HeapNode<string> | undefined;
    let right: HeapNode<string> | undefined;

    return nodes.reduce((isValid: boolean, parent: HeapNode<string>, index: number) => {
        left = getLeftChild(index);
        right = getRightChild(index);

        return (
            isValid &&
            (left ? parent.key < left.key : true) &&
            (right ? parent.key < right.key : true)
        );
    }, true);
}
