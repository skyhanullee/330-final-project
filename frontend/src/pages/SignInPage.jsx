import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";


function SignInPage() {
  const [email, setEmail] = useState('');
  // const { username, setUsername } = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const loginUser = {
      email,
      password
    };

    // const token = localStorage.getItem('token');

    const signInRes = await fetch('http://127.0.0.1:4000/login', {
      method: 'POST',
      body: JSON.stringify(loginUser),
      headers: new Headers({
        'Content-Type': 'application/json',
        // "Authorization": token
      })
    });
    const resJson = await signInRes.json();
    // console.log(resJson);
    if (!signInRes.ok) {
      console.log('POST: did not send to mongo db');
    }
    // when successful, token is passed in signInRes
    if (resJson.token) {
      alert(`Login successful`);
      // clear any token in localStorage
      localStorage.removeItem('token');

      // store into local storage
      localStorage.setItem('token', resJson.token);
      setUser(true);
      setEmail('');
      setPassword('');
      navigate('/');
    }
    else {
      alert(`Please check your username and password`);
    }
  };

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
