import React, { useState } from 'react';
import Cell from './Cell';

const Game = () => {
    const [gameStatus, setGameStatus] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);

    return (
    <div className='game'>
        {
            gameStatus.map((status, index) => {
                switch (status) {
                    case 0:
                        return (
                            <Cell
                                id={index}
                                selectedBy={null}
                            />
                        )
                    case 1:
                        return (
                            <Cell
                                id={index}
                                selectedBy="p1"
                            />
                        )
                    case 2:
                        return (
                            <Cell
                                id={index}
                                selectedBy="p2"
                            />
                        )
                    default:
                        return (
                            <Cell
                                id={index}
                                selectedBy={null}
                            />
                        )
                }
            })
        }
    </div>
    )
}

export default Game