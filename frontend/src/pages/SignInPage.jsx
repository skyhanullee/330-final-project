import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router";


function SignInPage() {
  const [email, setEmail] = useState('');
  // const { username, setUsername } = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const loginUser = {
      email,
      password
    };

    const response = await fetch('http://127.0.0.1:4000/login', {
      method: 'POST',
      body: JSON.stringify(loginUser),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const resJson = await response.json();
    console.log(resJson);
    if (!response.ok) {
      console.log('POST: did not send to mongo db');
    }
    // if (response.ok) {
    // when successful, token is passed in response
    if (resJson.token) {
      alert(`Login successful`);
      console.log('logged in', resJson);
      setEmail('');
      setPassword('');
      // store into local storage
      // window.localStorage.setItem('token', resJson.token);
      // to logout ->  delete token from local storage
      // navigate('/');
    }
    else {
      alert(`Please check your username and password`);
    }
  }

  return (
    <div className='page'>
      <h1>Sign In</h1>
      <form onSubmit={loginUser}>
        <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {/* <input type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        /> */}
        <input type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input type="submit" value="Sign In" />
      </form>
      <Link to='/register'>Register</Link>
    </div>
  )
}

export default SignInPage
