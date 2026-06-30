import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RatingMakanan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [rating, setRating] = useState(5);
  const [komentar, setKomentar] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/api/ulasan",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          makanan_id: id,
          rating,
          komentar,
        }),
      }
    );

    const data = await res.json();

    alert(data.message);

    navigate("/riwayat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-gray-50 to-red-50/20 font-sans py-10 px-4 flex items-center justify-center text-left relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-200/10 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 space-y-6">

        <h1 className="text-2xl font-black text-gray-900 flex items-center gap-2 border-b pb-4">
          ⭐ Beri Rating & Ulasan
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Skor Penilaian
            </label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition cursor-pointer"
            >
              <option value="5">⭐⭐⭐⭐⭐ (Sangat Enak)</option>
              <option value="4">⭐⭐⭐⭐ (Enak)</option>
              <option value="3">⭐⭐⭐ (Biasa Saja)</option>
              <option value="2">⭐⭐ (Kurang Enak)</option>
              <option value="1">⭐ (Buruk)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
              Komentar Anda
            </label>
            <textarea
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition h-32 resize-none font-medium"
              placeholder="Tulis komentar/ulasan tentang makanan ini..."
              value={komentar}
              onChange={(e) => setKomentar(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition duration-200 text-sm cursor-pointer text-center"
              onClick={() => navigate("/riwayat")}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 py-3.5 bg-yellow-500 hover:bg-yellow-600 text-white font-extrabold rounded-xl transition duration-200 shadow-sm hover:shadow text-sm cursor-pointer text-center"
            >
              Simpan Ulasan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default RatingMakanan;