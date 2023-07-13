import React, { useEffect, useState } from 'react';
import Cell from './Cell';

const Game = () => {
    const [humanPlayers, setHumanPlayers] = useState(1);

    const [gameStatus, setGameStatus] = useState([
        0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);

    const [turn, setTurn] = useState(1)

    const updateCells = (id) => {
        console.info('updateCells function called.');
        // console.log(`ID: ${id}     Player: ${player}`);

        setGameStatus((prev) => {
            return prev.map((value, i) => {
                // console.log(`Value: ${value}     Index: ${i}`);
                if (i === id && value !== 1 && value !== 2) {
                    if (turn === 1) {
                        setTurn(2);
                        return 1;
                    } else if (turn === 2) {
                        setTurn(1);
                        return 2;
                    }
                } else {
                    return value;
                }
            })
        })
    }

    useEffect(() => {
        if (turn === 2 && humanPlayers === 1 && gameStatus.includes(0)) {
            aiSelect();
        }
    }, [turn]);

    const aiSelect = () => {
        console.info('aiSelect function called.');
        let selected = false;

        while (selected === false) {
            let i = Math.floor(Math.random() * 8);
            
            if (gameStatus[i] !== 1 && gameStatus[i] !== 2) {
                updateCells(i);
                selected = true;
            }
        }
    }

    return (
    <div className='game'>
        {
            gameStatus.map((status, index) => {
                let selectedBy;
                switch (status) {
                    case 0:
                        selectedBy = null;
                        break;
                    case 1:
                        selectedBy = 'p1';
                        break;
                    case 2:
                        selectedBy = 'p2';
                        break;
                    default:
                        selectedBy = null;
                        break;
                }
                return (
                    <Cell
                        id={index}
                        selectedBy={selectedBy}
                        updateCells={updateCells}
                    />
                )
            })
        }
    </div>
    )
}

export default Game