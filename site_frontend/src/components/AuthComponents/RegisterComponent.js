import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/userActions';


class RegisterComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
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
        this.props.dispatch(registerUser(this.state))
    }

    render(){
        return(
            <div className='row mr-0 ml-0'>
                <div className='col-md-2 col-12'>
                    <form onSubmit={this.handleSubmit}>
                        <div className='form-group'>
                            <h2 className='text-center'>Регистрация</h2>
                            <input
                                className='form-control' 
                                type='text'
                                name='username'
                                placeholder='Введите никнейм'
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <input
                                className='form-control' 
                                type='password'
                                name='password'
                                placeholder='Введите пароль'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <input className='btn btn-primary col-12' type='submit' value='Зарегистрироваться' />
                        </div>
                    </form>
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

export default connect(mapStateToProps)(RegisterComponent)