import { Link } from 'react-router-dom';

// Css
import './NotFound.css';

const NotFound = () => {
  return (
    <div className='not-found-container flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700'>
      <h1 className='text-6xl font-bold text-orange-600'>404</h1>
      <p className='mt-4 text-lg'>Halaman yang Anda cari tidak ditemukan.</p>
      <Link
        to='/'
        className='mt-6 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors'
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
