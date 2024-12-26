import { PropTypes } from 'prop-types';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className='absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-4 rounded-full flex items-center w-[90%] max-w-md z-[5]'>
      <input
        type='text'
        placeholder='Cari Makananmu'
        className='flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.isRequired,
};

export default SearchBar;
