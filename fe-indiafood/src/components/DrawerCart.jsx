import { PropTypes } from 'prop-types';
import { X, MoneyWavy } from '@phosphor-icons/react';

const DrawerCart = ({ cart, cartOpen, toggleCart, onConfirmOrder }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-end z-50 transition-all duration-500 ${
        cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className='fixed inset-0 bg-gray-500/75' aria-hidden='true'></div>
      <div
        className={`relative w-80 max-w-full bg-white shadow-xl transition-all duration-500 transform ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
          <button
            onClick={toggleCart}
            className='relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
          >
            <span className='absolute -inset-2.5'></span>
            <span className='sr-only'>Close panel</span>
            <X size={24} className='size-6' aria-hidden='true' />
          </button>
        </div>
        <div className='flex flex-col h-full py-6 px-4 sm:px-6'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Keranjang kamu
          </h2>
          <div className='mt-4 flex-1 overflow-y-auto scroll-smooth'>
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
                    src={`/menu/${menu.image}`}
                    alt={menu.nama_makanan}
                    loading='lazy'
                    className='w-12 h-12 rounded-lg object-cover'
                  />
                </div>
              ))
            )}
          </div>

          {/* Button Pesan Sekarang */}
          {cart.length > 0 && (
            <div className='mt-4 border-t border-orange-300'>
              {/* Total dan Harga */}
              <div className='flex justify-between items-center mb-2 px-1 py-2 border-b border-orange-300'>
                <span className='text-base font-medium text-gray-700'>
                  Total :
                </span>
                <span className='text-base font-medium text-gray-700'>
                  Rp{' '}
                  {cart
                    .reduce(
                      (total, item) => total + item.harga * item.quantity,
                      0
                    )
                    .toLocaleString('id-ID')}
                </span>
              </div>

              {/* Button pesan sekarang */}
              <button
                className='w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full flex items-center justify-center gap-2'
                onClick={onConfirmOrder}
              >
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

DrawerCart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id_makanan: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      nama_makanan: PropTypes.string.isRequired,
      harga: PropTypes.number.isRequired,
      deskripsi: PropTypes.string.isRequired,
    })
  ).isRequired,
  cartOpen: PropTypes.bool.isRequired,
  toggleCart: PropTypes.func.isRequired,
  onConfirmOrder: PropTypes.func.isRequired,
};

export default DrawerCart;
