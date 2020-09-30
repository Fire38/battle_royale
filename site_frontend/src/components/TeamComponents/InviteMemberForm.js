import React from 'react';
import { connect } from 'react-redux';

import { inviteMember } from '../../actions/teamActions';


class InviteMemberForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        this.props.dispatch(inviteMember(this.state.id))
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        name='id'
                        placeholder='Введите id игрока'
                        value={this.state.id}
                        onChange={this.handleChange}
                    />
                    <input className='btn btn-primary' type='submit' value='Пригласить' />
                </div>
            </form>
        )
    }
}


function mapStateToProps(state){
    return {
        teamReducer: state.teamReducer
    }
}

export default connect(mapStateToProps)(InviteMemberForm);