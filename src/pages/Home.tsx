import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import {
  fetchProducts,
  setSearchQuery,
  setSortBy,
} from "../redux/productsSlice";
import { RootState } from "../redux/store";
import ProductCard from "../components/ProductCard";

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const { items, sortBy, searchQuery, status } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = React.useMemo(() => {
    if (sortBy === "price") {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "rating") {
      return [...filteredProducts].sort(
        (a, b) => b.rating.rate - a.rating.rate
      );
    }
    return filteredProducts;
  }, [filteredProducts, sortBy]);

  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col w-full max-w-[70%]">
          <label htmlFor="search" className="text-sm font-semibold mb-2">
            Search for products
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
          />
        </div>

        <div className="flex flex-col ml-4 w-[25%]">
          <label htmlFor="sortBy" className="text-sm font-semibold mb-2">
            Sort By
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all"
          >
            <option value="default" disabled>
              Select an option
            </option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div
        className={`grid gap-6 ${
          paginatedProducts.length > 0
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {status === "loading" ? (
          <p>Loading products...</p>
        ) : paginatedProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))
        )}
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg mx-1 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded-lg`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg mx-1 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
