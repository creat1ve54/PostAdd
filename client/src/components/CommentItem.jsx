import React from 'react'
import './commentItem.scss'

const CommentItem = ({ comment, user }) => {
    return (
        <div className='comment'>
            <div className='comment__image'>
                {user?.username.slice(0, 2)}
            </div>
            <div className='comment__text'> {comment}</div>
        </div>
    )
}

export default CommentItem