import {Graph} from '.';
import {createArrayWithIncrementingValues} from '../../utils';
import {AdjacencyListNode} from './list';
import {Vertex} from './vertex';

describe('Graph', () => {
    let graph: Graph;
    let vertices: Vertex[];
    let matrix: Array<Array<number | undefined>>;
    let list: {[vertex: string]: AdjacencyListNode[]};

    describe('constructor', () => {
        const undirectedUnweightedCyclicStub = getUndirectedUnweightedCyclicStub();
        const directedWeightedCyclicStub = getDirectedWeightedCyclicStub();

        describe('initByMatrix', () => {
            it('Undirected, Unweighted, Cyclic', () => {
                matrix = undirectedUnweightedCyclicStub.matrix;
                graph = new Graph({matrix});

                expect(graph.adjacencyMatrix.matrix).toEqual(
                    undirectedUnweightedCyclicStub.matrix,
                );
                expect(graph.adjacencyList.toString()).toEqual(
                    undirectedUnweightedCyclicStub.stringList,
                );
            });

            it('Directed, Weighted, Cyclic', () => {
                matrix = directedWeightedCyclicStub.matrix;
                graph = new Graph({matrix});

                expect(graph.adjacencyMatrix.matrix).toEqual(
                    directedWeightedCyclicStub.matrix,
                );
                expect(graph.adjacencyList.toString()).toEqual(
                    directedWeightedCyclicStub.stringList,
                );
            });
        });

        describe('initByList', () => {
            it('Undirected, Unweighted, Cyclic', () => {
                vertices = undirectedUnweightedCyclicStub.vertices;
                list = undirectedUnweightedCyclicStub.list;
                graph = new Graph({list, vertices});

                expect(graph.adjacencyMatrix.matrix).toEqual(
                    undirectedUnweightedCyclicStub.matrix,
                );
                expect(graph.adjacencyList.toString()).toEqual(
                    undirectedUnweightedCyclicStub.stringList,
                );
            });

            it('Directed, Weighted, Cyclic', () => {
                vertices = directedWeightedCyclicStub.vertices;
                list = directedWeightedCyclicStub.list;
                graph = new Graph({list, vertices});

                expect(graph.adjacencyMatrix.matrix).toEqual(
                    directedWeightedCyclicStub.matrix,
                );
                expect(graph.adjacencyList.toString()).toEqual(
                    directedWeightedCyclicStub.stringList,
                );
            });
        });
    });

    describe('Undirected, Unweighted, Cyclic', () => {
        const stub = getUndirectedUnweightedCyclicStub();

        beforeAll(() => {
            matrix = stub.matrix;
            graph = new Graph({matrix});
            vertices = graph.vertices;
        });

        describe('breadthFirstSearch', () => {
            it('from vertex 2', () => {
                graph.breadthFirstSearch(vertices[1]);

                expect(graph.toString()).toEqual([
                    '1 b [1] (Infinity/Infinity)',
                    '2 b [0] (Infinity/Infinity)',
                    '3 b [1] (Infinity/Infinity)',
                    '4 b [1] (Infinity/Infinity)',
                    '5 b [1] (Infinity/Infinity)',
                ]);
            });

            it('from vertex 3', () => {
                graph.breadthFirstSearch(vertices[2]);

                expect(graph.toString()).toEqual([
                    '1 b [2] (Infinity/Infinity)',
                    '2 b [1] (Infinity/Infinity)',
                    '3 b [0] (Infinity/Infinity)',
                    '4 b [1] (Infinity/Infinity)',
                    '5 b [2] (Infinity/Infinity)',
                ]);
            });

            it('from vertex 6', () => {
                const vertex = new Vertex('6');
                graph.addVertex(vertex);
                graph.breadthFirstSearch(vertex);

                expect(graph.toString()).toEqual([
                    '1 w [Infinity] (Infinity/Infinity)',
                    '2 w [Infinity] (Infinity/Infinity)',
                    '3 w [Infinity] (Infinity/Infinity)',
                    '4 w [Infinity] (Infinity/Infinity)',
                    '5 w [Infinity] (Infinity/Infinity)',
                    '6 g [0] (Infinity/Infinity)',
                ]);
            });
        });

        describe('depthFirstSearch', () => {
            it('case 01', () => {
                graph.depthFirstSearch();

                expect(graph.toString()).toEqual([
                    '1 b [Infinity] (1/10)',
                    '2 b [Infinity] (2/9)',
                    '3 b [Infinity] (3/8)',
                    '4 b [Infinity] (4/7)',
                    '5 b [Infinity] (5/6)',
                    '6 b [Infinity] (11/12)',
                ]);
            });

            it('case 02', () => {
                graph.removeEdge(vertices[3], vertices[4]);
                graph.removeEdge(vertices[4], vertices[3]);
                graph.depthFirstSearch();

                expect(graph.toString()).toEqual([
                    '1 b [Infinity] (1/10)',
                    '2 b [Infinity] (2/9)',
                    '3 b [Infinity] (3/6)',
                    '4 b [Infinity] (4/5)',
                    '5 b [Infinity] (7/8)',
                    '6 b [Infinity] (11/12)',
                ]);
            });

            it('from vertex 6', () => {
                graph.addEdge(vertices[2], vertices[5]);
                graph.addEdge(vertices[5], vertices[2]);
                graph.depthFirstSearchVisitStack(vertices[5]);

                expect(graph.toString()).toEqual([
                    '1 b [Infinity] (4/7)',
                    '2 b [Infinity] (3/10)',
                    '3 b [Infinity] (2/11)',
                    '4 b [Infinity] (8/9)',
                    '5 b [Infinity] (5/6)',
                    '6 b [Infinity] (1/12)',
                ]);
            });
        });

        describe('topologicalSort', () => {
            it('case 01', () => {
                expect(graph.topologicalSort().map((v) => v.value)).toEqual([
                    '1',
                    '2',
                    '5',
                    '3',
                    '6',
                    '4',
                ]);

                expect(graph.toString()).toEqual([
                    '1 b [Infinity] (1/12)',
                    '2 b [Infinity] (2/11)',
                    '3 b [Infinity] (3/8)',
                    '4 b [Infinity] (4/5)',
                    '5 b [Infinity] (9/10)',
                    '6 b [Infinity] (6/7)',
                ]);
            });
        });

        describe('stronglyConnectedComponents', () => {
            it('case 01', () => {
                expect(
                    graph.stronglyConnectedComponents().map((v) => v.value),
                ).toEqual(['1']);
            });

            it('case 02', () => {
                graph.removeVertex(vertices[1]);

                expect(
                    graph.stronglyConnectedComponents().map((v) => v.value),
                ).toEqual(['3', '1']);
            });
        });

        describe('connectedComponents', () => {
            it('case 01', () => {
                expect(graph.connectedComponents()).toEqual(2);
            });

            it('case 02', () => {
                graph.addVertex(new Vertex('7'));
                expect(graph.connectedComponents()).toEqual(3);
            });
        });

        describe('other checks', () => {
            it('should be disconnected', () => {
                expect(graph.isConnected()).toBe(false);
            });

            it('should be undirected', () => {
                expect(graph.isDirected()).toBe(false);
            });

            it('should be cyclic due to undirected nature', () => {
                expect(graph.isCyclic()).toBe(true);
            });
        });
    });

    describe('Directed, Weighted, Cyclic', () => {
        const stub = getDirectedWeightedCyclicStub();

        beforeAll(() => {
            matrix = stub.matrix;
            graph = new Graph({matrix});
            vertices = graph.vertices;
        });

        describe('breadthFirstSearch', () => {
            it('case 01', () => {
                graph.breadthFirstSearch(vertices[0]);

                expect(graph.toString()).toEqual([
                    '1 b [0] (Infinity/Infinity)',
                    '2 b [1] (Infinity/Infinity)',
                    '3 w [Infinity] (Infinity/Infinity)',
                    '4 b [1] (Infinity/Infinity)',
                    '5 b [2] (Infinity/Infinity)',
                    '6 w [Infinity] (Infinity/Infinity)',
                ]);
            });

            it('should be cyclic', () => {
                expect(graph.isCyclic()).toBe(true);
            });

            it('should be connected', () => {
                expect(graph.isConnected()).toBe(true);
            });

            it('should be disconnected', () => {
                graph.removeEdge(vertices[2], vertices[4]);

                expect(graph.isConnected()).toBe(false);
            });

            it('should consist of two separate components', () => {
                expect(graph.connectedComponents()).toEqual(2);
            });

            it('case 02', () => {
                graph.addEdge(vertices[5], vertices[1], 8);
                graph.breadthFirstSearch(vertices[2]);

                expect(graph.toString()).toEqual([
                    '1 w [Infinity] (Infinity/Infinity)',
                    '2 b [2] (Infinity/Infinity)',
                    '3 b [0] (Infinity/Infinity)',
                    '4 b [4] (Infinity/Infinity)',
                    '5 b [3] (Infinity/Infinity)',
                    '6 b [1] (Infinity/Infinity)',
                ]);
            });
        });

        describe('depthFirstSearch', () => {
            it('case 01', () => {
                graph.depthFirstSearch();

                expect(graph.toString()).toEqual([
                    '1 b [Infinity] (1/8)',
                    '2 b [Infinity] (2/7)',
                    '3 b [Infinity] (9/12)',
                    '4 b [Infinity] (4/5)',
                    '5 b [Infinity] (3/6)',
                    '6 b [Infinity] (10/11)',
                ]);
            });

            it('case 02', () => {
                graph.depthFirstSearchVisitStack(vertices[5]);

                expect(graph.toString()).toEqual([
                    '1 w [Infinity] (Infinity/Infinity)',
                    '2 b [Infinity] (2/7)',
                    '3 w [Infinity] (Infinity/Infinity)',
                    '4 b [Infinity] (4/5)',
                    '5 b [Infinity] (3/6)',
                    '6 b [Infinity] (1/8)',
                ]);
            });
        });

        describe('topologicalSort', () => {
            it('case 01', () => {
                expect(graph.topologicalSort().map((v) => v.value)).toEqual([
                    '3',
                    '6',
                    '1',
                    '2',
                    '5',
                    '4',
                ]);

                expect(graph.toString()).toEqual([
                    '1 b [Infinity] (1/8)',
                    '2 b [Infinity] (2/7)',
                    '3 b [Infinity] (9/12)',
                    '4 b [Infinity] (4/5)',
                    '5 b [Infinity] (3/6)',
                    '6 b [Infinity] (10/11)',
                ]);
            });
        });

        describe('stronglyConnectedComponents', () => {
            it('case 01', () => {
                graph.removeEdge(vertices[0], vertices[3]);
                graph.addEdge(vertices[3], vertices[0], 5);

                expect(
                    graph.stronglyConnectedComponents().map((v) => v.value),
                ).toEqual(['3', '6', '1']);
                expect(graph.adjacencyList.toString()).toEqual([
                    '1 -> 2 (3)',
                    '2 -> 5 (7)',
                    '3 -> 6 (9)',
                    '4 -> 2 (6) -> 1 (5)',
                    '5 -> 4 (9)',
                    '6 -> 6 (0) -> 2 (8)',
                ]);
            });

            it('case 02', () => {
                graph.removeEdge(vertices[5], vertices[5]);
                graph.addEdge(vertices[5], vertices[2], 9);

                expect(
                    graph.stronglyConnectedComponents().map((v) => v.value),
                ).toEqual(['3', '1']);
                expect(graph.adjacencyList.toString()).toEqual([
                    '1 -> 2 (3)',
                    '2 -> 5 (7)',
                    '3 -> 6 (9)',
                    '4 -> 2 (6) -> 1 (5)',
                    '5 -> 4 (9)',
                    '6 -> 2 (8) -> 3 (9)',
                ]);
            });
        });

        describe('other checks', () => {
            it('should be disconnected', () => {
                expect(graph.isConnected()).toBe(true);
            });

            it('should be undirected', () => {
                expect(graph.isDirected()).toBe(true);
            });

            it('should be cyclic', () => {
                expect(graph.isCyclic()).toBe(true);
            });
        });
    });

    describe('Minimum Spanning Tree', () => {
        beforeAll(() => {
            matrix = [
                [
                    undefined,
                    4,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    8,
                    undefined,
                ],
                [
                    4,
                    undefined,
                    8,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    11,
                    undefined,
                ],
                [
                    undefined,
                    8,
                    undefined,
                    7,
                    undefined,
                    4,
                    undefined,
                    undefined,
                    2,
                ],
                [
                    undefined,
                    undefined,
                    7,
                    undefined,
                    9,
                    14,
                    undefined,
                    undefined,
                    undefined,
                ],
                [
                    undefined,
                    undefined,
                    undefined,
                    9,
                    undefined,
                    10,
                    undefined,
                    undefined,
                    undefined,
                ],
                [
                    undefined,
                    undefined,
                    4,
                    14,
                    10,
                    undefined,
                    2,
                    undefined,
                    undefined,
                ],
                [
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    2,
                    undefined,
                    1,
                    6,
                ],
                [
                    8,
                    11,
                    undefined,
                    undefined,
                    undefined,
                    undefined,
                    1,
                    undefined,
                    7,
                ],
                [
                    undefined,
                    undefined,
                    2,
                    undefined,
                    undefined,
                    undefined,
                    6,
                    7,
                    undefined,
                ],
            ];
            graph = new Graph({matrix});
            vertices = graph.vertices;
        });

        it("Kruskal's MST", () => {
            const expected = [
                ['7', '8', 1],
                ['3', '9', 2],
                ['6', '7', 2],
                ['1', '2', 4],
                ['3', '6', 4],
                ['3', '4', 7],
                ['1', '8', 8],
                ['4', '5', 9],
            ];
            const received = graph
                .minimumSpanningTree()
                .map((edge) => [edge.u.value, edge.v.value, edge.weight]);

            expect(received).toEqual(expected);
        });

        it("Kruskal's MST weight", () => {
            const received = graph
                .minimumSpanningTree()
                .reduce((weight, edge) => {
                    weight += edge.weight;

                    return weight;
                }, 0);

            expect(received).toEqual(37);
        });

        it("Prim's algorithm", () => {
            const expected = [
                ['1', '2', 1],
                ['1', '8', 1],
                ['8', '7', 1],
                ['7', '6', 1],
                ['6', '3', 1],
                ['3', '9', 1],
                ['3', '4', 1],
                ['4', '5', 1],
            ];
            const received = graph
                .primMinimumSpanningTree(vertices[0])
                .map((edge) => [edge.u.value, edge.v.value, edge.weight]);

            expect(received).toEqual(expected);
        });
    });
});

/**
 * Undirected, Unweighted, Cyclic Graph.
 */
export function getUndirectedUnweightedCyclicStub() {
    const vertices = createArrayWithIncrementingValues(5, 1).map(
        (k) => new Vertex(k.toString()),
    );

    return {
        vertices,
        matrix: [
            [undefined, 1, undefined, undefined, 1],
            [1, undefined, 1, 1, 1],
            [undefined, 1, undefined, 1, undefined],
            [undefined, 1, 1, undefined, 1],
            [1, 1, undefined, 1, undefined],
        ],
        list: {
            '1': [
                {vertex: vertices[1], weight: 1},
                {vertex: vertices[4], weight: 1},
            ],
            '2': [
                {vertex: vertices[0], weight: 1},
                {vertex: vertices[2], weight: 1},
                {vertex: vertices[3], weight: 1},
                {vertex: vertices[4], weight: 1},
            ],
            '3': [
                {vertex: vertices[1], weight: 1},
                {vertex: vertices[3], weight: 1},
            ],
            '4': [
                {vertex: vertices[1], weight: 1},
                {vertex: vertices[2], weight: 1},
                {vertex: vertices[4], weight: 1},
            ],
            '5': [
                {vertex: vertices[0], weight: 1},
                {vertex: vertices[1], weight: 1},
                {vertex: vertices[3], weight: 1},
            ],
        },
        stringList: [
            '1 -> 2 (1) -> 5 (1)',
            '2 -> 1 (1) -> 3 (1) -> 4 (1) -> 5 (1)',
            '3 -> 2 (1) -> 4 (1)',
            '4 -> 2 (1) -> 3 (1) -> 5 (1)',
            '5 -> 1 (1) -> 2 (1) -> 4 (1)',
        ],
    };
}

/**
 * Directed, Weighted, Cyclic Graph.
 */
export function getDirectedWeightedCyclicStub() {
    const vertices = createArrayWithIncrementingValues(6, 1).map(
        (k) => new Vertex(k.toString()),
    );

    return {
        vertices,
        matrix: [
            [undefined, 3, undefined, 5, undefined, undefined],
            [undefined, undefined, undefined, undefined, 7, undefined],
            [undefined, undefined, undefined, undefined, 8, 9],
            [undefined, 6, undefined, undefined, undefined, undefined],
            [undefined, undefined, undefined, 9, undefined, undefined],
            [undefined, undefined, undefined, undefined, undefined, 0],
        ],
        list: {
            '1': [
                {vertex: vertices[1], weight: 3},
                {vertex: vertices[3], weight: 5},
            ],
            '2': [{vertex: vertices[4], weight: 7}],
            '3': [
                {vertex: vertices[4], weight: 8},
                {vertex: vertices[5], weight: 9},
            ],
            '4': [{vertex: vertices[1], weight: 6}],
            '5': [{vertex: vertices[3], weight: 9}],
            '6': [{vertex: vertices[5], weight: 0}],
        },
        stringList: [
            '1 -> 2 (3) -> 4 (5)',
            '2 -> 5 (7)',
            '3 -> 5 (8) -> 6 (9)',
            '4 -> 2 (6)',
            '5 -> 4 (9)',
            '6 -> 6 (0)',
        ],
    };
}
