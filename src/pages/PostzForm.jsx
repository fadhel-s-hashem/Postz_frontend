import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router'
import { useParams } from 'react-router'
import * as postzServices from '../services/postzServices'

const PostzForm = (props) => {

  const { postId } = useParams()
  const initialState = {
    title: '',
    text: '',
    category: 'News',
  }

  const [formData, setFormData] = useState(initialState)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    !postId ? (props.handleAddPost(formData)) : (props.handleUpdatePostz(postId, formData))
  }

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await postzServices.show(postId)
      setFormData(postData)
    }
    if (postId) fetchPost()

    return () => setFormData(initialState)
  }, [postId])

  return (
    <main>

      <div className=" postzForm card shadow-sm border-0 ">
        <div className="card-body p-4 p-md-5">

          <h2 className="text-primary fw-bold text-center">
            {postId ? 'Edit Post' : 'Add New Post'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className=" text-primary form-label fw-semibold">
                Title
              </label>
              <input
                required
                type="text"
                className="form-control"
                name="title"
                id="title-input"
                placeholder="Add title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className=" mb-3">
              <label className="text-primary form-label fw-semibold">
                Category
              </label>
              <select
                required
                className="form-select"
                name="category"
                id="category-input"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="News">News</option>
                <option value="Sports">Sports</option>
                <option value="Games">Games</option>
                <option value="Movies-shows">Movies-shows</option>
                <option value="Music">Music</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className=" text-primary form-label fw-semibold">
                Text
              </label>
              <textarea
                required
                className="form-control"
                name="text"
                id="text-input"
                rows="5"
                placeholder="Write your post content..."
                value={formData.text}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex gap-2">

              <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                {postId ? 'Save Changes' : 'Create Post'}
              </button>

            </div>
          </form>
        </div>
      </div>
    </main>

  )
}

export default PostzForm