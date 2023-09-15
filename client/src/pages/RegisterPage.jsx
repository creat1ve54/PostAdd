import React, { useState, useEffect } from 'react'
import './registerPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkIsAuth, registerUser } from '../redux/auth-reducer'
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form";


const RegisterPageContainer = (props) => {
  return (
    <>
      <RegisterPage status={props.status} registerUser={props.registerUser} />
    </>
  )
}

const RegisterPage = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  let isAuth = checkIsAuth(localStorage.token);

  const { register, handleSubmit, formState: { errors } } = useForm();


  useEffect(() => {
    if (props.status) {
      toast(props.status)
    }
    if (isAuth) navigate('/')
  }, [props.status, isAuth, navigate])


  const onSubmit = () => {
    try {
      props.registerUser(username, password)
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='register' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='register__title'>Регистрация</h1>
      <label className='register__name'>
        Username:
        <input {...register('username', { required: true, maxLength: 20 })} onChange={e => setUsername(e.target.value)} value={username} type='text' placeholder='Username' className='register__input'></input>
        {errors.username?.type === 'required' ? <div style={{ color: 'red', marginTop: '5px' }}>Поле username не должно быть пустое</div> : (errors.username?.type === 'maxLength' && <div style={{ color: 'red', marginTop: '5px' }}>Поле username должно содержать меньше 20 символов</div>)}
      </label>
      <label className='register__name'>
        Password:
        <input {...register('password', { required: true, minLength: 5 })} onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='Password' className='register__input'></input>
        {errors.password?.type === 'required' ? <div style={{ color: 'red', marginTop: '5px' }}>Поле password не должно быть пустое</div> : (errors.password?.type === 'minLength' && <div style={{ color: 'red', marginTop: '5px' }}>Поле password должно содержать больше 5 символов</div>)}
      </label>
      <div className='register__btn'>
        <button type='submit' className='register__submit'>Создать аккаунт</button>
        <Link to='/login' className='register__register'>Уже зарегистрированы?</Link>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    status: state.authPage.status
  }
}

export default connect(mapStateToProps, { registerUser })(RegisterPageContainer)