import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function SignUp(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    }catch(error){
      setErr(error.message);
    }
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={submit}>
        <div className="form-row"><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="form-row"><input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div style={{marginTop:8}}>
          <button className="button" type="submit">Create Account</button>
        </div>
        {err && <p style={{color:'red'}}>{err}</p>}
      </form>
    </div>
  );
}
