import { FaSearch } from "react-icons/fa";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative max-w-xl mx-auto w-full my-6 shadow-sm rounded-2xl border border-gray-200 overflow-hidden bg-white focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all duration-200">
      <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
      <input
        type="text"
        className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-400 focus:outline-none text-base border-none font-medium bg-transparent text-left"
        placeholder="Cari makanan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;