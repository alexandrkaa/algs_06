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

// верно но переполнение стека при большом графе
function dfs(from, graph, visited = []) {
  visited[from] = true;
  vResult.push(from);
  let len;
  try {
    len = graph[from].length;
  } catch (err) {
    len = 0;
  }
  for (let i = 0; i < len; i++) {
    if (!visited[graph[from][i]]) {
      dfs(graph[from][i], graph, visited);
    }
  }
}

const vResult = [];

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
  result.unshift(null);
  arr.forEach(([a, b]) => {
    result[a].push(b);
    result[b].push(a);
  });
  result.map((it) => (it ? it.sort((a, b) => a - b) : it));
  // console.log(result, num);
  dfs(num, result);
  console.log(vResult.join(` `));
}

solve();
