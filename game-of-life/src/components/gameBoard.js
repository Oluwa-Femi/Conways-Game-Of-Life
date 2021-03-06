import React, { Component } from "react";

class Board extends Component {
  state = {
    gameRun: true,
    cycleCount: 0,
    runSpeed: 800,
  };

  gridState = () => {
    for (let i = 0; i < 500; i += 20) {
      for (let j = 0; j < 500; j += 20) {
        this.setState({ [`${i / 20},${j / 20}`]: "deadite" });
      }
    }
  };

  // retrieveS click position, then convert it to relative position, and calculate
  //the cols and rows of the cell being clicked. Then the cell state is reverted.
  //updating canvas api and rendering
  handleClick = (e) => {
    if (!this.handleTimer) {
      const canvo = this.refs.canvas;
      const ctx = canvo.getContext("2d");
      const pos = canvo.getBoundingClientRect();
      const squareSize = 20;
      ctx.fillStyle = "red";
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
      let tempCoord = `${
        (e.clientX - pos.x - ((e.clientX - pos.x) % squareSize)) / 20
      },${(e.clientY - pos.y - ((e.clientY - pos.y) % squareSize)) / 20}`;
      this.setState({ [`${tempCoord}`]: "deadite" });
    } else {
      console.log("Grid is not active while game is running");
    }
  };

  gameToggle = e => {
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
    ctx.strokeStyle = "rgba(444, 444, 444, 0.8)";
    ctx.fillStyle = "#89cff0";
    ctx.fillRect(0, 0, 500, 500);
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
    for (let item in this.state) {
      let xVal = parseInt(item.substring(0, item.indexOf(",")));
      let yVal = parseInt(item.substring(item.indexOf(",") + 1));
      if (this.state[item] === "deadite") {
        ctx.clearRect(xVal * 20, yVal * 20, squareSize, squareSize);
        ctx.strokeStyle = "rgba(444, 444, 444, 0.8)";
        ctx.strokeRect(xVal * 20, yVal * 20, squareSize, squareSize);
      } else if (this.state[item] === "living") {
        ctx.fillStyle = "red";
        ctx.fillRect(xVal * 20, yVal * 20, squareSize, squareSize);
      }
    }
  };

  gameCycle = () => {
    if (this.state.gameRun) {
      let stateBuffer = { ...this.state };
      for (let x = 0; x <= 500; x += 20) {
        for (let y = 0; y <= 500; y += 20) {
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
            stateBuffer[tempCell] = "deadite";
          } else if (this.state[tempCell] === "living" && LNC < 2) {
            stateBuffer[tempCell] = "deadite";
          } else if (this.state[tempCell] === "deadite" && LNC === 3) {
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
    }, 250);
  };

  componentDidMount() {
    this.gridState();
    this.initCanvas();
  }

  slow = () => {
    this.setState({ runSpeed: 1100 });
  };

  fast = () => {
    this.setState({ runSpeed: 375 });
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
            <h3>Generation: {this.state.cycleCount}</h3>
            <canvas
              className="canvas-grid"
              ref="canvas"
              onClick={this.handleClick}
              onDoubleClick={this.handleDoubleClick}
            />
            <div className="controls">
              <button className="button" onClick={this.gameSimulation}>Start</button>
              <button className="button" onClick={this.pauseGame}>Stop </button>
              <button className="button" onClick={this.clearCanvas}>Clear Board</button>
              <button className="button" onClick={this.stepOnce}>Next</button>
            </div>
            <h3>OSCILLATORS</h3>
            <div>
              <button className="button" onClick={this.pulsar}>Pulsar</button>
              <button className="button" onClick={this.toad}>Toad</button>
              <button className="button" onClick={this.beacon}>Beacon</button>
            </div>
            <div>
              <input
                type="radio"
                id="slow"
                name="speed"
                value="slow"
                onClick={this.slow}
                className="radio"
              />
              <label>slow</label>
              <input
                type="radio"
                id="fast"
                name="speed"
                value="fast"
                onClick={this.fast}
                className="radio"
              />
              <label>fast</label>
            </div>
          </div>
          <div className="rules">
            <h3>RULES</h3>
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
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
