import {useEffect} from 'react'
import millioner from '../assets/millioner.gif'
import winner from '../assets/winner.gif'
import money from '../assets/money.gif'
import loser from '../assets/loser.gif'

function EndGame({resetGame, earned}) {

  let imgSrc

  if(earned < 1000){
    imgSrc = loser
  }
  else if(earned < 64000){
    imgSrc = money
  }
  else if(earned <= 500000){
    imgSrc = winner
  }
  else{
    imgSrc = millioner
  }

  return (
    <div className="endgame-container">
      <h1 className="endText">You earned: ${earned}</h1>
      <img className="celebration" src={imgSrc} alt="celebration" />
      <button className="resetBtn" onClick={resetGame}>reset</button>
    </div>
  )
}

export default EndGame