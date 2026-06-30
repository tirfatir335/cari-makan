import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FiMenu, FiX, FiShoppingCart, FiClock, FiLogOut, FiUser } from "react-icons/fi";

function Header() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const totalItem = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logout berhasil");
    navigate("/login");
  };

  return (
    <header className="bg-white/70 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-100/80 px-4 sm:px-6 py-3.5 flex justify-between items-center shadow-sm w-full text-left">
      {/* Logo */}
      <Link to="/home" className="flex items-center gap-3 group">
        <div className="w-11 h-11 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center text-2xl shadow-inner transform group-hover:rotate-12 transition-all duration-300">
          🍔
        </div>
        <div>
          <h1 className="text-lg font-black text-gray-900 tracking-tight leading-none my-0 py-0">
            CariMakan
          </h1>
          <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-wider">
            Delivering Joy
          </p>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {!user ? (
          <>
            <Link
              to="/login"
              className="text-sm font-bold text-gray-605 text-gray-500 hover:text-orange-500 transition duration-200"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 text-sm font-black text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Daftar Gratis
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 border border-gray-100 px-4 py-2 rounded-2xl">
              <FiUser className="text-orange-500" />
              <span>Halo, {user.nama}</span>
            </div>

            <Link
              to="/riwayat"
              className="flex items-center gap-2 hover:bg-gray-50 px-4 py-2.5 rounded-2xl transition duration-200 border border-transparent hover:border-gray-100 text-gray-600 text-sm font-bold"
            >
              <FiClock className="text-lg text-orange-500" />
              <span>Riwayat</span>
            </Link>

            <Link
              to="/keranjang"
              className="flex items-center gap-2 hover:bg-orange-50 hover:text-orange-600 px-4 py-2.5 rounded-2xl transition duration-200 border border-transparent hover:border-orange-100 text-gray-600 relative text-sm font-bold"
            >
              <FiShoppingCart className="text-lg text-orange-500" />
              <span>Keranjang ({totalItem})</span>
              {totalItem > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold border-2 border-white animate-bounce">
                  {totalItem}
                </span>
              )}
            </Link>

            {user.role === "admin" && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-2xl transition"
              >
                Panel Admin
              </Link>
            )}

            <button
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-700 rounded-2xl transition duration-200"
              onClick={handleLogout}
            >
              <FiLogOut />
              <span>Keluar</span>
            </button>
          </>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden p-2 text-gray-650 text-gray-500 hover:bg-gray-100 rounded-xl transition cursor-pointer"
      >
        {isMobileOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white border-b border-gray-150 shadow-lg flex flex-col p-6 space-y-4 md:hidden transition-all duration-300 z-50">
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 text-center text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-xl transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 text-center text-sm font-black text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md transition"
              >
                Daftar Gratis
              </Link>
            </>
          ) : (
            <>
              <div className="text-sm font-bold text-gray-700 bg-gray-50 border border-gray-100 px-4 py-3 rounded-xl flex items-center gap-2">
                <FiUser className="text-orange-500" />
                <span>Halo, {user.nama}</span>
              </div>
              <Link
                to="/riwayat"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 text-left px-4 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl flex items-center gap-2 transition"
              >
                <FiClock className="text-orange-500" />
                <span>Riwayat Pesanan</span>
              </Link>
              <Link
                to="/keranjang"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3 text-left px-4 text-sm font-bold text-gray-600 hover:bg-gray-50 rounded-xl flex items-center justify-between transition"
              >
                <div className="flex items-center gap-2">
                  <FiShoppingCart className="text-orange-500" />
                  <span>Keranjang Belanja</span>
                </div>
                <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full text-xs font-black">
                  {totalItem}
                </span>
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full py-3 text-center text-sm font-bold text-slate-900 border border-slate-900 rounded-xl hover:bg-slate-50 transition"
                >
                  Panel Admin
                </Link>
              )}
              <button
                className="w-full py-3 text-left px-4 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl flex items-center gap-2 transition cursor-pointer"
                onClick={() => {
                  setIsMobileOpen(false);
                  handleLogout();
                }}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;