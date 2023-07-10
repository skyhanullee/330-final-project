import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import UserContext from "../context/UserContext";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    const newUser = {
      email,
      password
    };

    const signUpRes = await fetch('http://127.0.0.1:4000/login/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
    // const resJson = await signUpRes.json();
    // console.log(resJson);
    if (!signUpRes.ok) {
      console.log('POST: did not send to mongo db');
    };
    if (signUpRes.status === 409) {
      alert('User already exists.');
    };
    if (signUpRes.ok) {
      alert(`New user has been added`);
      // createBookmarkList(newUser, setUser);
      setEmail('');
      setPassword('');
      // navigate('/signin');
      navigate('/');
      // setIsBookmarked(true);
    };
  };

  // const createBookmarkList = async (userData, setUser) => {
  //   const signInRes = await fetch('http://127.0.0.1:4000/login', {
  //     method: 'POST',
  //     body: JSON.stringify(userData),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //       // "Authorization": token
  //     })
  //   });
  //   const resJson = await signInRes.json();
  //   // console.log(resJson);
  //   if (!signInRes.ok) {
  //     console.log('POST: did not send to mongo db');
  //   }
  //   // when successful, token is passed in signInRes
  //   if (resJson.token) {
  //     alert(`Login successful`);
  //     // clear any token in localStorage
  //     localStorage.removeItem('token');

  //     // store into local storage
  //     localStorage.setItem('token', resJson.token);
  //     setUser(true);
  //     setEmail('');
  //     setPassword('');
  //     // navigate('/');
  //   }

  //   // const bookmarkListRes = await fetch('http://127.0.0.1:4000/bookmarklist', {
  //   //   method: 'POST',
  //   //   headers: new Headers({
  //   //     'Content-Type': 'application/json',
  //   //     "Authorization": resJson.token
  //   //   })
  //   // });
  // };

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
