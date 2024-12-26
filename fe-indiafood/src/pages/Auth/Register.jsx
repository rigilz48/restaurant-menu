import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Css
import './Register.css';

// Icons
import { Eye, EyeClosed } from '@phosphor-icons/react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password minimal 6 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const confirmed = window.confirm(
      'Apakah Anda yakin ingin mendaftar sekarang?'
    );

    if (confirmed) {
      console.log('Register attempt with:', {
        email: formData.email,
        password: formData.password,
      });
      // Redirect to OTP verification page with email
      navigate('/verify-otp', {
        state: { email: formData.email },
      });
    }
  };

  return (
    <div className='register-container'>
      <div className='register-form bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-600'>
          Daftar Akun Baru
        </h2>

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
              required
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
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
                required
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
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
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
              )}
            </div>
          </div>

          <div className='form-group mb-4'>
            <label
              htmlFor='confirmPassword'
              className='block mb-2 text-sm font-medium text-gray-700'
            >
              Konfirmasi Password
            </label>
            <input
              id='confirmPassword'
              name='confirmPassword'
              type={showPassword ? 'text' : 'password'}
              className='w-full p-2 text-base border-2 border-gray-300 rounded-lg focus:outline-orange-500'
              required
              placeholder='Konfirmasi Password'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type='submit'
            className='w-full p-2 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-colors'
          >
            Daftar
          </button>
        </form>

        <div className='mt-4 text-center'>
          <p className='text-sm text-gray-600'>
            Sudah punya akun?{' '}
            <Link to='/login' className='text-orange-500 hover:underline'>
              Masuk
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  onRegister: PropTypes.func,
};

export default Register;
