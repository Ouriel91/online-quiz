import React, {useState} from 'react'
import useSound from 'use-sound'
import correct from "../sounds/correct.mp3"
import wrong from "../sounds/wrong.mp3"

function Answers({answers, setQuestionNum, setClock}) {
    const [selectedAns, setSelectedAns] = useState(null)
    const [selectedClass, setSelectedClass] = useState("answer")
    const [isFiftyFifty, setIsFiftyFifty] = useState(false)
    const [fiftyFiftyAnswers, setFiftyFiftyAnswers] = useState([])

    const [correctSound] = useSound(correct)
    const [wrongSound] = useSound(wrong)

    const handleClick = (answer) => {
        setSelectedAns(answer);
        setSelectedClass("answer active");

        delay(3000, () => {
            setSelectedClass(answer.correct ? "answer correct" : "answer wrong");
        });
    
        delay(5000, () => {
        if (answer.correct) {
            correctSound()
            delay(1000, () => {
                setQuestionNum((prev) => prev + 1)
                setSelectedAns(null)
            });
            
        } else {
            wrongSound()
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

    const handleFiftyFifty = (answers) => {

        if(!isFiftyFifty){
            return answers
        }

        let halfAnswers = []
        
        for (let i = 0; i < answers.length; i++) {
            if(answers[i].correct === true){
                halfAnswers.push(answers[i].text)
            }
        }

        while(halfAnswers.length === 1){
            let randomIndex = Math.floor(Math.random() * answers.length)
            if(answers[randomIndex].correct === false){
                halfAnswers.push(answers[randomIndex].text)
            }
        }

        setFiftyFiftyAnswers(halfAnswers)

    }

    return (
        <>
            {/* <button 
                onClick={() => setIsFiftyFifty(true)}
                disabled={isFiftyFifty}>
                    50:50
            </button> */}
            {answers.map(answersItems => 
            (
                <div 
                    className={selectedAns === answersItems ? selectedClass : "answer"}
                    key={answersItems.text}
                    onClick={() => !selectedAns && handleClick(answersItems)}>
                    {answersItems.text}
                </div>
            ))}
        </>
    )
}

export default Answers