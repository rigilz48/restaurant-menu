/* eslint-disable react/prop-types */
import { lazy, Suspense, useState } from 'react';

// Css
import './Home.css';

// Hooks
import useMenu from '../../hooks/useFetchMenu';

// Components
import LoadingFallback from '../../components/LoadingFallback';
import Banner from '../../components/Banner';
import SearchBar from '../../components/SearchBar';
import CardMenu from '../../components/CardMenu';
import Pagination from '../../components/Pagination';
import DrawerCart from '../../components/DrawerCart';
import PopupMenu from '../../components/PopupMenu';
const ConfirmDialog = lazy(() => import('../../components/ConfirmDialog'));
const PreparingDialog = lazy(() => import('../../components/PreparingDialog'));

// Icons
import { CircleNotch } from '@phosphor-icons/react';

const Home = ({
  searchQuery,
  setSearchQuery,
  cart,
  setCart,
  addToCart,
  quantity,
  setQuantity,
  showAlert,
  closeAlert,
  cartOpen,
  toggleCart,
  slideshowImages,
}) => {
  const [page, setPage] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showPreparingDialog, setShowPreparingDialog] = useState(false);

  const {
    data: { menu: dataMenu = [], totalPages = 0 } = {},
    isLoading,
    isError,
    error,
    isFetching,
    isPlaceholderData,
  } = useMenu(page, searchQuery);

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
      <div className='relative mb-14'>
        {/* Banner */}
        <Banner slideshowImages={slideshowImages} />

        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <div className='container mx-auto px-6 grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 gap-6 mt-8'>
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
          dataMenu.map((menu) => (
            <CardMenu
              key={menu.id_makanan}
              menu={menu}
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

      <Suspense fallback={<LoadingFallback />}>
        {showConfirmDialog && (
          <ConfirmDialog
            setShowConfirmDialog={setShowConfirmDialog}
            handleConfirmOrder={handleConfirmOrder}
          />
        )}
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        {showPreparingDialog && <PreparingDialog />}
      </Suspense>
    </>
  );
};

export default Home;
