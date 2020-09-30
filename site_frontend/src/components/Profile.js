import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { autoLogin } from '../actions/userActions';

import InviteList from './ProfileComponents/InviteList';


class Profile extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.dispatch(autoLogin())
    }


    render(){
        return(
            <div>
                { this.props.userReducer.loggedIn ? <InviteList /> : <p className='m-2'>Пожалуйста <Link to={'/auth'}>авторизируйтесь</Link></p> }
            </div>
        )
    }
}




function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(Profile)