class FileSystem {
  constructor() {
    this.fs = require(`fs`);
    this.curLine = 0;
  }

  readData(filename = `input.txt`) {
    this.inputLines = this.fs
      .readFileSync(filename, `utf-8`)
      .split(`\n`)
      .filter((line) => line.length > 0);
  }

  readLines() {
    while (this.curLine < this.inputLines.length) {
      const line = this.inputLines[this.curLine];
      this.curLine++;
      return line;
    }
    return undefined;
  }

  readLine() {
    const line = this.inputLines[this.curLine];
    this.curLine++;
    return line;
  }

  writeData(data, filename = `output.txt`) {
    this.fs.writeFileSync(filename, data);
  }

  readInt() {
    const n = Number(this.inputLines[this.curLine]);
    this.curLine++;
    return n;
  }

  readArray(line) {
    return line.trim(" ").split(" ").map(Number);
  }

  readArrayOfStrings() {
    var arr = this.inputLines[this.curLine].trim(" ").split(" ");
    this.curLine++;
    return arr;
  }

  readMix() {
    const data = this.inputLines[this.curLine].trim(" ").split(" ");
    data[1] = Number(data[1]);
    data[2] = Number(data[2]);
    this.curLine++;
    return data;
  }

  readLine() {
    const line = this.inputLines[this.curLine];
    this.curLine++;
    return line;
  }
}

// function dfs(from, graph, visited = []) {

//     visited[from] = true;
//     console.log(from);
//     let len;
//     try {
//       len = graph[from].length;
//     } catch (err) {
//       len = 0;
//     }
//     for (let i = 0; i < len; i++) {
//       if (!visited[graph[from][i]]) {
//         DFS(graph[from][i], graph, visited);
//       }
//     }
//     for(let i = 1; i < visited.length; i++) {
// }

const vResult = [];

function dfs(from, graph) {
  let stack = [from];
  let visited = [];
  visited[from] = true;

  function handleVertex(vertex) {
    if (Number(vertex) === 0) return;
    vResult.push(Number(vertex));
    // список вершин в которые можно попасть из текущей
    let neighboursList = [...graph[vertex]]; //.sort((a, b) => a - b);
    neighboursList.forEach((neighbour) => {
      if (!visited[neighbour]) {
        visited[neighbour] = true;
        // stack.push(Number(neighbour));
        handleVertex(neighbour);
      }
    });
  }

  while (stack.length) {
    let vertex = stack.pop();
    handleVertex(vertex);
  }

  stack = Array(graph.length - 1)
    .fill()
    .map((_, i) => i + 1);

  //   .map((it) => Number(it))
  //   .filter((it) => it !== 0);
  // console.log(stack);
  while (stack.length) {
    let vertex = stack.shift();
    // let vertex = stack.pop();
    if (!visited[vertex]) {
      // console.log(vertex, stack);
      visited[vertex] = true;
      handleVertex(vertex);
    }
  }
  // console.log(stack, visited);
}

function solve() {
  const myFS = new FileSystem();
  myFS.readData();
  const [V, E] = myFS.readArray(myFS.readLine());
  // let line;
  const arr = [];
  while (myFS.curLine < myFS.inputLines.length - 1) {
    arr.push(myFS.readArray(myFS.readLine()));
  }
  const num = myFS.readInt();
  const result = new Array(V).fill().map(() => []);

  for (let i = 0; i < E; i++) {
    if (Array.isArray(result[arr[i][0] - 1])) {
      result[arr[i][0] - 1].push(arr[i][1]);
    } else {
      result[arr[i][0] - 1] = [arr[i][1]];
    }
  }
  result.unshift(null);
  // console.log(result, num);
  dfs(num, result);
  console.log(vResult.join(` `));
}

solve();
