import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { instance } from '../api/axios'
import { updatePost } from '../redux/post-reducer'


const EditPostContainer = (props) => {
  return (
    <>
      <EditPostPage updatePost={props.updatePost} />
    </>
  )
}


const EditPostPage = (props) => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [oldImage, setOldImage] = useState('')
  const [newImage, setNewImage] = useState('')

  const params = useParams();

  const navigate = useNavigate()

  const fetchPost = useCallback(async () => {
    const { data } = await instance.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  const submitHandler = () => {
    try {
      const updatedPost = new FormData()
      updatedPost.append('title', title)
      updatedPost.append('text', text)
      updatedPost.append('id', params.id)
      updatedPost.append('image', newImage)
      props.updatePost(updatedPost, params.id)
      setTimeout(function () {
        navigate('/posts')
      }, 200)
    } catch (error) {
      console.log(error)
    }
  }

  const clearFormHandler = () => {
    setTitle('')
    setText('')
    setOldImage('')
    setNewImage('')
  }


  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  return (
    <form className='post' onSubmit={e => e.preventDefault()}>
      <label className='post__label'>
        Прикрепите изображение:
        <input type='file' className='post__input--file' onChange={e => {
          setNewImage(e.target.files[0])
          setOldImage('')
        }} />
      </label>
      {oldImage && (
        <div className='post__image'>
          <img className='post__img' src={`http://localhost:5000/${oldImage}`} alt='Img' />
        </div>
      )}
      {newImage && (
        <div className='post__image'>
          <img className='post__img' src={URL.createObjectURL(newImage)} alt='Img' />
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
        <button onClick={submitHandler} className='post__btn post__btn--add'>Обновить</button>
        <button onClick={clearFormHandler} className='post__btn post__btn--cancel'>Отменить</button>
      </div>
    </form >
  )
}

// const mapStateToProps = (state) => {
//   return {

//   }
// }

export default connect(null, { updatePost })(EditPostContainer)