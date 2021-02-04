import {AdjacencyListNode} from '../graph/list';
import {Vertex} from '../graph/vertex';
import {SinglyLinkedListNode} from '../singly-linked-list/node';
import {ResidualGraph} from './residual-graph';

/**
 * The flow function of a residual graph.
 */
export class Flow {
    private f = {} as {[edge: string]: number};

    constructor(private readonly residualGraph: ResidualGraph) {
        // The initial flow for a residual graph is 0 for all edges.
        this.initFlow();
    }

    /**
     * Inits the residual graph's flow by setting flow for all edges to 0.
     * @complexity O()
     */
    private initFlow(): void {
        for (const u of this.residualGraph.vertices) {
            this.residualGraph.adjacencyList.list[u.value].forEach(
                (v: SinglyLinkedListNode<AdjacencyListNode>) => {
                    this.setFlow(0, u, v.data.vertex);
                },
            );
        }
    }

    /**
     * Sets flow of all edges to 0.
     */
    reset(): void {
        this.f = {};
        this.initFlow();
    }

    /**
     * Sets flow for the (u, v) edge.
     */
    setFlow(value: number, u: Vertex, v: Vertex): void {
        this.f[`(${u.value}, ${v.value})`] = value;
    }

    /**
     * Returns flow of an edge (u, v).
     */
    getFlow(u: Vertex, v: Vertex): number {
        return this.f[`(${u.value}, ${v.value})`];
    }

    /**
     * String representation of flow.
     */
    toString(): string[] {
        return Object.keys(this.f).reduce((acc: string[], edge: string) => {
            if (this.f[edge] > 0) {
                acc.push(`${edge} = ${this.f[edge]}`);
            }

            return acc;
        }, []);
    }
}
