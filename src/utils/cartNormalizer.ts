// import type { ViewCartResponse, CartItem } from "../types/cart";

// export const normalizeCart = (
//   output: ViewCartResponse["output"]
// ): CartItem[] => {
//   const items: CartItem[] = [];

//   Object.values(output).forEach((dateObj) => {
//     Object.values(dateObj).forEach((shiftObj) => {
//       Object.values(shiftObj).forEach((groupObj) => {
//         Object.values(groupObj).forEach((item) => {
//           items.push({
//             cartid: item.cartid,
//             productname: item.productname,
//             quantity: Number(item.quantity),
//             rate: Number(item.rate),
//           });
//         });
//       });
//     });
//   });

//   return items;
// };



// import type { ViewCartResponse, CartItem } from "../types/cart";

// export const normalizeCart = (
//   output: ViewCartResponse["output"]
// ): CartItem[] => {
//   const items: CartItem[] = [];

//   Object.entries(output).forEach(([date, dateObj]) => {
//     Object.entries(dateObj).forEach(([shiftKey, shiftObj]) => {
//       const supplyshift = Number(shiftKey);

//       Object.values(shiftObj).forEach((groupObj) => {
//         Object.values(groupObj).forEach((item: any) => {
//           items.push({
//             cartid: item.cartid,
//             productname: item.productname,
//             quantity: Number(item.quantity),
//             rate: Number(item.rate),

//             productgid: Number(item.productgid),
//             supplydate: date,
//             supplyshift,
//           });
//         });
//       });
//     });
//   });

//   return items;
// };




// export const normalizeCart = (
//   output: ViewCartResponse["output"]
// ): CartItem[] => {
//   const items: CartItem[] = [];

//   Object.entries(output).forEach(([date, dateObj]) => {
//     Object.entries(dateObj).forEach(([shift, shiftObj]) => {
//       Object.entries(shiftObj).forEach(([_, groupObj]) => {
//         Object.entries(groupObj).forEach(([productgid, item]) => {
//           items.push({
//             cartid: item.cartid,
//             productgid: Number(productgid), // 🔥 FIX
//             productname: item.productname,
//             quantity: Number(item.quantity),
//             rate: Number(item.rate),
//             supplydate: date,               // 🔥 FIX
//             supplyshift: Number(shift),     // 🔥 FIX
//           });
//         });
//       });
//     });
//   });

//   return items;
// };


import type { ViewCartResponse, CartItem } from "../types/cart";


export const normalizeCart = (
  output: ViewCartResponse["output"]
): CartItem[] => {
  const items: CartItem[] = [];

  Object.entries(output).forEach(([date, dateObj]) => {
    Object.entries(dateObj).forEach(([shift, shiftObj]) => {
      Object.entries(shiftObj).forEach(([_, groupObj]) => {
        Object.entries(groupObj).forEach(([productgid, item]) => {
          items.push({
            cartid: item.cartid,
            productgid: Number(productgid),
            productname: item.productname,
            quantity: Number(item.quantity),
            rate: Number(item.rate),
            supplydate: date,
            supplyshift: Number(shift),

            // modal fields
            prod_code: item.code,
            prod_name: item.productname,
            final_rate: item.rate,
            imagepath: "",   // optional, populate if you have image
            subgrp_name: "", // optional
          });
        });
      });
    });
  });

  return items;
};
