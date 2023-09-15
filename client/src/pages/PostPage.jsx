import React, { useCallback, useEffect, useState } from 'react'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import './postPage.scss'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { instance } from '../api/axios'
import { connect } from 'react-redux';
import { removePost } from '../redux/post-reducer';
import { toast } from 'react-toastify'
import { createComments, getComments } from '../redux/comment-reducer';
import CommentItem from '../components/CommentItem';
const uuid = require('uuid')

const PostPageContainer = (props) => {
  return (
    <PostPage user={props.user} userIncrement={props.userIncrement} comments={props.comments} removePost={props.removePost} createComments={props.createComments} getComments={props.getComments} />
  )
}

const PostPage = (props) => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')

  const navigate = useNavigate()
  const params = useParams();
  const id = params.id
  const { comments } = props
  const { userIncrement } = props

  const removePostHandler = () => {
    try {
      props.removePost(id)
      navigate('/posts')
      toast('Пост был удален')
    } catch (error) {
      console.log(error)
    }
  }
  const { user } = props
  const postId = id;

  const handleSubmit = () => {
    try {
      const userId = user.id
      props.createComments({ postId, comment, userId })
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }
  const { getComments } = props
  const fetchComments = useCallback(async () => {
    try {
      getComments(postId)
    } catch (error) {
      console.log(error)
    }
  }, [getComments, postId])

  const fetchPost = useCallback(async () => {
    const { data } = await instance.get(`/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])


  return (
    <div className='postPage'>
      <button className='postPage__button'>
        <Link to={'/'}>Назад</Link>
      </button>
      <div className='postPage__flex'>
        <div className='postPage__content'>
          {
            post?.imgUrl && <div className={
              post.imgUrl ? 'postPage__image--visible' : 'postPage__image--invisible'
            }>
              <img src={`http://localhost:5000/${post.imgUrl}`} alt='img' className='postPage__img' />
            </div>
          }
          <div className='postPage__info info'>
            <div className='info__username'>{post?.username}</div>
            <div className='info__data'><Moment data={post?.createdAt} format='D MMM YYYY' /></div>
          </div>
          <div className='postPage__title'>{post?.title}</div>
          <p className='postPage__text'>{post?.text}</p>
          <div className='postPage__btn'>
            <div className='postPage__btn--one'>
              <button className='postPage__btn--like'><AiFillEye /> <span>{post?.views}</span></button>
              <button className='postPage__btn--comment'><AiOutlineMessage /> <span>{userIncrement?.message || 0}</span></button>
            </div>

            {
              user?.id === post?.userId && (
                <div className='postPage__btn--two'>
                  <button className='postPage__btn--edit'><Link to={`/${params.id}/edit`}><AiTwotoneEdit /></Link></button>
                  <button onClick={removePostHandler} className='postPage__btn--delete'><AiFillDelete /> </button>
                </div>
              )
            }
          </div>
        </div>
        <div className='postPage__comments comments'>
          <form className='comments__form' onSubmit={e => e.preventDefault()}>
            <input value={comment} onChange={e => setComment(e.target.value)} className='comments__text' type="text" placeholder='Comment' />
            <button onClick={handleSubmit} className='comments__btn' type='submit'>Отправить</button>
          </form>
          {

            comments?.map((comment) => <CommentItem key={uuid.v4()} comment={comment.comment} user={user} />)
          }
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.authPage.user,
    comments: state.commentPage.comments,
    userIncrement: state.commentPage.userIncrement
  }
}


export default connect(mapStateToProps, { removePost, createComments, getComments })(PostPageContainer)