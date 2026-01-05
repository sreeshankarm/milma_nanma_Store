/* ---------- ADD TO CART ---------- */
export interface AddToCartPayload {
  supplydate: string;
  supplyshift: number;
  productcode: number;
  quantity: number;
}

/* ---------- CART ITEM ---------- */
// export interface CartItem {
//   cartid: number;
//   prod_gid: number;
//   supply_date: string;
//   qty: string;
// }


// export interface CartItem {
//   cartid: number;
//   productname: string;
//   rate: number;
//   quantity: number;
//   date: string;
//   shift: string;
// }

/* ---------- VIEW CART ---------- */
// export interface ViewCartResponse {
//   output: Record<
//     string,
//     Record<
//       string,
//       Record<
//         string,
//         {
//           quantity: string;
//           productname: string;
//           cartid: number;
//           rate: string;
//         }
//       >
//     >
//   >;
// }



export interface CartApiItem {
  quantity: string;
  productname: string;
  cartid: number;
  rate: string;
}

export interface ViewCartResponse {
  output: Record<
    string, // date
    Record<
      string, // shift
      Record<
        string, // product group
        Record<string, CartApiItem>
      >
    >
  >;
  error?: string;
}

export interface CartItem {
  cartid: number;
  productname: string;
  quantity: number;
  rate: number;

    productgid: number;
  supplydate: string;
  supplyshift: number;
}

