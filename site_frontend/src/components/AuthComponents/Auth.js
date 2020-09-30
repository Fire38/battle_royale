import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';


class Auth extends React.Component{
    render(){
        return(
            <div className='container-fluid p-0'>
                <div className='row mr-0'>
                    <div className='col-12 p-0'>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb" id='login-breadcrumb'>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to={'/auth/login'}>Логин</Link>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                <Link to={'/auth/register'}>Регистрация</Link>
                            </li>
                        </ol>
                        </nav>
                        <Switch>
                            <Route  exact path={'/auth'} render={(props) => (
                                !this.props.userReducer.loggedIn ? <LoginComponent /> : <Redirect to='/' />
                            )} />
                            <Route  path={'/auth/login'} render={(props) => (
                                !this.props.userReducer.loggedIn ? <LoginComponent /> : <Redirect to='/' />
                            )} />
                            <Route path={'/auth/register'} render={(props) => (
                                !this.props.userReducer.loggedIn ? <RegisterComponent /> : <Redirect to='/' />
                            )} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(Auth);
