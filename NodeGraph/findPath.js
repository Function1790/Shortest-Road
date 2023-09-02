function dijkstra(graph, startNodeIndex, endNodeIndex) {
    const numNodes = graph.length;
    const distances = new Array(numNodes).fill(Infinity);
    const visited = new Array(numNodes).fill(false);
    const prevNodes = new Array(numNodes).fill(null); // 이전 노드 정보 저장

    distances[startNodeIndex] = 0;

    for (let i = 0; i < numNodes - 1; i++) {
        const minDistanceNode = findMinDistanceNode(distances, visited);
        visited[minDistanceNode] = true;

        for (let j = 0; j < numNodes; j++) {
            if (!visited[j] && graph[minDistanceNode][j] !== 0) {
                const newDistance = distances[minDistanceNode] + graph[minDistanceNode][j];
                if (newDistance < distances[j]) {
                    distances[j] = newDistance;
                    prevNodes[j] = minDistanceNode; // 이전 노드 갱신
                }
            }
        }
    }

    return buildPath(prevNodes, endNodeIndex);
}

function findMinDistanceNode(distances, visited) {
    let minDistance = Infinity;
    let minDistanceNode = -1;

    for (let i = 0; i < distances.length; i++) {
        if (!visited[i] && distances[i] < minDistance) {
            minDistance = distances[i];
            minDistanceNode = i;
        }
    }

    return minDistanceNode;
}

function buildPath(prevNodes, endNodeIndex) {
    const path = [];
    let currentNode = endNodeIndex;

    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = prevNodes[currentNode];
    }

    return path;
}

let a = [
    [Infinity, 1, Infinity, Infinity, Infinity],
    [1, Infinity, 1, Infinity, Infinity],
    [Infinity, 1, Infinity, 1, 1],
    [Infinity, Infinity, 1, Infinity, 1],
    [Infinity, Infinity, 1, 1, Infinity],
]

const startNodeIndex = 4;
const endNodeIndex = 1;
const result = dijkstra(a, startNodeIndex, endNodeIndex);
console.log("Shortest Path:", result);