const LoadingFallback = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-[90%] sm:max-w-[400px]'>
        <h2 className='text-lg sm:text-xl font-semibold mb-4 text-center'>
          Tunggu Sebentar ya...
        </h2>
      </div>
    </div>
  );
};

export default LoadingFallback;
