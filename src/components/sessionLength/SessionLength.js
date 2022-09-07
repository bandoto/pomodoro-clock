
const SessionLength = ({ sessionDefault, setSessionDefault, setSessionLength }) => {
    
    const incrementSession = () => {
        if (sessionDefault < 60){
            setSessionDefault(sessionDefault + 1)
            setSessionLength((sessionDefault + 1) * 60);
        }
      }
    const decrementSession = () => {
        if (sessionDefault > 1) {
            setSessionDefault(sessionDefault - 1)
            setSessionLength((sessionDefault - 1) * 60);
        }
    }

    return (
        <div className="settings__session">
            <h3>Session Length</h3>
            <span className='counter' onClick={decrementSession}>-</span>
            <span>{sessionDefault} min</span>
            <span className='counter' onClick={incrementSession}>+</span>
        </div>
    );
};

export default SessionLength;