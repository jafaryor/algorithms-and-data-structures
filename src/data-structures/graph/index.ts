import {createArrayWithIncrementingValues} from '../../utils';
import {AdjacencyList, AdjacencyListNode} from './list';
import {AdjacencyMatrix} from './matrix';
import {Vertex} from './vertex';
import {Queue} from '../queue';
import {Stack} from '../stack';
import {SinglyLinkedListNode} from '../singly-linked-list/node';

/**
 * The Graph.
 * The graph can be:
 *      Directed
 *      Undirected
 *      Weighted
 *      Unweighted
 *      Cyclic
 *      Acyclic
 */
export class Graph {
    /** The number of vertices. */
    private n: number;
    /** The graph's vertices. */
    vertices: Vertex[];
    /** Te Adjacency List Representation. */
    adjacencyList: AdjacencyList;
    /** The Adjacency Matrix Representation. */
    adjacencyMatrix: AdjacencyMatrix;
    /** The timestamp attribute for DFS. */
    private time = 0;
    /** The number of connected components of the graph. */
    private connectedComponent?: number;

    /********************************************************************************
     * CONSTRUCTOR
     ********************************************************************************/

    constructor(data: {
        // Required if initialize by Adjacency Matrix.
        matrix?: Array<Array<number | undefined>>;
        // The value of each vertex.
        vertexValues?: string[];
        // Required if initialize by Adjacency List.
        list?: {[vertex: string]: AdjacencyListNode[]};
        // The list of vertex objects which were used in list above.
        vertices?: Vertex[];
    }) {
        if (data.matrix) {
            this.initByMatrix(data.matrix, data.vertexValues);
        } else if (data.list && data.vertices) {
            this.initByList(data.list, data.vertices);
        }
    }

    /**
     * Initializes the graph by adjacency matrix.
     */
    private initByMatrix(
        matrix: Array<Array<number | undefined>>,
        vertexValues?: string[],
    ): void {
        this.n = matrix.length;
        // If no value for vertices, than use incrementing numbers as values.
        this.vertices = (vertexValues || this.getDefaultVertexValues()).map(
            (vertexValue) => new Vertex(vertexValue),
        );

        this.adjacencyMatrix = new AdjacencyMatrix(matrix, this.vertices);
        this.adjacencyList = this.adjacencyMatrix.toAdjacencyList();
    }

    /**
     * Initializes the graph by adjacency list.
     */
    private initByList(
        list: {[vertex: string]: AdjacencyListNode[]},
        vertices: Vertex[],
    ): void {
        this.vertices = vertices;
        this.n = this.vertices.length;

        this.adjacencyList = new AdjacencyList(list, this.vertices);
        this.adjacencyMatrix = this.adjacencyList.toAdjacencyMatrix();
    }

    /********************************************************************************
     * EDIT EDGES AND VERTICES
     ********************************************************************************/

    /**
     * Adds a new edge (u, v, weight).
     */
    addEdge(u: Vertex, v: Vertex, weight: number = 1): void {
        this.adjacencyMatrix.addEdge(u, v, weight);
        this.adjacencyList.addEdge(u, v, weight);
    }

    /**
     * Removes existing edge (u, v).
     */
    removeEdge(u: Vertex, v: Vertex): void {
        this.adjacencyMatrix.removeEdge(u, v);
        this.adjacencyList.removeEdge(u, v);
    }

    /**
     * Adds a new vertex.
     */
    addVertex(vertex: Vertex): void {
        // No duplicate vertices is allowed.
        if (this.vertices.includes(vertex)) return;

        this.n++;

        this.adjacencyMatrix.addVertex(vertex);
        this.adjacencyList.addVertex(vertex);

        // Removes the last vertex as the vertex was added twice.
        this.vertices.slice(this.n + 1, 1);
    }

    /**
     * Removes an existing vertex.
     */
    removeVertex(vertex: Vertex): void {
        const index = this.findIndex(vertex);

        if (!this.isValidIndex(index)) return;

        this.n--;

        this.adjacencyMatrix.removeVertex(vertex);
        // Insert back the vertex for the correct work of algorithm.
        this.vertices.push(vertex);
        this.adjacencyList.removeVertex(vertex);
    }

    /********************************************************************************
     * BREADTH FIRST SEARCH
     ********************************************************************************/

    /**
     * The Breadth First Search.
     * Returns the reference to root of a built Breadth First Tree.
     * @complexity O(V + E)
     */
    breadthFirstSearch(root: Vertex): Vertex {
        const queue = new Queue<Vertex>();
        let u: Vertex;

        this.prepareVerticesForBFS(root);
        queue.enqueue(root);

        while (!queue.isEmpty()) {
            u = queue.dequeue()!;

            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                    if (v.data.vertex.isWhite) {
                        v.data.vertex.distance = u.distance + 1;
                        v.data.vertex.markAsDiscovered(u.distance + 1, u);
                        queue.enqueue(v.data.vertex);
                    }

                    u.markAsVisited();
                },
            );
        }

        return root;
    }

    /**
     * Sets a proper initial state for each vertex before BFS.
     * @complexity O(V)
     */
    private prepareVerticesForBFS(root: Vertex): void {
        // Unmark all vertices before searching.
        for (const vertex of this.vertices) {
            vertex.unmark();
        }

        // We start searching from root. so mark root as discovered.
        root.markAsDiscovered();
    }

    /********************************************************************************
     * DEPTH FIRST SEARCH
     ********************************************************************************/

    /**
     * The Depth First Search.
     * Returns the reference to roots of a built Depth First Trees.
     * @complexity O(V + E)
     */
    depthFirstSearch(): Vertex[] {
        const roots = [] as Vertex[];

        this.prepareVerticesForDFS();
        this.time = 0;

        for (const vertex of this.vertices) {
            if (vertex.isGray || vertex.isBlack) continue;

            // The "vertex" is WHITE.
            this.depthFirstSearchVisit(vertex);
            // Alternative approach.
            // this.depthFirstSearchVisitStack(vertex);

            // The reference to the root of CONNECTED COMPONENT.
            roots.push(vertex);
        }

        return roots;
    }

    /**
     * Sets a proper initial state for each vertex before DFS.
     * @complexity O(V)
     */
    private prepareVerticesForDFS(): void {
        // Unmark all vertices before searching.
        for (const vertex of this.vertices) {
            vertex.unmark();
        }
    }

    /**
     * DFS vertex visit procedure.
     */
    private depthFirstSearchVisit(u: Vertex): void {
        // White vertex has just been discovered.
        u.paintGray(++this.time);

        // Explore edge (u,v).
        this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                if (v.data.vertex.isWhite) {
                    v.data.vertex.predecessor = u;
                    this.depthFirstSearchVisit(v.data.vertex);
                } /* else if (v.vertex.isGray) {
                    console.log('(u, v) is a back edge.');
                } else if (v.vertex.timestamps.grayed > u.timestamps.grayed) {
                    console.log('(u, v) is a forward edge.');
                } else {
                    console.log('(u, v) is a cross edge.');
                } */
            },
        );

        u.paintBlack(++this.time);
    }

    /**
     * DFS procedure for a single vertex using STACK to eliminate recursion.
     * @complexity O(V + E)
     */
    depthFirstSearchVisitStack(u: Vertex): void {
        const stack = new Stack<Vertex>();
        let v: Vertex | undefined;

        this.prepareVerticesForDFS();
        this.time = 0;

        stack.push(u);

        u.paintGray(++this.time);

        while (!stack.isEmpty()) {
            u = stack.peek()!;
            v = this.firstWhiteNeighbor(u);

            if (v == null) {
                // u's adjacency list has been fully explored.
                stack.pop();
                u.paintBlack(++this.time);
            } else {
                // u's adjacency list hasn't been fully explored.
                v.predecessor = u;
                v.paintGray(++this.time);
                stack.push(v);
            }
        }
    }

    /**
     * Return the first WHITE descendant vertex.
     */
    private firstWhiteNeighbor(u: Vertex): Vertex | undefined {
        return this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                if (v.data.vertex.isWhite) return v.data.vertex;
                else return undefined;
            },
        );
    }

    /********************************************************************************
     * TOPOLOGICAL SORT
     ********************************************************************************/

    /**
     * Topological Sort.
     * It arranges vertices an a way that
     * all edges are directed from left to right.
     * @complexity O(V + E)
     */
    topologicalSort(): Vertex[] {
        this.depthFirstSearch();

        // Vertices sorted, with its vertices arranged from left to right
        // in order of decreasing visited/blackened time.
        return [...this.vertices].sort(
            (u: Vertex, v: Vertex) =>
                v.timestamps.blacken - u.timestamps.blacken,
        );
    }

    /********************************************************************************
     * STRONGLY CONNECTED COMPONENTS
     ********************************************************************************/

    /**
     * Kosaraju's Algorithm.
     * Finds a set of strongly connected components and returns their roots.
     * @note The graph should be directed.
     * @complexity O(V + E)
     */
    stronglyConnectedComponents(): Vertex[] {
        // To calculate the timestamps.
        this.depthFirstSearch();

        const transposedGraph = this.transpose();

        // As DFS goes through graph's vertices,
        // we need the DFS to go through the sorted vertices.
        // We take the timestamps from the current graph and apply it to transposed graph.
        transposedGraph.vertices
            // Sort vertices in decreasing visited time. Like in topological sort.
            .sort(
                (u: Vertex, v: Vertex) =>
                    v.timestamps.blacken - u.timestamps.blacken,
            );
        /**
         * As the edges are reversed and we DFS performs on transposed graph
         * with decreasing visited time, During the DFS of transposed graph,
         * we will not encounter a WHITE vertex from other DF-tree.
         */

        // Returns the root of each strongly connected component.
        return transposedGraph.depthFirstSearch();
    }

    /**
     * Returns the transposed the graph.
     * The transposed graph is the current graph with reversed edges.
     * Graph transpose is equivalent of AdjacencyMatrix Transpose,
     *       but transposing a matrix a O(V*V) operation.
     * @note The transposed graph references the same vertex objects.
     * @note The graph should be directed.
     * @complexity O(V + E)
     */
    transpose(): Graph {
        const list = this.adjacencyList.transpose();

        return new Graph({list, vertices: [...this.vertices]});
    }

    /********************************************************************************
     * CONNECTED COMPONENTS
     ********************************************************************************/

    /**
     * Returns the number of connected components using DFS.
     * @note The graph should be undirected
     * @complexity O(E + V)
     */
    connectedComponents(): number {
        this.prepareVerticesForDFS();
        this.time = 0;
        this.connectedComponent = 0;

        for (const vertex of this.vertices) {
            if (vertex.isGray || vertex.isBlack) continue;

            this.connectedComponent++;
            vertex.connectedComponent = this.connectedComponent;
            // The "vertex" is WHITE.
            this.connectedComponentVisit(vertex);
        }

        return this.connectedComponent;
    }

    /**
     * connectedComponents() helper function.
     */
    private connectedComponentVisit(u: Vertex): void {
        // White vertex has just been discovered.
        u.paintGray(++this.time);

        // Explore edge (u,v).
        this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                if (v.data.vertex.isWhite) {
                    v.data.vertex.predecessor = u;
                    v.data.vertex.connectedComponent = u.connectedComponent;
                    this.connectedComponentVisit(v.data.vertex);
                }
            },
        );

        u.paintBlack(++this.time);
    }

    /********************************************************************************
     * TYPE CHECKS
     ********************************************************************************/

    /**
     * Checks if the graph has a cycle.
     * Need to check if there a back edge during DFS.
     * @note Always true for undirected graphs.
     * @complexity O(V + E)
     */
    isCyclic(): boolean {
        this.prepareVerticesForDFS();

        for (const vertex of this.vertices) {
            if (vertex.isGray || vertex.isBlack) continue;

            // The "vertex" is WHITE.
            if (this.isCyclicVisit(vertex)) return true;
        }

        return false;
    }

    /**
     * isCyclic() helper function.
     * Checks if there is a cycle along the way of DFS.
     */
    private isCyclicVisit(u: Vertex): boolean {
        let hasCycle = false;

        // White vertex has just been discovered.
        u.paintGray();

        // Explore edge (u,v).
        this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                if (v.data.vertex.isWhite && !hasCycle) {
                    v.data.vertex.predecessor = u;
                    hasCycle = this.isCyclicVisit(v.data.vertex);
                } else if (v.data.vertex.isGray) {
                    // Back-edge is found.
                    hasCycle = true;
                }
            },
        );

        u.paintBlack();

        return hasCycle;
    }

    /**
     * Checks if the graph is directed.
     * That is if the graph and its transposed graph have different AdjacencyMatrix/AdjacencyList.
     * @complexity O(E + V + V*V)
     */
    isDirected(): boolean {
        const transposedGraph = this.transpose();

        return !this.isEqualTo(transposedGraph);
    }

    /**
     * Checks if two graphs are equal.
     * @complexity O(V * V)
     */
    private isEqualTo(graph: Graph): boolean {
        if (this.vertices.length !== graph.vertices.length) return false;

        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.n; j++) {
                if (
                    this.adjacencyMatrix.matrix[i][j] !==
                    graph.adjacencyMatrix.matrix[i][j]
                ) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Checks if graph is connected.
     * @complexity O(E + V)
     */
    isConnected(): boolean {
        if (this.isDirected()) {
            // If graph is directed, get underlying undirected graph
            // and check for number connected components.
            const underlyingUndirectedGraph = this.underlyingUndirectedGraph();

            return underlyingUndirectedGraph.connectedComponents() === 1;
        } else {
            return this.connectedComponents() === 1;
        }
    }

    /**
     * Returns the underlying undirected and unweighted graph of directed graph.
     * @complexity O(V * V)
     */
    underlyingUndirectedGraph(): Graph {
        const undirectedAdjacencyMatrix = this.adjacencyMatrix.underlyingUndirectedMatrix();

        return new Graph({matrix: undirectedAdjacencyMatrix});
    }

    /********************************************************************************
     * OTHERS
     ********************************************************************************/

    /**
     * Return the array of ['1', '2', '3', ... 'n'] which will be used a default vertex values.
     * @complexity O(n)
     */
    private getDefaultVertexValues(): string[] {
        return createArrayWithIncrementingValues(this.n, 1).map((k) =>
            k.toString(),
        );
    }

    /**
     * Finds index of a vertex.
     * @complexity O(V)
     */
    private findIndex(u: Vertex): number | undefined {
        return this.vertices.findIndex((v: Vertex) => v === u);
    }

    /**
     * Checks if an index is valid for the current matrix.
     * @complexity O(1)
     */
    private isValidIndex(index?: number): boolean {
        return index != null && index >= 0 && index < this.n;
    }

    /**
     * String representation of vertices.
     */
    toString(): string[] {
        return this.vertices.map((vertex: Vertex) => vertex.toString());
    }
}
