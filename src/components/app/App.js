import './app.scss'
import AppClock from '../appClock/AppClock'

import {BsGithub} from 'react-icons/bs'

const App = () => {
    return (
        <div className="main">
            <AppClock />
            <a href="https://github.com/bandoto" target="_blank" rel="noreferrer">
                <BsGithub size={50} className='git-icon' />    
            </a>
        </div>
    );
};

export default App