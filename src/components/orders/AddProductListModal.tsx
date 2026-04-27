



import { useEffect, useState, useMemo } from "react";
import { X, Search } from "lucide-react";
import { getProductsApi } from "../../api/product.api";
import { toast } from "react-toastify";
import type { Product } from "../../types/product";

interface Props {
  supplyDate: string;
  onClose: () => void;
  onSelect: (product: {
    prod_code: number;
    prod_name: string;
    final_rate: number;
    imagepath?: string;
    mrp?: string;
    prod_gid: number;
  }) => void;
}

export default function AddProductListModal({
  supplyDate,
  onClose,
  onSelect,
}: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getProductsApi(supplyDate);
        setProducts(res.data.proddefaultratetypedata);
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [supplyDate]);

  // 🔍 Filtered Products
  // const filteredProducts = useMemo(() => {
  //   return products.filter((item) =>
  //     item.prod_name.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [products, search]);

  const normalize = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9]/g, "");

const filteredProducts = useMemo(() => {
  const searchValue = normalize(search);

  return products.filter((item) =>
    normalize(item.prod_name).includes(searchValue)
  );
}, [products, search]);

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center">
      <div
        className="
        w-full 
        sm:max-w-2xl 
        bg-white 
        rounded-t-3xl sm:rounded-2xl 
        shadow-2xl 
        max-h-[95vh] 
        flex flex-col
      "
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 sm:p-5 flex justify-between items-center rounded-t-3xl sm:rounded-t-2xl">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Add Products
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* 🔍 Search Field */}
        <div className="sticky top-[64px] sm:top-[72px] bg-white px-4 sm:px-6 py-3 border-b border-gray-100">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10
                pr-4
                py-2.5
                text-sm
                border
                border-gray-200
                rounded-xl
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
                transition
              "
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-gray-500 text-sm">
                Loading products...
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">
              No products found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((item) => (
                <div
                  key={item.prod_code}
                  className="
                    bg-gray-50 
                    hover:bg-gray-100 
                    border border-gray-100 
                    rounded-2xl 
                    p-4 
                    flex 
                    items-center 
                    justify-between 
                    transition
                  "
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.imagepath || "/no-image.png"}
                      alt={item.prod_name}
                      className="w-14 h-14 rounded-xl object-cover bg-white"
                    />
                    <div>
                      <p className="font-medium text-gray-800 text-sm">
                        {item.prod_name}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-blue-600 font-semibold text-sm">
                          ₹{Number(item.final_rate).toFixed(2)}
                        </span>

                        {item.mrp &&
                          Number(item.mrp) >
                            Number(item.final_rate) && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{Number(item.mrp).toFixed(2)}
                            </span>
                          )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      onSelect({
                        prod_code: item.prod_code,
                        prod_name: item.prod_name,
                        final_rate: Number(item.final_rate),
                        imagepath: item.imagepath,
                        mrp: item.mrp,
                        prod_gid: item.prod_gid,
                      })
                    }
                    className="
                      bg-[#0195db] 
                      text-white 
                      text-xs 
                      sm:text-sm
                      px-4 
                      py-2 
                      rounded-xl 
                      font-medium
                      hover:bg-blue-700 
                      active:scale-95
                      transition cursor-pointer
                    "
                  >
                    ADD
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
