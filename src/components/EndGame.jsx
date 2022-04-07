import React from 'react'
//import logo from '../assets/e.gif'

function EndGame({resetGame, earned}) {
  return (
    <>
      {/* <img src={logo} alt="loading..." /> */}
      <h1 className="endText">You earned: {earned}</h1>
      <button onClick={resetGame}>reset</button>
    </>
  )
}

export default EndGame