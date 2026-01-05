// import { createContext } from "react";
// import type { ViewCartResponse } from "../../types";

// export interface CartContextType {
//   cart: ViewCartResponse["output"] | null;
//   loading: boolean;
//   loadCart: () => Promise<void>;
//   addToCart: (
//     supplydate: string,
//     supplyshift: number,
//     productcode: number,
//     quantity: number
//   ) => Promise<void>;
//   removeFromCart: (cartid: number) => Promise<void>;
// }

// export const CartContext =
//   createContext<CartContextType | null>(null);


import { createContext } from "react";
import type { CartItem } from "../../types/cart";




export interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  loadCart: () => Promise<void>;
  addToCart: (
    supplydate: string,
    supplyshift: number,
    productcode: number,
    quantity: number
  ) => Promise<void>;
  removeFromCart: (cartid: number) => Promise<void>;
  increaseQty: (item: CartItem) => Promise<void>;
  decreaseQty: (item: CartItem) => Promise<void>;
   placeOrder: () => Promise<void>;
}


export const CartContext =
  createContext<CartContextType | null>(null);

