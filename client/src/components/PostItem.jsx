import React from 'react'
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import './postItem.scss'
import Moment from 'react-moment'
import { Link } from 'react-router-dom';


const PostItem = ({ post, userIncrement }) => {
    if (!post) {
        return (
            <div className='postItem__text--null'>
                Постов не существует.
            </div>
        )
    }
    return (
        <Link to={`/${post.id}`}>
            <div className='postItem'>
                {
                    post.imgUrl && <div className={
                        post.imgUrl ? 'postItem__image--visible' : 'postItem__image--invisible'
                    }>
                        <img src={`http://localhost:5000/${post?.imgUrl}`} alt='img' className='postItem__img' />
                    </div>
                }

                <div className='postItem__info info'>
                    <div className='info__username'>{post?.username}</div>
                    <div className='info__data'><Moment data={post?.createdAt} format='D MMM YYYY' /></div>
                </div>
                <div className='postItem__title'>{post?.title}</div>
                <p className='postItem__text'>{post?.text}</p>
                <div className='postItem__btn'>
                    <button className='postItem__btn--like'><AiFillEye /> <span>{post?.views}</span></button>
                    <button className='postItem__btn--comment'><AiOutlineMessage /> <span>{userIncrement?.message || 0}</span></button>
                </div>
            </div >
        </Link>
    )
}

export default PostItem