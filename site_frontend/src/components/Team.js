import React from 'react';
import { connect } from 'react-redux';
import { Link, Switch, Route } from 'react-router-dom';

import { getTeam } from '../actions/teamActions';

import MembersList from '../components/TeamComponents/MemberList';
import TeamManager from '../components/TeamComponents/TeamManager';



class Team extends React.Component{
    constructor(props){
        super(props)

    }
    
    componentDidMount(){
        this.props.dispatch(getTeam())
    }



    render(){
        if (!this.props.teamReducer.team.id || !this.props.userReducer.loggedIn){
            return(
                <span>Вы не в команде. Создайте свою.</span>
            )
        }else{
            return (
                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb" id='login-breadcrumb'>
                            <li className="breadcrumb-item active" aria-current="page">
                                <Link to={'/team'}>Команда</Link>
                            </li>
                            <li className="breadcrumb-item" aria-current="page">
                                <Link to={'/team/manage'}>Управление</Link>
                            </li>
                        </ol>
                    </nav>
                    <Switch>
                        <Route exact path={'/team'} render={(props) => <MembersList team={this.props.teamReducer.team}/>} 
                        />
                        <Route  path={'/my-team'} render={(props) => <MembersList team={this.props.teamReducer.team} />}
                         />
                        <Route path={'/team/manage'} component={TeamManager} />
                    </Switch>
                </div>
            )
        }


    }
}


function mapStateToProps(state){
    return{
        teamReducer: state.teamReducer,
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(Team);