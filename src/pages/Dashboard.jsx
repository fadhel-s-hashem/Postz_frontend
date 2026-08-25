import { useState } from "react";
import { useEffect } from "react";
// import { index } from "../services/userService";
import * as userService from '../services/userService'


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

    return(
        <section>
            <h1> wlcome, {props.user.username}</h1>

            <p className="error">{message}</p>
      <ul>
        {users.map((user) => (
          <li>{user.username}</li>
        ))}
      </ul>
            
        </section>
    )
}

export default Dashboard