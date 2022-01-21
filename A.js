class FileSystem {
  constructor() {
    this.fs = require(`fs`);
    this.curLine = 0;
  }

  readData(filename = `input.txt`) {
    this.inputLines = this.fs.readFileSync(filename, `utf-8`).split(`\n`);
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

function solve() {
  const myFS = new FileSystem();
  myFS.readData();
  const [V, E] = myFS.readArray(myFS.readLine());
  let line;
  const arr = [];
  while ((line = myFS.readLines())) {
    arr.push(myFS.readArray(line));
  }
  const result = new Array(V).fill(undefined);

  for (let i = 0; i < E; i++) {
    if (Array.isArray(result[arr[i][0] - 1])) {
      result[arr[i][0] - 1].push(arr[i][1]);
    } else {
      result[arr[i][0] - 1] = [arr[i][1]];
    }
  }
  for (let i = 0; i < V; i++) {
    if (Array.isArray(result[i])) {
      console.log(result[i].length + " " + result[i].join(" "));
    } else {
      console.log(0);
    }
  }
}

solve();
