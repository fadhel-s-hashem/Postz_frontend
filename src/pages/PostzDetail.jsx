import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import { useParams } from 'react-router'

const PostzDetail = () => {
    const navigate = useNavigate()
    const { postId } = useParams()


    return(
        <section>
            <h1>Postz Detail</h1>
            

        </section>
    )
}

export default PostzDetail