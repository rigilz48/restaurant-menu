import { useState } from 'react';
import { Link } from 'react-router-dom';

// Css
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`${email}`);
    setEmail('');
  };

  return (
    <div className='auth-container'>
      <div className='auth-form bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-600'>
          Lupa Password
        </h2>

        {message && (
          <div className='mb-4 p-4 rounded-md bg-green-50 text-green-700 text-sm'>
            Link reset password telah dikirim ke{' '}
            <span className='font-medium'>{message}</span>
          </div>
        )}

        <div className='mb-4 p-4 rounded-md bg-red-50 text-red-700 text-sm'>
          Email kamu tidak terdaftar.
        </div>

        <div className='text-center text-sm text-gray-600 mb-4'>
          <p>Masukkan email kamu, kami akan mengirimkan link reset password.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='form-group mb-4'>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              className='w-full p-2 text-base border-2 border-gray-300 rounded-lg focus:outline-orange-500'
              autoComplete='email'
              required
              placeholder='Masukkan email kamu'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='w-full p-2 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-colors'
          >
            Kirim
          </button>
        </form>
        <div className='mt-4 text-center'>
          <Link
            to='/login'
            className='text-orange-600 hover:text-orange-500 text-sm font-medium'
          >
            Kembali Masuk
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
