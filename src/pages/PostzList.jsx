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

    return (
        <main className=" container my-4">
            <h1 className="mb-4 text-center fw-bold text-primary">All Post<span className='Z'>Z</span></h1>
            <section className='d-flex flex-column gap-3' >
                {props.postz.map((post) => (
                    <Link to={`/postz/${post._id}`} className="text-decoration-none text-dark w-100 d-flex justify-content-center">
                        <div className=" postzCard card mb-3 w-100 ">
                            <div className="row g-0 align-items-center">

                                <div className="col-md-4 d-flex justify-content-center align-items-center p-3">
                                    <img
                                        src={categoryImages[post.category] || Other}
                                        className="categoryImages object-fit-contain"
                                        alt={`${post.category} icon`}
                                    />
                                </div>

                                <div className="col-md-8">
                                    <div className="card-body">

                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <h3 className="card-title text-primary fw-bold mb-0">{post.title}</h3>
                                            <span className="badge bg-primary rounded-pill">{post.category}</span>
                                        </div>

                                        <p className="card-subtitle text-muted small mb-2">
                                            Posted by <span className="fw-semibold">{post.author?.username || 'Unknown user'}</span>
                                        </p>
                                        <p className="card-text text-secondary">{post.text}</p>

                                        <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-2">
                                            <p className="card-text mb-0">
                                                <span className="text-body-secondary">
                                                    {new Date(post.createdAt).toLocaleDateString()}
                                                </span>
                                            </p>
                                            <span className="text-body-secondary fw-semibold">
                                                💬 {post.comments?.length} comments
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                
            ))}
            </section>

        </main>
    )
}


export default PostzList