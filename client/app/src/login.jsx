
import React from "react";  
import { useState } from "react";
import './App.css'
import centennaryLogo from './assets/images.png'



function login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.')
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/logins/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password
        })
      })

      if (response.ok) {
        const data = await response.json()
        setMessage('Login successfully!')
        setUsername('')
        setPassword('')
        setTimeout(() => {
          setMessage('')
        }, 3000)
      } else {
        const errorData = await response.json()
        setError(JSON.stringify(errorData))
      }
    } catch (err) {
      console.error('Error submitting login:', err)
      setError('Failed to connect to server.')
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 d-flex justify-content-center">
          <div className="form-card w-100">
                <img src={centennaryLogo} alt="Centenary Bank Logo" className="mb-4 d-block mx-auto" style={{ width: '300px',height:'300px' }} />

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label d-block text-start">Username</label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label d-block text-start">Password</label>
                <input
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="form-text text-end mt-2">
                  <a href="#" className="text-decoration-none">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>

            {message && <div className="alert alert-success mt-3">{message}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default login;

