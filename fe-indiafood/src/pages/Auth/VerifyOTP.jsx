import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// Css
import './VerifyOTP.css';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/register');
      return;
    }
    setMessage('OTP kamu sudah dikirim ke email.');
  }, [email, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Focus next input
    if (element.value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('Verifying OTP:', otpValue);
    // Add your OTP verification logic here
  };

  return (
    <div className='verify-otp-container py-12 sm:px-6 lg:px-8'>
      <div className='verify-otp-form space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-600'>
          Verifikasi OTP
        </h2>
        {message && (
          <div className='mt-4 p-4 rounded-md bg-green-50 text-green-700 text-sm'>
            {message}
          </div>
        )}

        <div className='mt-2 text-center text-sm text-gray-600'>
          <p>Masukkan kode 6 digit yang dikirim ke</p>
          <p className='font-medium text-orange-600 break-all'>{email}</p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='grid grid-cols-6 gap-2 sm:gap-4 w-full max-w-sm mx-auto'>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type='text'
                maxLength='1'
                className='w-full aspect-square min-w-[40px] text-center text-lg sm:text-xl border-2 border-gray-300 rounded-lg focus:outline-orange-500 focus:border-orange-500'
                value={digit}
                onChange={(e) => handleChange(e.target, index)}
                onKeyUp={(e) => {
                  if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    const prevInput = document.getElementById(
                      `otp-${index - 1}`
                    );
                    if (prevInput) {
                      prevInput.focus();
                    }
                  }
                }}
              />
            ))}
          </div>

          <div>
            <button
              type='submit'
              className='w-full py-2.5 px-4 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Verifikasi
            </button>
          </div>
        </form>

        <div className='text-center mt-4'>
          <button
            onClick={() => console.log('Resend OTP')}
            className='text-orange-600 hover:text-orange-500 text-sm font-medium transition-colors'
          >
            Kirim Ulang Kode
          </button>
        </div>
      </div>
    </div>
  );
};

VerifyOTP.propTypes = {
  onVerify: PropTypes.func,
};

export default VerifyOTP;
