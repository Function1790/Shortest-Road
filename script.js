const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const ResolutionValue = 1600 / 800
const Width = canvas.width * ResolutionValue
const Height = canvas.height * ResolutionValue

const INF = Infinity
const PI2 = Math.PI * 2
const MaxNodeCount = 5
const NodeSize = 10
const ConnectRange = 250
const CountOfNode = 1000
const SelectedNode = [-1, -1]
const CreateNodeRange = 1400 // Base:1300

const SelectStyle = 'red'
const BaseStyle = 'black'
const SelectSize = 20
const HoverBigger = 10

let HoverNode = undefined

function distance(A, B) {
    return Math.sqrt((A.x - B.x) ** 2 + (A.y - B.y) ** 2)
}

function random(m) {
    return Math.random() * m
}

const print = (text) => { console.log(text) }

class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

class Node {
    constructor(x, y, r, index) {
        this.x = x
        this.y = y
        this.r = r
        this.index = index

        this.connecting_node = []
        this.nodes = []

        this.color = BaseStyle
    }
    posToStr() {
        return `(${parseInt(this.x)}, ${parseInt(this.y)})`
    }
    draw() {

        ctx.lineWidth = 2
        for (var i = 0; i < this.connecting_node.length; i++) {
            ctx.beginPath()
            ctx.strokeStyle = BaseStyle
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.connecting_node[i].x, this.connecting_node[i].y)
            ctx.stroke()
            ctx.closePath()
        }

        ctx.fillStyle = this.color
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, PI2)
        ctx.fill()
        ctx.closePath()
    }
    connectNode(node) {
        if (this == node) {
            return false
        }
        if (this.nodes.length + 1 >= MaxNodeCount || node.nodes.length + 1 >= MaxNodeCount) {
            return false
        }
        this.connecting_node.push(node)
        this.nodes.push(node)
        node.nodes.push(this)
        return true
    }
}

const renderList = []
for (var i = 0; i < CountOfNode; i++) {
    renderList.push(new Node(random(CreateNodeRange) + 100, random(CreateNodeRange) + 100, NodeSize, i))
}

//Connect Node
for (var i = 0; i < renderList.length; i++) {
    const around = []
    for (var j = i + 1; j < renderList.length; j++) {
        if (distance(renderList[i], renderList[j]) < ConnectRange) {
            around.push(renderList[j])
        }
    }
    for (var j = 0; j < around.length; j++) {
        if (renderList[i] === around[j]) {
            continue
        }
        if (renderList[i].nodes.length >= MaxNodeCount) {
            break
        }
        renderList[i].connectNode(around[j])
    }
}

function render() {
    ctx.clearRect(0, 0, Width, Height)

    for (var i = 0; i < renderList.length; i++) {
        renderList[i].draw()
    }

    if (isSelected) {
        for (var i = 0; i < fastestRoute.length - 1; i++) {
            var n = fastestRoute[i]
            var n2 = fastestRoute[i + 1]
            var color = `rgb(${255 * i / fastestRoute.length}, 0, ${100 + 105 * (1 - i / fastestRoute.length)})`
            ctx.beginPath()
            ctx.strokeStyle = color
            ctx.lineWidth = 5;
            ctx.moveTo(renderList[n].x, renderList[n].y)
            ctx.lineTo(renderList[n2].x, renderList[n2].y)
            ctx.stroke()
            ctx.closePath()
            ctx.beginPath()
            ctx.fillStyle = color
            ctx.arc(renderList[n].x, renderList[n].y, NodeSize + 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
        }
        try {
            ctx.beginPath()
            ctx.fillStyle = `rgb(255,0,100)`
            ctx.arc(renderList[n2].x, renderList[n2].y, NodeSize + 2, 0, Math.PI * 2)
            ctx.fill()
            ctx.closePath()
            ctx.lineWidth = 1;
        } catch { }
    }
    requestAnimationFrame(render)
}

//-----------[다익스트라]-----------//
// Nodes -> Graph
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
            if (minDistanceNode == -1) {
                continue
            }
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

function getNodeGraph() {
    var graph = []
    for (var i = 0; i < renderList.length; i++) {
        graph.push(new Array(renderList.length).fill(Infinity))
    }
    for (var i = 0; i < renderList.length; i++) {
        for (var j in renderList[i].nodes) {
            graph[i][renderList[i].nodes[j].index] = 1
        }
    }

    return graph
}

// 그래프 정의 예시 (0 ~ 6번 노드)
function getShortestRoad(startIndex, endIndex) {
    const result = dijkstra(NodeMap, startIndex, endIndex);
    console.log("Shortest :\t" + result)
    return result
}

var isSelected = false
var fastestRoute = []
const NodeMap = getNodeGraph()

function onUpdateSelection() {
    fastestRoute = getShortestRoad(SelectedNode[0], SelectedNode[1])
    isSelected = true
}

function onCancelSelection() {
    isSelected = false
}

function getStrMap() {
    for (var i in NodeMap) {
        t = "["
        for (var j in NodeMap[i]) {
            t += NodeMap[i][j]
            if (j != NodeMap.length - 1) {
                t += ","
            }
        }
        console.log(t + "],")
    }
}
//최단 경로 색칠
//-----------[다익스트라]-----------//

render()

//Event Function
canvas.addEventListener("mousemove", (e) => {
    const pos = new Vector(e.offsetX * ResolutionValue, e.offsetY * ResolutionValue)

    if (HoverNode !== undefined && distance(HoverNode, pos) > HoverNode.r) {
        HoverNode.r = NodeSize
        HoverNode = undefined
    }
    for (var i = 0; i < renderList.length; i++) {
        if (HoverNode == renderList[i]) {
            continue
        }
        if (distance(renderList[i], pos) <= SelectSize) {
            if (HoverNode !== undefined) {
                HoverNode.r = NodeSize
            }
            HoverNode = renderList[i]
            HoverNode.r = NodeSize + HoverBigger
            break
        }
    }
})

canvas.addEventListener("click", (e) => {
    const pos = new Vector(e.offsetX * ResolutionValue, e.offsetY * ResolutionValue)
    for (var i = 0; i < renderList.length; i++) {
        if (distance(renderList[i], pos) <= SelectSize) { // 클릭한 노드 찾기
            for (var j in SelectedNode) {
                if (SelectedNode[j] == i) { //cancel
                    SelectedNode[j] = -1
                    renderList[i].color = BaseStyle
                    onCancelSelection()
                    return
                } else if (SelectedNode[j] == -1) { //select
                    SelectedNode[j] = i
                    renderList[i].color = SelectStyle
                    // 두 지점이 모두 선택 됐을 때
                    if (SelectedNode.indexOf(-1) === -1) {
                        onUpdateSelection()
                    }
                    return
                }
            }
            break
        }
    }
})

