import React from 'react'

function Pyramid({questionNum, moneyPyramid}) {
  return (
    <div className="pyramid">
          <ul className="moneylist">
            {moneyPyramid.map(money => (
              <li
                className={questionNum === money.id ? "moneylist-item active" : "moneylist-item"}   
                key={money.id}>
                <span className="moneylist-item-number">{money.id}</span>
                <span className="moneylist-item-amount">${money.amount}</span>
              </li>
            ))}
          </ul>
    </div>
  )
}

export default Pyramid