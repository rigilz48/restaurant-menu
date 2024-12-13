const PreparingDialog = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg text-center max-w-[90%] sm:max-w-[400px]'>
        <h2 className='text-xl font-semibold mb-4'>
          Makanan kamu sedang disiapkan, ditunggu yaa!
        </h2>
        <img
          src='https://img.freepik.com/free-vector/kids-learning-cook-concept-illustration_114360-20995.jpg?t=st=1734108608~exp=1734112208~hmac=16e828a52eb7437b88d6f0c4709521622e4e1f683054205a8146ce37e6b4fbcc&w=1380'
          alt='Preparing'
          className='w-96 h-64 mx-auto max-w-full max-h-48 sm:h-auto sm:w-auto'
        />
      </div>
    </div>
  );
};

export default PreparingDialog;
