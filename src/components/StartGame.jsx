import {useRef, useEffect} from 'react'
import useSound from 'use-sound'
import play from "../sounds/play.mp3"

function StartGame({setUsername}) {

    const inputRef = useRef()
    const [startPlaying] = useSound(play)

    const handleClick = () => {
        inputRef.current.value && setUsername(inputRef.current.value)
    }

    useEffect(() => {
        startPlaying()
      },[startPlaying])

    return (
        <div className="start">
            <div className="millioner"></div>
            <input 
                type="text" 
                className="startInput"
                placeholder='Enter your name:'
                ref={inputRef} />
            <button className="startButton" onClick={handleClick}>
                Start
            </button>    
        </div>
    )
}

export default StartGame