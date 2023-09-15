import React from 'react'
import './navbar.scss'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { checkIsAuth, logout } from '../redux/auth-reducer';
import { toast } from 'react-toastify';



const NavbarContainer = (props) => {
    return (
        <>
            <Navbar logout={props.logout} token={props.token} />
        </>
    )
}


const Navbar = (props) => {
    const navigate = useNavigate()
    const onLogout = () => {
        props.logout()
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
        navigate('/')
    }
    let isAuth = checkIsAuth(localStorage.token);
    const activeStyles = {
        color: 'white',
    }
    return (
        <div className='navbar'>
            <Link to={'/'} className='navbar__logo'>E</Link>
            {
                isAuth && (
                    <ul className='navbar__list'>
                        <li className='navbar__item'><NavLink style={({ isActive }) => isActive ? activeStyles : undefined} to="/" className='navbar__link'>Главная</NavLink></li>
                        <li className='navbar__item'><NavLink style={({ isActive }) => isActive ? activeStyles : undefined} to="/posts" className='navbar__link'>Мои посты</NavLink></li>
                        <li className='navbar__item'><NavLink style={({ isActive }) => isActive ? activeStyles : undefined} to="/new" className='navbar__link'>Добавить пост</NavLink></li>
                    </ul>
                )
            }
            <div className='navbar__auth'>
                {
                    isAuth ?
                        <button onClick={onLogout} className='navbar__btn'>Выйти</button>
                        :
                        <Link to="/login" className='navbar__btn'>Войти</Link>
                }
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        token: state.authPage.token
    }
}

export default connect(mapStateToProps, { logout })(NavbarContainer)