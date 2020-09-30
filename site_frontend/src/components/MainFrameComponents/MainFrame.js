import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import '../../css/main.css';

import Navbar from '../NavigationComponents/Navbar';
import BurgerMenu from '../NavigationComponents/BurgerMenu';
import Title from '../Title';
import Profile from '../Profile';
import Statistic from '../Statistic';
import Team from '../Team';
import Auth from '../AuthComponents/Auth';

import { autoLogin } from '../../actions/userActions';


class MainFrame extends React.Component{
    componentDidMount(){
        this.props.dispatch(autoLogin())
    }
    
    render(){
        return (
            <div className='container-fluid'>
                    <Navbar />
                    <BurgerMenu />
                <div className="row" id="mainframe">
                    <div className="col-12 p-0">
                        <Switch>
                            <Route exact path={'/'} component={Title} />
                            <Route path={'/profile'}  component={Profile} />
                            <Route path={'/team'} component={Team} />zz
                            <Route exact path={'/statistic'} component={Statistic} />
                            <Route path={'/auth'} component={Auth} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(MainFrame);


