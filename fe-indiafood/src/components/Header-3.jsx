/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ShoppingCart } from '@phosphor-icons/react';
import userLogo from '../assets/user/default.webp';

import { MagnifyingGlass, List } from '@phosphor-icons/react';

const Header = ({ cart, toggleCart }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Beranda', href: '/', current: true },
    { name: 'Tentang Kami', href: '#', current: false },
    { name: 'Bantuan', href: '#', current: false },
  ];

  const profileNavigation = [
    { name: 'Pembelian', href: '#' },
    { name: 'Profil', href: '#' },
    { name: 'Keluar', href: '#' },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
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
                {navigation.map((item) => {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current
                          ? 'bg-purple-500 text-white'
                          : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600',
                        'px-4 py-2 rounded-md text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Sisi Kanan */}
            <div className='flex items-center space-x-4'>
              {/* Search Bar */}
              <div className='relative items-center hidden lg:flex'>
                <input
                  type='text'
                  placeholder='Cari...'
                  className='border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none'
                />
                <MagnifyingGlass
                  size={24}
                  className='w-5 h-5 text-gray-400 dark:text-white absolute left-3'
                />
              </div>

              {/* Cart Icon */}
              <a href='#' className='relative' onClick={toggleCart}>
                <ShoppingCart size={24} className='w-6 h-6' />
                <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
                  {cart.length}
                </span>
              </a>

              {/* Profile dropdown */}
              <Menu as='div' className='relative'>
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
                  {profileNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href='#'
                        className='block px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>

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
                  {profileNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href='#'
                        className='block px-4 py-2 text-md text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none'
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>

              {/* Mobile Menu Button */}
              <button
                type='button'
                className='inline-flex items-center justify-center p-2 text-purple-400 hover:bg-purple-700 hover:text-white focus:outline-none rounded-md'
                aria-controls='mobile-menu'
                aria-expanded={mobileMenuOpen ? 'true' : 'false'}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)} // Toggle state saat diklik
              >
                <span className='sr-only'>Open main menu</span>
                <List
                  size={24}
                  className='block size-6'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  aria-hidden='true'
                />
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
              {navigation.map((item) => {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-600 hover:bg-purple-100 hover:text-purple-600',
                      'block rounded-md px-4 py-2 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
