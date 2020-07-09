<!-- gameCycle = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');
        if (this.state.simRun) {
            let stateBuffer = {...this.state};
            for (let x=0; x<=300; x+= 20) {
                for (let y=0; y<=300; y+= 20) {
                    let LNC = 0;
                    let topLeftN = `${x/20-1},${y/20-1}`;
                    let topN = `${x/20},${y/20-1}`;
                    let topRightN = `${x/20+1},${y/20-1}`;
                    let leftN = `${x/20-1},${y/20}`;
                    let rightN = `${x/20+1},${y/20}`;
                    let botLeftN = `${x/20-1},${y/20+1}`;
                    let botN = `${x/20},${y/20+1}`;
                    let botRightN = `${x/20+1},${y/20+1}`;
                    if (this.state[topLeftN] === "living") {
                        LNC++;
                    }
                    if (this.state[topN] === "living") {
                        LNC++;
                    }
                    if (this.state[topRightN] === "living") {
                        LNC++;
                    }
                    if (this.state[leftN] === "living") {
                        LNC++;
                    }
                    if (this.state[rightN] === "living") {
                        LNC++;
                    }
                    if (this.state[botLeftN] === "living") {
                        LNC++;
                    }
                    if (this.state[botN] === "living") {
                        LNC++;
                    }
                    if (this.state[botRightN] === "living") {
                        LNC++;
                    }
                    if (this.state[`${x/20},${y/20}`] === "living" && (LNC != 2||3)) {
                        console.log(`Welcome to the deadites ${x/20},${y/20}`);
                        stateBuffer[`${x/20},${y/20}`] = "deadite";
                    } else if (this.state[`${x/20},${y/20}`] === "deadite" && LNC === 3) {
                        console.log(`Welcome to the living ${x/20},${y/20}`);
                        stateBuffer[`${x/20},${y/20}`] = "living";
                    }
                }
            } 
            let cycleCountTemp = this.state.cycleCount;
            cycleCountTemp++;
            this.setState({...stateBuffer, cycleCount: cycleCountTemp});

        }
    } -->