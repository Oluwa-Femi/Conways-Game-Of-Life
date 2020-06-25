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
      let tempX = (e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20;
      let tempY = (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20;
      let selectedCell = `${tempX},${tempY}`;
      // console.log(this.state[`${tempCoord}`]);
      this.setState({[`${selectedCell}`]: "living"});
      console.log(`topLeftN = ${tempX-1},${tempY-1}`);
      console.log(`botRightN = ${tempX+1},${tempY+1}`);
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
      // ctx.fillStyle = "white";
      // ctx.fillRect(
      //   e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      //   e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      //   squareSize,
      //   squareSize
      // );
      let xStart = e.clientX - pos.x - ((e.clientX - pos.x) % squareSize);
            let yStart = e.clientY - pos.y - ((e.clientY - pos.y) % squareSize);
            ctx.clearRect(xStart, yStart, squareSize, squareSize);
            ctx.strokeRect(xStart, yStart, squareSize, squareSize);
            ctx.strokeStyle = 'rgba(111, 111, 111, 0.8)';
            let tempCoord = `${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20},${ (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`;
            this.setState({[`${tempCoord}`]: "kpai"});
      } else {
        console.log("Grid is not active while game is running");
      }
  };

  gameToggle = (e) => {
    this.setState({ gameRun: !this.state.gameRun });
  };

  clearCanvas = (e) => {
    this.setState({gameRun: false});
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width, canvas.height);
    this.initCanvas();
    this.gridState();
}

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
          ctx.stroke();
          ctx.moveTo(0, y);
          ctx.lineTo(500, y);
          ctx.stroke();
        }
      }
    }

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
        <div className="controls">
          <button onClick={this.gameToggle}>
            Start / Stop simulation
          </button>
          <button onClick={this.clearCanvas}>
            Clear
          </button>
        </div>
      </div>
    );
  }
}

export default Board;
