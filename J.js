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

function solve() {
  const myFS = new FileSystem();
  myFS.readData();
  const [V, E] = myFS.readArray(myFS.readLine());
  // let line;
  const arr = [];
  while (myFS.curLine < myFS.inputLines.length) {
    arr.push(myFS.readArray(myFS.readLine()));
  }

  const result = new Array(V).fill().map(() => []);

  for (let i = 0; i < E; i++) {
    if (Array.isArray(result[arr[i][0] - 1])) {
      result[arr[i][0] - 1].push(arr[i][1]);
    } else {
      result[arr[i][0] - 1] = [arr[i][1]];
    }
  }
  // result.map((it) => it.sort((a, b) => a - b));
  result.unshift(undefined);

  // white - 0
  // grey - 1
  // black - 2
  const color = new Array(V + 1).fill().map((it) => 0);
  const order = []; // дб стек и вывод в обратном порядке, поэтому в решении reverse

  function TopSort(graph, v) {
    color[v] = 1;

    for (let i = 0; i < graph[v].length; i++) {
      let w = graph[v][i];
      if (color[w] == 0) {
        TopSort(graph, w);
      }
    }
    color[v] = 2;
    order.push(v);
  }

  function MainTopSort(graph) {
    for (let i = 1; i < graph.length; i++) {
      if (color[i] == 0) {
        TopSort(graph, i);
      }
    }
  }
  // console.log(result);
  MainTopSort(result);
  console.log(order.reverse().join(` `));
}

solve();
