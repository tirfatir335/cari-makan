import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Riwayat() {
  const [riwayat, setRiwayat] = useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/riwayat/${user.id}`
    )
      .then((res) => res.json())
      .then((data) => setRiwayat(data))
      .catch((err) => console.log(err));
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-gray-50 to-red-50/20 font-sans py-10 px-4 text-left relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-200/10 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            📜 Riwayat Pesanan
          </h1>
          <Link to="/home" className="text-sm font-bold text-orange-650 text-orange-600 hover:text-orange-700">
            Kembali ke Home
          </Link>
        </div>

        {riwayat.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <span className="text-5xl">📜</span>
            <p className="text-gray-500 text-lg font-medium mt-4">Belum ada riwayat pesanan</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {riwayat.map((item, index) => (
              <div
                className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                key={index}
              >
                <div className="space-y-2 flex-grow">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-extrabold text-gray-900 text-lg">{item.nama_makanan}</h3>
                    
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${
                      item.status === "Diproses"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : item.status === "Dikirim"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}>
                      {item.status === "Diproses" && "🟡 Diproses"}
                      {item.status === "Dikirim" && "🔵 Dikirim"}
                      {item.status === "Selesai" && "🟢 Selesai"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500">
                    <p>Jumlah: <span className="font-bold text-gray-800">{item.qty}</span></p>
                    <p>Metode: <span className="font-bold text-gray-800">{item.metode_pembayaran}</span></p>
                    <p className="col-span-2">Total: <span className="font-extrabold text-orange-655 text-orange-600">Rp {Number(item.subtotal).toLocaleString("id-ID")}</span></p>
                  </div>

                  <p className="text-[11px] text-gray-400 font-medium">
                    {new Date(item.tanggal).toLocaleString("id-ID", {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>

                <Link
                  to={`/rating/${item.makanan_id}`}
                  className="w-full sm:w-auto"
                >
                  <button className="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition duration-200 text-xs shadow-sm">
                    ⭐ Beri Rating
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Riwayat;