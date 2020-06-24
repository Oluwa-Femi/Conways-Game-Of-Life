import React, { Component } from "react";

class Board extends Component {
  state = {};

  componentDidMount() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = 500;
    ctx.canvas.height = 500;
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

  render() {
    return (
      <div>
        <canvas ref="canvas" />
      </div>
    );
  }
}

export default Board;
