import {useCallback, useRef, useState} from "react";
import React from "react";
import '../styles/Grid.css'


const Grid = (props) => {

    const operation = [
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0]
    ];

    const setGridNull = () => {
        const rows = [];
        for (let i = 0; i < props.row; i++) {
            rows.push(Array.from(Array(props.col), () => 0));
        }
        return rows;
    }

    const [grid, setGrid] = useState(() => {
        return setGridNull();
    });

    const [running, setRunning] = useState(false);
    const box1 = {
        'width': '1vmin',
        'height': '1vmin',
        'backgroundColor': 'yellow',
        'border-top-color': 'rgba(0,0,0,0.2)',
        'border-right-color': 'rgba(0,0,0,0.2)',
        'border-bottom-color': 'rgba(0,0,0,0.2)',
        'border-left-color': 'rgba(0,0,0,0.2)',
        'border': 'rgba(100,100,100,0.5) 1px solid'
    }
    const box2 = {
        'width': '1vmin',
        'height': '1vmin',
        'border': 'rgba(100,100,100,0.5) 1px solid',
    }


    const runningRef = useRef(running);
    runningRef.current = running;

    function customProduce(grid, x, y) {
        let gridCopy = [];
        for (let i = 0; i < props.row; i++) {
            gridCopy[i] = [];
            for (let j = 0; j < props.col; j++) {
                if (x === i && y === j) {
                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                } else {
                    gridCopy[i][j] = grid[i][j];
                }
            }
        }
        return gridCopy;
    }


    const runSimulation = useCallback(() => {

        if (!runningRef.current) {
            return;
        }

        setGrid(grid => {

            let gridCopy = [];

            for (let i = 0; i < props.row; i++) {
                gridCopy[i] = [];
                for (let j = 0; j < props.col; j++) {

                    gridCopy[i][j] = grid[i][j];
                    // loop start
                    let neigh = 0;

                    operation.forEach(([x, y]) => {
                        const newI = i + x;
                        const newJ = j + y;
                        if (newI >= 0 && newI < props.row && newJ >= 0 && newJ < props.col)
                            neigh = neigh + grid[newI][newJ];
                    });


                    if (neigh < 2 || neigh > 3)
                        gridCopy[i][j] = 0;
                    else if (grid[i][j] === 0 && neigh === 3)
                        gridCopy[i][j] = 1;

                    // loop close

                }
            }
            return gridCopy;
        });

        console.log('rendering')

        setTimeout(runSimulation, 1);
    }, []);


    return (
        <div className={'gridBody'}>
            <div className={'buttons'}>
                <button onClick={() => {
                    setRunning(!running);
                    if (!running) {
                        runningRef.current = true;
                        runSimulation();
                    }
                }
                }>{running ? 'Stop' : 'Start'}</button>

                <button onClick={() => {
                    setGrid(setGridNull);
                }
                }>Reset</button>
                <button onClick={() => {
                    let rows = [];
                    for (let i = 0; i < props.row; i++) {
                        rows.push(Array.from(Array(props.col), () => (
                            Math.random() > 0.9 ? 1 : 0
                        )))
                    }
                    setGrid(rows)
                }
                }>Random Preset</button>
            </div>
            <div className={'grid'}>
                {
                    grid.map((row, i) => row.map((col, j) => (<div key={`${i},${j}`} onClick={() => {
                            setGrid(customProduce(grid, i, j));
                        }
                        } style={grid[i][j] ? box1 : box2}/>))
                    )
                }
            </div>
        </div>
    )
};

export default React.memo(Grid);