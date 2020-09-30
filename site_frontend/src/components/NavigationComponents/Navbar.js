import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logUserOut } from '../../actions/userActions';


const Navbar = (props) => {
    const handleClick = () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        props.dispatch(logUserOut())
    }

    return(
            <nav className="navbar navbar-expand-md navbar-dark bg-dark d-none d-sm-block">
                <div className="navbar-collapse collapse w-100 order-1 order-md-20 dual-collapse2">
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <Link id='main' className='menu-item nav-link' to={'/'}>Главная</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='profile' className='menu-item nav-link' to={'/profile'}>Профиль</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='team' className='menu-item nav-link' to={'/team'}>Команда</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='create-game' className='menu-item nav-link' to={'/create-game'}>Создать игру</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='prev-games' className='menu-item nav-link' to={'/prev-games'}>Прошедшие игры</Link>
                        </li>
                        <li className="nav-item">
                            <Link id='statistic' className='menu-item nav-link' to={'/statistic'}>Статистика</Link>
                        </li>
                        <li className="nav-item">
                            <a className='menu-item nav-link' href='/tutorial'>Обучение</a>
                        </li>
                    </ul>

                    <ul className="navbar-nav">
                        {
                        props.userReducer.loggedIn ? 
                            <a id='logout' className='menu-item nav-link' onClick={handleClick}>Выйти</a>
                            :
                            <li className="nav-item">
                                <Link id='login' className='menu-item nav-link' to={'/auth'}>Вход/Регистрация</Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav>
    )
}


function mapStateToProps(state){
    return {
        userReducer: state.userReducer
    }
}


export default connect(mapStateToProps)(Navbar)