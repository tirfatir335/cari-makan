import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Keranjang() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeItem,
    clearCart,
  } = useContext(CartContext);

  const [paymentMethod, setPaymentMethod] = useState("Transfer Bank");
  const [bank, setBank] = useState("BRI");
  const [alamat, setAlamat] = useState("");
  const [catatan, setCatatan] = useState("");
  const [buktiTransfer, setBuktiTransfer] = useState(null);

  const total = cart.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );

  const handleCheckout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Silakan login terlebih dahulu!");
      return;
    }

    if (alamat.trim() === "") {
      alert("Alamat wajib diisi!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("items", JSON.stringify(cart));
      formData.append("total", total);
      formData.append("metode", paymentMethod);
      let finalBank = "-";
      if (paymentMethod === "Transfer Bank") {
        finalBank = bank;
      } else if (paymentMethod === "Dana") {
        finalBank = "Dana";
      }
      formData.append("bank", finalBank);
      formData.append("alamat", alamat);
      formData.append("catatan", catatan);

      if (buktiTransfer) {
        formData.append("bukti_transfer", buktiTransfer);
      }

      const response = await fetch("http://localhost:5000/api/checkout", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Checkout gagal!");
        return;
      }

      let detailPesanan = "";
      cart.forEach((item) => {
        detailPesanan += `${item.nama} x${item.qty}\n` +
          `Rp ${(item.harga * item.qty).toLocaleString("id-ID")}\n\n`;
      });

      let rekening = "";
      if (paymentMethod === "Transfer Bank") {
        if (bank === "BRI") {
          rekening = "Bank BRI\nNo Rek : 1234567890\nA/N CariMakan";
        }
        if (bank === "BNI") {
          rekening = "Bank BNI\nNo Rek : 9876543210\nA/N CariMakan";
        }
        if (bank === "BCA") {
          rekening = "Bank BCA\nNo Rek : 1122334455\nA/N CariMakan";
        }
      }

      alert(`🎉 PESANAN BERHASIL\n\n========================\n\n${detailPesanan}========================\n\nTotal : Rp ${total.toLocaleString("id-ID")}\n\nMetode : ${paymentMethod}\n\n${
        paymentMethod === "Transfer Bank"
          ? `Silakan Transfer Ke\n\n${rekening}\n\n`
          : paymentMethod === "Dana"
          ? `Transfer ke Dana\n\n081234567890\n\nA/N CariMakan Indonesia\n\n`
          : `Pembayaran dilakukan saat pesanan diterima (COD)\n\n`
      }Alamat Pengiriman\n\n${alamat}\n\nCatatan\n\n${catatan || "-"}\n\nTerima kasih telah memesan di CariMakan 🍜`);

      clearCart();
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan pada server.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/50 via-gray-50 to-red-50/20 font-sans py-10 px-4 text-left relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-200/25 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-200/10 rounded-full blur-3xl -z-10"></div>
      <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
        
        {/* Header Rute */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
            🛒 Keranjang Belanja
          </h1>
          <Link to="/home" className="text-sm font-bold text-orange-650 text-orange-600 hover:text-orange-700">
            Kembali Belanja
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <span className="text-5xl">🛍️</span>
            <p className="text-gray-500 text-lg font-medium mt-4">Keranjang belanja Anda masih kosong</p>
            <Link to="/home">
              <button className="mt-6 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl transition duration-200 text-sm shadow cursor-pointer">
                Cari Makanan
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Daftar Item Keranjang */}
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-gray-900 text-base">{item.nama}</h3>
                    <p className="text-orange-600 font-extrabold text-sm">
                      Rp {(item.harga * item.qty).toLocaleString("id-ID")}
                    </p>
                    <button
                      className="text-xs font-semibold text-red-500 hover:text-red-700 transition flex items-center gap-1 mt-1"
                      onClick={() => removeItem(item.id)}
                    >
                      🗑️ Hapus
                    </button>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-1 self-end sm:self-center">
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-700 shadow-sm transition"
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-bold text-gray-800 text-sm">{item.qty}</span>
                    <button
                      className="w-8 h-8 flex items-center justify-center bg-white hover:bg-gray-50 border border-gray-200 rounded-lg font-bold text-gray-700 shadow-sm transition"
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bagian Checkout */}
            <div className="mt-10 border-t pt-8 space-y-8">
              
              {/* Pilihan Metode Pembayaran */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">💳 Metode Pembayaran</h3>
                <div className="grid grid-cols-3 gap-3">
                  {["Transfer Bank", "Dana", "Cash"].map((method) => (
                    <label
                      key={method}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                        paymentMethod === method
                          ? "border-orange-500 bg-orange-50/50 text-orange-700 font-bold"
                          : "border-gray-200 hover:border-gray-300 text-gray-500 font-medium"
                      }`}
                    >
                      <input
                        type="radio"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                      <span className="text-xl mb-1">
                        {method === "Transfer Bank" ? "🏦" : method === "Dana" ? "💙" : "💵"}
                      </span>
                      <span className="text-xs">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sub-Panel Pembayaran Dinamis */}
              {paymentMethod === "Transfer Bank" && (
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-150 space-y-4">
                  <h4 className="font-bold text-gray-900 text-sm">Pilih Bank Tujuan</h4>
                  <select
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  >
                    <option value="BRI">Bank BRI</option>
                    <option value="BNI">Bank BNI</option>
                    <option value="BCA">Bank BCA</option>
                  </select>

                  <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col gap-3">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Bank</span>
                      <h3 className="font-bold text-gray-800 text-base">
                        {bank === "BRI" ? "🏦 Bank BRI" : bank === "BNI" ? "🏦 Bank BNI" : "🏦 Bank BCA"}
                      </h3>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Nomor Rekening</span>
                      <p className="font-mono text-lg font-bold text-orange-755 text-orange-700 tracking-wider mt-0.5">
                        {bank === "BRI" ? "1234567890" : bank === "BNI" ? "9876543210" : "1122334455"}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Atas Nama</span>
                      <p className="font-bold text-gray-700 text-sm mt-0.5">CariMakan Indonesia</p>
                    </div>

                    <button
                      className="w-full mt-2 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold rounded-xl transition duration-200 text-xs flex items-center justify-center gap-1 cursor-pointer"
                      onClick={() => {
                        const num = bank === "BRI" ? "1234567890" : bank === "BNI" ? "9876543210" : "1122334455";
                        navigator.clipboard.writeText(num);
                        alert("Nomor rekening berhasil disalin.");
                      }}
                    >
                      📋 Salin Nomor Rekening
                    </button>
                  </div>
                </div>
              )}

              {paymentMethod === "Dana" && (
                <div className="bg-blue-50/40 p-6 rounded-3xl border border-blue-100 flex flex-col gap-3">
                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">E-Wallet</span>
                    <h3 className="font-bold text-blue-800 text-base">💙 Dana</h3>
                  </div>

                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Nomor Dana</span>
                    <p className="font-mono text-lg font-bold text-blue-700 tracking-wider mt-0.5">081234567890</p>
                  </div>

                  <div>
                    <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider">Atas Nama</span>
                    <p className="font-bold text-blue-800 text-sm mt-0.5">CariMakan Indonesia</p>
                  </div>

                  <button
                    className="w-full mt-2 py-2.5 bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold rounded-xl transition duration-200 text-xs flex items-center justify-center gap-1"
                    onClick={() => {
                      navigator.clipboard.writeText("081234567890");
                      alert("Nomor Dana berhasil disalin.");
                    }}
                  >
                    📋 Salin Nomor Dana
                  </button>
                </div>
              )}

              {paymentMethod === "Cash" && (
                <div className="bg-emerald-50/40 p-6 rounded-3xl border border-emerald-100 text-emerald-800 space-y-3">
                  <h3 className="font-bold text-emerald-950 text-base flex items-center gap-1.5">
                    💵 Bayar di Tempat (COD)
                  </h3>
                  <p className="text-sm leading-relaxed text-emerald-900/80">
                    Silakan siapkan uang tunai pas sesuai total pembayaran saat kurir mengantarkan pesanan Anda.
                  </p>
                  <div className="text-xs bg-white/60 p-4 rounded-2xl border border-emerald-200/55 space-y-1">
                    <p>✅ Pembayaran dilakukan secara tunai ke kurir kami.</p>
                    <p>🚚 Estimasi pengiriman 15-30 menit tergantung jarak lokasi.</p>
                  </div>
                </div>
              )}

              {/* Form Input Alamat */}
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                  📍 Alamat Pengiriman <span className="text-red-500">*</span>
                </h4>
                <textarea
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition h-28 resize-none font-medium text-left"
                  placeholder="Contoh: Jl. Pangeran Antasari No.12, RT 03 / RW 05, Kecamatan Kedaton, Bandar Lampung"
                />
              </div>

              {/* Form Input Catatan */}
              <div className="space-y-2">
                <h4 className="font-bold text-gray-900 text-sm">📝 Catatan untuk Penjual</h4>
                <p className="text-xs text-gray-400 font-medium">Contoh: Jangan pedas 🌶️, Sambal dipisah, Rumah pagar hitam.</p>
                <textarea
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition h-24 resize-none font-medium text-left"
                  placeholder="Tulis catatan opsional Anda..."
                />
              </div>

              {/* Upload Bukti Pembayaran */}
              {paymentMethod !== "Cash" && (
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200/80 space-y-3">
                  <h4 className="font-bold text-gray-900 text-sm">📸 Upload Bukti Transfer</h4>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setBuktiTransfer(e.target.files[0])}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 transition cursor-pointer"
                  />
                  {buktiTransfer && (
                    <div className="relative mt-3 rounded-2xl overflow-hidden border border-gray-200 max-w-[200px]">
                      <img
                        src={URL.createObjectURL(buktiTransfer)}
                        alt="Preview"
                        className="w-full object-cover h-28"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Total & Checkout */}
              <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Tagihan</span>
                  <h2 className="text-2xl md:text-3xl font-black text-orange-600 mt-0.5">
                    Rp {total.toLocaleString("id-ID")}
                  </h2>
                </div>

                 <button
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-extrabold rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg text-sm tracking-wide text-center cursor-pointer"
                  onClick={handleCheckout}
                >
                  Proses Checkout 🚀
                </button>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Keranjang;