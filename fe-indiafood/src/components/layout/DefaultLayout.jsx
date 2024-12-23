/* eslint-disable react/prop-types */
import Header from './Header';
import Footer from './Footer';

const DefaultLayout = ({ children, cart, toggleCart }) => {
  return (
    <div className='bg-gray-50 flex flex-col min-h-screen'>
      <Header cart={cart} toggleCart={toggleCart} />
      <main className='container mx-auto px-6 pb-8 flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
