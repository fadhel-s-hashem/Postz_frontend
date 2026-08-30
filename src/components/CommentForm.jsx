import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { useParams } from 'react-router'

import * as postzServices from '../services/postzServices'
import * as commentsServices from '../services/comments'

const CommentForm = () => {
    
    const initialState = {
        text: '',
    }

    const [formData, setFormData]= useState(initialState)

    const handleChange = (event) => {
        setFormData({
            ...formData, [event.target.name] : event.target.value
    })
    }

    const handleSubmit = () => {}


    return(
        <main>
             <form onSubmit={handleSubmit}>
    <label className='text-input'>Your comment:</label>
    <textarea
      required
      type='text'
      name='text'
      id='text-input'
      value={formData.text}
      onChange={handleChange}
    />
    <button type='submit'>SUBMIT COMMENT</button>
    </form>

        </main>
    )
}


export default CommentForm