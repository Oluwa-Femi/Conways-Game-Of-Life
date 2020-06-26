import React, { Component } from "react";

class Board extends Component {
  state = {
    gameRun: true,
    cycleCount: 0,
    runSpeed: 800,
  };

  gridState = () => {
    for (let i = 0; i < 300; i += 20) {
      for (let j = 0; j < 300; j += 20) {
        this.setState({ [`${i / 20},${j / 20}`]: "kpai" });
      }
    }
  };

  handleClick = (e) => {
    if (!this.handleTimer) {
      const canvo = this.refs.canvas;
      const ctx = canvo.getContext("2d");
      const pos = canvo.getBoundingClientRect();
      const squareSize = 20;
      ctx.fillStyle = "grey";
      ctx.fillRect(
        e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
        e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
        squareSize,
        squareSize
      );
      let tempX = (e.clientX - pos.x - ((e.clientX - pos.x) % squareSize)) / 20;
      let tempY = (e.clientY - pos.y - ((e.clientY - pos.y) % squareSize)) / 20;
      let selectedCell = `${tempX},${tempY}`;
      this.setState({ [`${selectedCell}`]: "living" });
    } else {
      console.log("Grid is not active while game is running");
    }
  };

  handleDoubleClick = (e) => {
    if (this.state.gameRun === false) {
      const canvo = this.refs.canvas;
      const ctx = canvo.getContext("2d");
      const pos = canvo.getBoundingClientRect();
      const squareSize = 20;
      let xStart = e.clientX - pos.x - ((e.clientX - pos.x) % squareSize);
      let yStart = e.clientY - pos.y - ((e.clientY - pos.y) % squareSize);
      ctx.clearRect(xStart, yStart, squareSize, squareSize);
      ctx.strokeRect(xStart, yStart, squareSize, squareSize);
      ctx.strokeStyle = "rgba(111, 111, 111, 0.8)";
      let tempCoord = `${
        (e.clientX - pos.x - ((e.clientX - pos.x) % squareSize)) / 20
      },${(e.clientY - pos.y - ((e.clientY - pos.y) % squareSize)) / 20}`;
      this.setState({ [`${tempCoord}`]: "kpai" });
    } else {
      console.log("Grid is not active while game is running");
    }
  };

  gameToggle = (e) => {
    this.setState({ gameRun: !this.state.gameRun });
  };

  clearCanvas = (e) => {
    this.pauseGame();
    this.setState({ gameRun: false, cycleCount: 0 });
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.initCanvas();
    this.gridState();
  };

  initCanvas = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = 500;
    ctx.canvas.height = 500;
    ctx.strokeStyle = "rgba(0,0,255)";
    for (let x = 0; x <= 500; x += 20) {
      for (let y = 0; y <= 500; y += 20) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 500);
        ctx.moveTo(0, y);
        ctx.lineTo(500, y);
        ctx.stroke();
      }
    }
  };

  updateCanvas = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const squareSize = 20;
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 0);
    ctx.lineTo(300, 300);
    ctx.lineTo(0, 300);
    ctx.lineTo(0, 0);
    ctx.stroke();
    console.log(
      `ctx.height is ${ctx.canvas.height}, width is ${ctx.canvas.width}`
    );
    for (let item in this.state) {
      let xVal = parseInt(item.substring(0, item.indexOf(",")));
      let yVal = parseInt(item.substring(item.indexOf(",") + 1));
      if (this.state[item] === "kpai") {
        ctx.strokeRect(xVal * 20, yVal * 20, squareSize, squareSize);
      } else if (this.state[item] === "living") {
        ctx.fillRect(xVal * 20, yVal * 20, squareSize, squareSize);
      }
    }
    console.log(``);
  };

  gameCycle = () => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    if (this.state.gameRun) {
      let stateBuffer = { ...this.state };
      for (let x = 0; x <= 300; x += 20) {
        for (let y = 0; y <= 300; y += 20) {
          let LNC = 0;
          let topLeftN = `${x / 20 - 1},${y / 20 - 1}`;
          let topN = `${x / 20},${y / 20 - 1}`;
          let topRightN = `${x / 20 + 1},${y / 20 - 1}`;
          let leftN = `${x / 20 - 1},${y / 20}`;
          let rightN = `${x / 20 + 1},${y / 20}`;
          let botLeftN = `${x / 20 - 1},${y / 20 + 1}`;
          let botN = `${x / 20},${y / 20 + 1}`;
          let botRightN = `${x / 20 + 1},${y / 20 + 1}`;
          if (this.state[topLeftN] === "living") {
            ++LNC;
          }
          if (this.state[topN] === "living") {
            ++LNC;
          }
          if (this.state[topRightN] === "living") {
            ++LNC;
          }
          if (this.state[leftN] === "living") {
            ++LNC;
          }
          if (this.state[rightN] === "living") {
            ++LNC;
          }
          if (this.state[botLeftN] === "living") {
            ++LNC;
          }
          if (this.state[botN] === "living") {
            ++LNC;
          }
          if (this.state[botRightN] === "living") {
            ++LNC;
          }
          let tempCell = `${x / 20},${y / 20}`;
          if (this.state[tempCell] === "living" && LNC > 3) {
            stateBuffer[tempCell] = "kpai";
          } else if (this.state[tempCell] === "living" && LNC < 2) {
            stateBuffer[tempCell] = "kpai";
          } else if (this.state[tempCell] === "kpai" && LNC === 3) {
            stateBuffer[tempCell] = "living";
          }
        }
      }
      let cycleCountTemp = this.state.cycleCount;
      cycleCountTemp++;
      this.setState({ ...stateBuffer, cycleCount: cycleCountTemp });
      this.updateCanvas();
      
      if (Object.values(this.state).every(entry => entry !== "living")) {
        this.timer = window.setTimeout(() => {
          this.pauseGame();
        });
      }
    }
  };

  pauseGame = () => {
    this.setState({ gameRun: false });
    if (this.handleTimer) {
      window.clearTimeout(this.handleTimer);
      this.handleTimer = null;
    }
  };

  gameSimulation = () => {
    this.setState({ gameRun: true });
    this.gameCycle();
    this.handleTimer = window.setTimeout(() => {
      this.gameSimulation();
    }, this.state.runSpeed);
  };

  stepOnce = () => {
    this.setState({ gameRun: true });
    this.timer = window.setTimeout(() => {
      this.gameCycle();
    }, 200);
  };

  componentDidMount() {
    this.gridState();
    this.initCanvas();
  }

  slow = () => {
    this.setState({ runSpeed: 1100 });
  };

  fast = () => {
    this.setState({ runSpeed: 300 });
  };

  pulsar = () => {
    this.clearCanvas();
    this.setState({
      "0,10": "living",
      "0,4": "living",
      "1,10": "living",
      "1,4": "living",
      "10,0": "living",
      "10,1": "living",
      "10,12": "living",
      "10,13": "living",
      "10,14": "living",
      "10,2": "living",
      "10,5": "living",
      "10,6": "living",
      "10,8": "living",
      "10,9": "living",
      "12,10": "living",
      "12,4": "living",
      "12,5": "living",
      "12,9": "living",
      "13,10": "living",
      "13,4": "living",
      "14,10": "living",
      "14,4": "living",
      "2,10": "living",
      "2,4": "living",
      "2,5": "living",
      "2,9": "living",
      "4,0": "living",
      "4,1": "living",
      "4,12": "living",
      "4,13": "living",
      "4,14": "living",
      "4,2": "living",
      "4,5": "living",
      "4,6": "living",
      "4,8": "living",
      "4,9": "living",
      "5,10": "living",
      "5,12": "living",
      "5,2": "living",
      "5,4": "living",
      "5,6": "living",
      "5,8": "living",
      "6,10": "living",
      "6,4": "living",
      "6,5": "living",
      "6,9": "living",
      "8,10": "living",
      "8,4": "living",
      "8,5": "living",
      "8,9": "living",
      "9,10": "living",
      "9,12": "living",
      "9,2": "living",
      "9,4": "living",
      "9,6": "living",
      "9,8": "living",
    });
    this.updateCanvas();
    this.timer = window.setTimeout(() => {
      this.updateCanvas();
    }, 500);
  };

  toad = () => {
    this.clearCanvas();
    this.setState({
      "5,6": "living",
      "6,6": "living",
      "7,6": "living",
      "6,5": "living",
      "7,5": "living",
      "8,5": "living",
    });
    this.updateCanvas();
    this.timer = window.setTimeout(() => {
      this.updateCanvas();
    });
  };

  beacon = () => {
    this.clearCanvas();
    this.setState({
      "5,4": "living",
      "6,4": "living",
      "5,5": "living",
      "8,6": "living",
      "7,7": "living",
      "8,7": "living",
    });
    this.updateCanvas();
    this.timer = window.setTimeout(() => {
      this.updateCanvas();
    });
  };

  render() {
    return (
      <div className="cgof">
        <h2>Conway's Game of Life</h2>
        <div className="top-contain">
          <div className="canvas">
            <p>Generation: {this.state.cycleCount}</p>
            <canvas
              ref="canvas"
              onClick={this.handleClick}
              onDoubleClick={this.handleDoubleClick}
            />
            <div className="controls">
              <button onClick={this.gameSimulation}>Start Simulation</button>
              <button onClick={this.pauseGame}>Stop </button>
              <button onClick={this.clearCanvas}>Clear Board</button>
              <button onClick={this.stepOnce}>Step</button>
            </div>
            <p>Sample Configurations</p>
            <div>
              <button onClick={this.pulsar}>Pulsar</button>
              <button onClick={this.toad}>Toad</button>
              <button onClick={this.beacon}>Beacon</button>
            </div>
            <div>
              <input
                type="radio"
                id="slow"
                name="speed"
                value="slow"
                onClick={this.slow}
              />
              <label>slow</label>
              <input
                type="radio"
                id="fast"
                name="speed"
                value="fast"
                onClick={this.fast}
              />
              <label>fast</label>
            </div>
          </div>
          <div className="rules">
            <p>
              1. Any live cell with fewer than two live neighbors dies, as if by
              underpopulation.
            </p>
            <p>
              2. Any live cell with two or three live neighbors lives on to the
              next generation.
            </p>
            <p>
              3. Any live cell with more than three live neighbors dies, as if
              by overpopulation.
            </p>
            <p>
              4. Any dead cell with exactly three live neighbors becomes a live
              cell, as if by reproduction.
            </p>
            <h3>History</h3>
            <p>
              The game made its first public appearance in a 1970 issue of
              Scientific American. Since then, it has attracted plenty of
              interest due in part because of the vast ways the patterns can
              evolve. The game has been used by scientists to illustrate the
              possible evolution of complex contructs. The game's "popularity"
              was bolstered by its appearance just as computer access became
              more prevalent and affordable.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
