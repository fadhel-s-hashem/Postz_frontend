import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router'
import { useParams } from 'react-router'

import News from "../assets/News.jpg"
import MoviesShows from "../assets/Movies-shows.jpg"
import Music from "../assets/Music.jpg"
import Games from "../assets/Games.jpg"
import Sports from "../assets/Sports.jpg"
import Other from "../assets/Other.jpg"

const categoryImages = {
  'News': News,
  'Movies-shows': MoviesShows,
  'Music': Music,
  'Games': Games,
  'Sports': Sports,
  'Other': Other,
}

const PostzList = (props) => {
    const navigate = useNavigate()
    const { postId } = useParams()

    return(
        <main className=" mainList container my-4">
           <h1 className="mb-4 text-center fw-bold text-primary">All Post<span></span>Z</h1>
           <section className='d-flex flex-column gap-3' >
           {props.postz.map((post) => (
                <Link to={`/postz/${post._id}`}>
               <article className="card shadow-sm h-100 hover-shadow transition">
                <header className='postHeader card-body'>

                <h2 className='postzTitle card-title h4 mb-0 fw-bold text-primary'> 
                    {post.title} 
                </h2>

                <span className='badge bg-primary rounded-pill px-3 py-2'>{post.category}</span>
                <p className="postz-author card-subtitle text-muted small mb-3">Posted by{" "} 
                    <span className='fw-semibold'>{post.author?.username || 'Unknown user'}</span>
                </p>

                <p className="postzText card-text text-secondary mb-0">{post.text}</p>

                <img className='categoryImages' src={categoryImages[post.category]} alt={`${post.category} icon`} />

                </header>

                <footer className='PostFooter card-footer bg-transparent border-top-0 d-flex justify-content-around align-items-center'>
                <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <span className='fw-semibold'>
                    💬{post.comments?.length} comments
                </span>
                </footer>

            </article>
            </Link>
            
        ))}
        </section>

        </main>
    )
}


export default PostzList