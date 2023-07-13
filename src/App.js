import './styles/App.css';
import Game from './components/Game';

function App() {
  console.clear();
  
  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <Game />
    </div>
  );
}

export default App;