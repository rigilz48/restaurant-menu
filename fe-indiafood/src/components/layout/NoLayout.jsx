import { Outlet } from 'react-router-dom';

import Footer from './Footer';

const NoLayout = () => {
  return (
    <div className='bg-gray-50 flex flex-col min-h-screen'>
      <main className='flex-grow'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default NoLayout;
