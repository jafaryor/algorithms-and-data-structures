import * as _ from 'lodash';
import {
    createArrayAndFillWith,
    createArrayWithIncrementingValues,
} from '../../utils';
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
import {UnionFinder} from '../../problems/dynamic-connectivity';

/**
 * The Graph.
 * The graph can be:
 *      Directed
 *      Undirected
 *      Weighted
 *      Unweighted
 *      Cyclic
 *      Acyclic
 * @note Doesn't support duplicate vertices.
 */
export class Graph<T = string> {
    /** The number of vertices. */
    protected n: number;
    /** The graph's vertices. */
    vertices: Array<Vertex<T>>;
    /** The graph's edges. */
    edges: Array<Edge<T>>;
    /** Te Adjacency List Representation. */
    adjacencyList: AdjacencyList<T>;
    /** The Adjacency Matrix Representation. */
    adjacencyMatrix: AdjacencyMatrix<T>;
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
        list?: {[vertex: string]: Array<AdjacencyListNode<T>>};
        // The list of vertex objects which were used in list above.
        vertices?: Array<Vertex<T>>;
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
     * @time O(V + E)
     */
    getEdges(): Array<Edge<T>> {
        return this.vertices.reduce((edges: Array<Edge<T>>, u: Vertex<T>) => {
            // Skips the full lists.
            this.adjacencyList.list[u.value].forEach(
                (node: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    edges.push(new Edge(u, node.data.vertex, node.data.weight));
                },
            );

            return edges;
        }, [] as Array<Edge<T>>);
    }

    /**
     * Initializes the graph by adjacency matrix.
     */
    protected initByMatrix(
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
    protected initByList(
        list: {[vertex: string]: Array<AdjacencyListNode<T>>},
        vertices: Array<Vertex<T>>,
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
    addEdge(u: Vertex<T>, v: Vertex<T>, weight: number = 1): void {
        this.edges.push(new Edge(u, v, weight));
        this.adjacencyMatrix.addEdge(u, v, weight);
        this.adjacencyList.addEdge(u, v, weight);
    }

    /**
     * Removes existing edge (u, v).
     */
    removeEdge(u: Vertex<T>, v: Vertex<T>): void {
        const index = this.edges.findIndex((edge: Edge<T>) => {
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
    addVertex(vertex: Vertex<T>): void {
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
    removeVertex(vertex: Vertex<T>): void {
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
     * @note Finds a shortest path from root to all vertices
     *       if the graph is unweighted.
     * @time O(V + E)
     */
    breadthFirstSearch(root: Vertex<T>): Vertex<T> {
        const queue = new Queue<Vertex<T>>();
        let u: Vertex<T>;

        this.resetVertices();
        // We start searching from root. so mark root as discovered.
        root.markAsDiscovered();
        queue.enqueue(root);

        while (!queue.isEmpty()) {
            u = queue.dequeue()!;

            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
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

    /********************************************************************************
     * DEPTH FIRST SEARCH
     ********************************************************************************/

    /**
     * The Depth First Search.
     * Returns the reference to roots of a built Depth First Trees.
     * @time O(V + E)
     */
    depthFirstSearch(): Array<Vertex<T>> {
        const roots = [] as Array<Vertex<T>>;

        this.resetVertices();
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
     * DFS vertex visit procedure.
     */
    protected depthFirstSearchVisit(u: Vertex<T>): void {
        // White vertex has just been discovered.
        u.paintGray(++this.time);

        // Explore edge (u,v).
        this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
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
     * @time O(V + E)
     */
    depthFirstSearchVisitStack(u: Vertex<T>): void {
        const stack = new Stack<Vertex<T>>();
        let v: Vertex<T> | undefined;

        this.resetVertices();
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
    protected firstWhiteNeighbor(u: Vertex<T>): Vertex<T> | undefined {
        return this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                if (v.data.vertex.isWhite) return v.data.vertex;
                else return undefined;
            },
        );
    }

    /********************************************************************************
     * TOPOLOGICAL SORT
     ********************************************************************************/

    /**
     * Kahn's Algorithms for Topological Sort.
     * In each iteration, the algorithm removes a vertex,
     * with no incoming edges and insert it into the result.
     * @note works for directed acyclic graphs (DAG) only.
     * @time O(V + E)
     */
    topologicalSort(): Array<Vertex<T>> {
        const queue = new Queue<Vertex<T>>();
        const result = [] as Array<Vertex<T>>;

        // Count in-degree of each vertex.
        for (const u of this.vertices) {
            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    v.data.vertex.degree.in++;
                },
            );
        }

        // Add all vertices with in-degree = 0 to the queue.
        for (const u of this.vertices) {
            if (u.degree.in === 0) queue.enqueue(u);
        }

        while (!queue.isEmpty()) {
            const u = queue.dequeue()!;
            result.push(u);

            // Since u is removed from the graph,
            // the in-degree of its children will be reduced by 1.
            // And some its children might become in-degree = 0.
            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    v.data.vertex.degree.in--;

                    // If the in-degree of "v" becomes 0,
                    // then add "v" to the queue.
                    if (v.data.vertex.degree.in === 0) {
                        queue.enqueue(v.data.vertex);
                    }
                },
            );
        }

        if (result.length !== this.vertices.length) {
            throw new Error(
                'The graph is cyclic! No topological sort possible.',
            );
        }

        return result;
    }

    /********************************************************************************
     * STRONGLY CONNECTED COMPONENTS
     ********************************************************************************/

    /**
     * Kosaraju's Algorithm.
     * Finds a set of strongly connected components and returns their roots.
     * @note The graph should be directed.
     * @time O(V + E)
     */
    kosarajuSCC(): Array<Vertex<T>> {
        // To calculate the timestamps.
        this.depthFirstSearch();

        const transposedGraph = this.transpose();

        // As DFS goes through graph's vertices,
        // we need the DFS to go through the sorted vertices.
        // We take the timestamps from the current graph and apply it to transposed graph.
        transposedGraph.vertices
            // Sort vertices in decreasing visited time. Like in topological sort.
            .sort(
                (u: Vertex<T>, v: Vertex<T>) =>
                    v.timestamps.blacken - u.timestamps.blacken,
            );
        /**
         * As the edges are reversed, we DFS on transposed graph
         * with decreasing visited time, During the DFS of transposed graph,
         * we will not reach a vertex from other connected components,
         * because all edges are reversed.
         * The components that were reachable before, are not reachable in transposed graph.
         */

        // Returns the root of each strongly connected component.
        return transposedGraph.depthFirstSearch();
    }

    /**
     * Tarjan's Algorithm.
     * Finds a set of strongly connected components and returns the number of SCCs.
     * Basically, we run DFS and group each SCC by the ID of its root.
     * @note The graph should be directed.
     * @time O(V + E)
     */
    tarjanSCC(): number {
        const stack = new Stack<Vertex<T>>();
        // To store reference to the strongly connected components.
        let sccCount = 0;

        /**
         * We use vertex.connectedComponent as low link value.
         *  - The low link value is the lowest vertex ID reachable from the current vertex.
         * We use vertex.timestamps.blacken as the ID assigned during DFS.
         * We use vertex.timestamps.grayed as a sign currently being in the stack.
         *  - Infininty, is used as the default value.
         *  - 1, is used when the vertex is inside the stack.
         */
        this.resetVertices();
        this.time = 0;

        // Performs DFS on each vertex of the graph.
        for (const vertex of this.vertices) {
            if (vertex.isBlack) continue;

            sccCount += this.tarjanSCCHelper(vertex, stack);
        }

        return sccCount;
    }

    /**
     * DFS procedure for Tarjan's Algorithm.
     */
    private tarjanSCCHelper(u: Vertex<T>, stack: Stack<Vertex<T>>): number {
        let sccCount = 0;

        stack.push(u);

        // Mark vertex as inside the stack.
        u.paintGray(1);
        // Assign a unique ID to a vertex.
        u.paintBlack(++this.time);
        // Low link value is the ID of the vertex.
        u.connectedComponent = this.time;

        // Explore all the adjacent vertices.
        this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                // Checks if the vertex is unvisited.
                if (v.data.vertex.isWhite) {
                    sccCount += this.tarjanSCCHelper(v.data.vertex, stack);
                }

                // Checks if the vertex is inside the stack.
                if (v.data.vertex.timestamps.grayed === 1) {
                    u.connectedComponent = Math.min(
                        u.connectedComponent!,
                        v.data.vertex.connectedComponent!,
                    );
                }
            },
        );

        // After having visited all the neighbors of the vertex,
        // if we are at the start of a strongly connected component (SCC),
        // empty the seen stack until we are back to the start of a SCC.
        if (u.timestamps.blacken === u.connectedComponent) {
            // The root of SCC is found.

            for (let v = stack.pop(); v; v = stack.pop()) {
                // Mark vertex as not inside the stack.
                v.timestamps.grayed = Infinity;
                // Low link value of "v" is the ID of the "u".
                v.connectedComponent = u.timestamps.blacken;

                // Don't extract "u" since we might not yet visited all of its edges
                if (v === u) break;
            }

            sccCount++;
        }

        return sccCount;
    }

    /**
     * Returns the transposed the graph.
     * The transposed graph is the current graph with reversed edges.
     * Graph transpose is equivalent of AdjacencyMatrix Transpose,
     *       but transposing a matrix a O(V*V) operation.
     * @note The transposed graph references the same vertex objects.
     * @note The graph should be directed.
     * @time O(V + E)
     */
    transpose(): Graph<T> {
        const list = this.adjacencyList.transpose();

        return new Graph({list, vertices: [...this.vertices]});
    }

    /********************************************************************************
     * CONNECTED COMPONENTS
     ********************************************************************************/

    /**
     * Returns the number of connected components using DFS.
     * @note The graph should be undirected
     * @time O(E + V)
     */
    connectedComponents(): number {
        this.resetVertices();
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
    protected connectedComponentVisit(u: Vertex<T>): void {
        // White vertex has just been discovered.
        u.paintGray(++this.time);

        // Explore edge (u,v).
        this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
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
     * @time O(V + E)
     */
    isCyclic(): boolean {
        this.resetVertices();

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
    protected isCyclicVisit(u: Vertex<T>): boolean {
        let hasCycle = false;

        // White vertex has just been discovered.
        u.paintGray();

        // Explore edge (u,v).
        this.adjacencyList.list[u.value].forEach(
            (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
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
     * @time O(E + V + V*V)
     */
    isDirected(): boolean {
        const transposedGraph = this.transpose();

        return !this.isEqualTo(transposedGraph);
    }

    /**
     * Checks if two graphs are equal.
     * @time O(V * V)
     */
    protected isEqualTo(graph: Graph<T>): boolean {
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
     * @time O(E + V)
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
     * @time O(V * V)
     */
    underlyingUndirectedGraph(): Graph<T> {
        const undirectedAdjacencyMatrix =
            this.adjacencyMatrix.underlyingUndirectedMatrix();

        return new Graph({matrix: undirectedAdjacencyMatrix});
    }

    /**
     * Checks if the graph is a valid tree.
     * 1. Graph is connected.
     * 2. Graph is acyclic.
     */
    isValidTree(): boolean {
        let acyclic = true;
        const unionFinder = new UnionFinder();

        unionFinder.count = this.n;
        unionFinder.parent = new Array(this.n);
        unionFinder.size = new Array(this.n);

        for (let i = 0; i < this.n; i++) {
            unionFinder.parent[i] = i;
            unionFinder.size[i] = 1;
        }

        for (const u of this.vertices) {
            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    if (unionFinder.connected(Number(u.data), Number(v.data))) {
                        acyclic = false;

                        return;
                    } else unionFinder.union(Number(u.data), Number(v.data));
                },
            );
        }

        return acyclic && unionFinder.count === 1;
    }

    /********************************************************************************
     * MINIMUM SPANNING TREE
     ********************************************************************************/

    /**
     * Kruskal's algorithm for finding a minimum spanning tree.
     * Returns the minimum spanning tree as a set of edges.
     * @note Graph must be connected and undirected.
     * @time O(E * lgV)
     */
    minimumSpanningTree(): Array<Edge<T>> {
        let u: DisjointSetNode<Vertex<T>>;
        let v: DisjointSetNode<Vertex<T>>;
        // Makes every vertex a separate set.
        const disjointSet = new DisjointSet<Vertex<T>>(this.vertices);
        // Array of edges sorted in non-decreasing order.
        const sortedEdges = [...this.edges].sort(
            (e1: Edge<T>, e2: Edge<T>) => e1.weight - e2.weight,
        );

        // Examines edges in order of weight, from lowest to highest.
        return sortedEdges.reduce(
            (minSpanningTree: Array<Edge<T>>, edge: Edge<T>) => {
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
            },
            [] as Array<Edge<T>>,
        );
    }

    /**
     * Prim's algorithm for finding a minimum spanning tree.
     * @param root - the root of future MST. The algorithm starts from the root.
     * @note Graph must be connected and undirected.
     * @time O(E + V*lgV)
     */
    primMinimumSpanningTree(root: Vertex<T>): Array<Edge<T>> {
        const minimumSpanningTree = [] as Array<Edge<T>>;
        let u: HeapNode<Vertex<T>>;
        let v: HeapNode<Vertex<T>> | undefined;
        // The index of v in the array of heap nodes of Min Priority Queue.
        let vIndex: number | undefined;
        // Weight of (u, v) edge.
        let weight: number;
        // Min Priority Queue is used to keep track of edges crossing the cut.
        // extractMin() returns the lightest edge crossing the cut.
        const minPriorityQueue =
            this.getMinPriorityQueueWithResetVertices(root);

        while (!minPriorityQueue.isEmpty()) {
            u = minPriorityQueue.extractMin()!;

            this.adjacencyList.list[u.value.value].forEach(
                (vertex: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    weight = vertex.data.weight;
                    vIndex = minPriorityQueue.findIndex(vertex.data.vertex);
                    v =
                        vIndex == null
                            ? undefined
                            : minPriorityQueue.getHeapNodes()[vIndex];

                    // v.key is the weight of a light edge (v, v.predecessor)
                    // connecting v to some vertex already placed into
                    // the minimum spanning tree (u).
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
     * PATHS NUMBER
     ********************************************************************************/

    /**
     * Returns the number of all possible paths in the graph.
     * @note "distance" prop is used to count the number
     *        of paths whose start point is at a vertex.
     * @assumes the graph is acyclic.
     * @time O(V + E)
     */
    paths(): number {
        const topologicallySortedVertices = this.topologicalSort();

        // Resets the "distance" attribute.
        for (const vertex of this.vertices) {
            vertex.distance = 0;
        }

        for (const u of topologicallySortedVertices) {
            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    v.data.vertex.distance += u.distance + 1;
                },
            );
        }

        // Returns the sum of all "distance" attributes.
        return this.vertices.reduce(
            (sum: number, vertex: Vertex<T>) => sum + vertex.distance,
            0,
        );
    }

    /********************************************************************************
     * SINGLE-SOURCE SHORTEST PATHS
     ********************************************************************************/

    /**
     * Bellman Ford Algorithm for calculating shortest path from a single source.
     * Returns true, if the graph contains no negative-weight cycles.
     * @assumes the graph has negative weight edges.
     * @time O(V * E)
     */
    bellmanFordShortestPath(root: Vertex<T>): boolean {
        let result: boolean;

        this.resetVertices();
        // We start searching from root. so mark root as discovered.
        root.markAsDiscovered();

        // Relaxes each edge |V| - 1 times.
        // Why? Because the shortest path has at most |V| - 1 edges.
        for (let i = 0; i < this.vertices.length - 1; i++) {
            for (const u of this.vertices) {
                this.adjacencyList.list[u.value].forEach(
                    (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                        this.relax(u, v.data.vertex, v.data.weight);
                    },
                );
            }
        }

        // Checks the graph for a negative-weight cycles.
        // By going through the edges one more time. If a shorter path
        // is discovered, then graph contains a negative-weight cycle.
        for (const u of this.vertices) {
            result = this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    if (v.data.vertex.distance > u.distance + v.data.weight) {
                        // A shorter path is discovered, which is possible
                        // only if graph contains a negative-weight cycles.
                        return false;
                    } else {
                        return undefined;
                    }
                },
            );

            // If a negative-weight cycles were detected, terminate.
            if (result === false) return false;
        }

        // No negative-weight cycles were detected.
        return true;
    }

    /**
     * Calculates a shortest paths in directed acyclic graphs from a single source.
     * @assumes the graph is acyclic and has a negative weight edges.
     * @time O(V + E)
     */
    dagShortestPath(root: Vertex<T>): void {
        const topologicallySortedVertices = this.topologicalSort();

        this.resetVertices();
        // We start searching from root. so mark root as discovered.
        root.markAsDiscovered();

        // Relaxes all vertices in topological order.
        for (const u of topologicallySortedVertices) {
            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    this.relax(u, v.data.vertex, v.data.weight);
                },
            );
        }
    }

    /**
     * Dijkstra Algorithm for calculating shortest path from a single source.
     * @assumes the graph has no edge with negative weight.
     * @time O((V + E) * lgV)
     */
    dijkstraShortestPath(root: Vertex<T>): Array<Vertex<T>> {
        let u: HeapNode<Vertex<T>>;
        let v: HeapNode<Vertex<T>> | undefined;
        // The index of v in the array of heap nodes of Min Priority Queue.
        let vIndex: number | undefined;
        // Weight of (u, v) edge.
        let weight: number;
        // The shortest path.
        const shortestPath = [] as Array<Vertex<T>>;
        // Min Priority Queue is used to keep track of edges crossing the cut.
        // extractMin() returns the lightest edge crossing the cut.
        const minPriorityQueue =
            this.getMinPriorityQueueWithResetVertices(root);

        while (!minPriorityQueue.isEmpty()) {
            u = minPriorityQueue.extractMin()!;
            shortestPath.push(u.value);

            this.adjacencyList.list[u.value.value].forEach(
                (vertex: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    weight = vertex.data.weight;
                    vIndex = minPriorityQueue.findIndex(vertex.data.vertex);
                    v =
                        vIndex == null
                            ? undefined
                            : minPriorityQueue.getHeapNodes()[vIndex];

                    // v.key is the weight of a shortest path from root to v.
                    // Relaxes each edge adjacent to u.
                    if (v && v.key > u.key + weight) {
                        this.relax(u.value, v.value, weight);
                        minPriorityQueue.increasePriority(
                            vIndex!,
                            u.key + weight,
                        );
                    }
                },
            );
        }

        return shortestPath;
    }

    /**
     * Performs a relaxation on edge (u, v).
     * @time O(1)
     */
    protected relax(u: Vertex<T>, v: Vertex<T>, weight: number): void {
        // Checks if the edge (u, v) gives a shorter path.
        if (v.distance > u.distance + weight) {
            // Edge (u, v) is shorter than previously discovered path.
            v.distance = u.distance + weight;
            v.predecessor = u;
        }
    }

    /********************************************************************************
     * ALL-PAIR SHORTEST PATHS
     ********************************************************************************/

    /**
     * The Floyd-Warshall algorithm for finding the all-pair shortest paths.
     * @assumes the graph is an any type and AdjacencyMatrix[i][i] = 0 for all 0 ≤ i < n.
     * @time O(V^3)
     * @space O(V^2)
     */
    floydWarshallShortestPaths(): {
        weights: number[][];
        predecessors: Array<Array<number | undefined>>;
    } {
        // W - Shortest Path Weights Matrix.
        const w = [] as number[][];
        // P - Predecessor Matrix.
        const p = [] as Array<Array<number | undefined>>;

        // Deep cloning of the Adjacency Matrix.
        for (let i = 0; i < this.n; i++) {
            w.push([]);
            p.push([]);

            for (let j = 0; j < this.n; j++) {
                // Convert "undefined" into Infinity in W,
                // for correct work of the algorithm.
                if (this.adjacencyMatrix.matrix[i][j] == null) {
                    w[i].push(Infinity);
                    p[i].push(undefined);
                } else {
                    w[i].push(this.adjacencyMatrix.matrix[i][j]!);
                    p[i].push(j);
                }
            }
        }

        /**
         * Main Part:
         * In each iteration of k, the matrix W will calculate a
         * shortest path from i to j using k intermediate vertices.
         * By the time k = n, all vertices will be included into a path.
         */
        // k - the amount of vertices involved into path.
        for (let k = 0; k < this.n; k++) {
            // i - starting vertex.
            for (let i = 0; i < this.n; i++) {
                // j - finishing vertex.
                for (let j = 0; j < this.n; j++) {
                    // Relaxation.
                    if (w[i][k] + w[k][j] < w[i][j]) {
                        w[i][j] = w[i][k] + w[k][j];
                        p[i][j] = p[i][k];
                    }
                }
            }
        }

        // Checks the graph for a negative-weight cycles.
        // By running the algorithm one more time. If a shorter path
        // is discovered, then graph contains a negative-weight cycle.
        for (let k = 0; k < this.n; k++) {
            // i - starting vertex.
            for (let i = 0; i < this.n; i++) {
                // j - finishing vertex.
                for (let j = 0; j < this.n; j++) {
                    // Relaxation.
                    if (w[i][k] + w[k][j] < w[i][j]) {
                        // -∞ edges are either part of or
                        // reach into a negative-weight cycle.
                        w[i][j] = -Infinity;
                        p[i][j] = -1;
                    }
                }
            }
        }

        return {
            weights: w,
            predecessors: p,
        };
    }

    /**
     * Reconstructs the shortest path between vertices i and j.
     * @note Returns "undefined" is path is affected by a negative-weight cycle.
     * @param weights - Shortest Path Weights Matrix from Floyd-Warshall Algorithm.
     * @param predecessors - Predecessor Matrix from Floyd-Warshall Algorithm.
     * @time O(E)
     */
    shortestPath(
        i: number,
        j: number,
        weights: number[][],
        predecessors: Array<Array<number | undefined>>,
    ): number[] | undefined {
        let k: number;
        const path = [] as number[];

        // Checks if a path between i and j vertices exists.
        if (weights[i][j] === Infinity) return path;

        // Goes through all vertices in the shortest path between i and j.
        for (k = i; k !== j; k = predecessors[k][j]!) {
            // Path contains a negative-weight cycle.
            if (k === -1) return undefined;

            path.push(k);
        }

        // Check and include the last vertex (j).
        if (predecessors[k][j] === -1) return undefined;
        path.push(j);

        return path;
    }

    /**
     * The Johnson's algorithm for finding the all-pair shortest paths.
     * @assumes the graph is an any type and AdjacencyMatrix[i][i] = 0 for all 0 ≤ i < n.
     * @note DON'T USE 's' AS A VERTEX VALUE.
     * @time O(V*lgV * (E + V))
     * @space O(V + V*2)
     */
    johnsonShortestPaths(): number[][] | undefined {
        let u: Vertex<T>;
        let v: Vertex<T>;
        const reweightedGraph = this.getReweightedGraph();
        // The vertex which points all other vertices.
        const s = reweightedGraph.vertices[this.n];
        // h function for each vertex.
        const h = {} as {[key: string]: number};
        // Shortest path weights matrix.
        const d = [] as number[][];

        // Computes the shortest path weights from s for reweighted graph.
        if (!reweightedGraph.bellmanFordShortestPath(s)) {
            // A negative-weight cycle was detected.
            // Consequently, there in no solution.
            return;
        } else {
            for (const v of reweightedGraph.vertices) {
                // h(v) = δ(s, v) for all v ∈ V.
                h[v.value] = v.distance;
            }

            // Assigns new weight values (ω), to have non-negative edge weights.
            // It is done to apply Dijkstra Algorithm later.
            for (const u of this.vertices) {
                this.adjacencyList.list[u.value].forEach(
                    (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                        v.data.weight =
                            v.data.weight + h[u.value] - h[v.data.vertex.value];
                    },
                );
            }

            // Now we have a graph with no negative weight edges.
            for (let i = 0; i < this.n; i++) {
                u = this.vertices[i];
                d.push([]);
                // Computes the shortest path weights with
                // new edge weights ω computed above to produce Δ.
                this.dijkstraShortestPath(u);

                for (let j = 0; j < this.n; j++) {
                    v = this.vertices[j];
                    // Populate the shortest path weights matrix.
                    d[i].push(v.distance + h[v.value] - h[u.value]);
                }
            }

            // Restores the original edge weights.
            for (const u of this.vertices) {
                this.adjacencyList.list[u.value].forEach(
                    (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                        v.data.weight =
                            v.data.weight - h[u.value] + h[v.data.vertex.value];
                    },
                );
            }

            return d;
        }
    }

    /**
     * Returns a reweighted graph used by Johnson's Algorithm.
     * Adds a vertex s, which points to all vertices of graph.
     * All edges leaving s have a zero weight.
     * @time O(V)
     */
    protected getReweightedGraph(): Graph<T> {
        const n = this.n + 1;
        const vertexValues = [] as string[];
        const matrix = [] as Array<Array<number | undefined>>;

        for (let i = 0; i < this.n; i++) {
            // Clones the vertices.
            vertexValues.push(this.vertices[i].value);
            // Clones each row.
            matrix.push([...this.adjacencyMatrix.matrix[i]]);
            // Adds a column for vertex s.
            matrix[i].length = n;
        }

        // Adds a new vertex s.
        vertexValues.push('s');
        // Adds a new vertex s and adds 0 weight edges from s to all vertices.
        matrix.push(createArrayAndFillWith(n, 0));

        return new Graph({matrix, vertexValues});
    }

    /********************************************************************************
     * EULERIAN PATH && CYCLE for DIRECTED GRAPHS
     ********************************************************************************/

    /**
     * Hierholzer's Algorithm.
     * Outputs the Eulerian Path.
     * @time O(V + E)
     */
    findEulerianPath(): string[] {
        const path: string[] = [];
        let startVertex: Vertex<T> = this.vertices[0];

        if (!this.hasEulerianPath()) return [];

        // Find starting node.
        for (const vertex of this.vertices) {
            // Find that unique starting node.
            if (vertex.degree.out - vertex.degree.in === 1) {
                startVertex = vertex;
            }
            // Start at any vertex with outgoing edge.
            if (vertex.degree.out > 0) startVertex = vertex;
        }

        // DFS.
        const dfs = (u: Vertex<T>) => {
            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    // Skip the visited edges.
                    if (v.data.vertex.isBlack) return;

                    v.data.vertex.markAsVisited();
                    dfs(v.data.vertex);
                },
            );

            // Build the path back to front.
            path.unshift(u.value);
        };

        // Start DFS from that starting vertex.
        dfs(startVertex);

        // Why "+1", because each edge is represented by two connected vertices.
        return path.length === this.edges.length + 1 ? path : [];
    }

    /**
     * Checks if graph has an Euler path (Semi-Eulerian).
     * @note Graph should be undirected.
     * @time O(3V + 2E)
     */
    hasEulerianPath(): boolean {
        let startVertrices = 0;
        let endVertices = 0;

        if (!this.isConnected()) return false;

        this.countDegrees();

        for (const vertex of this.vertices) {
            if (Math.abs(vertex.degree.in - vertex.degree.out) > 1) {
                return false;
            } else if (vertex.degree.out - vertex.degree.in === 1) {
                startVertrices++;
            } else if (vertex.degree.in - vertex.degree.out === 1) {
                endVertices++;
            }
        }

        return (
            (endVertices === 0 && startVertrices === 0) ||
            (endVertices === 1 && startVertrices === 1)
        );
    }

    /**
     * Checks if graph has an Euler Cycle (Eulerian).
     * @note Graph should be directed.
     * @time O(3V + 2E)
     */
    hasEulerianCycle(): boolean {
        if (!this.isConnected()) return false;

        this.countDegrees();

        for (const vertex of this.vertices) {
            if (vertex.degree.in !== vertex.degree.out) return false;
        }

        return true;
    }

    /**
     * Count in-degree and out-degree of each vertices.
     * @note works for directed graphs
     * @time: O(V + E)
     */
    countDegrees(): void {
        this.resetVertices();

        for (const u of this.vertices) {
            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode<T>>) => {
                    u.degree.out++;
                    v.data.vertex.degree.in++;
                },
            );
        }
    }

    /********************************************************************************
     * OTHERS
     ********************************************************************************/

    /**
     * Sets a proper initial state for each vertex.
     * @time O(V)
     */
    protected resetVertices(): void {
        // Unmark all vertices before searching.
        for (const vertex of this.vertices) {
            vertex.unmark();
        }
    }

    /**
     * Returns the Min Priority Queue with all vertices reset
     * and root marked as discovered.
     * @time O(V)
     */
    protected getMinPriorityQueueWithResetVertices(
        root: Vertex<T>,
    ): MinPriorityQueue<Vertex<T>> {
        let node: HeapNode<Vertex<T>>;

        return new MinPriorityQueue<Vertex<T>>(
            this.vertices.map((vertex: Vertex<T>) => {
                vertex.predecessor = undefined;

                if (vertex === root) {
                    // Root has the highest priority.
                    node = new HeapNode<Vertex<T>>(0, root);
                    node.value.distance = 0;

                    return node;
                } else {
                    // All other nodes are low priority.
                    node = new HeapNode<Vertex<T>>(Infinity, vertex);
                    node.value.distance = Infinity;

                    return node;
                }
            }),
        );
    }

    /**
     * Return the array of ['1', '2', '3', ... 'n'] which will be used a default vertex values.
     * @time O(n)
     */
    protected getDefaultVertexValues(): string[] {
        return createArrayWithIncrementingValues(this.n, 1).map((k) =>
            k.toString(),
        );
    }

    /**
     * Finds index of a vertex.
     * @time O(V)
     */
    protected findIndex(u: Vertex<T>): number | undefined {
        return this.vertices.findIndex((v: Vertex<T>) => v === u);
    }

    /**
     * Checks if an index is valid for the current matrix.
     * @time O(1)
     */
    protected isValidIndex(index?: number): boolean {
        return index != null && index >= 0 && index < this.n;
    }

    /**
     * String representation of vertices.
     */
    toString(): string[] {
        return this.vertices.map((vertex: Vertex<T>) => vertex.toString());
    }
}
