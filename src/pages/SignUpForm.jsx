import { useState } from 'react'
import { signUp } from '../services/auth'
import { useNavigate } from 'react-router'

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
    }

const [formData, setFormData] = useState(initialState)
const [message, setMessage] = useState('')

const handleChange = (event) =>{
    setFormData({...formData, [event.target.name]: event.target.value})
}

const handleSubmit = async (event) =>{
    event.preventDefault()

    try {
    console.log('the form submitted');
    const newUser = await signUp(formData)
    props.setUser(newUser)
    setFormData(initialState)
    navigate('/')
    
    } catch (err) {
        setMessage(err.message)
    }
    
}

const isFormValid = () => {
    if (formData.username && formData.password && formData.password === formData.confirmPassword){
        return true
    } else return false
  
}

    return(
        <section className='card'>
            <header>
            <h1>sign up</h1>
            <p className="error">{message}</p>
            </header>
            <form onSubmit={handleSubmit}>
                Username:
                <input type="text" name='username' onChange={handleChange} value={formData.username}/>

                Password:
                <input type="password" name='password' onChange={handleChange} value={formData.password}/>

                Confirm Password:
                <input type="password" name='confirmPassword' onChange={handleChange} value={formData.confirmPassword}/>

                
                <div className='actions'>
                <button type='submit' disabled={!isFormValid()}>Sign Up</button>
                <button type='submit'> Cancel </button>
                </div>
            </form>

        </section>
    )
}

export default SignUpForm