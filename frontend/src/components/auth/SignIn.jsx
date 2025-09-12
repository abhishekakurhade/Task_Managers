import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';

export default function SignIn(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    }catch(error){
      setErr(" create account or Enter valid credentials ");
    }
  };

  return (
    <div>
      <h3>Sign In</h3>
      <form onSubmit={submit}>
        <div className="form-row"><input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="form-row"><input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
        <div style={{marginTop:8}}>
          <button className="button" type="submit">Sign In</button>
          <Link to="/signup" style={{marginLeft:12}}>Create account</Link>
        </div>
        {err && <p style={{color:'red'}}>{err}</p>}
      </form>
    </div>
  );
}
