// import type { Product } from "../types";

// interface Props {

//   product: Product;
//   onAdd: (p: Product) => void;
//   onClick?: () => void;
// }

// export default function ProductCard({ product,  onClick }: Props) {
//   return (
//     <div className="relative border border-gray-200 bg-white rounded-2xl shadow p-4 pb-5 hover:shadow-lg transition-all duration-300 max-w-[300px]">
//       {/* Top-left Number Tag */}
//       <span className="absolute top-2 left-2 bg-gray-800/70 text-white text-xs px-2 py-0.5 rounded">
//         {/* #{product.id} */}
//         #{product.prod_code}
//       </span>

//       {/* Top-right Price Badge */}
//       <span className="absolute top-2 right-2 bg-[#8e2d26] text-white text-sm font-semibold px-2 py-0.5 rounded">
//         {/* ₹{product.price} */}₹{Number(product.final_rate).toFixed(2)}
//       </span>

//       {/* Product Image */}
//       <img
//         // src={product.image}
//         // alt={product.name}
//         src={product.imagepath || "/placeholder.png"}
//         alt={product.prod_name}
//         className="w-full h-32 object-contain mt-4 transition-transform duration-300 cursor-pointer hover:scale-105"
//       />

//       {/* Product Name */}
//       <h3 className="font-semibold text-lg mt-3">{product.prod_name}</h3>

//       {/* Malayalam Subtitle */}
//       {/* {product.subtitle && (
//         <p className="text-sm text-gray-500 -mt-1">{product.subtitle}</p>
//       )} */}

//       {/* ADD Button */}
//       <button
//         //   onClick={(e) => {
//         //   e.stopPropagation(); // ⛔ prevents modal open when clicking ADD
//         //   onAdd(product);
//         // }}
//         onClick={onClick}
//         className="w-full mt-4 bg-[#8e2d26] text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-1 cursor-pointer hover:bg-[#1e3a8a] transition"
//       >
//         <span className="text-lg">+</span> ADD
//       </button>
//     </div>
//   );
// }




import { Plus } from "lucide-react";
import type { Product } from "../types";

interface Props {
  product: Product;
  // onAdd: (p: Product) => void;
  onClick?: () => void;
  allowAdd: boolean;
}

export default function ProductCard({
  product,
  // onAdd,
  onClick,
    allowAdd,
}: Props) {
  return (
    <div
      className="
        group relative w-full
        bg-white border border-gray-200
        rounded-2xl overflow-hidden
        shadow-sm hover:shadow-xl
        transition-all duration-300
        
      "
    >
      {/* Image Section */}
      <div className="relative bg-gray-50 flex items-center justify-center p-4 sm:p-6">
        {/* Code Tag */}
        <span className="absolute top-3 left-3 text-[10px] sm:text-xs bg-black/70 text-white px-2 py-0.5 rounded-md">
          #{product.prod_code}
        </span>

        {/* Price Badge */}
        <span className="absolute top-3 right-3 text-xs sm:text-sm font-semibold bg-[#8e2d26] text-white px-3 py-1 rounded-full shadow">
          ₹{Number(product.final_rate).toFixed(2)}
        </span>

        <img
          src={product.imagepath || "/placeholder.png"}
          alt={product.prod_name}
          className="
            h-28 sm:h-32 md:h-36
            object-contain
            transition-transform duration-300
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 min-h-[42px]">
          {product.prod_name}
        </h3>

        {/* Malayalam Subtitle */}
        {/* {product.subtitle && (
        <p className="text-sm text-gray-500 -mt-1">{product.subtitle}</p>
      )} */}

        {/* Add Button */}
        {allowAdd && (
        <button
          //   onClick={(e) => {
          //   e.stopPropagation(); // ⛔ prevents modal open when clicking ADD
          //   onAdd(product);
          // }}
          onClick={onClick}
          className="
            mt-3 w-full flex items-center justify-center gap-2
            bg-[#8e2d26] hover:bg-[#73221c]
            text-white
            py-2.5 rounded-xl
            text-sm sm:text-base font-medium
            transition-all duration-300
            active:scale-95 cursor-pointer
          "
        >
          <Plus size={18} />
          ADD
        </button>
           )}
      </div>
    </div>
  );
}
