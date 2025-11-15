import React from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  showInfo = true,
  className = "",
}) => {
  // Calculate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        // Show first 4 pages + ellipsis + last page
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 4 pages
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Info Section */}
      {showInfo && (
        <div className="flex-1 flex justify-between sm:hidden">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </div>
        </div>
      )}

      {/* Desktop Pagination */}
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        {showInfo && (
          <div>
            <p className="text-xs xs:text-sm text-gray-700">
              Showing <span className="font-medium">{startItem}</span> to{" "}
              <span className="font-medium">{endItem}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm font-medium rounded-md transition-colors ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <FaChevronLeft className="w-3 h-3 xs:w-4 xs:h-4 mr-1" />
            <span className="hidden xs:inline">Previous</span>
            <span className="xs:hidden">Prev</span>
          </motion.button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {pageNumbers.map((page, index) => {
              if (page === "ellipsis") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="relative inline-flex items-center px-2 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-medium text-gray-700"
                  >
                    <FaEllipsisH className="w-3 h-3 xs:w-4 xs:h-4" />
                  </span>
                );
              }

              const isCurrentPage = page === currentPage;
              return (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-2 xs:px-4 py-1.5 xs:py-2 text-xs xs:text-sm font-medium rounded-md transition-colors ${
                    isCurrentPage
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </motion.button>
              );
            })}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 xs:px-3 py-1.5 xs:py-2 text-xs xs:text-sm font-medium rounded-md transition-colors ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed bg-gray-100"
                : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <span className="hidden xs:inline">Next</span>
            <span className="xs:hidden">Next</span>
            <FaChevronRight className="w-3 h-3 xs:w-4 xs:h-4 ml-1" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Pagination */}
      <div className="flex-1 flex justify-between sm:hidden">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-3 xs:px-4 py-2 border text-xs xs:text-sm font-medium rounded-md transition-colors ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed bg-gray-100 border-gray-300"
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
          }`}
        >
          Previous
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`ml-3 relative inline-flex items-center px-3 xs:px-4 py-2 border text-xs xs:text-sm font-medium rounded-md transition-colors ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed bg-gray-100 border-gray-300"
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
          }`}
        >
          Next
        </motion.button>
      </div>
    </div>
  );
};

export default Pagination;
