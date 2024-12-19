const PreparingDialog = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg text-center max-w-[90%] sm:max-w-[400px]'>
        <h2 className='text-xl font-semibold mb-4'>
          Makanan kamu sedang disiapkan, ditunggu yaa!
        </h2>
        <img
          src='/preparing.webp'
          alt='Preparing'
          loading='lazy'
          className='w-96 h-64 mx-auto max-w-full max-h-48 sm:h-auto sm:w-auto'
        />
      </div>
    </div>
  );
};

export default PreparingDialog;
