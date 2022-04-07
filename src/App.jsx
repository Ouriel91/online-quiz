
import { useState } from 'react';
import './App.css';
import GameBoard from './components/GameBoard'
import StartGame from './components/StartGame'

function App() {

  const [username, setUsername] = useState(null)
  
  return (
    <div className="app">
      {username ? <GameBoard username={username}/> : <StartGame setUsername={setUsername} />}
    </div>
  );
}

export default App;
