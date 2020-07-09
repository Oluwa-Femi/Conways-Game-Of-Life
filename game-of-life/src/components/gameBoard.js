import React, { Component } from "react";

class Board extends Component {
  state = {
    gameRun: false,
    cycleCount: 0,
  };

  gridState = () => {
    for (let i = 0; i < 300; i += 20) {
      for (let j = 0; j < 300; j += 20) {
        this.setState({ [`${i / 20},${j / 20}`]: "kpai" });
      }
    }
  };

  handleClick = (e) => {
    if (this.state.gameRun === false) {
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
      // console.log(this.state[`${tempCoord}`]);
      this.setState({ [`${selectedCell}`]: "living" });
      // console.log(`topLeftN = ${tempX - 1},${tempY - 1}`);
      // console.log(`botRightN = ${tempX + 1},${tempY + 1}`);
    } else {
      console.log("Grid is not active while game is running");
    }
  };

  handleDoubleClick = (e) => {
    if (this.state.simRun === false) {
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
    // ctx.strokeRect(0,0,ctx.width,ctx.height);
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 0);
    // ctx.stroke();
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
      // console.log(`${item},${xVal+1},${yVal}`);
      // ctx.strokeRect(xVal*20, yVal*20, squareSize, squareSize);
      if (this.state[item] === "kpai") {
        // ctx.clearRect(xVal * 20, yVal * 20, squareSize, squareSize);
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
          // if (
          //   this.state[`${x / 20},${y / 20}`] === "living" &&
          //   (LNC !== 2 || 3)
          // ) {
          //   console.log(`Welcome to the deads ${x / 20},${y / 20}`);
          let tempCell = `${x / 20},${y / 20}`;
          if (this.state[`${x / 20},${y / 20}`] === "living") {
            // let tempCell = `${x/20},${y/20}`;
            console.log(
              `cell is ${x / 20},${y / 20} LNC is ${LNC}, state is ${
                this.state[tempCell]
              }`
            );
          }
          if (this.state[`${x / 20},${y / 20}`] === "living" && LNC > 3) {
            console.log(
              `Welcome to the deads ${x / 20},${
                y / 20
              } LNC is ${LNC}, state is ${this.state[tempCell]}`
            );
            stateBuffer[`${x / 20},${y / 20}`] = "kpai";
          } else if (
            this.state[`${x / 20},${y / 20}`] === "living" &&
            LNC < 2
          ) {
            console.log(
              `Welcome to the deads ${x / 20},${
                y / 20
              } LNC is ${LNC}, state is ${this.state[tempCell]}`
            );
            stateBuffer[`${x / 20},${y / 20}`] = "kpai";
            // } else if (
            //   this.state[`${x / 20},${y / 20}`] === "kpai" &&
            //   LNC === 3
            // ) {
          } else if (
            this.state[`${x / 20},${y / 20}`] === "kpai" &&
            LNC === 3
          ) {
            console.log(`Welcome to the living ${x / 20},${y / 20}`);
            stateBuffer[`${x / 20},${y / 20}`] = "living";
          }
        }
      }
      let cycleCountTemp = this.state.cycleCount;
      cycleCountTemp++;
      this.setState({ ...stateBuffer, cycleCount: cycleCountTemp });
      this.updateCanvas();
    }
  };

  componentDidMount() {
    this.gridState();
    this.initCanvas();
  }

  render() {
    return (
      <div className="cgof">
        <canvas
          ref="canvas"
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
        />
        <p>Generation: {this.state.cycleCount}</p>
        <div className="controls">
          <button onClick={this.gameToggle}>Start / Stop simulation</button>
          <button onClick={this.clearCanvas}>Clear</button>
          <button onClick={this.gameCycle}>Step</button>
        </div>
      </div>
    );
  }
}

export default Board;
