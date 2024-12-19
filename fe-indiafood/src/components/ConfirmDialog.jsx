/* eslint-disable react/prop-types */
const ConfirmDialog = ({ setShowConfirmDialog, handleConfirmOrder }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-[90%] sm:max-w-[400px]'>
        <h2 className='text-lg sm:text-xl font-semibold mb-4 text-center'>
          Yakin ingin memesan sekarang?
        </h2>
        <div className='flex justify-end sm:justify-end gap-4'>
          <button
            onClick={() => setShowConfirmDialog(false)}
            className='px-4 py-2 bg-gray-300 rounded-full w-full sm:w-auto'
          >
            Nanti dulu deh
          </button>
          <button
            onClick={handleConfirmOrder}
            className='px-4 py-2 bg-orange-600 text-white rounded-full w-full sm:w-auto'
          >
            Oke, pesan sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
