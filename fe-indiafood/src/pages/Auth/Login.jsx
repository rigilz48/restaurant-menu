import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Css
import './Auth.css';

// Icons
import { Eye, EyeClosed } from '@phosphor-icons/react';

const Login = ({ onLogin }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt with:', { emailOrUsername, password });
    if (onLogin) {
      onLogin(emailOrUsername, password);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='auth-container'>
      <div className='auth-form bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-600'>
          Masuk ke akun Anda
        </h2>

        <div className='mb-4 p-4 rounded-md bg-red-50 text-red-700 text-sm'>
          Email / Username dan Password kamu tidak valid, silakan coba lagi.
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group mb-4'>
            <label
              htmlFor='email-or-username'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Email/Username
            </label>
            <input
              id='email-or-username'
              name='email-or-username'
              type='text'
              className='w-full p-2 text-base border-2 border-gray-300 rounded-lg focus:outline-orange-500'
              autoComplete='username'
              required
              placeholder='Email atau Username'
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
          </div>
          <div className='form-group mb-4'>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Password
            </label>
            <div className='relative'>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                className='w-full p-2 text-base border-2 border-gray-300 rounded-lg focus:outline-orange-500'
                autoComplete='current-password'
                required
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type='button'
                className='absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeClosed className='h-5 w-5 text-gray-500' />
                ) : (
                  <Eye className='h-5 w-5 text-gray-500' />
                )}
              </button>
            </div>
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
