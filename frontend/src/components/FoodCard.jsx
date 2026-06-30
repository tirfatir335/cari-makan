import {
  useContext,
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

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

function FoodCard({ food }) {
  const { addToCart } = useContext(CartContext);

  const [rating, setRating] = useState({
    rata_rata: 0,
    total_ulasan: 0,
  });

  useEffect(() => {
    fetch(
      `http://localhost:5000/api/ulasan/rating/${food.id}`
    )
      .then((res) => res.json())
      .then((data) => setRating(data))
      .catch((err) => console.log(err));
  }, [food.id]);

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

  return (
    <div className="flex flex-col bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 border border-gray-100/60 overflow-hidden transition-all duration-300 h-full text-left">
      <div className="relative w-full h-56 bg-gray-100">
        <img
          src={
            gambarMap[food.gambar]
              ? gambarMap[food.gambar]
              : `${window.API_URL}/uploads/${food.gambar}`
          }
          alt={food.nama}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-black text-gray-900 line-clamp-1">{food.nama}</h3>
          
          <div className="flex items-center gap-1.5 mt-2">
            <span className="bg-yellow-50 text-yellow-600 px-2.5 py-0.5 text-xs font-bold rounded-lg flex items-center gap-0.5">
              ⭐ {Number(rating.rata_rata).toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 font-semibold">
              ({rating.total_ulasan} ulasan)
            </span>
          </div>

          <p className="text-lg font-black text-orange-600 mt-3">
            Rp {Number(food.harga).toLocaleString("id-ID")}
          </p>
        </div>

        <div className="flex gap-2.5 mt-4">
          <Link to={`/makanan/${food.id}`} className="flex-1">
            <button className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-150/60 text-gray-600 text-sm font-bold rounded-xl transition duration-200 cursor-pointer">
              Detail
            </button>
          </Link>

          <button
            className="flex-1 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-sm font-black rounded-xl transition-all duration-300 shadow-md shadow-orange-500/10 hover:shadow-lg hover:-translate-y-0.5 transform cursor-pointer"
            onClick={() => {
              addToCart(food);
              alert(`${food.nama} berhasil ditambahkan ke keranjang!`);
            }}
          >
            Pesan 🛒
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;