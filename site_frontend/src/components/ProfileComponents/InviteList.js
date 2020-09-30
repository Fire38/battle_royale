import React from 'react';
import { connect } from 'react-redux';

import InviteItem from '../ProfileComponents/Invite';


class InviteList extends React.Component{

    
    render(){
        let invities = this.props.userReducer.user.data.invities
        if (invities.length === 0){
            return(
                <h3>У вас нет приглашений</h3>
            )
        } else{
            return(
                <div className='row mr-0 ml-0'>
                    <div className='col-md-5 col-12'>
                        <h3 className='text-center'>Список приглашений</h3>
                        <table className="table table-borderless" id='invite-table'>
                            <tbody>
                                { Object.keys(invities).map((key, index) =>{
                                    return(
                                        <InviteItem key={key} invite={invities[index]}/>
                                    )
                                }) }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    }
}


function mapStateToProps(state){
    return{
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(InviteList)