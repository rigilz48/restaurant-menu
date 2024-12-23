/* eslint-disable react/prop-types */
import Header from './Header';
import Footer from './Footer';

const DefaultLayout = ({ children, cart, toggleCart }) => {
  return (
    <div className='bg-gray-50 flex flex-col min-h-screen'>
      <Header cart={cart} toggleCart={toggleCart} />
      {/* <div className='container mx-auto px-6 pb-8'> CSS Layout Kiri & Kanan */}
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
