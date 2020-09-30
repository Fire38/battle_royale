import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logUserOut } from '../../actions/userActions';

import { slide as Menu } from 'react-burger-menu';
import '../../css/burger.css';


const BurgerMenu = (props) =>{
    const handleClick = () =>{
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        props.dispatch(logUserOut())
    }

    return (
        <div className='row m-0'>
            <div className='col-12 p-0 d-sm-none d-block' id='navbar'>
                <Menu 
                    right 
                    width={'65%'} 
                    customCrossIcon={false}>
                        <Link id='main' className='menu-item' to={'/'}>Главная</Link>
                        <Link id='profile' className='menu-item' to={'/profile'}>Профиль</Link>
                        <Link id='team' className='menu-item' to={'/team'}>Команда</Link>
                        <Link id='statistic' className='menu-item' to={'/statistic'}>Статистика</Link>
                        <a id='tutorial' className='menu-item' href='/tutorial'>Обучение</a>

                        { props.userReducer.loggedIn ? 
                            <a id='logout' className='menu-item' onClick={handleClick}>Выйти</a>
                            :
                            <Link id='login' className='menu-item' to={'/auth'}>Вход/Регистрация</Link>
                        }
                </Menu>
            </div>
        </div>
    )
}


function mapStateToProps(state){
    return {
        userReducer: state.userReducer
    }
}

export default connect(mapStateToProps)(BurgerMenu);

