import React, {useState} from 'react';

import './styles/App.css';

import Game from './components/Game';
import TurnIndicator from './components/TurnIndicator';
import WinnerIndicator from './components/WinnerIndicator';

function App() {
  const [gameEnded, setGameEnded] = useState(false);
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <Game turn={turn} setTurn={setTurn} winner={winner} setWinner={setWinner} gameEnded={gameEnded} setGameEnded={setGameEnded} />
      <TurnIndicator turn={turn} gameEnded={gameEnded}/>
      <WinnerIndicator winner={winner} />
    </div>
  );
}

export default App;