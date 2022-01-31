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
  result.unshift(undefined);
  arr.forEach(([a, b]) => {
    result[a].push(b);
    result[b].push(a);
  });
  // result.map((it) => (it ? it.sort((a, b) => b - a) : it));
  const color = new Array();
  let componentCount = 0;
  // const visited = [];
  const visited = new Array(result.length).fill().map(() => false);

  // // верно но переполнение стека при большом графе
  // function dfs(graph, from = 1) {
  //   visited[from] = true;
  //   vResult.push(from);

  //   if (Array.isArray(color[componentCount])) {
  //     color[componentCount].push(from);
  //   } else {
  //     color[componentCount] = [from];
  //   }

  //   let len;
  //   try {
  //     len = graph[from].length;
  //   } catch (err) {
  //     len = 0;
  //   }
  //   for (let i = 0; i < len; i++) {
  //     if (!visited[graph[from][i]]) {
  //       dfs(graph, graph[from][i]);
  //     }
  //   }
  // }

  function dfs(graph, from = 1) {
    // const visited = new Array(graph.length).fill().map(() => false);
    const stack = new Array();
    stack.push(from);
    while (stack.length > 0) {
      let from = stack.pop();
      if (!visited[from]) {
        vResult.push(from);
        visited[from] = true;
        if (Array.isArray(color[componentCount])) {
          color[componentCount].push(from);
        } else {
          color[componentCount] = [from];
        }
      }

      if (Array.isArray(graph[from])) {
        graph[from].forEach((to) => {
          if (!visited[to]) {
            stack.push(to);
          }
        });
      }
    }
  }

  // console.log(result);
  for (let i = 1; i <= V; i++) {
    if (!visited[i]) {
      dfs(result, i);
      componentCount++;
    }
  }
  // console.log(color);
  console.log(
    color.length +
      "\n" +
      color.map((it) => it.sort((a, b) => a - b).join(` `)).join("\n")
  );
}

solve();
