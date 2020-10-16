import React from 'react';
import SocketIndicator from './StatusBarComponents/SocketIndicator';
import Level from './StatusBarComponents/Level';
import LevelTimer from './StatusBarComponents/LevelTimer';


class StatusBar extends React.Component{
    render(){
        return(
            <div className='row' id='statusBar'>
                <SocketIndicator/>
                <Level/>
                <LevelTimer/>
            </div>
        )
    }

}

export default StatusBar;