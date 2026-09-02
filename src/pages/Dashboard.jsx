import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router'
import { useParams } from 'react-router'

import * as userService from '../services/userService'

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

const Dashboard = (props) => {
  const [users, setUsers] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index()
        setUsers(fetchedUsers)
      } catch (err) {
        setMessage(err.message)
      }
    }
    fetchUsers()
  }, [props.user])

  const userPostz = props.postz.filter((post) => {
    return post.author._id === props.user._id;
  })


  return (
    <main className="container my-4">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Welcome, <span className="text-primary">{props.user.username}</span></h1>
        <h4 className="text-muted">Manage and view your created <span className='text-primary fw-bold'>Post</span><span className="Z fw-bold">Z</span></h4>
      </div>

      {message? (<p className="alert alert-danger text-center">{message}</p>):('')}

      <section className="d-flex flex-column gap-3">
        <h2 className=" YourPostz h4 fw-bold mb-3">Your{" "}
          <span className='text-primary fw-bold'>Post</span>
          <span className="Z fw-bold">Z({userPostz.length})</span>

        </h2>

        {userPostz.length === 0 ? (

          <div className="card text-center p-4">
            <p className="text-muted mb-3">You haven't created any posts yet.</p>
            <div>
              <Link to="/postz/new">
                <button>
                  Create First Post
                </button>
              </Link>
            </div>
          </div>

        ) : (

          userPostz.map((post) => (

            <Link to={`/postz/${post._id}`} className="text-decoration-none text-dark w-100 d-flex justify-content-center">
              <div className=" postzCard card mb-3 w-100 ">
                <div className="row g-0 align-items-center">

                  <div className="col-md-4 d-flex justify-content-center align-items-center p-3">
                    <img
                      src={categoryImages[post.category]}
                      className="categoryImages object-fit-contain"
                      alt={`${post.category} icon`}
                    />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body">

                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h3 className="card-title text-primary fw-bold mb-0">{post.title}</h3>
                      </div>

                      <p className="badge bg-primary rounded-pill">{post.category}</p>

                      <p className="card-subtitle text-muted small mb-2">
                        Posted by <span className="fw-bold">{post.author?.username || 'Unknown user'}</span>
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

          ))
        )}
      </section>
    </main>
  )
}

export default Dashboard