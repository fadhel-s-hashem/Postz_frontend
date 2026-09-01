import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Link } from 'react-router'
import { useParams } from 'react-router'
import * as postzServices from '../services/postzServices'

const PostzForm = (props) => {

    const { postId } = useParams()
    const initialState = {
    title: '',
    text: '' ,
    category: 'News',
  }

  const [formData, setFormData] =useState(initialState)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
      !postId ? (props.handleAddPost(formData)) : (props.handleUpdatePostz(postId, formData))
  }

  useEffect(() => {
    const fetchPost =async () => {
      const postData= await postzServices.show(postId)
      setFormData(postData)
    }
    if (postId) fetchPost()

    return () => setFormData(initialState)
  }, [postId])

    return(
        <main>
            <h2>{postId ? "Edit post" : "Add New post"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title-input">Title</label>
        <input
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Text</label>
        <textarea
          required
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />

        <label>Category</label>
        <select
          required
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

        <button type="submit">{!postId ? ("Create post"):("Edit Post") }</button>
      </form>

        </main>

    )
}

export default PostzForm