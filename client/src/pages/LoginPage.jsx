import React, { useEffect, useState } from 'react'
import './loginPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/auth-reducer'
import { toast } from 'react-toastify'


const LoginPageContainer = (props) => {
  return (
    <>
      <LoginPage status={props.status} loginUser={props.loginUser} />
    </>
  )
}


const LoginPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  let isAuth = checkIsAuth(localStorage.token);


  useEffect(() => {
    if (props.status) {
      toast(props.status)
    }
    if (isAuth) navigate('/')
  }, [props.status, isAuth, navigate])

  const handleSubmit = () => {
    try {
      props.loginUser(username, password)
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form className='login' onSubmit={e => e.preventDefault()}>
      <h1 className='login__title'>Авторизация</h1>
      <label className='login__name'>
        Usename:
        <input onChange={e => setUsername(e.target.value)} value={username} type='text' placeholder='Username' className='login__input'></input>
      </label>
      <label className='login__name'>
        Password:
        <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' className='login__input'></input>
      </label>
      <div className='login__btn'>
        <button onClick={handleSubmit} type='submit' className='login__submit'>Войти</button>
        <Link to='/register' className='login__register'>Нет аккаунта?</Link>
      </div>
    </form>
  )
}





const mapStateToProps = (state) => {
  return {
    status: state.authPage.status
  }
}


export default connect(mapStateToProps, { loginUser })(LoginPageContainer)