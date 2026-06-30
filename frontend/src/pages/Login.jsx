import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      alert("Login berhasil");

      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/home";
      }
      return;
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-gray-50 to-orange-50/50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/40 overflow-hidden flex flex-col md:flex-row min-h-[580px] transform transition-all duration-300">
        
        {/* Left Side: Form */}
        <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center text-left space-y-6">
          <Link
            to="/"
            className="text-xs font-black text-orange-600 hover:text-orange-700 flex items-center gap-1.5 self-start uppercase tracking-wider transition-colors duration-200"
          >
            <FiArrowLeft className="text-sm" />
            <span>Beranda</span>
          </Link>

          <div className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 to-red-500 text-white flex items-center justify-center text-lg shadow-md">
              🍔
            </div>
            <span className="tracking-tight">CariMakan</span>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">Selamat Datang 👋</h2>
            <p className="text-gray-400 text-xs font-semibold mt-1">
              Masuk untuk mulai menjelajah hidangan lezat favorit Anda.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Input Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Alamat Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base" />
                <input
                  type="email"
                  name="email"
                  className="w-full bg-gray-50/80 border border-gray-200 focus:bg-white rounded-xl pl-11 pr-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-medium"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Kata Sandi</label>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full bg-gray-50/80 border border-gray-200 focus:bg-white rounded-xl pl-11 pr-11 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-medium"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500 transition cursor-pointer"
                >
                  {showPassword ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black rounded-xl transition duration-300 shadow-md hover:shadow-lg cursor-pointer text-center text-sm"
            >
              Masuk Sekarang 🚀
            </button>
          </form>

          <div className="text-xs text-gray-500 font-semibold pt-2">
            Belum memiliki akun?
            <Link to="/register" className="text-orange-500 font-bold hover:underline ml-1.5">
              Daftar Gratis
            </Link>
          </div>
        </div>

        {/* Right Side: Image/Banner Overlay */}
        <div className="flex-1 hidden md:block relative overflow-hidden bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900"
            alt="Food"
            className="w-full h-full object-cover absolute inset-0 transform hover:scale-105 transition-transform duration-10000"
          />
          <div className="absolute bottom-12 left-12 right-12 text-left z-20 space-y-2">
            <h3 className="text-2xl font-black text-white leading-tight">Cari hidangan lezat kesukaanmu, diantar secepat kilat! 🚀</h3>
            <p className="text-xs text-gray-300 font-semibold leading-relaxed">
              Nikmati jutaan menu kuliner nusantara dan internasional favoritmu dalam genggaman tangan.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;