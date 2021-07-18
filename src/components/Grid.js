import {useState} from "react";

import './styles/Grid.css'

const Grid = () => {

    const row = 50;
    const col = 50;

    const box1 = {
        'width': '15px',
        'height': '15px',
        'backgroundColor': 'black',
        'border': 'green 0.1px solid'
    }

    const box2 = {
        'width': '15px',
        'height': '15px',
        'border': 'green 0.1vh solid'
    }

    const [grid, setGrid] = useState(() => {
            const rows = [];

            for (let i = 0; i < row; i++) {
                rows.push(Array.from(Array(col), () => 0));
            }
            return rows;
        }
    );

    function customProduce(grid, x, y) {
        let gridCopy = [];
        for (let i = 0; i < row; i++) {
            gridCopy[i] = [];
            for (let j = 0; j < col; j++) {
                if (x === i && y === j) {
                    gridCopy[i][j] = grid[i][j] ? 0 : 1;
                } else {
                    gridCopy[i][j] = grid[i][j];
                }
            }
        }
        return gridCopy;
    }


    return (
        <div className={'grid'}>
            {
                grid.map((rows, i) => rows.map((col, j) => (<div key={`${i},${j}`} onClick={() => {
                        setGrid(customProduce(grid, i, j));
                        console.log(i, j, grid[i][j])
                }
                    } style={grid[i][j] ? box1 : box2}/>))
                )
            }
        </div>
    )
}

export default Grid;