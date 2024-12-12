import { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';

import CardMenu from './components/CardMenu';
import DrawerCart from './components/DrawerCart';
import PopupMenu from './components/PopupMenu';

// eslint-disable-next-line react/prop-types
const CustomAlert = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-1/3 max-md:w-11/12'>
        <h3 className='text-2xl font-semibold'>{message}</h3>
        <button
          onClick={onClose}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full mt-4'
        >
          OK
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [dataMenus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
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
    // if (quantity >= 10) {
    //   setQuantity(quantity);
    // } else {
    //   setQuantity(quantity + 1);
    // }
    // Limit quantity maks 10
    setQuantity((prevQty) => (prevQty < 10 ? prevQty + 1 : prevQty));
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  // const addToCart = (menu) => {
  //   setCart([...cart, menu]);
  // };

  const addToCart = (menu) => {
    // Memeriksa menu ada di keranjang
    const existingMenu = cart.findIndex((item) => item.id === menu.id);
    if (existingMenu >= 0) {
      // Jika ada perbarui
      const updateCart = [...cart];
      updateCart[existingMenu].quantity += quantity;
      setCart(updateCart);
      setShowAlert(true);
    } else {
      //Jika belum ada, tambahkan ke keranjang
      setCart([...cart, { ...menu, quantity }]);
      setShowAlert(true);
    }
    closePopup();
  };

  const closeAlert = () => {
    setShowAlert(false);
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
            {dataMenus.map((menu) => {
              return (
                <CardMenu
                  menu={menu}
                  key={menu.id}
                  togglePopup={togglePopup}
                  addToCart={addToCart}
                  CustomAlert={CustomAlert}
                  showAlert={showAlert}
                  closeAlert={closeAlert}
                />
              );
            })}
          </div>

          {/* Popup */}
          <PopupMenu
            selectedMenu={selectedMenu}
            decreaseQty={decreaseQty}
            quantity={quantity}
            increaseQty={increaseQty}
            addToCart={addToCart}
            closePopup={closePopup}
          />

          {/* Drawer Cart */}
          <DrawerCart cart={cart} CartOpen={CartOpen} toggleCart={toggleCart} />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
