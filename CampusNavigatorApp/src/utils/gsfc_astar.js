class GSFCNavigator {
  constructor(nodes, edges) {
    this.nodes = nodes;
    this.edges = edges;
    this.pathCache = new Map(); // Cache for frequent routes
  }

  // Main pathfinding function
  findPath(startId, endId) {
    const cacheKey = `${startId}-${endId}`;
    
    // Return cached path if available
    if (this.pathCache.has(cacheKey)) {
      return this.pathCache.get(cacheKey);
    }

    const startNode = this.nodes.find(n => n.id === startId);
    const endNode = this.nodes.find(n => n.id === endId);
    
    if (!startNode || !endNode) return null;

    // GSFC-specific heuristic (prioritize shaded walkways)
    const heuristic = (node) => {
      const baseDist = Math.abs(node.coordinates[0] - endNode.coordinates[0]) + 
                      Math.abs(node.coordinates[1] - endNode.coordinates[1]);
      
      // Add penalty for routes without shade (except sports complex)
      const hasShade = ['main_gate', 'admin_block', 'library'].includes(node.id);
      return baseDist * (hasShade ? 0.9 : 1.1);
    };

    const openSet = new Set([startId]);
    const cameFrom = {};
    const gScore = {};
    const fScore = {};

    this.nodes.forEach(node => {
      gScore[node.id] = Infinity;
      fScore[node.id] = Infinity;
    });

    gScore[startId] = 0;
    fScore[startId] = heuristic(startNode);

    while (openSet.size > 0) {
      const currentId = this.getLowestFScore(openSet, fScore);
      
      if (currentId === endId) {
        const path = this.reconstructPath(cameFrom, currentId);
        this.pathCache.set(cacheKey, path);
        return path;
      }

      openSet.delete(currentId);
      const neighbors = this.getNeighbors(currentId);

      neighbors.forEach(neighbor => {
        const tentativeGScore = gScore[currentId] + neighbor.distance;
        
        if (tentativeGScore < gScore[neighbor.to]) {
          cameFrom[neighbor.to] = currentId;
          gScore[neighbor.to] = tentativeGScore;
          fScore[neighbor.to] = gScore[neighbor.to] + 
                               heuristic(this.nodes.find(n => n.id === neighbor.to));
          
          if (!openSet.has(neighbor.to)) {
            openSet.add(neighbor.to);
          }
        }
      });
    }

    return null; // No path found
  }

  // Helper methods
  getNeighbors(nodeId) {
    return this.edges.filter(edge => edge.from === nodeId);
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
    const path = [currentId];
    while (cameFrom[currentId]) {
      currentId = cameFrom[currentId];
      path.push(currentId);
    }
    return path.reverse();
  }
}

// Export for React Native
export default GSFCNavigator;