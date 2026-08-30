import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { useParams } from 'react-router'

import * as postzServices from '../services/postzServices'


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



    if (!postz) return(
    <main>
        <div class="spinner">
        <div class="spinner1"></div>
        </div>
    </main>
) 


    return(
        <section>
            <h1>Postz Detail</h1>

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
                    <button onClick={() => props.handleDeletePost(postId)}>delete Postz</button>

                    <button onClick={() => navigate(`/postz/${postId}/edit`)}>Edit</button>
                    </div>
                ):('')}
            </article>
            

        </section>
    )
}

export default PostzDetail