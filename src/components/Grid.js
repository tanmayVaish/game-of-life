import {useCallback, useRef, useState} from "react";

import './styles/Grid.css'


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

    const [grid, setGrid] = useState(() => {
        const rows = [];

        for (let i = 0; i < props.row; i++) {
            rows.push(Array.from(Array(props.col), () => 0));
        }


        return rows;
    });

    const [running, setRunning] = useState(false);
    const box1 = {
        'width': '10px',
        'height': '10px',
        'backgroundColor': 'yellow',
        'border': 'green 0.1px solid'
    }
    const box2 = {
        'width': '10px',
        'height': '10px',
        'border': 'green 0.1vh solid'
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


        setTimeout(runSimulation, 1);
    }, []);


    return (
        <div>
            <button onClick={() => {
                setRunning(!running);
                if (!running) {
                    runningRef.current = true;
                    runSimulation();
                }
            }
            }>{running ? 'Stop' : 'Start'}</button>

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

export default Grid;