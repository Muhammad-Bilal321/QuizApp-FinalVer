import React from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'; // Import auth correctly
import { app } from '../Config/firebaseConfig'; // Import app instance
import { useNavigate } from 'react-router-dom';
import {getDatabase, ref, set} from 'firebase/database'
import { Button, TextField } from '@mui/material';



export default function SignupPage() {


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const username = e.target.username.value;

    const auth = getAuth(app); 
    const db = getDatabase(app)

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        const userId = user.uid
        const dbRef = ref(db, `users/${userId}`)
        console.log(user, 'authData');
        navigate('/login')
set(dbRef,{
  email:user.email,
  username:username,
})
.then(()=>{

  console.log("User data stored in the database")
  navigate('/login')
})
.catch((err)=>{
  console.log(err)
  
})
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClick=()=>{
    navigate('/login')
  }

  const navigate = useNavigate()

  return (
    <div className="container">
      <h1 className="text-center">SignUp</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="mb-3">
          <TextField
            name="username"
            type="text"
            fullWidth
            label="Username"
          />
        </div>
        <div className="mb-3">
          <TextField
            name="email"
            type="email"
            fullWidth
            label="Email"
          />
        </div>
        <div className="mb-3">
          <TextField
            name="password"
            type="password"
            fullWidth
            label="Password"
          />
        </div>
        <div className="d-grid gap-2">
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Signup
          </Button>
        </div>
      </form>
      <div className="text-center mt-3">
        <Button color="primary" onClick={handleClick}>
          Already have an account? Login
        </Button>
      </div>
    </div>
  );
}
