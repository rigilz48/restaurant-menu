/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ShoppingCart } from '@phosphor-icons/react';
import userLogo from '../assets/user/default.webp';

function Header({ cart, toggleCart }) {
  const [Open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle Dropdown
  function toggleDropDown() {
    setOpen(!Open);
  }

  // Toggle Mobile Menu
  function toggleMobileMenu() {
    setMobileMenuOpen(!mobileMenuOpen);
  }

  return (
    <>
      <header className='bg-white shadow-md sticky top-0 z-10'>
        <div className='container mx-auto px-6 py-2'>
          {/* Desktop Layout */}
          <div className='hidden sm:flex justify-between items-center'>
            {/* Sisi Kiri */}
            <div className='flex items-center space-x-8'>
              <a href='/' className='text-2xl font-bold text-purple-600'>
                India Food
              </a>
              <nav className='flex space-x-2'>
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
              {/* Cart Icon */}
              <a href='#' className='relative' onClick={toggleCart}>
                <ShoppingCart size={24} className='w-6 h-6' />
                <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
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

          {/* Profile dropdown */}
          <Menu as='div' className='relative'>
            <div>
              <MenuButton className='relative flex rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-500'>
                <span className='absolute -inset-1.5' />
                <span className='sr-only'>Open user menu</span>
                <img alt='' src={userLogo} className='size-8 rounded-full' />
              </MenuButton>
            </div>
            <MenuItems
              transition
              className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
            >
              <MenuItem>
                <a
                  href='#'
                  className='block px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                >
                  Pembelian
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href='#'
                  className='block px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                >
                  Profil
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href='#'
                  className='block px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                >
                  Keluar
                </a>
              </MenuItem>
            </MenuItems>
          </Menu>

          {/* Mobile Layout */}
          <div className='sm:hidden flex justify-between items-center'>
            {/* Logo */}
            <a href='/' className='text-xl font-bold text-purple-600'>
              India Food
            </a>

            {/* Profile, Cart, and Mobile Menu Button */}
            <div className='flex items-center space-x-4'>
              {/* Cart Icon */}
              <a href='#' className='relative' onClick={toggleCart}>
                <ShoppingCart size={24} className='w-6 h-6' />
                <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
                  {cart.length}
                </span>
              </a>

              {/* Profile dropdown */}
              <Menu as='div' className='relative ml-3'>
                <div>
                  <MenuButton className='relative flex rounded-full bg-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-purple-500'>
                    <span className='absolute -inset-1.5' />
                    <span className='sr-only'>Open user menu</span>
                    <img
                      alt=''
                      src={userLogo}
                      className='size-8 rounded-full'
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                >
                  <MenuItem>
                    <a
                      href='#'
                      className='block px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                    >
                      Pembelian
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href='#'
                      className='block px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                    >
                      Profil
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href='#'
                      className='block px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                    >
                      Keluar
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>

              {/* Mobile Menu Button */}
              <button
                type='button'
                className='inline-flex items-center justify-center p-2 text-purple-400 hover:bg-purple-700 hover:text-white focus:outline-none rounded-md'
                aria-controls='mobile-menu'
                aria-expanded={mobileMenuOpen ? 'true' : 'false'}
                onClick={toggleMobileMenu} // Toggle state saat diklik
              >
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='block size-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              id='mobile-menu'
              className='sm:hidden space-y-1 pb-3 pt-2 mt-2'
            >
              <input
                type='text'
                placeholder='Cari...'
                className='block w-full px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500'
              />
              <a
                href='#'
                className='block rounded-md px-4 py-2 text-base font-medium text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              >
                Beranda
              </a>
              <a
                href='#'
                className='block rounded-md px-4 py-2 text-base font-medium text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              >
                Tentang Kami
              </a>
              <a
                href='#'
                className='block rounded-md px-4 py-2 text-base font-medium text-gray-600 hover:bg-purple-100 hover:text-purple-600'
              >
                Bantuan
              </a>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
