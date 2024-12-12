import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import CardMenu from './components/CardMenu';
import DrawerCart from './components/DrawerCart';

function App() {
  const [dataMenus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [CartOpen, setCartOpen] = useState(false);

  const getMenus = async () => {
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
    } finally {
      console.log('Selesai');
    }
  };

  useEffect(() => {
    getMenus();
  }, []);

  const togglePopup = (event, food) => {
    event.preventDefault();
    setSelectedMenu(food);
  };

  const closePopup = () => {
    setSelectedMenu(null);
    setQuantity(1);
  };

  const increaseQty = () => {
    if (quantity >= 10) {
      setQuantity(quantity);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const addToCart = (menu) => {
    setCart([...cart, menu]);
  };

  const toggleCart = () => {
    setCartOpen(!CartOpen);
  };

  return (
    <>
      <div className='bg-gray-50 flex flex-col min-h-screen'>
        <Header cart={cart} toggleCart={toggleCart} />
        <main className='container mx-auto px-6 py-8 flex-grow'>
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
          <DrawerCart cart={cart} CartOpen={CartOpen} toggleCart={toggleCart} />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
