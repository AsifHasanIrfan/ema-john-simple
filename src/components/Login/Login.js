import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { userContext } from "../../App";
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, updateUserInfo, createUserWithEmailAndPassword, singInWithEmailAndPassword } from './LoginManager';

function Login() {

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    error: '',
    success: false
  })

  initializeLoginFramework();

  const [ loggedInUser, setLoggedInUser] = useContext(userContext)
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from)
    })
  }
  
  const signOut = () => {
    handleSignOut()
    .then(res => {
      setUser(res);
      setLoggedInUser(res);
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newUser && user.password && user.email){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
    }

    if(!newUser && user.email && user.password){
      singInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from)
      })
    }

  }

  const handleChange = (e) => {
    let isFormValid = true;
    if(e.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if(e.target.name === 'password'){
      const isPasswordValid = e.target.value.length > 6;
      const passwordHashNumber = /\d{1}/.test(e.target.value)
      isFormValid = isPasswordValid && passwordHashNumber;
    }
    if(isFormValid){
      const newUserInfo = {...user};
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  // updateUserInfo();

  return (
    <div style={{textAlign: 'center'}}>
     {
       user.isSignedIn ? <button onClick={signOut}>Sign-out</button> : <button onClick={googleSignIn}>Sign-in</button>
      }
     {
       user.isSignedIn && <div>
         <p>Welcome, {user.name}</p>
         <img src={user.photo} alt="" />
       </div>
     }

     <h2>Our own Authentication system.</h2>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
      <label for="newUser">New User Sign Up</label> 
      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleChange} placeholder="Enter your name" />}
        <br/>
        <input type="text" name="email" onBlur={handleChange} placeholder="Write your email..." required/>
        <br/>
        <input type="password" name="password" onBlur={handleChange} placeholder="Enter your Password...." required/>
        <br/>
        <input type="submit" value="submit"/>
     </form>
     <p style={{color: 'red'}}>{user.error}</p>
     {
       user.success && <p style={{color: 'green'}}>User {newUser ? 'created' : 'Logged In'} successfully</p>
     }
    </div>
  );
}

export default Login;
