import { useState } from 'react'
import './Login.css'

function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    //login validations
    const handleLogin = () => {

        if (username.trim() === '') {
            setError('Please enter username')
            return
        }

        if (password.trim() === '') {
            setError('Please enter password')
            return
        }

        setError('')

        console.log('Username:', username)
        console.log('Password:', password)
    }

    return (
        <div className="login-container">

            <div className="login-box">

                <h1 className="login-title">AK SURGICAL</h1>

                <p className="login-subtitle">
                    Surgical Management System
                </p>

                <input
                    type="text"
                    placeholder="Username"
                    className="login-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="login-error">{error}</p>}
                <button
                    className="login-button"
                    onClick={handleLogin}
                >
                    Login
                </button>

            </div>

        </div>
    )
}

export default Login