// 필요한 알고리즘
// Nodes -> Graph
// 경로기록

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

// 그래프 정의 예시 (0 ~ 6번 노드)
const graph = [
    [0, 2, 4, 1, 0, 0, 0],
    [2, 0, 0, 3, 10, 0, 0],
    [4, 0, 0, 2, 0, 5, 0],
    [1, 3, 2, 0, 7, 8, 4],
    [0, 10, 0, 7, 0, 0, 6],
    [0, 0, 5, 8, 0, 0, 1],
    [0, 0, 0, 4, 6, 1, 0]
];

let map = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

const startNodeIndex = 0;
const endNodeIndex = 2;
const result = dijkstra(map, startNodeIndex, endNodeIndex);
console.log("Shortest Path:", result);