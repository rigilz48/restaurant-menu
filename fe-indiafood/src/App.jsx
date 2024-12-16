import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Header from './components/Header';
import Footer from './components/Footer';

import CardMenu from './components/CardMenu';
import DrawerCart from './components/DrawerCart';
import PopupMenu from './components/PopupMenu';
import ConfirmDialog from './components/ConfirmDialog';
import PreparingDialog from './components/PreparingDialog';

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State untuk gambar slideshow
  const [slideshowImages] = useState([
    '/banner1.webp',
    '/banner2.webp',
    '/banner3.webp',
  ]); // Array gambar untuk slideshow

  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [cart, setCart] = useState([]);
  const [CartOpen, setCartOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPreparingDialog, setShowPreparingDialog] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % slideshowImages.length
      );
    }, 3000); // Ganti gambar setiap 3 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen unmount
  }, [slideshowImages.length]);

  // Fetch Menu menggunakan react query
  const fetchMenus = async () => {
    const url = 'https://seemly-hail-eel.glitch.me/menus';
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.json();
  };

  const {
    data: dataMenus,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['menus'], // Query key
    queryFn: fetchMenus, // Fungsi untuk mengambil data
  });

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

  const addToCart = (menu) => {
    // Memeriksa menu ada di keranjang
    const existingMenu = cart.findIndex(
      (item) => item.id_makanan === menu.id_makanan
    );
    if (existingMenu >= 0) {
      // Jika ada perbarui
      const updateCart = [...cart];
      updateCart[existingMenu].quantity += quantity;
      setCart(updateCart);
    } else {
      //Jika belum ada, tambahkan ke keranjang
      setCart([...cart, { ...menu, quantity }]);
    }
    setShowAlert(true);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const toggleCart = () => {
    setCartOpen(!CartOpen);
  };

  const handleConfirmOrder = () => {
    setShowConfirmDialog(false);
    setShowPreparingDialog(true);

    // Hapus keranjang
    setTimeout(() => {
      setCart([]);
      setShowPreparingDialog(false);
    }, 3000);
  };

  return (
    <>
      <div className='bg-gray-50 flex flex-col min-h-screen'>
        <Header cart={cart} toggleCart={toggleCart} />
        <main className='container mx-auto px-6 py-8 flex-grow'>
          {/* Banner */}
          <div className='overflow-hidden gap-4 max-md:gap-0'>
            {/* Desktop view showing all three banners */}
            <div className='hidden lg:grid grid-cols-3 gap-4'>
              <img
                src='/banner1.webp'
                alt='Banner 1'
                className='w-full h-40 max-lg:h-24 object-cover rounded-lg shadow-xl'
              />
              <img
                src='/banner2.webp'
                alt='Banner 2'
                className='w-full h-40 max-lg:h-24 object-cover rounded-lg shadow-xl'
              />
              <img
                src='/banner3.webp'
                alt='Banner 3'
                className='w-full h-40 max-lg:h-24 object-cover rounded-lg shadow-xl'
              />
            </div>

            {/* Mobile/Tablet auto-sliding */}
            <div className='lg:hidden'>
              <img
                src={slideshowImages[currentImageIndex]} // Image currently displayed
                alt={`Banner ${currentImageIndex + 1}`}
                className='w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover rounded-lg shadow-xl'
              />
            </div>
          </div>

          {/* Menu Makanan */}

          <div className='grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-6 mt-8'>
            {isLoading && (
              <div className='col-span-full flex justify-center items-center gap-1 min-h-[50vh]'>
                <svg
                  className='spinner'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='#9305ea'
                  viewBox='0 0 256 256'
                >
                  <path d='M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z'></path>
                </svg>
                <p>Loading Menu...</p>
              </div>
            )}
            {isError && (
              <div className='col-span-full flex justify-center items-center min-h-[50vh] text-red-500'>
                <svg
                  className='spinner'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  fill='#9305ea'
                  viewBox='0 0 256 256'
                >
                  <path d='M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,61.59,40,93.27,40,128a88,88,0,0,0,176,0c0-34.73-20.15-66.41-51.34-80.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z'></path>
                </svg>
                <p>Error Loading Menu : {error.message}</p>
              </div>
            )}
            {!isLoading &&
              !isError &&
              dataMenus.map((menu) => {
                return (
                  <CardMenu
                    menu={menu}
                    key={menu.id_makanan}
                    togglePopup={togglePopup}
                    addToCart={addToCart}
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
            showAlert={showAlert}
            closeAlert={closeAlert}
          />

          {/* Drawer Cart */}
          <DrawerCart
            cart={cart}
            CartOpen={CartOpen}
            toggleCart={toggleCart}
            onConfirmOrder={() => setShowConfirmDialog(true)}
          />

          {/* Confirm Dialog */}
          {showConfirmDialog && (
            <ConfirmDialog
              setShowConfirmDialog={setShowConfirmDialog}
              handleConfirmOrder={handleConfirmOrder}
            />
          )}

          {/* Preparing Dialog */}
          {showPreparingDialog && <PreparingDialog />}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default App;
