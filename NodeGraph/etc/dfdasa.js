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
const graph = {}

for (var i = 0; i < a.length; i++) {
    graph[`${i}`] = {}
    for (var j = 0; j < a[i].length; j++) {
        if (a[i][j] != Infinity && a[i][j] != 0 ) {
            graph[`${i}`][`${j}`] = a[i][j]
        }
    }
}

for (var i in graph) {
    console.log(graph[i])
}
