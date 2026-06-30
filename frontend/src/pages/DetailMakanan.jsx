import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import nasigoreng from "../assets/makanan/Nasi Goreng.jpeg";
import bakso from "../assets/makanan/Bakso.jpeg";
import mieayam from "../assets/makanan/Mie Ayam.jpeg";
import burger from "../assets/makanan/Burger.jpeg";
import ayamgeprek from "../assets/makanan/Ayam Geprek.jpeg";
import sateayam from "../assets/makanan/Sate Ayam.jpeg";
import rendang from "../assets/makanan/Rendang.jpeg";
import sotoayam from "../assets/makanan/Soto Ayam.jpeg";
import sotobetawi from "../assets/makanan/Soto Betawi.jpeg";
import miegoreng from "../assets/makanan/Mie Goreng.jpeg";
import spaghetti from "../assets/makanan/Spaghetti.jpeg";
import pizza from "../assets/makanan/Pizza.jpeg";
import hotdog from "../assets/makanan/Hotdog.jpeg";
import esteh from "../assets/makanan/Es Teh Manis.jpeg";
import jusalpukat from "../assets/makanan/Jus Alpukat.jpeg";
import kopisusu from "../assets/makanan/Kopi Susu.jpeg";
import brownies from "../assets/makanan/Brownies.jpeg";
import puding from "../assets/makanan/Puding Coklat.jpeg";
import cheesecake from "../assets/makanan/Cheesecake.jpeg";
import redvelvet from "../assets/makanan/Red Velvet Cake.jpeg";

const gambarMap = {
  "Nasi Goreng.jpeg": nasigoreng,
  "Bakso.jpeg": bakso,
  "Mie Ayam.jpeg": mieayam,
  "Burger.jpeg": burger,
  "Ayam Geprek.jpeg": ayamgeprek,
  "Sate Ayam.jpeg": sateayam,
  "Rendang.jpeg": rendang,
  "Soto Ayam.jpeg": sotoayam,
  "Soto Betawi.jpeg": sotobetawi,
  "Mie Goreng.jpeg": miegoreng,
  "Spaghetti.jpeg": spaghetti,
  "Pizza.jpeg": pizza,
  "Hotdog.jpeg": hotdog,
  "Es Teh Manis.jpeg": esteh,
  "Jus Alpukat.jpeg": jusalpukat,
  "Kopi Susu.jpeg": kopisusu,
  "Brownies.jpeg": brownies,
  "Puding Coklat.jpeg": puding,
  "Cheesecake.jpeg": cheesecake,
  "Red Velvet Cake.jpeg": redvelvet,
};

function DetailMakanan() {
  const { id } = useParams();

  const [makanan, setMakanan] = useState(null);
  const [ulasan, setUlasan] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    const foodFetch = fetch(`http://localhost:5000/api/makanan/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil detail makanan dari database");
        return res.json();
      });

    const ulasanFetch = fetch(`http://localhost:5000/api/ulasan/${id}`)
      .then((res) => res.json())
      .catch((err) => {
        console.warn("Gagal memuat ulasan:", err);
        return [];
      });

    Promise.all([foodFetch, ulasanFetch])
      .then(([foodData, ulasanData]) => {
        setMakanan(foodData);
        setUlasan(ulasanData);
      })
      .catch((err) => {
        setError(err.message || "Gagal memuat detail makanan.");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500"></div>
        <p className="mt-4 text-gray-600 font-medium text-lg">Mempersiapkan resep hidangan...</p>
      </div>
    );
  }

  if (error || !makanan) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-sans px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full border border-gray-100">
          <span className="text-5xl">⚠️</span>
          <h2 className="text-xl font-bold text-gray-900 mt-4">Kesalahan Memuat</h2>
          <p className="text-gray-500 mt-2 text-sm">{error || "Data makanan tidak tersedia."}</p>
          <Link to="/home">
            <button className="mt-6 w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-xl transition duration-200 cursor-pointer">
              Kembali ke Beranda
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-gray-50 to-red-50/20 font-sans py-10 px-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-200/10 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Gambar Makanan Banner */}
        <div className="relative h-96 w-full bg-gray-100">
          <img
            src={
              gambarMap[makanan.gambar]
                ? gambarMap[makanan.gambar]
                : `${window.API_URL}/uploads/${makanan.gambar}`
            }
            alt={makanan.nama}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 text-white text-left">
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold rounded-full uppercase tracking-wider">
              {makanan.kategori}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-2 leading-tight drop-shadow-sm">
              {makanan.nama}
            </h1>
          </div>
        </div>

        {/* Detail Resep */}
        <div className="p-6 md:p-8 text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Info Ringkas */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100/50">
                <span className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Harga Estimasi</span>
                <p className="text-2xl font-bold text-orange-700 mt-1">
                  Rp {Number(makanan.harga).toLocaleString("id-ID")}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">📋 Bahan-Bahan</h3>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed whitespace-pre-line">
                  {makanan.bahan || "Tidak ada informasi bahan."}
                </p>
              </div>
            </div>

            {/* Deskripsi & Langkah */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">✍️ Deskripsi</h3>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                  {makanan.deskripsi || "Tidak ada deskripsi."}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">🍳 Langkah Pembuatan</h3>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-xl border border-gray-100">
                  {makanan.langkah_pembuatan || "Tidak ada instruksi pembuatan."}
                </p>
              </div>
            </div>

          </div>

          {/* Bagian Ulasan */}
          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              ⭐ Ulasan Pengguna
            </h2>

            {ulasan.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200 mt-4">
                <p className="text-gray-400 text-sm">Belum ada ulasan untuk hidangan ini.</p>
              </div>
            ) : (
              <div className="space-y-4 mt-4">
                {ulasan.map((u, index) => (
                  <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-800 flex items-center gap-1 text-sm">
                        👤 {u.nama}
                      </span>
                      <span className="text-yellow-500 text-sm">
                        {"★".repeat(u.rating)}{"☆".repeat(5 - u.rating)}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm italic">"{u.komentar}"</p>
                    <span className="text-gray-400 text-[11px] self-end">
                      {new Date(u.created_at).toLocaleDateString("id-ID", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tombol Aksi */}
          <div className="mt-8 flex justify-end gap-4 border-t pt-6">
            <Link to="/home">
              <button className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-xl transition duration-200 text-sm">
                Kembali
              </button>
            </Link>
            <Link to={`/rating/${id}`}>
              <button className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-xl transition duration-200 text-sm">
                Beri Rating
              </button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default DetailMakanan;