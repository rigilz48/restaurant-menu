/* eslint-disable react/prop-types */
import { MoneyWavy } from '@phosphor-icons/react';

const DrawerCart = ({ cart, CartOpen, toggleCart }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 transition-all duration-500 ${
        CartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='fixed inset-0 bg-gray-500/75' aria-hidden='true'></div>
      <div
        className={`relative w-80 max-w-full bg-white shadow-xl transition-all duration-500 transform ${
          CartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
          <button
            onClick={toggleCart}
            className='relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
          >
            <span className='absolute -inset-2.5'></span>
            <span className='sr-only'>Close panel</span>
            <svg
              className='size-6'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              aria-hidden='true'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <div className='flex flex-col h-full py-6 px-4 sm:px-6'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Keranjang kamu
          </h2>
          <div className='mt-4 flex-1 overflow-y-auto'>
            {cart.length === 0 ? (
              <p>Keranjang kamu masih kosong.</p>
            ) : (
              cart.map((menu) => (
                <div
                  key={menu.id_makanan}
                  className='flex justify-between items-center mb-4'
                >
                  <div>
                    <h3 className='text-sm font-semibold'>
                      {menu.nama_makanan}
                    </h3>
                    <p className='text-sm text-gray-500'>
                      Rp {menu.harga.toLocaleString('id-ID')}
                    </p>
                    <p className='text-sm text-gray-500'>
                      Jumlah Pesanan : {menu.quantity}
                    </p>
                  </div>
                  <img
                    src={menu.image}
                    alt={menu.nama_makanan}
                    className='w-12 h-12 rounded-lg object-cover'
                  />
                </div>
              ))
            )}
          </div>

          {/* Button Pesan Sekarang */}
          {cart.length > 0 && (
            <div className='mt-4'>
              <button
                className='w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2'
                onClick={() => alert('Pesanan Kamu sedang dibuat!')}
              >
                <svg
                  className='w-6 h-6 text-white'
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
                    d='M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z'
                  />
                </svg>
                <MoneyWavy size={24} className='w-6 h-6 text-white' />
                Pesan Sekarang
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrawerCart;
