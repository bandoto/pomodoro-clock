
const SessionBreak = ({ setBreakLength, breakLength }) => {
    
    const incrementBreak = () => {
        if (breakLength < 60){
            setBreakLength(breakLength + 1);
        }
    }
    const decrementBreak = () => {
        if (breakLength > 1) {
            setBreakLength(breakLength - 1);
        }
    }

    return (
        <div className="settings__length">
            <h3>Break Length</h3>
            <span className='counter' onClick={decrementBreak}>-</span>
            <span>{breakLength} min</span>
            <span className='counter' onClick={incrementBreak}>+</span>
        </div>
    );
};

export default SessionBreak;