import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  FiMenu, FiX, FiSearch, FiBell, FiChevronDown, FiUser, 
  FiDatabase, FiUsers, FiLogOut, FiPieChart 
} from "react-icons/fi";

function PenggunaAdmin() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // UI States
  const [pesanan, setPesanan] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));

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

  const filteredUsers = users.filter(item => 
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.role.toLowerCase().includes(searchTerm.toLowerCase())
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
                } hover:bg-gray-800 hover:text-white text-gray-400 font-semibold`}
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
                } bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold shadow-md shadow-orange-500/10`}
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-red-500 flex items-center justify-center font-bold text-white shadow">
              {user?.nama.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-white truncate">{user?.nama}</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{user?.role}</p>
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
                placeholder="Cari pengguna..."
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
                          <p className="text-[10px] text-orange-655 font-black mt-1 text-orange-600">
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
                  {user?.nama.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <span className="block text-xs font-bold text-gray-700 leading-tight">{user?.nama}</span>
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">{user?.role}</span>
                </div>
                <FiChevronDown className="text-gray-400 text-xs" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-lg py-2 z-50 text-xs font-semibold text-gray-600">
                  <div className="px-4 py-2 border-b border-gray-50">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Email</p>
                    <p className="font-bold text-gray-800 truncate mt-0.5">{user?.email}</p>
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

        {/* Content Area */}
        <main className="p-6 md:p-8 space-y-8 flex-grow">
          
          {/* Header Title */}
          <div>
            <h2 className="text-2xl font-black text-gray-900">👥 Kelola Pengguna</h2>
            <p className="text-gray-400 text-xs mt-1">Daftar akun pengguna terdaftar di sistem CariMakan</p>
          </div>

          {/* Tabel Pengguna */}
          <div className="bg-white rounded-3xl border border-gray-150/80 shadow-sm overflow-hidden p-6 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse min-w-[500px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider w-20">ID</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Nama Lengkap</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider">Alamat Email</th>
                    <th className="px-4 py-3 text-gray-400 text-xs font-bold uppercase tracking-wider w-32">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-4 py-8 text-center text-gray-400 italic font-medium">
                        Tidak ada pengguna ditemukan.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-4 py-3.5 text-gray-500 font-bold">{user.id}</td>
                        <td className="px-4 py-3.5 text-gray-900 font-bold">{user.nama}</td>
                        <td className="px-4 py-3.5 text-gray-600 font-medium">{user.email}</td>
                        <td className="px-4 py-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                            user.role === "admin"
                              ? "bg-purple-50 text-purple-755 text-purple-700 border-purple-200"
                              : "bg-gray-100 text-gray-700 border-gray-200"
                          }`}>
                            {user.role}
                          </span>
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

    </div>
  );
}

export default PenggunaAdmin;