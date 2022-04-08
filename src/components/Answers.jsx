import React, {useState} from 'react'
import useSound from 'use-sound'
import correct from "../sounds/correct.mp3"
import wrong from "../sounds/wrong.mp3"

function Answers({answers, setQuestionNum, setClock, usedFiftyFifty ,setUsedFiftyFifty}) {
    const [selectedAns, setSelectedAns] = useState(null)
    const [selectedClass, setSelectedClass] = useState("answer")
    const [fiftyFiftyAnswers, setFiftyFiftyAnswers] = useState([])

    const [correctSound] = useSound(correct)
    const [wrongSound] = useSound(wrong)

    const handleClick = (answer) => {

        console.log("ffa",fiftyFiftyAnswers)
        if(fiftyFiftyAnswers.length > 0 && !fiftyFiftyAnswers.includes(answer.text)) {
            return
        }

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
                setFiftyFiftyAnswers([])
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
        setUsedFiftyFifty(true)
    }

    console.log(answers)

    const textRender = (answersItems) => {
    
        if(fiftyFiftyAnswers.length === 0 || fiftyFiftyAnswers.includes(answersItems.text)) {
            return answersItems.text
        }

        return null
    }

    return (
        <>
            <button 
                onClick={() => handleFiftyFifty(answers)}
                disabled={usedFiftyFifty}>
                    50:50
            </button>
            {answers.map(answersItems => 
            (
                <div 
                    className={selectedAns === answersItems ? selectedClass : "answer"}
                    key={answersItems.text}
                    onClick={() => !selectedAns && handleClick(answersItems)}>
                    {textRender(answersItems)} 
                </div>
            ))}
        </>
    )
}

export default Answers