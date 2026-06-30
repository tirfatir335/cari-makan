import { Link } from "react-router-dom";
import { FiArrowRight, FiUserCheck, FiLogIn } from "react-icons/fi";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/40 via-white to-red-50/20 flex flex-col font-sans relative overflow-x-hidden">
      
      {/* Decorative Blur Circles */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-orange-300/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-red-300/10 rounded-full blur-3xl -z-10"></div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-left z-20">
        <div className="text-2xl font-black text-gray-900 flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-red-500 text-white flex items-center justify-center text-xl shadow-md">
            🍔
          </div>
          <span className="tracking-tight">CariMakan</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl w-full mx-auto px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center flex-grow text-left z-10">
        
        {/* Left Side: Copy */}
        <div className="space-y-6">
          <span className="px-3.5 py-1.5 bg-orange-100 text-orange-600 text-[10px] font-black rounded-full uppercase tracking-wider inline-block shadow-sm">
            🚚 Delivery Tercepat di Kotamu
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
            Temukan Makanan
            <br />
            Favoritmu
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent block mt-2">
              Dalam Hitungan Menit
            </span>
          </h1>

          <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md font-medium">
            CariMakan menghadirkan ratusan pilihan hidangan lezat terbaik untuk memanjakan lidah Anda. Pesan lebih mudah, cepat, dan aman langsung di depan pintu rumah Anda.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300 text-center text-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Masuk Sekarang</span>
              <FiLogIn className="text-base" />
            </Link>

            <Link
              to="/register"
              className="px-8 py-4 bg-white hover:bg-gray-50 text-orange-600 font-extrabold rounded-2xl border border-orange-200 hover:border-orange-300 transition-all duration-200 text-center text-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Daftar Gratis</span>
              <FiUserCheck className="text-base" />
            </Link>
          </div>
        </div>

        {/* Right Side: Visual Container */}
        <div className="relative flex items-center justify-center mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/20 to-red-200/10 rounded-[3rem] transform rotate-3 scale-95 -z-10"></div>
          <div className="w-full max-w-md md:max-w-lg aspect-square md:aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900"
              alt="Food"
              className="w-full h-full object-cover transform hover:scale-102 transition duration-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;