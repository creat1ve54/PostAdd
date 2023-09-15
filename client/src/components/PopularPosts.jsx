import React from 'react'
import { Link } from 'react-router-dom'
import './popularPosts.scss'

const PopularPosts = ({ post }) => {
    return (
        <div className='popularPosts'>
            <Link to={`${post.id}`} className='popularPosts__link'>
                {post.title}
            </Link>
        </div >
    )
}

export default PopularPosts