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

const vResult = [];
let time = 0;

function dfs(graph, from = 1, visited = []) {
  visited[from] = true;
  if (graph[from] !== undefined) {
    // vResult.push(from);
    vResult[from - 1] = [];
    vResult[from - 1].push(time);
    time += 1;
  }
  let len;
  try {
    len = graph[from].length;
  } catch (err) {
    len = 0;
  }
  for (let i = 0; i < len; i++) {
    if (!visited[graph[from][i]]) {
      dfs(graph, graph[from][i], visited);
    }
  }
  if (graph[from] !== undefined) {
    vResult[from - 1].push(time);
    time += 1;
  }
}

function solve() {
  const myFS = new FileSystem();
  myFS.readData(`H.txt`);
  const [V, E] = myFS.readArray(myFS.readLine());
  // let line;
  const arr = [];
  while (myFS.curLine < myFS.inputLines.length) {
    arr.push(myFS.readArray(myFS.readLine()));
  }
  // const num = myFS.readInt();
  // console.log(V, E, arr);

  const result = new Array(V).fill().map(() => []);

  for (let i = 0; i < E; i++) {
    if (Array.isArray(result[arr[i][0] - 1])) {
      result[arr[i][0] - 1].push(arr[i][1]);
    } else {
      result[arr[i][0] - 1] = [arr[i][1]];
    }
  }
  result.map((it) => it.sort((a, b) => a - b));
  result.unshift(undefined);
  // console.log(result);
  dfs(result);
  // console.log(vResult);
  console.log(vResult.map((it) => it.join(` `)).join(`\n`));
}

solve();
