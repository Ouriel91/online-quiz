import {useState, useEffect} from 'react'
import useSound from 'use-sound'
import correct from "../sounds/correct.mp3"
import wrong from "../sounds/wrong.mp3"

function Trivia({data, setClock, questionNum, setQuestionNum}) {

  const [trivia, setTrivia] = useState(null)
  const [selectedAns, setSelectedAns] = useState(null)
  const [selectedClass, setSelectedClass] = useState("answer")

  const [correctSound] = useSound(correct)
  const [wrongSound] = useSound(wrong)

  useEffect(() => { 
    setTrivia(data[questionNum - 1]);
  }, [data, questionNum])

  const handleClick = (answer) => {
    setSelectedAns(answer);
    setSelectedClass("answer active");

    delay(3000, () => {
      setSelectedClass(answer.correct ? "answer correct" : "answer wrong");
    });
   
    delay(5000, () => {
      if (answer.correct) {
        //correctSound()
        delay(1000, () => {
          setQuestionNum((prev) => prev + 1)
          setSelectedAns(null)
        });
        
      } else {
        //wrongSound()
        delay(1000, () => {
          setClock(true)
        });
      }
      })
  };

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback()
    }, duration)
  }

  return (
    <div className="trivia">
        <div className="question">
           {trivia ? trivia.question : null}
        </div>
        <div className="answers">
            {trivia ? 
              trivia.answers.map(answersItems => (  
                <div 
                  className={selectedAns === answersItems ? selectedClass : "answer"}
                  key={answersItems.text}
                  onClick={() => !selectedAns && handleClick(answersItems)}>
                    {answersItems.text}
                </div>
              )) 
              : null}
        </div>
    </div>
  )
}

export default Trivia