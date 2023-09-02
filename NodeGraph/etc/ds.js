const INF = Infinity

let a = [
    [0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, 1, INF, INF, INF, INF, INF, INF, INF, INF, 1, INF],
    [INF, 0, 1, INF, INF, INF, INF, 1, 1, 1, INF, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, 0, INF, 1, 1, 1, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, 0, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, 1, INF, 1, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, 0, 1, INF, INF, INF, 1, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, 1, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, 0, INF, 1, INF, 1, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, 0, 1, INF, INF, 1, 1, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, 0, INF, 1, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, 0, INF, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, 1, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, 0, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, 0, 1, 1,
        1, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, 0, 1,
        1, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        0, 1, INF, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, 0, INF, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, 0, INF, 1, INF, 1, INF, INF, INF, INF, 1, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, 0, INF, 1, INF, INF, INF, INF, 1, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, INF, 0, INF, 1, INF, INF, INF, INF, 1, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, INF, INF, 0, INF, INF, INF, INF, 1, 1, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, INF, INF, 0, INF, INF, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, 0, 1, INF, INF, INF, INF],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, 0, INF, INF, INF, 1],
    [INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF,
        INF, INF, INF, INF, INF, INF, INF, INF, 0, INF, INF, INF]
]

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    Dijkstra(start, finish) {
        // 위에서 만든 PriorityQueue 클래스로 nodes 인스턴스를 만들고, start를 추가한다. 
        const nodes = new PriorityQueue();
        nodes.enqueue(start, 0);
        // distances 객체는 시작점부터 그 노드까지 최단 거리를 기록한다. 
        const distances = {};
        // previous 객체는 그 노드까지 최단거리로 경유해온 직전 노드를 기록한다. 
        const previous = {};
        // path 배열은 마지막에 return할 것이다.
        const path = [];
        let smallest;
        // 다음과 같은 초기 상태를 만들기 위해 for문을 돌린다.
        // distances { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity, F: Infinity}
        // previous { A: null, B: null, C: null, D: null, E: null, F: null }
        for (const vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                // 아래의 while문에서 처음에 nodes로부터 dequeue할 초깃값 추가하기
            } else {
                distances[vertex] = Infinity;
            }
            previous[vertex] = null;
        }

        // 무한 루프를 돌린다. 
        while (true) {
            // nodes 내부에서는 우선순위 정렬이 되어 있어 dequeue시 우선순위가 가장 높은(여기서는 최소 거리) 값을 주며, 그 값의 노드명을 smallest 변수에 재할당한다.
            smallest = nodes.dequeue().val;
            // dequeue한 값이 finish와 같으면 목적지에 도착한 것이므로,
            if (smallest === finish) {
                // return할 값을 아래의 while문을 통해 만들고 상위 while문을 break한다. 
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            // dequeue한 값이 finish와 같지 않으면,
            else {
                // dequeue한 노드와 간선으로 이어진 노드들에 대하여 아래 과정의 반복문을 돌린다. 
                for (const neighbor in this.adjacencyList[smallest]) {
                    const nextNode = this.adjacencyList[smallest][neighbor];
                    // 시작점에서 현 노드까지 경유한 거리(distances[smallest])와 
                    // 현 노드와 다음 노드 사이의 거리(nextNode.weight)를 합하여 최소거리 후보로 둔다.
                    const candidate = distances[smallest] + nextNode.weight;
                    const nextNeighbor = nextNode.node;
                    // 시작점에서 다음 노드까지 가장 짧은 거리를 구하기 위해, 
                    // 방금 만든 후보 값과 기존에 저장된 거리값을 비교하여, 후보 값이 더 작으면,
                    if (candidate < distances[nextNeighbor]) {
                        // 새로운 최소 거리 값으로 업데이트한다.
                        distances[nextNeighbor] = candidate;
                        // 다음 노드로 가기 위해 직전에 들린 노드를 기록한다. 
                        previous[nextNeighbor] = smallest;
                        // 다음 노드와 그곳까지 걸린 거리(priority)를 nodes에 넣는다.
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }
    dequeue() {
        return this.values.shift();
    }
    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

}

const graph = new WeightedGraph();
for (var i = 0; i < a.length; i++) {
    graph.addVertex(`${i}`);
}

for (var i = 0; i < a.length; i++) {
    for (var j = 0; j < a[i].length; j++) {
        if (a[i][j] != INF || a[i][j] != 0) {
            graph.addEdge(`${i}`, `${j}`, a[i][j]);
        }
    }
}

graph.Dijkstra("0", "2");