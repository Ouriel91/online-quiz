import {useMemo, useState, useEffect} from "react"
import Pyramid from './Pyramid'
import Trivia from './Trivia'
import Timer from './Timer'
import EndGame from './EndGame'

function GameBoard({resetGame,username}) {

    const [questionNum, setQuestionNum] = useState(1)
    const [clock, setClock] = useState(false)
    const [earned, setEarned] = useState("$ 0")
    const [data, setData] = useState([])

    useEffect(() => {
      getData()
    },[])

    const getData = async() => {
      const response = await fetch("https://opentdb.com/api.php?amount=100")
      const dataObj = await response.json()

      const rawData = dataObj.results
      const updateData = []

      for (let i = 0; i < rawData.length; i++) {
        const id = i + 1
        const question = rawData[i].question
        const correctAnswer = rawData[i].correct_answer
        const answers = []
        answers.push({text: correctAnswer, correct: true})
        for(let j = 0; j < rawData[i].incorrect_answers.length; j++){
          answers.push({text: rawData[i].incorrect_answers[j], correct: false})
        }

        const finalObj = {
          id: id,
          question: question,
          answers: answers
        }

        updateData.push(finalObj)
      }

      setData(updateData)
    }

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


  useEffect(() => {
    questionNum > 1 
      && setEarned(moneyPyramid.find(money => money.id === questionNum - 1).amount)
  }, [moneyPyramid, questionNum])
    
  return (
    <>
      <div className="main">
      <h1 className="username">{username}</h1>
      {clock ? 
          <EndGame resetGame={resetGame} earned={earned}/> 
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