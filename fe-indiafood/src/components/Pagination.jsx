/* eslint-disable react/prop-types */
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

const Pagination = ({
  currentPage,
  onPageChange,
  totalPages,
  isPlaceholderData,
  hasMore,
}) => {
  // Pastikan currentPage dan totalPages berupa angka
  const safeCurrentPage = Number.isNaN(currentPage) ? 1 : currentPage;
  const safeTotalPages = Number.isNaN(totalPages) ? 1 : totalPages;

  // Fungsi untuk menentukan halaman yang akan ditampilkan
  const generatePages = () => {
    const pages = [];
    const maxPagesToShow = 7;

    // Jika total halaman lebih kecil atau sama dengan 7 (cukup tampil semua)
    if (safeTotalPages <= maxPagesToShow) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safeCurrentPage <= 3) {
        // Jika currentPage di awal (halaman 1-3)
        pages.push(1, 2, 3, 4, '...', safeTotalPages);
      } else if (safeCurrentPage >= safeTotalPages - 2) {
        // Jika currentPage di akhir (halaman terakhir - 3 ke atas)
        pages.push(
          1,
          '...',
          safeTotalPages - 3,
          safeTotalPages - 2,
          safeTotalPages - 1,
          safeTotalPages
        );
      } else {
        // Jika currentPage di tengah
        pages.push(
          1,
          '...',
          safeCurrentPage - 1,
          safeCurrentPage,
          safeCurrentPage + 1,
          '...',
          safeTotalPages
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
          onClick={() => onPageChange(Math.max(safeCurrentPage - 1, 1))}
          disabled={safeCurrentPage === 1 || isPlaceholderData}
          className={`relative inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            safeCurrentPage === 1 || isPlaceholderData
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-orange-50'
          }`}
        >
          Previous
        </button>
        <button
          onClick={() =>
            onPageChange(Math.min(safeCurrentPage + 1, safeTotalPages))
          }
          disabled={
            safeCurrentPage === safeTotalPages || isPlaceholderData || !hasMore
          }
          className={`relative ml-3 inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
            safeCurrentPage === safeTotalPages || isPlaceholderData || !hasMore
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-700 hover:bg-orange-50'
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
              onClick={() => onPageChange(Math.max(safeCurrentPage - 1, 1))}
              disabled={safeCurrentPage === 1 || isPlaceholderData}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 ${
                safeCurrentPage === 1 || isPlaceholderData
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-orange-600 hover:bg-gray-50'
              }`}
            >
              <span className='sr-only'>Previous</span>
              <CaretLeft
                aria-hidden='true'
                className='size-5 text-orange-600'
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
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 ${
                    safeCurrentPage === page
                      ? 'bg-orange-600 text-white'
                      : 'text-gray-900 hover:bg-orange-50'
                  }`}
                  disabled={isPlaceholderData}
                >
                  {page}
                </button>
              )
            )}

            {/* Tombol Next */}
            <button
              onClick={() =>
                onPageChange(Math.min(safeCurrentPage + 1, safeTotalPages))
              }
              disabled={
                safeCurrentPage === safeTotalPages ||
                isPlaceholderData ||
                !hasMore
              }
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 ${
                safeCurrentPage === safeTotalPages ||
                isPlaceholderData ||
                !hasMore
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-orange-600 hover:bg-gray-50'
              }`}
            >
              <span className='sr-only'>Next</span>
              <CaretRight
                aria-hidden='true'
                className='size-5 text-orange-600'
              />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
