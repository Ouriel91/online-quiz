import {useState, useEffect} from 'react'

function Timer({setClock, questionNum}) {

    const[timer, setTimer] = useState(30)

    useEffect(() => {
        
        if(timer === 0) {
            setClock(true)
        }

        const interval = setInterval(() => {
            setTimer(prevState => prevState - 1)
        },1000)   

        return () => {clearInterval(interval)}
    },[timer, setTimer])

    useEffect(() => {
        setTimer(30)
    },[questionNum])
    
    return (
        <div className="timer">{timer}</div>
    )
}

export default Timer