import {
    getDirectedWeightedCyclicStub,
    getUndirectedUnweightedCyclicStub,
} from './index.spec';
import {AdjacencyList, AdjacencyListNode} from './list';
import {Vertex} from './vertex';

describe('AdjacencyList', () => {
    let list: {[vertex: string]: AdjacencyListNode[]};
    let adjacencyList: AdjacencyList;
    let vertices: Vertex[];

    describe('Undirected, Unweighted, Cyclic', () => {
        const stub = getUndirectedUnweightedCyclicStub();

        beforeAll(() => {
            vertices = stub.vertices;
            list = stub.list;
            adjacencyList = new AdjacencyList(list, vertices);
        });

        it('toAdjacencyMatrix', () => {
            const adjacencyMatrix = adjacencyList.toAdjacencyMatrix();

            expect(adjacencyMatrix.matrix).toEqual(stub.matrix);
        });

        it('transpose', () => {
            const transposed = adjacencyList.transpose();

            expect(transposed).toEqual(list);
        });

        it('addEdge', () => {
            const u = vertices[0];
            const v = vertices[3];

            adjacencyList.addEdge(u, v);
            adjacencyList.addEdge(v, u);

            expect(adjacencyList.toString()).toEqual([
                '1 -> 2 (1) -> 5 (1) -> 4 (1)',
                '2 -> 1 (1) -> 3 (1) -> 4 (1) -> 5 (1)',
                '3 -> 2 (1) -> 4 (1)',
                '4 -> 2 (1) -> 3 (1) -> 5 (1) -> 1 (1)',
                '5 -> 1 (1) -> 2 (1) -> 4 (1)',
            ]);
        });

        it('removeEdge', () => {
            const u = vertices[1];
            const v = vertices[4];

            adjacencyList.removeEdge(u, v);
            adjacencyList.removeEdge(v, u);

            expect(adjacencyList.toString()).toEqual([
                '1 -> 2 (1) -> 5 (1) -> 4 (1)',
                '2 -> 1 (1) -> 3 (1) -> 4 (1)',
                '3 -> 2 (1) -> 4 (1)',
                '4 -> 2 (1) -> 3 (1) -> 5 (1) -> 1 (1)',
                '5 -> 1 (1) -> 4 (1)',
            ]);
        });

        it('addVertex', () => {
            const newVertex = new Vertex('6');

            adjacencyList.addVertex(newVertex);

            expect(adjacencyList.toString()).toEqual([
                '1 -> 2 (1) -> 5 (1) -> 4 (1)',
                '2 -> 1 (1) -> 3 (1) -> 4 (1)',
                '3 -> 2 (1) -> 4 (1)',
                '4 -> 2 (1) -> 3 (1) -> 5 (1) -> 1 (1)',
                '5 -> 1 (1) -> 4 (1)',
                '6 -> ',
            ]);
        });

        it('removeVertex', () => {
            const vertex2 = vertices[1];

            adjacencyList.removeVertex(vertex2);

            expect(adjacencyList.toString()).toEqual([
                '1 -> 5 (1) -> 4 (1)',
                '3 -> 4 (1)',
                '4 -> 3 (1) -> 5 (1) -> 1 (1)',
                '5 -> 1 (1) -> 4 (1)',
                '6 -> ',
            ]);
        });
    });

    describe('Directed, Weighted, Cyclic', () => {
        const stub = getDirectedWeightedCyclicStub();

        beforeAll(() => {
            vertices = stub.vertices;
            list = stub.list;
            adjacencyList = new AdjacencyList(list, vertices);
        });

        it('toAdjacencyMatrix', () => {
            const adjacencyMatrix = adjacencyList.toAdjacencyMatrix();

            expect(adjacencyMatrix.matrix).toEqual(stub.matrix);
        });

        it('transpose', () => {
            const transposed = adjacencyList.transpose();

            expect(transposed).toEqual({
                '1': [],
                '2': [
                    {vertex: vertices[0], weight: 3},
                    {vertex: vertices[3], weight: 6},
                ],
                '3': [],
                '4': [
                    {vertex: vertices[0], weight: 5},
                    {vertex: vertices[4], weight: 9},
                ],
                '5': [
                    {vertex: vertices[1], weight: 7},
                    {vertex: vertices[2], weight: 8},
                ],
                '6': [
                    {vertex: vertices[2], weight: 9},
                    {vertex: vertices[5], weight: 0},
                ],
            });
        });

        it('addVertex', () => {
            const u = vertices[2];
            const v = vertices[1];

            adjacencyList.addEdge(u, v);

            expect(adjacencyList.toString()).toEqual([
                '1 -> 2 (3) -> 4 (5)',
                '2 -> 5 (7)',
                '3 -> 5 (8) -> 6 (9) -> 2 (1)',
                '4 -> 2 (6)',
                '5 -> 4 (9)',
                '6 -> 6 (0)',
            ]);
        });

        it('removeEdge', () => {
            const u = vertices[2];
            const v = vertices[5];

            adjacencyList.removeEdge(u, v);

            expect(adjacencyList.toString()).toEqual([
                '1 -> 2 (3) -> 4 (5)',
                '2 -> 5 (7)',
                '3 -> 5 (8) -> 2 (1)',
                '4 -> 2 (6)',
                '5 -> 4 (9)',
                '6 -> 6 (0)',
            ]);
        });

        it('removeVertex', () => {
            adjacencyList.removeVertex(vertices[3]);

            expect(adjacencyList.toString()).toEqual([
                '1 -> 2 (3)',
                '2 -> 5 (7)',
                '3 -> 5 (8) -> 2 (1)',
                '5 -> ',
                '6 -> 6 (0)',
            ]);
        });

        it('addVertex', () => {
            const newVertex = new Vertex('8');

            adjacencyList.addVertex(newVertex);

            expect(adjacencyList.toString()).toEqual([
                '1 -> 2 (3)',
                '2 -> 5 (7)',
                '3 -> 5 (8) -> 2 (1)',
                '5 -> ',
                '6 -> 6 (0)',
                '8 -> ',
            ]);
        });
    });
});
