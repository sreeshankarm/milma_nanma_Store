import React, { createContext, useContext, useState } from "react";
import type {
  AppState,
  Product,
  Order,
  OrderItem,
  ReturnItem,
  DistributorContact,
} from "../../types/types";
import { OrderStatus } from "../../types/types";

export type ViewState =
  | "HOME"
  | "ORDERS"
  | "ORDER_DETAILS"
  | "RETURNS"
  | "CART";

const StoreContext = createContext<any>(null);

const PRODUCT_IMAGES = {
  milmaRich: "https://milmatrcmpu.com/image/product/20230518112042.png", // Green Accent (Pacha)
  milmaSmart: "https://milmatrcmpu.com/image/product/20230518111809.png", // Blue Accent (Neela)
  milmaCurd: "https://milmatrcmpu.com/image/product/20230518112954.png", // Curd
  milmaGhee: "https://milmatrcmpu.com/image/product/20221220153850.png", // Ghee
  milmaPeda:
    "https://m.media-amazon.com/images/I/81LcNsKbwtL._AC_AIweblab1006854,T4_FMavif_SF1050,1050-3x,TopRight,-10,10_PQ64_.jpg", // Sweets
  sambharam:
    "https://www.milma.com/storage/products//April2025//aGvSSZSWKJiDoXECefrc.jpg", // Buttermilk
};

// --- MOCK DATA ---
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "milma-rich",
    name: "Milma Rich (Green)",
    malayalamName: "മിൽമ റിച്ച് (പച്ച)",
    code: "11",
    // type: ProductType.MILK,
    mrp: 30, // 500ml
    price: 26, // Special agent price
    image: PRODUCT_IMAGES.milmaRich,
    description: "Standardized Milk with 4.5% Fat and 8.5% SNF.",
  },
  {
    id: "milma-smart",
    name: "Milma Smart (Blue)",
    malayalamName: "മിൽമ സ്മാർട്ട് (നീല)",
    code: "12",
    // type: ProductType.MILK,
    mrp: 28, // 500ml
    price: 24, // Special agent price
    image: PRODUCT_IMAGES.milmaSmart,
    description: "Double Toned Milk with 1.5% Fat and 9.0% SNF.",
  },
  {
    id: "milma-curd",
    name: "Milma Curd 500ml",
    malayalamName: "തൈര്",
    code: "13",
    // type: ProductType.CURD,
    mrp: 36,
    price: 30,
    image: PRODUCT_IMAGES.milmaCurd,
    description: "Delicious and healthy curd.",
  },
  {
    id: "milma-ghee",
    name: "Milma Ghee 500ml",
    malayalamName: "നെയ്യ്",
    code: "14",
    // type: ProductType.GHEE,
    mrp: 399,
    price: 360,
    image: PRODUCT_IMAGES.milmaGhee,
    description: "Pure ghee with agmark standard.",
  },
  {
    id: "milma-peda",
    name: "Milma Peda",
    malayalamName: "പേഡ",
    code: "15",
    // type: ProductType.SWEETS,
    mrp: 135,
    price: 120,
    image: PRODUCT_IMAGES.milmaPeda,
    description: "Fresh milk peda made with creamy Milma milk.",
  },
  {
    id: "sambharam",
    name: "Sambharam",
    malayalamName: "സംഭാരം",
    code: "16",
    // type: ProductType.SAMBHARAM,
    mrp: 12,
    price: 10,
    image: PRODUCT_IMAGES.sambharam,
    description: "Spiced buttermilk refreshner.",
  },
];

// INITIAL ORDERS
// -----------------------------------------------------
const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD",
    items: [
      {
        id: "i1",
        productId: INITIAL_PRODUCTS[0].id,
        name: INITIAL_PRODUCTS[0].name,
        quantity: 2,
        price: 26,
      },
    ],
    totalAmount: 52,
    status: OrderStatus.COMPLETED,
    createdAt: new Date().toISOString(),
    remarks: ["credit alert test"],
  },
];

const INITIAL_DISTRIBUTORS: DistributorContact[] = [
  {
    id: "DST-001",
    name: "Kochi Milk Union",
    region: "Ernakulam",
    phone: "+91 98765 43210",
    email: "kochi@milma.com",
    specialties: ["Milk", "Curd", "Buttermilk"],
  },
  {
    id: "DST-002",
    name: "Trivandrum Dairy",
    region: "Thiruvananthapuram",
    phone: "+91 91234 56789",
    email: "tvm@milma.com",
    specialties: ["Ghee", "Peda"],
  },
];

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AppState>({
    balance: 2000,
    products: INITIAL_PRODUCTS,
    cart: [],
  });

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  // return UI
  const [selectedOrderIdForReturn, setSelectedOrderIdForReturn] = useState<
    string | null
  >(null);

  const [returnIntentMessage, setReturnIntentMessage] = useState<string | null>(
    null
  );

  // CREATE ORDER
  // -----------------------------------------------------
  const createOrder = (
    items: OrderItem[],
    delivery?: { day: string; date: number; shift: string }
  ) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder: Order = {
      id: "ORD-" + (orders.length + 1),
      items,
      totalAmount,
      status: OrderStatus.COMPLETED,
      createdAt: new Date().toISOString(),
      remarks: [],
      ...delivery, // optional fields
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  const [returnRequests, setReturnRequests] = useState<ReturnItem[]>([]);
  const createReturnRequest = (data: {
    orderId: string;
    products: {
      name: string;
      qty: number;
      issue: string;
    }[];
  }) => {
    const newReturn: ReturnItem = {
      id: `RET-${Math.floor(1000 + Math.random() * 9000)}`,
      orderId: data.orderId,
      date: new Date().toLocaleDateString(),
      status: "REQUESTED",
      products: data.products,
    };

    setReturnRequests((prev) => [newReturn, ...prev]);
  };

  // MODIFY ORDER
  // -----------------------------------------------------
  const modifyOrder = (orderId: string, updated: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, ...updated } : o))
    );
  };

  const addToCart = (product: Product, qty: number) => {
    setState((s) => {
      const existing = s.cart.find((c) => c.product.id === product.id);

      if (existing) {
        return {
          ...s,
          cart: s.cart.map((c) =>
            c.product.id === product.id
              ? { ...c, quantity: c.quantity + qty }
              : c
          ),
        };
      }

      return {
        ...s,
        cart: [...s.cart, { product, quantity: qty }],
      };
    });
  };

  const getProducts = () => state.products;

  const increaseQty = (id: string) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) =>
        c.product.id === id ? { ...c, quantity: c.quantity + 1 } : c
      ),
    }));
  };

  const decreaseQty = (id: string) => {
    setState((s) => ({
      ...s,
      cart: s.cart
        .map((c) =>
          c.product.id === id ? { ...c, quantity: c.quantity - 1 } : c
        )
        .filter((c) => c.quantity > 0), // auto remove when 0
    }));
  };

  const removeFromCart = (id: string) => {
    setState((s) => ({
      ...s,
      cart: s.cart.filter((c) => c.product.id !== id),
    }));
  };

  const clearCart = () => {
    setState((s) => ({
      ...s,
      cart: [],
    }));
  };

  const [distributors] = useState(INITIAL_DISTRIBUTORS);

  const getDistributors = () => distributors;

  const [activeView, setActiveView] = useState<ViewState>("HOME");

  return (
    <StoreContext.Provider
      value={{
        ...state,
        addToCart,
        getProducts,
        increaseQty,
        decreaseQty,
        removeFromCart,
        // orders
        orders,
        createOrder,
        modifyOrder,
        clearCart,

        // return UI
        selectedOrderIdForReturn,
        setSelectedOrderIdForReturn,
        returnIntentMessage,
        setReturnIntentMessage,

        activeView,
        setActiveView,
        returnRequests,
        createReturnRequest,
        getDistributors,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
