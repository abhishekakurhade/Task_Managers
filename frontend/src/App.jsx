 import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import TaskPage from './components/tasks/TaskPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function Header() {
  const { user, signOutUser } = useAuth();
  return (
    <div className="header">
      <h2>Task Manager</h2>
      <div>
        {user ? (
          <>
            <span className="small" style={{marginRight:12}}>Hello, {user.email}</span>
            <button className="button" onClick={signOutUser}>Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signin"><button className="button" style={{marginRight:8}}>Sign In</button></Link>
            <Link to="/signup"><button className="button">Sign Up</button></Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <TaskPage />
              </ProtectedRoute>
            } />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
