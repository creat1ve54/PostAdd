import React, { useState } from 'react'
import './addPost.scss'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/post-reducer'


const addPostContainer = (props) => {
  return (
    <>
      <AddPostPage createPost={props.createPost} />
    </>
  )
}

const AddPostPage = (props) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')

  const navigate = useNavigate()


  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      props.createPost(data)
      setTimeout(function () {
        navigate('/')
      }, 100)
    } catch (error) {
      console.log(error)
    }
  }


  const clearFormHandler = () => {
    setText('')
    setTitle('')
    setImage('')
  }

  return (
    <form className='post' onSubmit={e => e.preventDefault()}>
      <label className='post__label'>
        Прикрепите изображение:
        <input type='file' className='post__input--file' onChange={e => setImage(e.target.files[0])} />
      </label>
      {image && (
        <div className='post__image'>
          <img className='post__img' src={URL.createObjectURL(image)} alt='Img' />
        </div>
      )}
      <label className='post__title'>
        Заголовок поста:
        <div className='post__input--text'>
          <input type='text' placeholder='Заголовок' value={title} onChange={e => setTitle(e.target.value)} />
        </div>
      </label>
      <label className='post__title'>
        Текст поста:
        <div className='post__input--text'>
          <textarea placeholder='Текст поста' onChange={e => setText(e.target.value)} value={text}></textarea>
        </div>
      </label>
      <div className='post__button'>
        <button onClick={submitHandler} className='post__btn post__btn--add'>Добавить</button>
        <button onClick={clearFormHandler} className='post__btn post__btn--cancel'>Отменить</button>
      </div>
    </form >
  )
}



// const mapStateToProps = (state) => {
//   return {
//   }
// }

export default connect(null, { createPost })(addPostContainer)