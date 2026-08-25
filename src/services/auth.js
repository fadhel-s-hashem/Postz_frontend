const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}`

        
const signUp = async (formData) => {

  try {
    // makes a post request to the server
    const res = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    console.log(data);
    

    // if there is an error in the response, throw error to catch
    if (data.err) {
      throw new Error(data.err)
    }
// if we recieve a token back (success) store the token in the browser and return the payload (user data) to use somewhere else in our app
    
    if(data.token){
    console.log('there is a token')
    console.log(data.token)
    localStorage.setItem('token', data.token)
    return JSON.parse(atob(data.token.split('.')[1])).payload

}
    } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

const signIn = async (formData) => {

  try {
    // makes a post request to the server
    const res = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const data = await res.json()
    console.log(data);
    

    // if there is an error in the response, throw error to catch
    if (data.err) {
      throw new Error(data.err)
    }
// if we recieve a token back (success) store the token in the browser and return the payload (user data) to use somewhere else in our app
    
    if(data.token){
    console.log('there is a token')
    console.log(data.token)
    localStorage.setItem('token', data.token)
    return JSON.parse(atob(data.token.split('.')[1])).payload

}
    } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export {
   signUp, 
   signIn,
   
}