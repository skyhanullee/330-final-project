import { useState } from "react"
import { useNavigate } from "react-router";

function RegisterPage() {
  const [email, setEmail] = useState('');
  // const { username, setUsername } = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password
    };

    const response = await fetch('http://127.0.0.1:4000/login/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    const resJson = await response.json();
    // console.log(resJson);
    if (!response.ok) {
      console.log('POST: did not send to mongo db');
    };
    if (response.status === 409) {
      alert('User already exists.');
    };
    if (response.ok) {
      alert(`New user has been added`);
      setEmail('');
      setPassword('');
      navigate('/signin');
      // setIsBookmarked(true);
    };
  };

  return (
    <div className='page'>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
        />
        <input type="submit" value="Register" />
      </form>
    </div>
  )
}
export default RegisterPage
