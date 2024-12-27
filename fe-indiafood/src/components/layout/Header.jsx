import { PropTypes } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';

// Assets
import userLogo from '../../assets/user/default.webp';

// Icons
import { ShoppingCart, List, X } from '@phosphor-icons/react';

const Header = ({ cart, toggleCart }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Beranda', to: '/' },
    { name: 'Tentang Kami', to: '#' },
    { name: 'Bantuan', to: '#' },
  ];

  const profileNavigation = [
    { name: 'Pembelian', to: '#' },
    { name: 'Profil', to: '#' },
    { name: 'Keluar', to: '#' },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <Disclosure as='nav' className='bg-white shadow-md sticky top-0 z-10'>
      {({ open }) => (
        <>
          <div className='container mx-auto px-6'>
            <div className='flex h-16 justify-between items-center'>
              {/* Logo */}
              <div className='flex items-center space-x-8'>
                <a href='/' className='text-2xl font-bold text-orange-600'>
                  India Food
                </a>

                {/* Navigation Links (Desktop) */}
                <div className='hidden md:flex space-x-4'>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        location.pathname === item.to
                          ? 'bg-orange-500 text-white'
                          : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600',
                        'px-4 py-2 rounded-md text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Icons and Profile */}
              <div className='hidden md:flex items-center space-x-4'>
                {/* Cart */}
                <button className='relative' onClick={toggleCart}>
                  <ShoppingCart size={24} className='text-gray-600' />
                  <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
                    {cart.length}
                  </span>
                </button>

                {/* Profile Dropdown */}
                <Menu as='div' className='relative'>
                  <MenuButton className='flex rounded-full bg-gray-300 focus:ring-2 focus:ring-orange-500'>
                    <img
                      src={userLogo}
                      alt='Profile'
                      loading='lazy'
                      className='w-8 h-8 rounded-full'
                    />
                  </MenuButton>
                  <MenuItems className='absolute right-0 mt-2 w-40 origin-top-right bg-white shadow-lg ring-1 ring-black/5 rounded-md py-1'>
                    {profileNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Link
                          to={item.to}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>

                {/* Tombol Login */}
                <Link
                  to='/login'
                  className='relative text-white bg-orange-600/[.90] hover:bg-orange-700 p-2 rounded-full text-md font-medium'
                >
                  Masuk
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className='md:hidden flex items-center space-x-4'>
                {/* Cart (Mobile) */}
                <button className='relative translate-x-2' onClick={toggleCart}>
                  <ShoppingCart size={24} className='text-gray-600' />
                  <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full'>
                    {cart.length}
                  </span>
                </button>

                {/* Profile Dropdown (Mobile) */}
                <Menu as='div' className='relative translate-x-2'>
                  <MenuButton className='flex rounded-full bg-gray-300 focus:ring-2 focus:ring-orange-500'>
                    <img
                      src={userLogo}
                      alt='Profile'
                      loading='lazy'
                      className='w-8 h-8 rounded-full'
                    />
                  </MenuButton>
                  <MenuItems className='absolute right-0 mt-2 w-40 origin-top-right bg-white shadow-lg ring-1 ring-black/5 rounded-md py-1'>
                    {profileNavigation.map((item) => (
                      <MenuItem key={item.name}>
                        <Link
                          to={item.to}
                          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          {item.name}
                        </Link>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>

                {/* Tombol Login */}
                <Link
                  to='/login'
                  className='relative text-white bg-orange-600/[.90] hover:bg-orange-700 p-2 rounded-full text-md font-medium'
                >
                  Masuk
                </Link>

                <DisclosureButton className='p-2 rounded-md text-gray-400 hover:bg-orange-100 hover:text-orange-600 focus:outline-none'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <X className='h-6 w-6' aria-hidden='true' />
                  ) : (
                    <List className='h-6 w-6' aria-hidden='true' />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <DisclosurePanel className='md:hidden'>
            <div className='space-y-1 px-6 pb-3 pt-2'>
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.to}
                  className={classNames(
                    location.pathname === item.to
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-orange-100 hover:text-orange-600',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
};

Header.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id_makanan: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      nama_makanan: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      harga: PropTypes.number.isRequired,
    })
  ).isRequired,
  toggleCart: PropTypes.func.isRequired,
};

export default Header;
