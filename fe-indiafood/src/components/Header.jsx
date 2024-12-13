/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ShoppingCart } from '@phosphor-icons/react';
import userLogo from '../assets/user/default.webp';

function Header({ cart, toggleCart }) {
  const [Open, setOpen] = useState(false);

  // Toggle Dropdown
  function toggleDropDown() {
    setOpen(!Open);
  }

  return (
    <>
      <header className='bg-white shadow-md sticky top-0 z-10'>
        <div className='container mx-auto flex justify-between items-center px-6 py-2'>
          {/* Sisi Kiri */}
          <div className='flex items-center space-x-8'>
            <a href='/' className='text-2xl font-bold text-purple-600'>
              India Food
            </a>
            <nav className='hidden lg:flex space-x-2'>
              <a
                href='/'
                className='px-4 py-2 rounded-md text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              >
                Beranda
              </a>
              <a
                href='/'
                className='px-4 py-2 rounded-md text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              >
                Tentang Kami
              </a>
              <a
                href='/'
                className='px-4 py-2 rounded-md text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              >
                Bantuan
              </a>
            </nav>
          </div>

          {/* Sisi Kanan */}
          <div className='flex items-center space-x-4'>
            {/* Search Bar (Desktop & Tablet) */}
            <div className='items-center hidden lg:flex relative'>
              <input
                type='text'
                placeholder='Cari...'
                className='border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none'
              />
              <svg
                className='w-5 h-5 text-gray-400 dark:text-white absolute left-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeWidth='2'
                  d='m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z'
                />
              </svg>
            </div>

            {/* Cart/Keranjang Icon */}
            <a href='#' className='relative' onClick={toggleCart}>
              {/* <svg
                className='w-6 h-6 text-gray-800 dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312'
                />
              </svg> */}

              <ShoppingCart size={24} />

              <span
                href='/'
                className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'
              >
                {cart.length}
              </span>
            </a>

            {/* Profile */}
            <div className='relative'>
              <img
                src={userLogo}
                alt='Profil'
                className='bg-gray-300 rounded-full w-10 h-10 cursor-pointer'
                onClick={toggleDropDown}
              />

              {/* Dropdown Menu */}
              {Open && (
                <div className='absolute right-0 mt-1 w-40 bg-white shadow-md rounded-lg z-40'>
                  <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                    Pembelian
                  </a>
                  <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                    Profil
                  </a>
                  <a href='#' className='block px-4 py-2 hover:bg-gray-100'>
                    Keluar
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
