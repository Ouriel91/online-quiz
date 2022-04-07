import {useMemo, useState, useEffect} from "react"
import Pyramid from './Pyramid'
import Trivia from './Trivia'
import Timer from './Timer'
import EndGame from './EndGame'

function GameBoard({resetGame,username}) {

    const [questionNum, setQuestionNum] = useState(1)
    const [clock, setClock] = useState(false)
    const [earned, setEarned] = useState(0)
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
        const question = unescapeHTML(rawData[i].question)
        const correctAnswer = rawData[i].correct_answer

        const answers = []

        answers.push({
            text: correctAnswer, 
            correct: true
        })

        for(let j = 0; j < rawData[i].incorrect_answers.length; j++){
          answers.push({
            text: rawData[i].incorrect_answers[j], correct: false
          })
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
            { id: 1, amount: 100},
            { id: 2, amount: 200},
            { id: 3, amount: 300},
            { id: 4, amount: 500},
            { id: 5, amount:  1000 },
            { id: 6, amount:  2000 },
            { id: 7, amount:  4000 },
            { id: 8, amount:  8000 },
            { id: 9, amount:  16000 },
            { id: 10, amount:  32000 },
            { id: 11, amount:  64000 },
            { id: 12, amount:  125000 },
            { id: 13, amount:  250000 },
            { id: 14, amount:  500000 },
            { id: 15, amount:  1000000 },
          ].reverse(),
        []
  );

  const unescapeHTML = (input) => {
    return input.replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
  }


  useEffect(() => {
    questionNum > 1 
      && setEarned(moneyPyramid.find(money => money.id === questionNum - 1).amount)
  }, [moneyPyramid, questionNum])
    
  return (
    <>
      <div className="main">
      <h1 className="username">{username}</h1>
      {(clock || earned === 1000000) ? 
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