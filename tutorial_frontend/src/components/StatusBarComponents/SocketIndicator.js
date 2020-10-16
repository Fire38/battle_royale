import React from 'react';
import { connect } from 'react-redux';


class SocketIndicator extends React.Component{
    render(){
        const indicator = this.props.socketReducer.connected
        return(
            <div className='col-sm-2'>
                <span className="dot align-middle" style={{'backgroundColor':  indicator ? 'green' : 'red'}}></span>
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return{
        socketReducer: state.socketReducer
    }
}


export default connect(mapStateToProps)(SocketIndicator);