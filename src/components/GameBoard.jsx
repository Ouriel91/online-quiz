import {useMemo, useState, useEffect} from "react"
import Pyramid from './Pyramid'
import Trivia from './Trivia'
import Timer from './Timer'
import EndGame from './EndGame'

function GameBoard({username}) {

    const [questionNum, setQuestionNum] = useState(1)
    const [clock, setClock] = useState(false)
    const [earned, setEarned] = useState("$ 0")

    const moneyPyramid = useMemo(
        () =>
          [
            { id: 1, amount: "$ 100" },
            { id: 2, amount: "$ 200" },
            { id: 3, amount: "$ 300" },
            { id: 4, amount: "$ 500" },
            { id: 5, amount: "$ 1,000" },
            { id: 6, amount: "$ 2,000" },
            { id: 7, amount: "$ 4,000" },
            { id: 8, amount: "$ 8,000" },
            { id: 9, amount: "$ 16,000" },
            { id: 10, amount: "$ 32,000" },
            { id: 11, amount: "$ 64,000" },
            { id: 12, amount: "$ 125,000" },
            { id: 13, amount: "$ 250,000" },
            { id: 14, amount: "$ 500,000" },
            { id: 15, amount: "$ 1,000,000" },
          ].reverse(),
        []
  );

  const data = [
    {
      id: 1,
      question: "Rolex is a company that specializes in what type of product?",
      answers: [
        {
          text: "Phone",
          correct: false,
        },
        {
          text: "Watches",
          correct: true,
        },
        {
          text: "Food",
          correct: false,
        },
        {
          text: "Cosmetic",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "When did the website `Facebook` launch?",
      answers: [
        {
          text: "2004",
          correct: true,
        },
        {
          text: "2005",
          correct: false,
        },
        {
          text: "2006",
          correct: false,
        },
        {
          text: "2007",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "Who played the character of harry potter in movie?",
      answers: [
        {
          text: "Johnny Deep",
          correct: false,
        },
        {
          text: "Leonardo Di Caprio",
          correct: false,
        },
        {
          text: "Denzel Washington",
          correct: false,
        },
        {
          text: "Daniel Red Cliff",
          correct: true,
        },
      ],
    },
  ];

  useEffect(() => {
    questionNum > 1 
      && setEarned(moneyPyramid.find(money => money.id === questionNum - 1).amount)
  }, [moneyPyramid, questionNum])
    
  return (
    <>
      <div className="main">
      <h1 className="username">{username}</h1>
      {clock ? 
          <EndGame earned={earned}/> 
          : 
          (
            <>
              <div className="top">
                <Timer 
                  setClock={setClock}
                  questionNum={questionNum}/>
              </div>
              <div className="bottom">
                <Trivia 
                  data={data}
                  setClock={setClock}
                  questionNum={questionNum}
                  setQuestionNum={setQuestionNum}/>
              </div>            
            </>
         )}
      </div>
      <Pyramid questionNum={questionNum} moneyPyramid={moneyPyramid}/>
    </>
  )
}

export default GameBoard