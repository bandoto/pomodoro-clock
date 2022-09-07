import { useState, useEffect, useRef } from 'react'
import { getPadTime } from '../helpers/getPadTIme'
import SessionBreak from '../sessionBreak/SessionBreak'
import SessionLength from '../sessionLength/SessionLength'
import './appClock.scss'
import soundfile from '../sounds/src_sounds_default.mp3'

const AppClock = () => {
    
    const [sessionDefault, setSessionDefault] = useState(20)
    const [sessionLength, setSessionLength] = useState(20 * 60)
    const [breakLength, setBreakLength] = useState(5)
    const [timeMode, setTimeMode] = useState(true)
    const [isCounting, setIsCounting] = useState(false)
    const [isAnimate, setIsAnimate] = useState(false)

    const myAudio = useRef()
    const context = new AudioContext()

    let minutes = getPadTime(Math.floor(sessionLength / 60))
    let seconds = getPadTime(sessionLength % 60)

    useEffect(() => { 
        let timer;

        if (sessionLength >= 1) {
            timer = setInterval(() => {
                isCounting && setSessionLength(sessionLength - 1)
            }, 1000)
        }
        
        if (sessionLength === 0) {
            timer = setInterval(() => {
                isCounting && setSessionLength(sessionLength - 1)
            }, 1000)    
            myAudio.current.play()
            onSwitchMode()
        }
        
        return () => {
            clearInterval(timer)
        }

        // eslint-disable-next-line
    }, [sessionLength, sessionDefault, isCounting, myAudio])

    const onSwitchMode = () => {
        if (timeMode === true) {
            setTimeMode(false)
            setSessionLength(breakLength * 60)
        } else {
            setTimeMode(true)
            setSessionLength(sessionDefault * 60)
        }

        setIsAnimate(true)
        setTimeout(() => {
            setIsAnimate(false)
        }, 4000)
    }

    const onStartTimer = () => {
        setIsCounting(true)
        context.resume()
    }

    const onStopTimer = () => {
        setIsCounting(false)
    }

    const onResetTimer = () => {
        setIsCounting(false)
        setSessionDefault(20)
        setSessionLength(20 * 60)
        setBreakLength(5)
        setTimeMode(true)

        myAudio.current.pause()
        myAudio.current.currentTime = 0
    }

    return (

        <div className={'clock' + (isAnimate ? ' clock__shake' : '')}>
            <div className="clock__body">
                <div className="clock__timer timer">
                    <h1>Pomodoro clock</h1>
                    {timeMode ? <h2>Session</h2> : <h2>Break</h2>}
                    <div className="timer__time">
                        <span id='min'>{minutes}</span>
                        <span id='dots'>:</span>
                        <span id='sec'>{seconds}</span>
                    </div>
                    <div className="timer__buttons">
                        {isCounting ?
                        <button 
                            className='btn btn__start'
                            onClick={onStopTimer}
                            >Stop</button> : 
                        <button 
                            className='btn btn__start'
                            onClick={onStartTimer}
                            >Start</button>
                        }
                        <button 
                            className='btn btn__reset'
                            onClick={onResetTimer}
                            >Reset</button>
                    </div>
                </div>
                <div className="clock__settings settings">
                    <SessionLength 
                        sessionDefault={sessionDefault}
                        setSessionDefault={setSessionDefault}
                        setSessionLength={setSessionLength}
                    />
                    <SessionBreak
                        breakLength={breakLength}
                        setBreakLength={setBreakLength}
                    />
                </div>
            </div>

            <audio 
                src={soundfile}
                ref={myAudio}
                type='audio'
            >
            </audio>
        </div>
    );
};

export default AppClock