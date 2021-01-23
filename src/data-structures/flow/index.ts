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
     * @complexity O(E|f*|), where f* is a maximum flow in the network.
     */
    fordFulkersonMaxFlow() {
        /*
        for (each edge (u, v) ∈ G.E) {
            (u, v).f = 0
        }

        while (there exits a path p from s to t in the residual network G_f) {
            c_f(p) = min{c_f(u, v): (u, v) is in p}

            for (each edge (u, v) in p) {
                if ((u, v) ∈ E) {
                    (u, v).f = (u, v).f + c_f(p)
                } else {
                    (v, u).f = (v, u).f - c_f(p)
                }
            }
        }
        */
    }
}
