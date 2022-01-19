import {Graph} from '../graph';
import {AdjacencyListNode} from '../graph/list';
import {Vertex} from '../graph/vertex';
import {Queue} from '../queue';
import {SinglyLinkedListNode} from '../singly-linked-list/node';
import {Flow} from './flow';

/**
 * The Residual Graph data structure.
 */
export class ResidualGraph extends Graph {
    /** The flow's source. */
    private source: Vertex;
    /** The flow's sink. */
    private sink: Vertex;
    /** The flow function which gives the flow for each edge (u, v). */
    flow: Flow;

    constructor(
        data: {
            // Required if initialize by Adjacency Matrix.
            matrix?: Array<Array<number | undefined>>;
            // The value of each vertex.
            vertexValues?: string[];
            // Required if initialize by Adjacency List.
            list?: {[vertex: string]: AdjacencyListNode[]};
            // The list of vertex objects which were used in list above.
            vertices?: Vertex[];
        },
        sourceIndex: number,
        sinkIndex: number,
    ) {
        super(data);

        this.createReverseEdges();
        this.flow = new Flow(this);

        this.source = this.vertices[sourceIndex];
        this.sink = this.vertices[sinkIndex];
    }

    /**
     * Sets the flow for all edges to 0.
     */
    resetFlow(): void {
        this.flow.reset();
    }

    /**
     * Creates a reserve edge for all graph's edges.
     * Reverse edges are used to decrease the flow.
     */
    createReverseEdges(): void {
        for (const u of this.vertices) {
            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                    if (v.data.weight < 0) return;

                    // Reverse edges have negative capacity.
                    this.addEdge(v.data.vertex, u, -v.data.weight);
                },
            );
        }
    }

    /**
     * The Breadth First Search.
     * Returns the sink if an augmented path from s to t exists.
     * @timeO(V + E)
     */
    bfs(): Vertex | undefined {
        const queue = new Queue<Vertex>();
        let u: Vertex;

        this.resetVertices();

        // We start searching from source.
        this.source.markAsDiscovered();
        queue.enqueue(this.source);

        while (!queue.isEmpty()) {
            u = queue.dequeue()!;

            // As soon as a path is discovered from source to sink,
            // stop searching as we process one pass at a time
            // and after processing, the residual graph will change.
            // So there is no reason for further searching.
            if (u === this.sink) break;

            this.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                    // Checks if the vertex is unvisited and if direction is valid.
                    if (
                        v.data.vertex.isWhite &&
                        this.isValidDirection(u, v.data.vertex, v.data.weight)
                    ) {
                        v.data.vertex.distance = u.distance + 1;
                        v.data.vertex.markAsDiscovered(u.distance + 1, u);
                        queue.enqueue(v.data.vertex);
                    }

                    u.markAsVisited();
                },
            );
        }

        // No augmented path exists from s to t was discovered;
        if (this.sink.predecessor == null) return;

        return this.sink;
    }

    /**
     * Returns the residual capacity of the latest discovered path in BFS.
     */
    findPathResidualCapacity(): number {
        let residualCapacity = Infinity;
        let remainingCapacity: number;
        let u: Vertex;

        for (let v = this.sink; v !== this.source; v = v.predecessor!) {
            u = v.predecessor!;
            remainingCapacity =
                this.getCapacity(u, v) - this.flow.getFlow(u, v);

            residualCapacity = Math.min(residualCapacity, remainingCapacity);
        }

        return residualCapacity;
    }

    /**
     * Runs the path's residual capacity equal flow through all edges of
     * latest discovered augmented path in BFS.
     */
    augmentPath(pathResidualCapacity: number): void {
        let u: Vertex;

        for (let v = this.sink; v !== this.source; v = v.predecessor!) {
            u = v.predecessor!;

            this.augment(pathResidualCapacity, u, v);
        }
    }

    /**
     * Augments the path between u and v by pushing the new flow and
     * add adjusting the flow in reverse edge (v, u).
     */
    private augment(additionalFlow: number, u: Vertex, v: Vertex): void {
        const flow = this.flow.getFlow(u, v);
        const reverseFlow = this.flow.getFlow(v, u);

        this.flow.setFlow(flow + additionalFlow, u, v);
        this.flow.setFlow(reverseFlow - additionalFlow, v, u);
    }

    /**
     * Returns edge capacity.
     */
    private getCapacity(u: Vertex, v: Vertex): number {
        const capacity = this.adjacencyList.list[u.value].forEach(
            (vertex: SinglyLinkedListNode<AdjacencyListNode>) => {
                if (vertex.data.vertex === v) return vertex.data.weight;

                return;
            },
        );

        return capacity == null ? 0 : capacity;
    }

    /**
     * Checks if the direction taken as a path in BFS is correct.
     */
    private isValidDirection(u: Vertex, v: Vertex, capacity: number): boolean {
        const flow = this.flow.getFlow(u, v);

        // Direct edges.
        if (capacity > 0) {
            // Checks if there is enough capacity to push some more flow.
            return flow < capacity;
            // Reverse edges.
        } else if (capacity < 0) {
            // Checks if flow was pushed through its direct edge.
            // Because we cannot decrease the flow if no flow was pushed before.
            return 0 < flow && flow < capacity;
        }

        return false;
    }
}
