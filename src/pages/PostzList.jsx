import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router'
import { useParams } from 'react-router'

const PostzList = (props) => {
    const navigate = useNavigate()
    const { postId } = useParams()

    return(
        <main>
           <h1>All Postz</h1>
           {props.postz.map((post) => (
                <Link to={`/postz/${post._id}`}>
               <article>
                <section className='postHeader'>
                <h2 postzTitle> {post.title} </h2>
                <p className="postz-author">Posted by {post.author?.username || 'Unknown user'}</p>
                <p className="postzText">{post.text}</p>
                </section>

                <section className='Postfooter'>
                <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span>
                    {post.comments?.length || 0} comments
                </span>
                </section>
                <hr/>
            </article>
            </Link>
            
           ))}

        </main>
    )
}


export default PostzList