import { useState, useEffect } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import Header from './components/Header';
import Footer from './components/Footer';

import CardMenu from './components/CardMenu';
import Pagination from './components/Pagination';
import DrawerCart from './components/DrawerCart';
import PopupMenu from './components/PopupMenu';
import ConfirmDialog from './components/ConfirmDialog';
import PreparingDialog from './components/PreparingDialog';

import { CircleNotch } from '@phosphor-icons/react';

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [slideshowImages] = useState([
    '/banner1.webp',
    '/banner2.webp',
    '/banner3.webp',
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
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
  const fetchMenus = async (page, searchQuery) => {
    const limit = 8; // Jumlah data per halaman
    const url = new URL(`https://seemly-hail-eel.glitch.me/menus`);
    url.searchParams.append('page', page);
    url.searchParams.append('limit', limit);

    if (searchQuery) {
      url.searchParams.append('search', searchQuery);
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    const totalPages = Math.ceil(data.totalData / limit); // Hitung total halaman
    return { menus: data.data || [], totalPages }; // Kembalikan data menus dan totalPages
  };

  const {
    data: { menus = [], totalPages = 0 } = {}, // Ambil totalPages
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['menus', page, searchQuery], // Query key
    queryFn: () => fetchMenus(page, searchQuery), // Fungsi untuk mengambil data
    placeholderData: keepPreviousData,
    keepPreviousData: true,
  });

  const hasMore = page < totalPages; // Tentukan apakah ada lebih banyak halaman

  const togglePopup = (event, food) => {
    event.preventDefault();
    setSelectedMenu(food);
  };

  const closePopup = () => {
    setSelectedMenu(null);
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity((prevQty) => (prevQty < 10 ? prevQty + 1 : prevQty));
  };

  const decreaseQuantity = () => {
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
    setCartOpen(!cartOpen);
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
    <div className='bg-gray-50 flex flex-col min-h-screen'>
      <Header cart={cart} toggleCart={toggleCart} />
      <main className='container mx-auto px-6 pb-8 flex-grow'>
        <div className='relative mb-14'>
          {/* Banner */}
          <div className='relative overflow-hidden rounded-b-3xl'>
            <img
              src={slideshowImages[currentImageIndex]}
              alt={`Banner ${currentImageIndex + 1}`}
              loading='lazy'
              className='w-full h-[300px] object-cover'
            />
            <div className='absolute top-0 left-0 w-full h-full bg-orange-600 bg-opacity-80 flex flex-col justify-center items-center'>
              <h1 className='text-white text-2xl md:text-4xl font-bold text-center'>
                Nikmati Makanan Khas India!
              </h1>
              <p className='text-white mt-2 text-center'>
                Pesan berbagai makanan khas India seperti Nasi Biryani, Chicken
                Tikka, dan Butter Naan secara online. Cepat, mudah, dan banyak
                pilihan!
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className='absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-full flex items-center w-[90%] max-w-md'>
            <input
              type='text'
              placeholder='Cari Makananmu'
              className='flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className='grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-6 mt-8'>
          {isLoading || (isFetching && isPlaceholderData) ? (
            <div className='col-span-full flex justify-center items-center gap-1 min-h-[50vh]'>
              <CircleNotch
                size={24}
                className='spinner text-orange-500 fill-current'
              />
              <p>Menampilkan Menu</p>
            </div>
          ) : isError ? (
            <div className='col-span-full flex justify-center items-center min-h-[50vh] text-red-500'>
              <CircleNotch
                size={24}
                className='spinner text-orange-500 fill-current'
              />
              <p>Error Menu: {error.message}</p>
            </div>
          ) : (
            menus.map((menu) => (
              <CardMenu
                menu={menu}
                key={menu.id_makanan}
                togglePopup={togglePopup}
                addToCart={addToCart}
              />
            ))
          )}
        </div>

        <Pagination
          currentPage={page}
          onPageChange={setPage}
          totalPages={totalPages}
          isPlaceholderData={isPlaceholderData}
          hasMore={hasMore}
        />

        <PopupMenu
          selectedMenu={selectedMenu}
          decreaseQty={decreaseQuantity}
          quantity={quantity}
          increaseQty={increaseQuantity}
          addToCart={addToCart}
          closePopup={closePopup}
          showAlert={showAlert}
          closeAlert={closeAlert}
        />

        <DrawerCart
          cart={cart}
          cartOpen={cartOpen}
          toggleCart={toggleCart}
          onConfirmOrder={() => setShowConfirmDialog(true)}
        />

        {showConfirmDialog && (
          <ConfirmDialog
            setShowConfirmDialog={setShowConfirmDialog}
            handleConfirmOrder={handleConfirmOrder}
          />
        )}

        {showPreparingDialog && <PreparingDialog />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
