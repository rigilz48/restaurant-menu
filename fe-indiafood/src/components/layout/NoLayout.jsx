/* eslint-disable react/prop-types */
import Footer from './Footer';

const NoLayout = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      {children}
      <Footer />
    </div>
  );
};

export default NoLayout;
