/* eslint-disable react/prop-types */
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {
  // Fungsi untuk menentukan halaman yang akan ditampilkan
  const generatePages = () => {
    const pages = [];

    // Jika total halaman lebih kecil atau sama dengan 7 (cukup tampil semua)
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 1) {
        // Jika currentPage di awal (halaman 1-3)
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Jika currentPage di akhir (halaman terakhir - 3 ke atas)
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Jika currentPage di tengah
        pages.push(
          1,
          '...',
          currentPage - 0,
          currentPage + 1,
          currentPage + 2,
          '...',
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 shadow-md rounded-full mt-6'>
      {/* Mobile Pagination */}
      <div className='flex flex-1 justify-between sm:hidden'>
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
          disabled={currentPage === 0}
          className={`relative inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            currentPage === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-purple-50'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() =>
            onPageChange(Math.min(currentPage + 1, totalPages - 1))
          }
          disabled={currentPage === totalPages - 1}
          className={`relative ml-3 inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            currentPage === totalPages - 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-purple-50'
          }`}
        >
          Next
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-center'>
        <div>
          <nav
            aria-label='Pagination'
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
          >
            {/* Tombol Previous */}
            <button
              onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
              disabled={currentPage === 0}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 ${
                currentPage === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-purple-600 hover:bg-gray-50'
              }`}
            >
              <span className='sr-only'>Previous</span>
              <CaretLeft
                aria-hidden='true'
                className='size-5 text-purple-600'
              />
            </button>

            {/* Nomor Halaman */}
            {generatePages().map((page, index) =>
              page === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0'
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page - 1)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 ${
                    currentPage === page - 1
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-900 hover:bg-purple-50'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            {/* Tombol Next */}
            <button
              onClick={() =>
                onPageChange(Math.min(currentPage + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 ${
                currentPage === totalPages - 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-purple-600 hover:bg-gray-50'
              }`}
            >
              <span className='sr-only'>Next</span>
              <CaretRight
                aria-hidden='true'
                className='size-5 text-purple-600'
              />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
