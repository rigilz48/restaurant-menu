import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

const DefaultLayout = ({ cart, toggleCart }) => {
  return (
    <div className='bg-gray-50 flex flex-col min-h-screen'>
      <Header cart={cart} toggleCart={toggleCart} />
      {/* <div className='container mx-auto px-6 pb-8'> CSS Layout Kiri & Kanan */}
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

DefaultLayout.propTypes = {
  cart: PropTypes.array.isRequired,
  toggleCart: PropTypes.func.isRequired,
};

export default DefaultLayout;
