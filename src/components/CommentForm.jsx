import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { useParams } from 'react-router'

import * as postzServices from '../services/postzServices'
import * as commentsServices from '../services/comments'

const CommentForm = (props) => {
    
    const initialState = {
        text: '',
    }

    const [formData, setFormData]= useState(initialState)

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name] : e.target.value
    })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


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
                <button type='submit'>Add Comment 💬</button>
                </form>

        </main>
    )
}


export default CommentForm