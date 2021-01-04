import {createArrayWithIncrementingValues} from '../../utils';
import {AdjacencyList, AdjacencyListNode} from './list';
import {AdjacencyMatrix} from './matrix';
import {Edge, Vertex} from './vertex';
import {Queue} from '../queue';
import {Stack} from '../stack';
import {SinglyLinkedListNode} from '../singly-linked-list/node';
import {DisjointSet} from '../disjoint-set';
import {DisjointSetNode} from '../disjoint-set/node';
import {MinPriorityQueue} from '../priority-queue';
import {HeapNode} from '../heap/node';

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
    /** The graph's edges. */
    edges: Edge[];
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

        this.edges = this.getEdges();
    }

    /**
     * Returns the graph's edges.
     * @complexity O(V + E)
     */
    getEdges(): Edge[] {
        return this.vertices.reduce((edges: Edge[], u: Vertex) => {
            // Skips the full lists.
            this.adjacencyList.list[u.value].forEach(
                (node: SinglyLinkedListNode<AdjacencyListNode>) => {
                    edges.push(new Edge(u, node.data.vertex, node.data.weight));
                },
            );

            return edges;
        }, [] as Edge[]);
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
        this.edges.push(new Edge(u, v, weight));
        this.adjacencyMatrix.addEdge(u, v, weight);
        this.adjacencyList.addEdge(u, v, weight);
    }

    /**
     * Removes existing edge (u, v).
     */
    removeEdge(u: Vertex, v: Vertex): void {
        const index = this.edges.findIndex((edge: Edge) => {
            if (edge.u === u && edge.v === v) return true;
            else return false;
        });

        index >= 0 && this.edges.slice(index, 1);

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
     * MINIMUM SPANNING TREE
     ********************************************************************************/

    /**
     * Kruskal's algorithm for finding a minimum spanning tree.
     * Returns the minimum spanning tree as a set of edges.
     * @note Graph must be connected and undirected.
     * @complexity O(E * lgV)
     */
    minimumSpanningTree(): Edge[] {
        let u: DisjointSetNode<Vertex>;
        let v: DisjointSetNode<Vertex>;
        // Makes every vertex a separate set.
        const disjointSet = new DisjointSet<Vertex>(this.vertices);
        // Array of edges sorted in non-decreasing order.
        const sortedEdges = [...this.edges].sort(
            (e1: Edge, e2: Edge) => e1.weight - e2.weight,
        );

        // Examines edges in order of weight, from lowest to highest.
        return sortedEdges.reduce((minSpanningTree: Edge[], edge: Edge) => {
            u = disjointSet.findByValue(edge.u)!;
            v = disjointSet.findByValue(edge.v)!;

            // Checks, for each edge (u, v), whether the end points
            // u and v belong to the same tree.
            // If they do, then the edge (u, v) cannot be added
            // to the forest without creating a cycle,
            // and the edge is discarded.
            if (!disjointSet.sameComponent(u, v)) {
                minSpanningTree.push(edge);
                disjointSet.union(u, v);
            }

            return minSpanningTree;
        }, [] as Edge[]);
    }

    /**
     * Prim's algorithm for finding a minimum spanning tree.
     * @param root - the root of future MST. The algorithm starts from the root.
     * @note Graph must be connected and undirected.
     * @complexity O(E + V*lgV)
     */
    primMinimumSpanningTree(root: Vertex): Edge[] {
        const minimumSpanningTree = [] as Edge[];
        let u: HeapNode<Vertex>;
        let v: HeapNode<Vertex> | undefined;
        // The index of v in the array of heap nodes of Min Priority Queue.
        let vIndex: number | undefined;
        // Weight of (u, v) edge.
        let weight: number;
        // Min Priority Queue is used to keep track of edges crossing the cut.
        // extractMin() returns the lightest edge crossing the cut.
        const minPriorityQueue = new MinPriorityQueue<Vertex>(
            this.vertices.map((vertex: Vertex) => {
                vertex.predecessor = undefined;

                if (vertex === root) {
                    // Root has the highest priority.
                    return new HeapNode<Vertex>(0, root);
                } else {
                    // All other nodes are low priority.
                    return new HeapNode<Vertex>(Infinity, vertex);
                }
            }),
        );

        while (!minPriorityQueue.isEmpty()) {
            u = minPriorityQueue.extractMin()!;

            this.adjacencyList.list[u.value.value].forEach(
                (vertex: SinglyLinkedListNode<AdjacencyListNode>) => {
                    weight = vertex.data.weight;
                    vIndex = minPriorityQueue.findIndex(vertex.data.vertex);
                    v =
                        vIndex == null
                            ? undefined
                            : minPriorityQueue.getHeapNodes()[vIndex];

                    // v.key is the weight of a light (v, v.predecessor)
                    // connecting v to some vertex already placed into
                    // the minimum spanning tree.
                    if (v && weight < v.key) {
                        v.value.predecessor = u.value;
                        minPriorityQueue.increasePriority(vIndex!, weight);
                    }
                },
            );

            // Root doesn't have predecessor.
            if (u.value.predecessor) {
                minimumSpanningTree.push(
                    new Edge(u.value.predecessor, u.value),
                );
            }
        }

        return minimumSpanningTree;
    }

    /********************************************************************************
     * EULERIAN PATH
     ********************************************************************************/

    /**
     * Checks if graph has an Euler Circuit (Eulerian).
     * @note Graph should be undirected.
     * @complexity O(V + E)
     */
    isEulerian(): boolean {
        const connectedComponents = this.connectedComponents();
        const zeroDegreeVertices = this.zeroDegreeVertices();
        // Note that odd count can never be 1 for undirected graph.
        const oddDegreeVertices = this.oddDegreeVertices();
        // Don't count zero degree vertices.
        const isConnected = connectedComponents - zeroDegreeVertices === 1;

        if (!isConnected) return false;
        else if (oddDegreeVertices === 0) return true;

        return false;
    }

    /**
     * Checks if graph has an Euler path (Semi-Eulerian).
     * @note Graph should be undirected.
     * @complexity O(V + E)
     */
    isSemiEulerian(): boolean {
        const connectedComponents = this.connectedComponents();
        const zeroDegreeVertices = this.zeroDegreeVertices();
        // Note that odd count can never be 1 for undirected graph.
        const oddDegreeVertices = this.oddDegreeVertices();
        // Don't count zero degree vertices.
        const isConnected = connectedComponents - zeroDegreeVertices === 1;

        if (!isConnected) return false;
        else if (oddDegreeVertices === 2) return true;

        return false;
    }

    /**
     * Checks if graph has an Euler Circuit (Eulerian).
     * @note Graph should be directed.
     * @complexity O(V + E + V*V)
     */
    isEuleranCyce(): boolean {
        const scc = this.stronglyConnectedComponents().length;
        const zeroDegreeVertices = this.zeroDegreeVertices();
        const isStronglyConnected = scc - zeroDegreeVertices === 1;

        // Check if all non-zero degree vertices are strongly connected.
        if (!isStronglyConnected) return false;

        // Check if in degree and out degree of every vertex is same.
        // TODO: Store "inDegree" and "outDegree" within a vertex to decrease complexity.
        for (const vertex of this.vertices) {
            if (this.inDegree(vertex) !== this.outDegree(vertex)) return false;
        }

        return true;
    }

    /**
     * Returns the number of zero degree vertices.
     * @complexity O(V)
     */
    zeroDegreeVertices(): number {
        let k = 0;

        for (const u of this.vertices) {
            // Skips the full lists.
            if (!this.adjacencyList.list[u.value].isEmpty()) continue;

            k++;
        }

        return k;
    }

    /**
     * Returns the number of odd degree vertices.
     * @complexity O(V)
     */
    oddDegreeVertices(): number {
        let k = 0;

        for (const u of this.vertices) {
            // Skips the even degree vertices.
            if (this.adjacencyList.list[u.value].length % 2 === 0) continue;

            k++;
        }

        return k;
    }

    /**
     * Returns the number of even degree vertices.
     * @complexity O(V)
     */
    evenDegreeVertices(): number {
        let k = 0;

        for (const u of this.vertices) {
            // Skips the odd degree vertices.
            if (this.adjacencyList.list[u.value].length % 2 !== 0) continue;

            k++;
        }

        return k;
    }

    /**
     * Returns the number of In-Degree Vertices.
     * @complexity O(V)
     */
    inDegree(vertex: Vertex): number {
        return this.adjacencyMatrix.inDegree(vertex);
    }

    /**
     * Returns the number of Out-Degree Vertices.
     * @complexity O(V)
     */
    outDegree(vertex: Vertex): number {
        return this.adjacencyMatrix.outDegree(vertex);
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