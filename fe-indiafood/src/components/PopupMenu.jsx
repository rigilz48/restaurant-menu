/* eslint-disable react/prop-types */

const PopupMenu = ({
  selectedMenu,
  decreaseQty,
  quantity,
  increaseQty,
  addToCart,
  closePopup,
  showAlert,
  closeAlert,
}) => {
  return (
    <>
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

          {showAlert && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <div className='bg-white rounded-lg p-6 w-1/3 max-md:w-11/12'>
                <h3 className='text-2xl font-semibold'>
                  Menu berhasil ditambahkan ke keranjang!
                </h3>
                <button
                  onClick={closeAlert}
                  className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full mt-4 w-full'
                >
                  OK
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default PopupMenu;
