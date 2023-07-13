import React, { useEffect, useState } from 'react';
import Cell from './Cell';

const Game = ({ 
    gameStatus, 
    setGameStatus, 
    turn, 
    setTurn, 
    humanPlayers, 
    winner, 
    setWinner, 
    gameEnded, 
    setGameEnded,
    resetGame
}) => {
    const updateCells = (id) => {
        // console.info('updateCells function called.');
        // console.log(`ID: ${id}     Player: ${player}`);
        if (!gameEnded) {
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
        } else {
            // console.warn("Can't update cells! Game is ended.");
        }
    }

    useEffect(() => {
        if (turn === 2 && humanPlayers === 1 && !gameEnded) {
            aiSelect();
        }
    }, [turn]);

    useEffect(() => {
        checkWin();
        if (!gameStatus.includes(0)) {
            setGameEnded(true);
            setTurn(1);
        }
    }, [gameStatus]);



    const checkWin = () => {
        const winCombinations = [
            [0, 1, 2], // Top row
            [3, 4, 5], // Middle row
            [6, 7, 8], // Bottom row
            [0, 3, 6], // Left column
            [1, 4, 7], // Middle column
            [2, 5, 8], // Right column
            [0, 4, 8], // Diagonal from top-left to bottom-right
            [2, 4, 6]  // Diagonal from top-right to bottom-left
        ]

        const player1Array = (
            gameStatus.map((value, index) => {
                if (value === 1) {
                    return index
                } else {
                    return null;
                }
            }).filter((value) => value !== null)
        )

        const player2Array = (
            gameStatus.map((value, index) => {
                if (value === 2) {
                    return index
                } else {
                    return null;
                }
            }).filter((value) => value !== null)
        )

        for (let i = 0; i < winCombinations.length; i++) {
            const winCombination = winCombinations[i];
            let player1Won = true;
            
            for (let j = 0; j < winCombination.length; j++) {
              const cell = winCombination[j];
              
              if (!player1Array.includes(cell)) {
                player1Won = false;
                break;
              }
            }
            
            if (player1Won) {
              setGameEnded(true);
              setWinner(1);
              break;
            }
        }

        for (let i = 0; i < winCombinations.length; i++) {
            const winCombination = winCombinations[i];
            let player2Won = true;
            
            for (let j = 0; j < winCombination.length; j++) {
              const cell = winCombination[j];
              
              if (!player2Array.includes(cell)) {
                player2Won = false;
                break;
              }
            }
            
            if (player2Won) {
              console.warn('Player 2 has won!');
              setGameEnded(true);
              setWinner(2);
              break;
            }
        }
    }

    useEffect(() => {
        checkWin();
    }, [gameStatus]);

    useEffect(() => {
        resetGame()
    }, [humanPlayers])

    const aiSelect = () => {
        // console.info('aiSelect function called.');
        let selected = false;

        while (selected === false) {
            let i = Math.floor(Math.random() * 8);
            
            if (gameStatus[i] !== 1 && gameStatus[i] !== 2 && !gameEnded) {
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
                        key={index}
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