import { FiMail, FiPhone, FiMapPin, FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 border-t border-slate-800 w-full text-left mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & Info */}
        <div className="space-y-4">
          <div className="text-2xl font-black text-white flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-red-500 text-white flex items-center justify-center text-lg shadow-md">
              🍔
            </div>
            <span className="tracking-tight">CariMakan</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed">
            Menyajikan kemudahan dalam mencari dan menikmati hidangan kuliner terbaik langsung di depan pintu rumah Anda.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-orange-500 transition-colors duration-200">
              <FiInstagram />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-orange-500 transition-colors duration-200">
              <FiTwitter />
            </a>
            <a href="#" className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center hover:bg-orange-500 transition-colors duration-200">
              <FiFacebook />
            </a>
          </div>
        </div>

        {/* Column 2: Navigasi */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Navigasi Cepat</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/home" className="hover:text-white transition-colors">Menu Utama</Link>
            </li>
            <li>
              <Link to="/keranjang" className="hover:text-white transition-colors">Keranjang Belanja</Link>
            </li>
            <li>
              <Link to="/riwayat" className="hover:text-white transition-colors">Riwayat Transaksi</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Hubungi Kami */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Hubungi Kami</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2.5">
              <FiMapPin className="text-orange-500 text-lg shrink-0" />
              <span>Bandar Lampung, Indonesia</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FiPhone className="text-orange-500 text-lg shrink-0" />
              <span>+62 812-3456-7890</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FiMail className="text-orange-500 text-lg shrink-0" />
              <span>support@carimakan.id</span>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h4 className="text-white font-extrabold text-sm uppercase tracking-wider">Newsletter</h4>
          <p className="text-sm">Dapatkan info promo & menu baru mingguan langsung di emailmu.</p>
          <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Email Anda"
              className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            <button className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl text-xs transition duration-200 cursor-pointer">
              Gabung
            </button>
          </form>
        </div>

      </div>

      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-gray-500 w-full">
        <p>© 2026 CariMakan. Dibuat dengan penuh rasa cinta dan rasa lapar. 😋</p>
      </div>
    </footer>
  );
}

export default Footer;