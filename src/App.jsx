import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import {WINNING_COMBINATIONS} from './components/WinCompinations.jsx';
import GameOver from "./components/GameOver.jsx";

const PLAYERS={
  X:'player 1',
  O:'player 2',
}

const initailGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
  ];

function curActivePlayer(turns)
{
  let currentPlayer='X';
  if(turns.length>0 && turns[0].player==='X')
  {
    currentPlayer='O';
}
return currentPlayer;
}

function deriveGameBoard(gameTurns)
{
  let gameBoard=[...initailGameBoard.map(array=>[...array])];
  for(const turn of gameTurns)
  {
    const {square,player}=turn;
    const {row,col}=square;
    gameBoard[row][col]=player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard,players)
{
  let winner;

  for(const combination of WINNING_COMBINATIONS)
  {
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondtSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
  
  if(firstSquareSymbol&&firstSquareSymbol===secondtSquareSymbol&&firstSquareSymbol===thirdSquareSymbol)
  {
    winner=players[firstSquareSymbol];
    break;
  }
  
  }
  return winner;
}

function App() {

  const [players,setPlayers]=useState(PLAYERS);

const[gameTurns,setGameTurns]=useState([]);

const activePlayer=curActivePlayer(gameTurns);

const gameBoard=deriveGameBoard(gameTurns);

const winner=deriveWinner(gameBoard,players); 

function handelSelectSquare (rowIndex,colIndex)
{
  setGameTurns(prevTurns=>{
    const currentPlayer=curActivePlayer(prevTurns);
    const updatedTurns=[{square
      :{row:rowIndex,col:colIndex},player:currentPlayer
    },...prevTurns];
    return updatedTurns;
  });
}

function handelReset()
{
  setGameTurns([]);
}

function handelPlayerName(symbol,newName)
{
setPlayers(prevPlayers=>{
  return {
    ...prevPlayers,
    [symbol]:newName,
  };
});
}

const draw=gameTurns.length===9 && !winner;
  return (
  <main>
  <div id="game-container">
     <ol id="players" className="highlight-player">
      <Player InitialName={PLAYERS.X}  symbol='X' isActive={activePlayer==='X'} onSetName={handelPlayerName}/>
      <Player InitialName={PLAYERS.O}   symbol='O' isActive={activePlayer==='O'} onSetName={handelPlayerName}/>
     </ol>
     {(winner ||draw) &&<GameOver winner={winner} onReset={handelReset}/>}
    <GameBoard onSelectSquare={handelSelectSquare} board={gameBoard}/>
  </div>
  <Log turns={gameTurns} />
</main>
  )
}
export default App
