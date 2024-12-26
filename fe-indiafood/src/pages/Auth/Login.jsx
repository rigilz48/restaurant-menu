import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password });
    if (onLogin) {
      onLogin(email, password);
    }
  };

  return (
    <div className='login-container flex items-center justify-center min-h-screen'>
      <div className='login-form bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-600'>
          Masuk ke akun Anda
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='form-group mb-4'>
            <label
              htmlFor='email-username'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Email/Username
            </label>
            <input
              id='email-username'
              name='email-username'
              type='text'
              className='w-full p-2 text-base border-2 border-gray-300 rounded-lg focus:outline-orange-500'
              autoComplete='email'
              required
              placeholder='Email/Username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='form-group mb-4'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              className='w-full p-2 text-base border-2 border-gray-300 rounded-lg focus:outline-orange-500'
              autoComplete='current-password'
              required
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='text-right mb-4'>
            <Link
              to='/forgot-password'
              className='text-orange-500 hover:underline text-sm'
            >
              Lupa password?
            </Link>
          </div>
          <button
            type='submit'
            className='w-full p-2 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-colors'
          >
            Masuk
          </button>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-600'>
            Belum punya akun?{' '}
            <Link to='/register' className='text-orange-500 hover:underline'>
              Buat akun
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
};

export default Login;
