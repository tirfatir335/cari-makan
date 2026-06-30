function Kategori({
  kategori,
  setKategori,
  kategoriList,
}) {
  const emojiMap = {
    "Semua": "🍽️",
    "Makanan Utama": "🍛",
    "Bakso & Soto": "🍲",
    "Mie & Pasta": "🍝",
    "Fast Food": "🍔",
    "Minuman": "🍹",
    "Dessert": "🍰",
    "Cake & Bakery": "🍞",
  };

  const bgGradientMap = {
    "Semua": "from-orange-100 to-red-100 text-orange-700",
    "Makanan Utama": "from-orange-100 to-amber-100 text-orange-700",
    "Bakso & Soto": "from-yellow-100 to-amber-150 text-amber-800",
    "Mie & Pasta": "from-teal-100 to-emerald-100 text-teal-700",
    "Fast Food": "from-red-100 to-rose-100 text-red-700",
    "Minuman": "from-sky-100 to-blue-100 text-sky-700",
    "Dessert": "from-pink-100 to-rose-100 text-pink-700",
    "Cake & Bakery": "from-yellow-100 to-orange-100 text-yellow-800",
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth w-full cursor-grab active:cursor-grabbing text-left no-scrollbar">
      {kategoriList.map((item) => {
        const isActive = kategori === item;
        const emoji = emojiMap[item] || "🍱";
        const gradient = bgGradientMap[item] || "from-gray-100 to-slate-100 text-gray-700";

        return (
          <button
            key={item}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 min-w-[110px] h-28 cursor-pointer shrink-0 ${
              isActive
                ? "border-orange-500 bg-orange-50/70 shadow-md scale-105"
                : "border-gray-200/60 bg-white hover:border-orange-200 hover:shadow-sm"
            }`}
            onClick={() => setKategori(item)}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl bg-gradient-to-br ${gradient} mb-2 shadow-sm`}>
              {emoji}
            </div>
            <span className={`text-xs tracking-tight text-center ${
              isActive ? "font-black text-orange-700" : "font-extrabold text-gray-500"
            }`}>
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default Kategori;