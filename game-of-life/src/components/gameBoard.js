import React, { Component } from "react";

class Board extends Component {
  state = {};

  gridState = () => {
    for (let i=0; i<300; i+=20){
        for (let j=0; j<300; j+=20){
        this.setState({[`${i/20},${j/20}`]: "kpai"})
        }
    }
}

handleClick = (e) => {
    const canvo = this.refs.canvas
    const ctx = canvo.getContext("2d");
    const pos = canvo.getBoundingClientRect()
    const squareSize = 20
    ctx.fillStyle = "red";
    ctx.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      squareSize,
      squareSize);
}

handleDoubleClick = (e) => {
    const canvo = this.refs.canvas
    const ctx = canvo.getContext("2d");
    const pos = canvo.getBoundingClientRect()
    const squareSize = 20
    ctx.fillStyle = "white";
    ctx.fillRect(e.clientX - pos.x - ((e.clientX - pos.x) % squareSize),
      e.clientY - pos.y - ((e.clientY - pos.y) % squareSize),
      squareSize,
      squareSize);
      // console.log(`${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20},${ (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`);
      let tempCoord = `${(e.clientX - pos.x - (e.clientX - pos.x) % squareSize)/20},${ (e.clientY - pos.y - (e.clientY - pos.y) % squareSize)/20}`;
      // console.log(this.state[`${tempCoord}`]);
      this.setState({[`${tempCoord}`]: "living"});
    }


  componentDidMount() {
    this.gridState();
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.canvas.width = 500;
    ctx.canvas.height = 500;
    ctx.strokeStyle = 'rgba(0,0,255)';
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
        <canvas 
        ref="canvas"
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick} 
        />
      </div>
    );
  }
}

export default Board;
