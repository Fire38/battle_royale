import React, { Component } from 'react';
import { connect } from 'react-redux';


import {socketConnect, socketDisconnect, socketMessageSending} from '../actions/socketActions';

import '../css/bootstrap.min.css'
import '../css/custom.css'

import DemoCords from './Coords';
import StatusBar from './StatusBar'
import { autoLogin } from '../actions/userActions';



class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            dataSocket: ''
        }
        this.handleDisconnect = this.handleDisconnect.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        this.props.dispatch(socketConnect())
    }

    handleDisconnect(){
        this.props.dispatch(socketDisconnect())
    }

    handleChange(event){
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(){
        this.props.dispatch(socketMessageSending(JSON.stringify({'test': this.state.dataSocket})))
    }

    render(){
        const { connected, message } = this.props.socketReducer

        return(
            <div className='container-fluid'>
                <StatusBar/>
                <h1>Сокет соединен {message}</h1><span style={{'backgroundColor': connected  ? 'green':'red'}}>fsdfe</span>
                <button onClick={this.handleDisconnect}>Отключить</button>
                <br/>
                <input type='text'
                    name='dataSocket' 
                    value={this.state.dataSocket}
                    onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Отправить</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        socketReducer: state.socketReducer
    }
}

export default connect(mapStateToProps)(App);