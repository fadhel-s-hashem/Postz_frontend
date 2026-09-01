import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { useParams } from 'react-router'

import * as postzServices from '../services/postzServices'
import * as commentsServices from '../services/comments'

import CommentForm from '../components/CommentForm'

import person from "../assets/person.svg"


const PostzDetail = (props) => {
    const navigate = useNavigate()
    const { postId } = useParams()

    const [postz, setPostz] = useState(null)
    

    useEffect(() => {
        const fetchPostz = async () => {
            const postzData = await postzServices.show(postId)
            setPostz(postzData)
        }
        fetchPostz()
    }, [postId])

    const handleAddComment = async (formData) => {
        const newComment = await commentsServices.create(postId, formData)

        setPostz({...postz, comments: [...postz.comments, newComment]})
    }

    const handleDeleteComment = async (commentId) => {
  try {
    await commentsServices.deleteComment(postId, commentId)

    const filteredComments = postz.comments.filter((comment) => {
      return comment._id !== commentId
    })

    setPostz({ ...postz, comments: filteredComments })
  } catch (err) {
    console.error('Error deleting comment:', err)
  }
}



    if (!postz) return(
    <main>
        <div className="spinner">
        <div className="spinner1"></div>
        </div>
    </main>
) 


    return(
        <main>

            <article>
                <h2 className='PostTitle card-title text-primary fw-bold'>{postz.title}</h2>
                <p className="postz-author">Posted by {postz.author?.username || 'Unknown user'}</p>
                <p className="postzText">{postz.text}</p>
                <p><span className='postDate'>
                    {new Date(postz.createdAt).toLocaleDateString()}
                </span>
                </p>

                {postz.author._id === props.user._id? (
                    <div className='actions'>
                    <button onClick={() => props.handleDeletePost(postId)}>delete</button>

                    <button onClick={() => navigate(`/postz/${postId}/edit`)}>Edit</button>
                    </div>
                ):('')}
            </article>

            <section className='commentSection'>
                <h3>{ postz.comments?.length} 💬</h3>

               {postz.comments.map((comment) => (
    <div className='ShowComments'>
      <div className='commentContent'>
        <div className='commentAuthorHeader'>
          <img src={person} alt="person icon" />
          <span className='authorName'>{comment.author?.username}:</span>
        </div>
        <p className='commentText'>{comment.text}</p>
      </div>

      {props.user._id === comment.author?._id && (
        <button 
          className='deleteCommentBtn' 
          onClick={() => handleDeleteComment(comment._id)}
        >
          Delete
        </button>
      )}
    </div>
  ))}
                <CommentForm handleAddComment={handleAddComment}/>

            </section>
            

        </main>
    )
}

export default PostzDetail