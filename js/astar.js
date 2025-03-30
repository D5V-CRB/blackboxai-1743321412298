class AStar {
    constructor(graph) {
        this.graph = graph;
    }

    findPath(startId, endId) {
        const startNode = this.graph.nodes.find(n => n.id === startId);
        const endNode = this.graph.nodes.find(n => n.id === endId);
        
        if (!startNode || !endNode) return null;

        const openSet = new Set([startId]);
        const cameFrom = {};
        const gScore = {};
        const fScore = {};

        this.graph.nodes.forEach(node => {
            gScore[node.id] = Infinity;
            fScore[node.id] = Infinity;
        });

        gScore[startId] = 0;
        fScore[startId] = this.heuristic(startNode, endNode);

        while (openSet.size > 0) {
            const currentId = this.getLowestFScore(openSet, fScore);
            if (currentId === endId) {
                return this.reconstructPath(cameFrom, currentId);
            }

            openSet.delete(currentId);
            const neighbors = this.graph.edges.filter(edge => edge.from === currentId);

            neighbors.forEach(neighbor => {
                const tentativeGScore = gScore[currentId] + neighbor.distance;

                if (tentativeGScore < gScore[neighbor.to]) {
                    cameFrom[neighbor.to] = currentId;
                    gScore[neighbor.to] = tentativeGScore;
                    fScore[neighbor.to] = gScore[neighbor.to] + this.heuristic(this.graph.nodes.find(n => n.id === neighbor.to), endNode);

                    if (!openSet.has(neighbor.to)) {
                        openSet.add(neighbor.to);
                    }
                }
            });
        }

        return null; // No path found
    }

    heuristic(nodeA, nodeB) {
        // Using Manhattan distance as heuristic
        return Math.abs(nodeA.coordinates[0] - nodeB.coordinates[0]) + Math.abs(nodeA.coordinates[1] - nodeB.coordinates[1]);
    }

    getLowestFScore(openSet, fScore) {
        let lowest = null;
        let lowestScore = Infinity;

        openSet.forEach(id => {
            if (fScore[id] < lowestScore) {
                lowestScore = fScore[id];
                lowest = id;
            }
        });

        return lowest;
    }

    reconstructPath(cameFrom, currentId) {
        const totalPath = [currentId];
        while (currentId in cameFrom) {
            currentId = cameFrom[currentId];
            totalPath.push(currentId);
        }
        return totalPath.reverse();
    }
}