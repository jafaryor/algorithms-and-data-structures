import {
    getDirectedWeightedCyclicStub,
    getUndirectedUnweightedCyclicStub,
} from './index.spec';
import {AdjacencyMatrix} from './matrix';
import {Vertex} from './vertex';

describe('AdjacencyMatrix', () => {
    let matrix: Array<Array<number | undefined>>;
    let vertices: Vertex[];
    let adjacencyMatrix: AdjacencyMatrix;

    describe('Undirected, Unweighted, Cyclic', () => {
        const stub = getUndirectedUnweightedCyclicStub();

        beforeAll(() => {
            vertices = stub.vertices;
            matrix = stub.matrix;
            adjacencyMatrix = new AdjacencyMatrix(matrix, vertices);
        });

        it('toAdjacencyList', () => {
            const adjacencyList = adjacencyMatrix.toAdjacencyList().toString();

            expect(adjacencyList).toEqual(stub.stringList);
        });

        it('underlyingUndirectedMatrix', () => {
            const underlyingMatrix =
                adjacencyMatrix.underlyingUndirectedMatrix();

            expect(underlyingMatrix).toEqual(matrix);
        });

        it('addEdge', () => {
            const u = vertices[0];
            const v = vertices[3];

            adjacencyMatrix.addEdge(u, v);
            adjacencyMatrix.addEdge(v, u);

            expect(adjacencyMatrix.matrix).toEqual([
                [undefined, 1, undefined, 1, 1],
                [1, undefined, 1, 1, 1],
                [undefined, 1, undefined, 1, undefined],
                [1, 1, 1, undefined, 1],
                [1, 1, undefined, 1, undefined],
            ]);
        });

        it('removeEdge', () => {
            const u = vertices[1];
            const v = vertices[4];

            adjacencyMatrix.removeEdge(u, v);
            adjacencyMatrix.removeEdge(v, u);

            expect(adjacencyMatrix.matrix).toEqual([
                [undefined, 1, undefined, 1, 1],
                [1, undefined, 1, 1, undefined],
                [undefined, 1, undefined, 1, undefined],
                [1, 1, 1, undefined, 1],
                [1, undefined, undefined, 1, undefined],
            ]);
        });

        it('addVertex', () => {
            const newVertex = new Vertex('6');

            adjacencyMatrix.addVertex(newVertex);

            expect(adjacencyMatrix.matrix).toEqual([
                [undefined, 1, undefined, 1, 1, undefined],
                [1, undefined, 1, 1, undefined, undefined],
                [undefined, 1, undefined, 1, undefined, undefined],
                [1, 1, 1, undefined, 1, undefined],
                [1, undefined, undefined, 1, undefined, undefined],
                [
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                ],
            ]);
        });

        it('removeVertex', () => {
            const vertex2 = vertices[1];

            adjacencyMatrix.removeVertex(vertex2);

            expect(adjacencyMatrix.matrix).toEqual([
                [undefined, undefined, 1, 1, undefined],
                [undefined, undefined, 1, undefined, undefined],
                [1, 1, undefined, 1, undefined],
                [1, undefined, 1, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined],
            ]);
        });
    });

    describe('Directed, Weighted, Cyclic', () => {
        const stub = getDirectedWeightedCyclicStub();

        beforeAll(() => {
            vertices = stub.vertices;
            matrix = stub.matrix;
            adjacencyMatrix = new AdjacencyMatrix(matrix, vertices);
        });

        it('toAdjacencyList', () => {
            const adjacencyList = adjacencyMatrix.toAdjacencyList().toString();

            expect(adjacencyList).toEqual(stub.stringList);
        });

        it('underlyingUndirectedMatrix', () => {
            const underlyingMatrix =
                adjacencyMatrix.underlyingUndirectedMatrix();

            expect(underlyingMatrix).toEqual([
                [undefined, 1, undefined, 1, undefined, undefined],
                [1, undefined, undefined, 1, 1, undefined],
                [undefined, undefined, undefined, undefined, 1, 1],
                [1, 1, undefined, undefined, 1, undefined],
                [undefined, 1, 1, 1, undefined, undefined],
                [undefined, undefined, 1, undefined, undefined, 1],
            ]);
        });

        it('addEdge', () => {
            const u = vertices[5];
            const v = vertices[4];

            adjacencyMatrix.addEdge(u, v, 1);

            expect(adjacencyMatrix.matrix).toEqual([
                [undefined, 3, undefined, 5, undefined, undefined],
                [undefined, undefined, undefined, undefined, 7, undefined],
                [undefined, undefined, undefined, undefined, 8, 9],
                [undefined, 6, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, 9, undefined, undefined],
                [undefined, undefined, undefined, undefined, 1, 0],
            ]);
        });

        it('removeEdge', () => {
            const u = vertices[4];
            const v = vertices[3];

            adjacencyMatrix.removeEdge(u, v);

            expect(adjacencyMatrix.matrix).toEqual([
                [undefined, 3, undefined, 5, undefined, undefined],
                [undefined, undefined, undefined, undefined, 7, undefined],
                [undefined, undefined, undefined, undefined, 8, 9],
                [undefined, 6, undefined, undefined, undefined, undefined],
                [
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                ],
                [undefined, undefined, undefined, undefined, 1, 0],
            ]);
        });

        it('removeVertex', () => {
            const u = vertices[2];
            const v = vertices[0];

            adjacencyMatrix.removeVertex(u);
            adjacencyMatrix.removeVertex(v);

            expect(adjacencyMatrix.matrix).toEqual([
                [undefined, undefined, 7, undefined],
                [6, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined],
                [undefined, undefined, 1, 0],
            ]);
        });

        it('addVertex', () => {
            const newVertex = new Vertex('7');

            adjacencyMatrix.addVertex(newVertex);

            expect(adjacencyMatrix.matrix).toEqual([
                [undefined, undefined, 7, undefined, undefined],
                [6, undefined, undefined, undefined, undefined],
                [undefined, undefined, undefined, undefined, undefined],
                [undefined, undefined, 1, 0, undefined],
                [undefined, undefined, undefined, undefined, undefined],
            ]);
        });
    });
});
