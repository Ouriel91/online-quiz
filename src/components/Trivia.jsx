import {useState, useEffect} from 'react'
import Answers from './Answers'

function Trivia({data, setClock, questionNum, setQuestionNum}) {

  const [trivia, setTrivia] = useState(null)
  const [usedFiftyFifty, setUsedFiftyFifty] = useState(false)

  useEffect(() => { 
    setTrivia(data[questionNum - 1]);
  }, [data, questionNum])


  const shuffleAnswers = (answers) => {

    let index = answers.length, randomIndex

    while(index !== 0) {
      randomIndex = Math.floor((Math.random()) * index)
      index--

      [[answers[index], answers[randomIndex]]] = [[answers[randomIndex], answers[index]]]
    }

    return answers
  }

  return (
    <div className="trivia">
        <div className="question">
           {trivia ? trivia.question : null}
        </div>
        <div className="answers">
            {trivia ? 
              <Answers 
                answers={shuffleAnswers(trivia.answers)}
                setQuestionNum={setQuestionNum}
                setClock={setClock}
                usedFiftyFifty={usedFiftyFifty}
                setUsedFiftyFifty={setUsedFiftyFifty} />
              : null}
        </div>
    </div>
  )
}

export default Trivia