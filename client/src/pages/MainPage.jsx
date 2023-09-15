import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PopularPosts from '../components/PopularPosts'
import PostItem from '../components/PostItem'
import { getAllPosts } from '../redux/post-reducer'
import './mainPage.scss'

const mainPageContainer = (props) => {
  return (
    <>
      <MainPage userIncrement={props.userIncrement} getAllPosts={props.getAllPosts} posts={props.posts} popularPosts={props.popularPosts} />
    </>
  )
}


const MainPage = (props) => {
  const posts = props.posts
  const popularPosts = props.popularPosts
  const { getAllPosts } = props
  const { userIncrement } = props

  useEffect(() => {
    getAllPosts()
  }, [getAllPosts])

  if (!posts?.length) {
    return (
      <div className='main__text--null'>
        Постов не существует.
      </div>
    )
  }


  return (
    <div className='main'>
      <div className="main__flex">
        <div className='main__flex--one'>
          {
            posts?.map((post, idx) => <PostItem key={idx} post={post} userIncrement={userIncrement}/>)
          }
        </div>
        <div className='main__flex--two'>
          <div className='main__popular popular'>
            <div className='popular__text'>
              Популярное:
            </div>
            {
              popularPosts?.map((post, idx) => <PopularPosts key={idx} post={post} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    posts: state.postPage.posts,
    popularPosts: state.postPage.popularPosts,
    userIncrement: state.commentPage.userIncrement
  }
}

export default connect(mapStateToProps, { getAllPosts })(mainPageContainer)