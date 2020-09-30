import React from 'react';
import axiosInstance from '../../axiosApi';


class InviteItem extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event){
        event.preventDefault();
        const res = await axiosInstance.post('api/core/accept-invite-to-team/',{
            'team_id': this.props.invite['invite_from']
        })
        console.log('сработал')
    }

    render(){
        console.log(this.props)
        return(
            <tr>
                <td>
                    <b>{ this.props.invite['invite_from_name'] }</b>
                </td>
                <td>
                    <button className='btn btn-primary' type='submit' value={this.props.invite['invite_from']} onClick={this.handleSubmit}>Принять</button>
                </td>
            </tr>
        )
    }
}

export default InviteItem