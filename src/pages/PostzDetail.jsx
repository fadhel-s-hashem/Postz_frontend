import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { useParams } from 'react-router'

import * as postzServices from '../services/postzServices'
import * as commentsServices from '../services/comments'

import CommentForm from '../components/CommentForm'


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
        const newComment = await commentsService.create(postId, formData)

        setPostz({...postz, comments: [...postz.comments, newComment]})
    }



    if (!postz) return(
    <main>
        <div class="spinner">
        <div class="spinner1"></div>
        </div>
    </main>
) 


    return(
        <main>
            <h1>Postz Detail</h1>
      <CommentForm handleAddComment={handleAddComment}/>

            <article>
                <h2 className='PostTitle'>{postz.title}</h2>
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
                <h3>{ postz.comments?.length}</h3>
                {postz.comments.map((comment) => (
                    <div className='ShowComments'>
                        <span>👤{comment.author?.username}: </span> <span>{comment.text}</span>
                    </div>
                ))}

            </section>
            

        </main>
    )
}

export default PostzDetail