import {Graph} from '../graph';
import {AdjacencyListNode} from '../graph/list';
import {Vertex} from '../graph/vertex';

/**
 * The Flow data structure.
 * A Directed, Weighted (with non-negative edge weights), Connected graph.
 */
export class Flow extends Graph {
    /** The flow's source. */
    private source: Vertex;
    /** The flow's sink. */
    private sink: Vertex;

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
        source: Vertex,
        sink: Vertex,
    ) {
        super(data);

        this.source = source;
        this.sink = sink;
    }

    /**
     * The Ford Fulkerson's Algorithm for finding a Max Flow.
     * @note uses FDS to find a path in residual network.
     * @complexity O(E * |f*|), where f* is a maximum flow in the network.
     */
    fordFulkersonMaxFlow() {
        /*
        // The initial flow is 0 across all edges.
        for (each edge (u, v) ∈ G.E) {
            (u, v).f = 0
        }

        // Using Depth-First Search (DFS),
        // repeatedly finds an augmenting path p in G_f and
        // augments flow f along p by the residual capacity c_f(p).
        while (there exits a path p from s to t in the residual network G_f) {
            c_f(p) = min{c_f(u, v): (u, v) is in p}

            //  Each residual edge in path p is either an
            // edge in the original network or the reversal
            // of an edge in the original network.
            for (each edge (u, v) in p) {
                // Update the flow in each case appropriately,
                // adding flow when the residual edge is an
                // original edge and subtracting it otherwise.
                if ((u, v) ∈ E) {
                    (u, v).f = (u, v).f + c_f(p)
                } else {
                    (v, u).f = (v, u).f - c_f(p)
                }
            }

            // When no augmenting paths exist, the flow f is a maximum flow.
        }
        */
    }
}
