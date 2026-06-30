import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import Kategori from "./components/Kategori";
import FoodCard from "./components/FoodCard";
import Footer from "./components/Footer";
import DetailMakanan from "./pages/DetailMakanan";
import Keranjang from "./pages/Keranjang";
import Riwayat from "./pages/Riwayat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Navigate } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import MakananAdmin from "./pages/MakananAdmin";
import PenggunaAdmin from "./pages/PenggunaAdmin";
import TambahMakanan from "./pages/TambahMakanan";
import EditMakanan from "./pages/EditMakanan";
import RatingMakanan from "./pages/RatingMakanan";



function App() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch("http://localhost:5000/api/makanan")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data dari database");
        return res.json();
      })
      .then((data) => {
        setFoods(data);
      })
      .catch((err) => {
        console.error("Error loading foods:", err);
        setError("Gagal memuat data makanan dari database lokal.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const kategoriList = [
    "Semua",
    "Makanan Utama",
    "Bakso & Soto",
    "Mie & Pasta",
    "Fast Food",
    "Minuman",
    "Dessert",
    "Cake & Bakery",
  ];

  const filteredFoods = foods.filter((food) => {
    const cocokNama = food.nama.toLowerCase().includes(search.toLowerCase());
    const cocokKategori = kategori === "Semua" || food.kategori === kategori;
    return cocokNama && cocokKategori;
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* HOME */}
        <Route
          path="/home"
          element={
            <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-gray-50 to-red-50/20 flex flex-col font-sans relative overflow-hidden">
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl -z-10"></div>
              <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-200/10 rounded-full blur-3xl -z-10"></div>
              <Header />
              <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-8">
                <Hero />
                
                <div className="mt-12">
                  <SearchBar search={search} setSearch={setSearch} />
                </div>

                <div className="my-10 text-left bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-150/40">
                  <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2" id="kategori-pilihan">
                    🍱 Kategori Pilihan
                  </h2>
                  <p className="text-gray-500 mt-1.5 text-sm">
                    Temukan berbagai jenis hidangan dan minuman favoritmu dengan mudah dan cepat.
                  </p>
                </div>

                <Kategori
                  kategori={kategori}
                  setKategori={setKategori}
                  kategoriList={kategoriList}
                />

                {/* Promo Banner Section */}
                <div className="my-12 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-left">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                  <div className="space-y-3 z-10">
                    <span className="px-3 py-1 bg-white/20 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Promo Spesial Pengguna Baru 🔥
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black">Diskon Hingga 50% untuk Transaksi Pertama!</h3>
                    <p className="opacity-90 max-w-xl text-xs md:text-sm leading-relaxed">
                      Gunakan kode voucher <span className="font-bold bg-white/20 px-2 py-0.5 rounded">CARIMAKANNEW</span> saat melakukan checkout pertama dan dapatkan gratis ongkos kirim.
                    </p>
                  </div>
                  <a
                    href="#menu-section"
                    className="px-6 py-3 bg-white hover:bg-gray-100 text-orange-600 font-extrabold rounded-xl shadow transition duration-200 text-xs shrink-0 cursor-pointer"
                  >
                    Klaim Voucher Sekarang 🎟️
                  </a>
                </div>

                <div className="my-10 text-left border-b pb-4 flex justify-between items-center" id="menu-section">
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">🍔 Menu Hidangan Populer</h2>
                    <p className="text-gray-500 mt-1 text-sm">Pilih menu favorit Anda yang diolah oleh koki profesional.</p>
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
                    <p className="mt-4 text-gray-650 text-gray-600 font-medium text-lg">Memasak hidangan lezat untukmu...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center my-10 max-w-lg mx-auto border border-red-200 shadow-sm">
                    <p className="text-xl font-bold mb-2">⚠️ Terjadi Kendala</p>
                    <p className="text-sm opacity-90">{error}</p>
                  </div>
                ) : filteredFoods.length === 0 ? (
                  <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 my-8">
                    <p className="text-gray-500 text-base font-medium">Tidak ada makanan yang cocok dengan pencarian Anda.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
                    {filteredFoods.map((food) => (
                      <FoodCard key={food.id} food={food} />
                    ))}
                  </div>
                )}

                {/* Testimonial Section */}
                <div className="my-20 text-left">
                  <div className="max-w-lg mb-12">
                    <span className="text-xs font-black text-orange-600 uppercase tracking-widest">Testimoni</span>
                    <h2 className="text-3xl font-black text-gray-900 mt-1">Apa Kata Mereka? 🥰</h2>
                    <p className="text-gray-500 mt-2 text-sm">Ulasan dari pelanggan setia CariMakan yang telah merasakan kelezatan dan kecepatan layanan kami.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-150/45 shadow-sm flex flex-col justify-between">
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        "Sangat membantu saat mager masak siang-siang! Pesanannya cepat datang, makanannya masih hangat, dan harganya terjangkau."
                      </p>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-700">A</div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-sm">Ahmad Fauzi</h4>
                          <p className="text-xs text-gray-400">Mahasiswa</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-150/45 shadow-sm flex flex-col justify-between">
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        "Aplikasi paling ramah pengguna! Fitur keranjang belanjanya lancar banget, metode pembayarannya pun lengkap. Sangat puas."
                      </p>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-700">R</div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-sm">Rina Amelia</h4>
                          <p className="text-xs text-gray-400">Pegawai Kantor</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-150/45 shadow-sm flex flex-col justify-between">
                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        "Pilihan menu makanannya banyak banget dan resepnya enak! Ditambah pesanan lokal langganan saya juga ada. Rekomendasi banget!"
                      </p>
                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">B</div>
                        <div>
                          <h4 className="font-extrabold text-gray-900 text-sm">Budi Santoso</h4>
                          <p className="text-xs text-gray-400">Wiraswasta</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </main>
              <Footer />
            </div>
          }
        />

        {/* DETAIL */}
        <Route
          path="/makanan/:id"
          element={<DetailMakanan />}
        />
        {/* REGISTER */}
      
      <Route
       path="/register"
      element={<Register />}
      />

      {/* LOGIN */}
      <Route
      path="/login"
      element={<Login />}
      />

      {/* ADMIN */}
        <Route
        path="/admin"
        element={
        user?.role === "admin" ? (
        <AdminDashboard />
        ) : (
         <Navigate to="/" />
        )
        }
      />
      <Route
  path="/admin/makanan"
  element={
    user?.role === "admin" ? (
      <MakananAdmin />
    ) : (
      <Navigate to="/" />
    )
  }
/>

<Route
  path="/admin/pengguna"
  element={
    user?.role === "admin" ? (
      <PenggunaAdmin />
    ) : (
      <Navigate to="/" />
    )
  }
/>
        {/* KERANJANG */}
        <Route
          path="/keranjang"
          element={<Keranjang />}
        />

        <Route
        path="/riwayat"
        element={<Riwayat />}
        />

        <Route
        path="/admin/tambah-makanan"
        element={<TambahMakanan />}
      />
      <Route
        path="/admin/edit-makanan/:id"
        element={<EditMakanan />}
      />

      <Route
        path="/rating/:id"
        element={<RatingMakanan />}
      />
      </Routes>
    </BrowserRouter>
  );
}

export default App;