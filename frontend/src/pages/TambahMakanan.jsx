import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TambahMakanan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    harga: "",
    kategori: "",
    deskripsi: "",
    bahan: "",
    langkah_pembuatan: "",
  });

  const [gambar, setGambar] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nama", form.nama);
    formData.append("harga", form.harga);
    formData.append("kategori", form.kategori);
    formData.append("deskripsi", form.deskripsi);
    formData.append("bahan", form.bahan);
    formData.append(
      "langkah_pembuatan",
      form.langkah_pembuatan
    );

    if (gambar) {
      formData.append("gambar", gambar);
    }

    const res = await fetch(
      "http://localhost:5000/api/makanan",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    alert(data.message);

    navigate("/admin/makanan");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-gray-50 to-red-50/20 font-sans py-10 px-4 flex items-center justify-center text-left relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-200/10 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-6">

        <h1 className="text-2xl font-black text-gray-900 border-b pb-4">
          🍔 Tambah Makanan Baru
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Makanan</label>
            <input
              type="text"
              name="nama"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition font-medium"
              placeholder="Masukkan Nama Makanan"
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Harga (Rp)</label>
              <input
                type="number"
                name="harga"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition font-medium"
                placeholder="Contoh: 15000"
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kategori</label>
              <input
                type="text"
                name="kategori"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition font-medium"
                placeholder="Makanan Utama, Minuman, dll"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-1 bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">Gambar Produk</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition cursor-pointer"
              onChange={(e) => setGambar(e.target.files[0])}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Deskripsi Makanan</label>
            <textarea
              name="deskripsi"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition h-20 resize-none font-medium"
              placeholder="Tulis deskripsi makanan..."
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bahan-Bahan</label>
            <textarea
              name="bahan"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition h-20 resize-none font-medium"
              placeholder="Tulis bahan-bahan (pisahkan dengan koma)..."
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Langkah Pembuatan</label>
            <textarea
              name="langkah_pembuatan"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition h-24 resize-none font-medium"
              placeholder="Tulis langkah-langkah pembuatan..."
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition duration-200 text-sm cursor-pointer text-center"
              onClick={() => navigate("/admin/makanan")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-extrabold rounded-xl transition duration-200 shadow-sm hover:shadow text-sm cursor-pointer text-center"
            >
              💾 Simpan Makanan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default TambahMakanan;