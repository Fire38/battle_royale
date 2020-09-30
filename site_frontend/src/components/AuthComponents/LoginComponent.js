import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions/userActions';


class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
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
        this.props.dispatch(fetchUser(this.state))
    }

    render(){
        return(
            <div className='row mr-0 ml-0'>
                <div className='col-md-2 col-12'>
                    <form onSubmit={this.handleSubmit}>
                    { this.props.userReducer.error ? <h3>Ошибка авторизации. { this.props.userReducer.errorMessage}</h3> : ''}
                        <div className='form-group'>
                            <h2 className='text-center'>Вход</h2>
                            <input
                                className='form-control' 
                                type='text' 
                                name='username'
                                placeholder='Логин'
                                value={this.state.username}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <input
                                className='form-control' 
                                type='password'
                                name='password'
                                placeholder='Пароль'
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            <br/>
                            <input className='btn btn-outline-primary col-12' type='submit' value='Войти'/>
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

export default connect(mapStateToProps)(LoginComponent)