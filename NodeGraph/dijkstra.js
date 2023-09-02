// 필요한 알고리즘
// Nodes -> Graph
// 경로기록

function dijkstra(graph, startNodeIndex, endNodeIndex) {
    const numNodes = graph.length; // 그래프의 노드 수
    const distances = new Array(numNodes).fill(Infinity); // 시작 노드로부터의 최단 거리 배열, 초기값은 무한대
    const visited = new Array(numNodes).fill(false); // 방문 여부를 나타내는 배열, 초기값은 false
    const prevNodes = new Array(numNodes).fill(null); // 이전 노드 정보를 저장하는 배열

    distances[startNodeIndex] = 0; // 시작 노드의 최단 거리를 0으로 초기화

    // 모든 노드를 방문할 때까지 반복
    for (let i = 0; i < numNodes - 1; i++) {
        const minDistanceNode = findMinDistanceNode(distances, visited); // 최단 거리를 가진 노드를 찾음
        visited[minDistanceNode] = true; // 해당 노드를 방문으로 표시

        // 모든 노드를 순회하며 최단 거리 갱신
        for (let j = 0; j < numNodes; j++) {
            // 아직 방문하지 않았고, 현재 경로로 더 짧은 거리를 찾았을 때
            if (!visited[j] && graph[minDistanceNode][j] !== 0) {
                const newDistance = distances[minDistanceNode] + graph[minDistanceNode][j]; // 새로운 거리 계산
                if (newDistance < distances[j]) {
                    distances[j] = newDistance; // 최단 거리 갱신
                    prevNodes[j] = minDistanceNode; // 이전 노드 정보 갱신
                }
            }
        }
    }

    // 최단 경로를 구성하고 반환
    return buildPath(prevNodes, endNodeIndex);
}

// 최소 거리를 가진 노드를 찾는 함수
function findMinDistanceNode(distances, visited) {
    let minDistance = Infinity; // 초기 최소 거리를 무한대로 설정
    let minDistanceNode = -1; // 초기 최소 거리를 가진 노드 인덱스를 -1로 설정

    // 모든 노드를 순회하며 최소 거리를 가진 노드를 찾음
    for (let i = 0; i < distances.length; i++) {
        if (!visited[i] && distances[i] < minDistance) {
            minDistance = distances[i]; // 최소 거리 갱신
            minDistanceNode = i; // 최소 거리를 가진 노드 인덱스 갱신
        }
    }

    return minDistanceNode; // 최소 거리를 가진 노드의 인덱스 반환
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
const result = dijkstra(graph, startNodeIndex, endNodeIndex);
console.log("Shortest Path:", result);