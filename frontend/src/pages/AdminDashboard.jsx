import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiMenu, FiX, FiSearch, FiBell, FiChevronDown, FiUser, 
  FiDatabase, FiUsers, FiDollarSign, FiLogOut, FiPieChart, FiShoppingBag 
} from "react-icons/fi";

function AdminDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalUser, setTotalUser] = useState(0);
  const [totalPesanan, setTotalPesanan] = useState(0);
  const [totalMakanan, setTotalMakanan] = useState(0);
  const [pendapatan, setPendapatan] = useState(0);
  const [pesanan, setPesanan] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  
  // UI States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Total User
    fetch("http://localhost:5000/api/auth/total-user")
      .then((res) => res.json())
      .then((data) => setTotalUser(data.total))
      .catch((err) => console.log(err));

    // Total Pesanan
    fetch("http://localhost:5000/api/checkout/total")
      .then((res) => res.json())
      .then((data) => setTotalPesanan(data.total))
      .catch((err) => console.log(err));

    // Pendapatan
    fetch("http://localhost:5000/api/checkout/pendapatan")
      .then((res) => res.json())
      .then((data) => setPendapatan(data.total))
      .catch((err) => console.log(err));

    // Makanan (for Total Makanan count)
    fetch("http://localhost:5000/api/makanan")
      .then((res) => res.json())
      .then((data) => setTotalMakanan(data.length))
      .catch((err) => console.log(err));

    // Pesanan List
    fetch("http://localhost:5000/api/checkout")
      .then((res) => res.json())
      .then((data) => setPesanan(data))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Logout berhasil");
    navigate("/login");
  };

  const filteredPesanan = pesanan.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.makanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.alamat && item.alamat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const newOrders = pesanan.filter(p => p.status === "Diproses");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-orange-50/20 flex font-sans text-left relative overflow-x-hidden">
      
      {/* Sidebar Kiri - Responsive & Collapsible */}
      <aside className={`bg-slate-900 text-gray-300 flex flex-col p-6 space-y-8 border-r border-gray-800 transition-all duration-300 shrink-0 z-40 fixed md:static h-screen ${
        isSidebarOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full md:w-20 md:translate-x-0"
      }`}>
        {/* Sidebar Logo */}
        <div className="flex items-center justify-between">
          <div className={`items-center gap-2 text-white font-black text-xl ${
            isSidebarOpen ? "flex" : "hidden md:flex justify-center w-full text-2xl"
          }`}>
            <span>🍔</span>
            <span className={isSidebarOpen ? "inline" : "hidden"}>CariMakan</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white cursor-pointer"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Sidebar Navigasi */}
        <nav className="flex-grow">
          <ul className="space-y-1.5">
            <li>
              <Link 
                to="/admin" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 text-sm ${
                  isSidebarOpen ? "justify-start" : "justify-center"
                } bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-md shadow-orange-500/10`}
              >
                <FiPieChart className="text-lg" />
                <span className={isSidebarOpen ? "inline" : "hidden"}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/makanan" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 text-sm ${
                  isSidebarOpen ? "justify-start" : "justify-center"
                } hover:bg-gray-800 hover:text-white text-gray-400 font-semibold`}
              >
                <FiDatabase className="text-lg" />
                <span className={isSidebarOpen ? "inline" : "hidden"}>Kelola Makanan</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/pengguna" 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition duration-200 text-sm ${
                  isSidebarOpen ? "justify-start" : "justify-center"
                } hover:bg-gray-800 hover:text-white text-gray-400 font-semibold`}
              >
                <FiUsers className="text-lg" />
                <span className={isSidebarOpen ? "inline" : "hidden"}>Kelola Pengguna</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Badge At Bottom */}
        {isSidebarOpen && (
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white shadow">
              {user.nama.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-white truncate">{user.nama}</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{user.role}</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Area */}
      <div className="flex-grow flex flex-col min-w-0 min-h-screen">
        
        {/* Topbar Panel */}
        <header className="bg-white border-b border-gray-150/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-xl transition cursor-pointer"
            >
              <FiMenu className="text-xl" />
            </button>
            <div className="relative hidden sm:block w-64">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Cari pesanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-200 bg-gray-50 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 text-gray-500 hover:bg-gray-105 hover:bg-gray-100 rounded-xl cursor-pointer transition relative"
              >
                <FiBell className="text-lg" />
                {newOrders.length > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                    {newOrders.length}
                  </span>
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-150 rounded-2xl shadow-xl py-3 z-50 text-xs text-gray-700">
                  <div className="px-4 pb-2 border-b border-gray-100 flex justify-between items-center">
                    <span className="font-extrabold text-gray-900 text-sm">Notifikasi</span>
                    {newOrders.length > 0 && (
                      <span className="bg-red-50 text-red-650 px-2 py-0.5 rounded-full text-[10px] font-extrabold text-red-600">
                        {newOrders.length} Baru
                      </span>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
                    {newOrders.length === 0 ? (
                      <div className="px-4 py-6 text-center text-gray-400 italic">
                        Tidak ada pesanan baru.
                      </div>
                    ) : (
                      newOrders.map((item, index) => (
                        <div key={index} className="px-4 py-3 hover:bg-gray-50 transition cursor-pointer">
                          <p className="font-extrabold text-gray-900">📦 Pesanan Baru Masuk</p>
                          <p className="text-gray-500 text-[11px] mt-0.5">
                            Dari <span className="font-bold text-gray-750">{item.nama}</span>: {item.makanan}
                          </p>
                          <p className="text-[10px] text-orange-605 font-black mt-1 text-orange-655 text-orange-600">
                            Total: Rp {Number(item.total_harga).toLocaleString("id-ID")}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 px-2.5 border border-gray-150 rounded-2xl hover:bg-gray-50 transition cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">
                  {user.nama.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <span className="block text-xs font-bold text-gray-700 leading-tight">{user.nama}</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{user.role}</span>
                </div>
                <FiChevronDown className="text-gray-400 text-xs" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg py-2 z-50 text-xs font-semibold text-gray-600">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email</p>
                    <p className="font-bold text-gray-800 truncate mt-0.5">{user.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 flex items-center gap-2 transition cursor-pointer"
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6 md:p-8 space-y-8 flex-grow">
          
          {/* Dashboard Title */}
          <div>
            <h2 className="text-2xl font-black text-gray-900">Ringkasan Sistem</h2>
            <p className="text-gray-400 text-xs mt-1">Status dan statistik CariMakan saat ini</p>
          </div>

          {/* Cards Statistik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-150/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-655 text-orange-600 flex items-center justify-center text-2xl">
                <FiShoppingBag />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Pesanan</p>
                <h3 className="text-2xl font-black text-gray-900 mt-0.5">{totalPesanan}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
                <FiUsers />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Pengguna</p>
                <h3 className="text-2xl font-black text-gray-900 mt-0.5">{totalUser}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl">
                <FiDollarSign />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Pendapatan</p>
                <h3 className="text-2xl font-black text-gray-900 mt-0.5">Rp {pendapatan.toLocaleString("id-ID")}</h3>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-150/80 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl">
                <span>🍔</span>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Total Menu</p>
                <h3 className="text-2xl font-black text-gray-900 mt-0.5">{totalMakanan}</h3>
              </div>
            </div>
          </div>

          {/* Tabel Pesanan */}
          <div className="bg-white rounded-3xl border border-gray-150/80 shadow-sm overflow-hidden p-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              📦 Daftar Transaksi Masuk
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">No</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Pengguna</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Makanan</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Metode</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Bank</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Alamat</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Catatan</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Bukti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPesanan.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="px-4 py-8 text-center text-gray-400 italic font-medium">
                        Tidak ada transaksi ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredPesanan.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50/50 transition">
                        <td className="px-4 py-3.5 text-gray-500 font-bold">{index + 1}</td>
                        <td className="px-4 py-3.5 text-gray-900 font-bold">{item.nama}</td>
                        <td className="px-4 py-3.5 text-gray-600 font-medium">{item.makanan}</td>
                        <td className="px-4 py-3.5 text-orange-655 text-orange-655 text-orange-600 font-extrabold">
                          Rp {Number(item.total_harga).toLocaleString("id-ID")}
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 font-semibold">{item.metode_pembayaran}</td>
                        <td className="px-4 py-3.5 text-gray-450 text-gray-400 font-semibold">{item.bank || "-"}</td>
                        <td className="px-4 py-3.5 text-gray-600 text-xs max-w-[220px] whitespace-normal break-words leading-relaxed">
                          {item.alamat}
                        </td>
                        <td className="px-4 py-3.5 text-gray-500 text-xs max-w-[180px] whitespace-normal break-words">
                          {item.catatan || "-"}
                        </td>
                        <td className="px-4 py-3.5">
                          <select
                            value={item.status}
                            onChange={async (e) => {
                              const statusBaru = e.target.value;
                              try {
                                await fetch(`http://localhost:5000/api/checkout/status/${item.id}`, {
                                  method: "PUT",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ status: statusBaru }),
                                });

                                setPesanan((prev) =>
                                  prev.map((p) => (p.id === item.id ? { ...p, status: statusBaru } : p))
                                );
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                            className="bg-gray-50 border border-gray-250 border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 transition cursor-pointer"
                          >
                            <option value="Diproses">🟡 Diproses</option>
                            <option value="Dikirim">🔵 Dikirim</option>
                            <option value="Selesai">🟢 Selesai</option>
                          </select>
                        </td>
                        <td className="px-4 py-3.5">
                          {item.bukti_transfer ? (
                            <img
                              src={`${window.API_URL}/uploads/${item.bukti_transfer}`}
                              alt="Bukti"
                              className="w-10 h-10 rounded-lg object-cover cursor-pointer border border-gray-200 hover:scale-105 transition duration-200 shadow-sm"
                              onClick={() => setPreviewImage(`${window.API_URL}/uploads/${item.bukti_transfer}`)}
                            />
                          ) : (
                            <span className="text-xs text-gray-400 font-semibold italic">Belum Upload</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>

      {/* Modal Preview Bukti Transfer */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl relative border border-gray-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-500 font-extrabold flex items-center justify-center cursor-pointer"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-1.5">
              📸 Bukti Transfer
            </h2>
            <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 max-h-[400px]">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;