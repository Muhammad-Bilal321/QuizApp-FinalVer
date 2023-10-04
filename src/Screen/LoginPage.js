import React from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../Config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import {getDatabase, ref, set} from 'firebase/database'
import { Button, TextField } from '@mui/material';



export default function LoginPage() {


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  

    const auth = getAuth(app); 
    const db = getDatabase(app)

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        const userId = user.uid
        const dbRef = ref(db, `users/${userId}`)
        console.log(user, 'authData');
        navigate('/')
set(dbRef,{
  email:user.email,
 
})
.then(()=>{

  console.log("User data stored in the database")
  navigate('/')
})
.catch((err)=>{
  console.log(err)
 
})
      })
      .catch((error) => {
        console.error(error);
        alert("Invalid Email & Password")
      });
  };
  const handleClick=()=>{
    navigate('/signup')
  }

  const navigate = useNavigate()

  return (
    <div className="container">
      <h1 className="text-center">Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
      
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
            Login
          </Button>
        </div>
      </form>
      <div className="text-center mt-3">
        <Button color="primary" onClick={handleClick}>
       Create an Account? Signup
        </Button>
      </div>
    </div>
  );
}
