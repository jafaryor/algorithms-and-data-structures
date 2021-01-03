/**
 * The Weighted Graph Vertex.
 * Can be used as non-weighted graph if "weight" is equal to undefined or 1.
 * Can be both directed and undirected vertex.
 */
export class Vertex {
    /** Vertex color based on search state. */
    color = VertexColor.WHITE;
    /** Shortest path distance from root. */
    distance = Infinity;
    /** Parent of vertex in a Breadth First Tree. */
    predecessor?: Vertex;
    /** The integer timestamp for recording vertex states. */
    timestamps: {
        // The integer records timestamp when the vertex becomes grayed.
        grayed: number;
        // The integer records timestamp when the vertex becomes blacken.
        blacken: number;
    } = {
        // The default value for timestamps are Infinity.
        grayed: Infinity,
        blacken: Infinity,
    };
    /** The number of connected component where the vertex belongs to. */
    connectedComponent?: number;

    constructor(public value: string) {}

    /**
     * Marks a node as a discovered.
     */
    markAsDiscovered(distance: number = 0, predecessor?: Vertex): void {
        this.color = VertexColor.GRAY;
        this.distance = distance;
        this.predecessor = predecessor;
    }

    /**
     * Marks a node as a visited.
     */
    markAsVisited(): void {
        this.color = VertexColor.BLACK;
    }

    /**
     * Marks a node as not visited.
     */
    unmark(): void {
        this.color = VertexColor.WHITE;
        this.distance = Infinity;
        this.predecessor = undefined;
        this.timestamps.grayed = Infinity;
        this.timestamps.blacken = Infinity;
    }

    /**
     * Checks if a vertex is white.
     */
    get isWhite(): boolean {
        return this.color === VertexColor.WHITE;
    }

    /**
     * Checks if a vertex is gray.
     */
    get isGray(): boolean {
        return this.color === VertexColor.GRAY;
    }

    /**
     * Checks if a vertex is black.
     */
    get isBlack(): boolean {
        return this.color === VertexColor.BLACK;
    }

    /**
     * Marks a vertex as GRAY and records the timestamp.
     */
    paintGray(timestamp: number = Infinity): void {
        this.color = VertexColor.GRAY;
        this.timestamps.grayed = timestamp;
    }

    /**
     * Marks a vertex as BLACK and records the timestamp.
     */
    paintBlack(timestamp: number = Infinity): void {
        this.color = VertexColor.BLACK;
        this.timestamps.blacken = timestamp;
    }

    /**
     * String representation of vertex.
     */
    toString(): string {
        return `${this.value} ${this.color.charAt(0)} [${this.distance}] (${
            this.timestamps.grayed
        }/${this.timestamps.blacken})`;
    }
}

/**
 * The Graph's weighted edge (u, v).
 */
export class Edge {
    constructor(
        public u: Vertex,
        public v: Vertex,
        public weight: number = 1,
    ) {}
}

/**
 * The Graph's Vertex Color.
 */
export enum VertexColor {
    // The default state/color.
    WHITE = 'white',
    // Discovered vertex.
    GRAY = 'gray',
    // Visited vertex.
    BLACK = 'black',
}
