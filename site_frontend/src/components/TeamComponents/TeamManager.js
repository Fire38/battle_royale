import React from 'react';
import { connect } from 'react-redux';

import InviteMemberForm from './InviteMemberForm';
import RemoveMemberForm from './RemoveMemberForm';
import AsignCaptainForm from './AssignCaptainForm';


class TeamManager extends React.Component{
    render(){
        return(
            <div>
                { this.props.teamReducer.error ? <h3>Ошибка. { this.props.teamReducer.errorMessage }</h3> : ''}
                <InviteMemberForm />
                <RemoveMemberForm />
                <AsignCaptainForm />
            </div>
        )
    }
}


function mapStateToProps(state){
    return {
        teamReducer: state.teamReducer
    }
}
export default connect(mapStateToProps)(TeamManager);