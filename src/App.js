import React, {useEffect, useState} from 'react';

import './styles/App.css';

import Game from './components/Game';
import TurnIndicator from './components/TurnIndicator';
import WinnerIndicator from './components/WinnerIndicator';
import Settings from './components/Settings';

function App() {
  const [gameEnded, setGameEnded] = useState(false);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);

  const [humanPlayers, setHumanPlayers] = useState(1);
  const [player1Color, setPlayer1Color] = useState('#FF0000');
  const [player2Color, setPlayer2Color] = useState('#00AEFF');
  const [animations, setAnimations] = useState(true);
  const [ai, setAi] = useState(true);

  const [gameStatus, setGameStatus] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0
  ]);

  const resetGame = () => {
    setTurn(1);
    setGameEnded(false);
    setWinner(null);
    setGameStatus([
        0, 0, 0, 0, 0, 0, 0, 0, 0
    ]);
    console.clear();
    console.info('Game resetted');
  }

  useEffect(() => {
    resetGame();
  }, [ai]);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <Game 
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        turn={turn} 
        setTurn={setTurn}
        humanPlayers={humanPlayers}
        winner={winner}
        setWinner={setWinner}
        gameEnded={gameEnded}
        setGameEnded={setGameEnded}
        resetGame={resetGame}
        ai={ai}
      />
      <TurnIndicator 
        turn={turn} 
        gameEnded={gameEnded}
        humanPlayers={humanPlayers}
      />
      <WinnerIndicator 
        winner={winner} 
        gameEnded={gameEnded}
        humanPlayers={humanPlayers}
      />
      <Settings
        humanPlayers={humanPlayers}
        setHumanPlayers={setHumanPlayers}
        player1Color={player1Color}
        setPlayer1Color={setPlayer1Color}
        player2Color={player2Color}
        setPlayer2Color={setPlayer2Color}
        animations={animations}
        setAnimations={setAnimations}
        resetGame={resetGame}
        ai={ai}
        setAi={setAi}
      />
    </div>
  );
}

export default App;