import hero from "../assets/makan.jpeg";

function Hero() {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between min-h-[70vh] md:min-h-[75vh] py-16 px-6 sm:px-12 md:px-16 rounded-[2.5rem] bg-gradient-to-br from-orange-50/50 via-white to-red-50/20 border border-orange-100/20 my-6 overflow-hidden text-left shadow-sm">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-300/10 rounded-full blur-3xl -z-10"></div>

      {/* Left Content */}
      <div className="flex-1 space-y-6 z-10">
        <span className="px-3.5 py-1.5 bg-orange-100 text-orange-600 text-xs font-black rounded-full uppercase tracking-widest inline-block shadow-sm">
          🚀 Layan Antar Makanan Tercepat
        </span>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight">
          Cari makanan
          <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent block mt-2">
            favoritmu
          </span>
          diantar ke rumahmu.
        </h1>

        <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-md">
          Temukan ratusan makanan lezat dan nikmat dengan pelayanan pengantaran super cepat dan praktis.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <a
            href="#menu-section"
            className="px-7 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/20 hover:shadow-xl hover:-translate-y-0.5 transform transition-all duration-300 text-center text-sm cursor-pointer"
          >
            Pesan Sekarang 🚀
          </a>
          <a
            href="#kategori-pilihan"
            className="px-7 py-4 bg-white hover:bg-orange-50/20 text-orange-600 font-extrabold rounded-2xl border border-orange-200 hover:border-orange-300 transition-all duration-200 text-center text-sm cursor-pointer"
          >
            Lihat Menu 🍱
          </a>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 w-full max-w-md md:max-w-none flex items-center justify-center mt-10 md:mt-0 relative">
        <div className="absolute inset-0 bg-orange-200/20 rounded-[2.5rem] transform rotate-3 scale-95 -z-10"></div>
        <img 
          src={hero} 
          alt="Hero" 
          className="w-full h-auto aspect-square md:aspect-[4/3] rounded-[2.5rem] shadow-xl border-4 border-white object-cover transform hover:rotate-1 hover:scale-[1.01] transition-all duration-500"
        />
      </div>
    </section>
  );
}

export default Hero;