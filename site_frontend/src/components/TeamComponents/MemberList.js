import React from 'react';
import { connect } from 'react-redux';

import { getTeam } from '../../actions/teamActions';


class MembersList extends React.Component{
    componentDidMount(){
        this.props.dispatch(getTeam())
    }

    render(){
        return(
            <div className='ml-3'>
                <h3>{this.props.team.name}</h3>
                <ul>
                    {this.props.team.members.map((member) => {
                        if (member.captain){
                            return (
                                <li key={member.id}><b>{member.username}(c)</b> - id{member.id}</li>
                            )
                        } else{
                            return (
                                <li key={member.id}>{member.username} - id{member.id}</li>
                            )
                        }
                    }
                    )}
                </ul>
            </div>
        )
    }
}




function mapStateToProps(state){
    return {
        teamReducer: state.teamReducer
    }
}

export default connect(mapStateToProps)(MembersList);