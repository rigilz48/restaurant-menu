/* eslint-disable react/prop-types */
const CardMenu = ({ menu, togglePopup }) => {
  return (
    <a
      href='#'
      onClick={(event) => togglePopup(event, menu)}
      className='bg-white border rounded-lg p-2 shadow hover:shadow-lg transform hover:-translate-y-2 transition max-md:flex max-md:flex-row max-md:items-center max-md:gap-4'
    >
      <img
        src={menu.image}
        alt={menu.nama_makanan}
        className='w-full max-md:w-1/2 h-48 object-cover rounded-lg'
      />
      <div className='max-md:flex-1'>
        <h3 className='text-lg font-semibold mt-4 max-md:mt-0 max-md:mb-2'>
          {menu.nama_makanan}
        </h3>
        <p className='text-base text-gray-500 mb-2'>
          Rp {menu.harga.toLocaleString('id-ID')}
        </p>
      </div>
    </a>
  );
};

export default CardMenu;
