import React, { useState } from 'react';

const Login: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'password') {
            localStorage.setItem('isLoggedIn', 'true');
            // redirect to home page
            window.location.href = '/plant-disease-detection-ui/';
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className='flex flex-col items-center mt-20'>
            <h2 className='text-2xl mb-4'>Login</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='mb-2 p-2 border border-gray-300 rounded w-64'
            />
            <input
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='mb-2 p-2 border border-gray-300 rounded w-64'
            />
            <button
                onClick={handleLogin}
                className='px-4 py-2 bg-blue-500 text-white rounded'
            >
                Login
            </button>
        </div>
    );
};

export default Login;
