/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import CardMenu from './CardMenu';

function Home({ cart, addToCart, CartOpen, toggleCart }) {
  const [dataMenus, setMenus] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState(null);

  async function getMenus() {
    const url = 'https://seemly-hail-eel.glitch.me/menus';

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();

      setMenus(json);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getMenus();
  }, []);

  function closePopup() {
    setSelectedMenu(null);
    setQuantity(1);
  }

  function increaseQty() {
    if (quantity >= 10) {
      setQuantity(quantity);
    } else {
      setQuantity(quantity + 1);
    }
  }
  function decreaseQty() {
    if (quantity > 1) setQuantity(quantity - 1);
  }

  function togglePopup(event, food) {
    event.preventDefault();
    setSelectedMenu(food);
  }

  return (
    <>
      {/* Banner */}
      <div className='overflow-hidden gap-4 max-md:gap-0 grid grid-cols-3 max-md:grid-cols-1'>
        <img
          src='/banner1.webp'
          alt='Banner 1'
          className='w-full h-40 max-lg:h-24 object-cover rounded-lg shadow-xl"'
        />
        <img
          src='/banner2.webp'
          alt='Banner 2'
          className='w-full h-40 max-lg:h-24 object-cover rounded-lg shadow-xl"'
        />
        <img
          src='/banner3.webp'
          alt='Banner 3'
          className='w-full h-40 max-lg:h-24 object-cover rounded-lg shadow-xl"'
        />
      </div>

      {/* Menu Makanan */}
      <div className='grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-6 mt-8'>
        {dataMenus.map((menu, index) => {
          return (
            <CardMenu
              menu={menu}
              key={index}
              togglePopup={togglePopup}
              addToCart={addToCart}
            />
          );
        })}
      </div>

      {/* Popup */}
      {selectedMenu && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-1/3 max-md:w-11/12 max-lg:w-1/2'>
            {/* <div className='bg-white rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3'> */}
            <img
              src={selectedMenu.image}
              alt={selectedMenu.nama_makanan}
              className='w-full h-64 object-cover rounded-lg'
            />
            <h3 className='text-2xl font-semibold mt-4'>
              {selectedMenu.nama_makanan}
            </h3>
            <p className='text-gray-600 my-2'>{selectedMenu.deskripsi}</p>
            <p className='text-lg font-bold'>
              Rp {selectedMenu.harga.toLocaleString('id-ID')}
            </p>

            <div className='flex items-center gap-4 mt-4 max-sm:place-content-evenly'>
              <button
                onClick={decreaseQty}
                className='bg-gray-200 text-gray-700 px-3 py-1 rounded-md'
              >
                -
              </button>
              <span className='text-lg'>{quantity}</span>
              <button
                onClick={increaseQty}
                className='bg-gray-200 text-gray-700 px-3 py-1 rounded-md'
              >
                +
              </button>
            </div>

            <div className='flex justify-center gap-4 mt-6 max-sm:flex-col-reverse'>
              <button
                onClick={closePopup}
                className='bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full w-1/2 max-sm:w-full'
              >
                Tutup
              </button>
              <button
                className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full w-1/2 max-sm:w-full'
                onClick={() => {
                  console.log(selectedMenu);
                  addToCart(selectedMenu);
                }}
              >
                Keranjang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer Cart */}
      <div
        className={`fixed inset-0 flex justify-end z-50 transition-all duration-500 ${
          CartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className='fixed inset-0 bg-gray-500/75' aria-hidden='true'></div>
        {/* <div
          className={`relative w-80 max-w-full bg-white shadow-xl transition-all duration-500 transform ${
            CartOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        > */}
          <div
          className='relative w-80 max-w-full bg-white shadow-xl transition-all duration-500 transform translate-x-0'
        ></div>
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
                cart.map((menu, index) => (
                  <div
                    key={index}
                    className='flex justify-between items-center mb-4'
                  >
                    <div>
                      <h3 className='text-sm font-semibold'>
                        {menu.nama_makanan}
                      </h3>
                      <p className='text-sm text-gray-500'>
                        Rp {menu.harga.toLocaleString('id-ID')}
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
                  Pesan Sekarang
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
