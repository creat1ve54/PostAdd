import React, { useCallback, useEffect, useState } from 'react'
import { instance } from '../api/axios'
import PostItem from '../components/PostItem'
import './postsPage.scss'

const PostsPage = () => {
  const [posts, setPosts] = useState([])


  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await instance.get('/posts/user/me')
      setPosts(data)
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    fetchMyPosts()
  }, [fetchMyPosts])


  if (posts.length === 0) {
    return (
      <div className='postPage__text--null'>
        У вас пока нет постов.
      </div>
    )
  }
  return (
    <div className='postsPage'>
      {posts?.map((post, idx) => <PostItem key={idx} post={post} />)}
    </div>
  )
}

export default PostsPage