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
    resetGame,
    ai
}) => {
    const updateCells = (id) => {
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
                console.info('Player 1 has won!');
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
              console.info('Player 2 has won!');
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
        console.warn('Started AI algorithm.');
        
        const makeRandomMove = () => {
            let selected = false;
            if (gameStatus.includes(0) && winner === null) {
                while (selected === false) {
                    let i = Math.floor(Math.random() * 8);
                    
                    if (gameStatus[i] !== 1 && gameStatus[i] !== 2 && !gameEnded) {
                        updateCells(i);
                        selected = true;
                    }
                }
            }
        }

        const knownPatterns = [
            [0, 1],     // row1
            [0, 2],
            [1, 2],
            [3, 4],     // row2
            [3, 5],
            [4, 5],
            [6, 7],     // row3
            [6, 8],
            [7, 8],
            [0, 3],     // col1
            [0, 6],
            [3, 6],
            [1, 4],     // col2
            [1, 7],
            [4, 7],
            [2, 5],     // col3
            [2, 8],
            [5, 8],
            [0, 4],     // d1
            [0, 8],
            [4, 8],
            [2, 4],     // d2
            [2, 6],
            [4, 6]
        ]

        const playerArray = (
            gameStatus.map((value, index) => {
                if (value === 1) {
                    return index
                } else {
                    return null;
                }
            }).filter((value) => value !== null)
        )

        const aiArray = (
            gameStatus.map((value, index) => {
                if (value === 2) {
                    return index
                } else {
                    return null;
                }
            }).filter((value) => value !== null)
        )

        const aiMoves = [
            2, 1, 0,    // row1
            5, 4, 3,    // row2
            8, 7, 6,    // row3
            6, 3, 0,    // col1
            7, 4, 1,    // col2
            8, 5, 2,    // col3
            8, 4, 0,    // d1
            6, 4, 2     // d2
        ]

        const evaluateSituation = () => {
            console.log('Evaluating situation...');

            let patternIndexDefense = null;
            const containsPatternForDefense = knownPatterns.some((pattern, index) => {
                const [num1, num2] = pattern;
                if (playerArray.includes(num1) && playerArray.includes(num2)) {
                    patternIndexDefense = index;
                }
                return playerArray.includes(num1) && playerArray.includes(num2);
            })

            let patternIndexAttack = null;
            const containsPatternForAttack = knownPatterns.some((pattern, index) => {
                const [num1, num2] = pattern;
                if (aiArray.includes(num1) && aiArray.includes(num2)) {
                    patternIndexAttack = index;
                }
                return aiArray.includes(num1) && aiArray.includes(num2);
            })

            if (containsPatternForAttack && containsPatternForDefense) {
                if (gameStatus[aiMoves[patternIndexAttack]] === 0) {
                    makeWinningMove(patternIndexAttack);
                    console.info('Found a known pattern for attack. Making a winning move!');
                } else {
                    makeDefenseMove(patternIndexDefense);
                    console.warn('Wanted to make winning move but cell is occupied. Making a defense move instead.');
                }
            } else if (!containsPatternForAttack && containsPatternForDefense) {
                console.log(patternIndexDefense);
                console.log(gameStatus);
                console.log(gameStatus[aiMoves[patternIndexDefense]]);
                if (gameStatus[aiMoves[patternIndexDefense]] === 0) {
                    makeDefenseMove(patternIndexDefense);
                    console.info("Found a known pattern for defense. Making a defense move.");
                } else {
                    makeRandomMove();
                    console.warn('Wanted to make defense move but cell is occupied. Making attack move instead.');
                }
            } else {
                makeAttackMove();
                console.info("Didn't find a known pattern. Deciding if I should make a strategical or random move.");
                return false;
            }
        }

        const makeDefenseMove = (i) => {
            

            // console.log('defensemovesi' + defenseMoves[i])
            // console.log(gameStatus);
            // console.log(gameStatus[defenseMoves[i]]);
            if (gameStatus[aiMoves[i]] == 0) {
                updateCells(aiMoves[i]);
                console.info(`Successfully made a defense move in ${aiMoves[i]}.`);
            } else {
                makeAttackMove();
                console.error(`Can't make a defense move. Switching to attack mode.`)
            }
        }

        const makeWinningMove = (i) => {
            console.info(`Made a winning move in ${i}.`)
            updateCells(aiMoves[i]);
        }

        const makeAttackMove = () => {
            const decideTypeOfMove = () => {
                console.log('Deciding type of attack move...');

                const patternsForAiWin = [
                    [0, 1],     // row1
                    [0, 2],
                    [1, 2],
                    [3, 4],     // row2
                    [3, 5],
                    [4, 5],
                    [6, 7],     // row3
                    [6, 8],
                    [7, 8],
                    [0, 3],     // col1
                    [0, 6],
                    [3, 6],
                    [1, 4],     // col2
                    [1, 7],
                    [4, 7],
                    [2, 5],     // col3
                    [2, 8],
                    [5, 8],
                    [0, 4],     // d1
                    [0, 8],
                    [4, 8],
                    [2, 4],     // d2
                    [2, 6],
                    [4, 6]
                ]

                let patternIndex = null;
                const containsPattern = patternsForAiWin.some((pattern, index) => {
                    const [num1, num2] = pattern;
                    if (patternsForAiWin.includes(num1) && patternsForAiWin.includes(num2)) {
                        patternIndex = index;
                    }
                    return patternsForAiWin.includes(num1) && patternsForAiWin.includes(num2);
                })
                // console.log('found pattern index: ' + patternIndex);
                // console.log('do i have a winning pattern? ' + containsPattern);

                if (containsPattern) {
                    console.info('Found a known pattern. Making a winning move.');
                    makeWinningMove(patternIndex);
                } else {
                    console.info("Didn't find anything. Making a random move.");
                    makeRandomMove();
                }
            }
            decideTypeOfMove();
        }

        // AI === false makes the computer select a random cell
        if (ai === false) {
            console.info('AI is disabled. Making a random move.');
            makeRandomMove();
        }


        // AI === true makes the computer use the minmax algorithm
        if (ai === true) {
            evaluateSituation();

            // const generatePossibleMoves = () => {
            //     const moves = [];
            //     for (let i = 0; i < gameStatus.length; i++) {
            //         if (gameStatus[i] === 0) {
            //             const newState = [...gameStatus];
            //             newState[i] = 2;
            //             moves.push(newState);
            //             console.log(newState);
            //         }
            //     }
            //     console.info('Generated possible moves');
            //     return moves;
            // }
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