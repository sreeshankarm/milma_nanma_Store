// types.ts
export interface Product {
  id: string;
  name: string;
  malayalamName?: string;
  code?: string;
  mrp: number;
  price: number;
  image: string;
  description?: string; 
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface AppState {
  balance: number;
  products: Product[];
  cart: CartItem[];
  
}

// ----------------------------------------
// CART ITEM (for orders)
// ----------------------------------------

export interface OrderItem {
  id: string;
  productId: string;
  name: string;       // Shown in OrderList
  quantity: number;   // consistent (NOT qty)
  price: number;      // per unit price
}

// ----------------------------------------
// APP STATE
// ----------------------------------------

export interface AppState {
  balance: number;
  products: Product[];
  cart: CartItem[];
}





// ----------------------------------------
// ORDER
// ----------------------------------------
export interface OrderItem {
  id: string;          // unique item id
  productId: string;
  name: string;
  // qty: number;
   quantity: number;          
  price: number;
}

export const OrderStatus = {
  UPCOMING: "UPCOMING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
  DELIVERED: "DELIVERED",
  RETURN_REQUESTED: "RETURN_REQUESTED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];



export interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;   // NOT total
  status: OrderStatus;
  createdAt: string;     // NOT date
  remarks: string[];
}




// ----------------------------------------
// RETURN REQUEST
// ----------------------------------------

export interface ReturnRequest {
  id: string;
  orderId: string;
  reason: string;
  date: Date;
  status: "PENDING" | "APPROVED" | "REJECTED";
  message?: string;
}

// RETURN REQUEST TYPE
// ----------------------------------------
export interface ReturnItem {
  id: string;
  orderId: string;
  date: string;
  status: "REQUESTED" | "APPROVED" | "IN_REVIEW";
  products: {
    name: string;
    qty: number;
    issue: string;
  }[];
}


export type ViewState =
  | "HOME"
  | "TOP_UP"
  | "ANALYTICS"
  | "RETURNS_HISTORY"
  | "COMMISSIONS"
  | "FEEDBACK";


export interface DistributorContact {
  id: string;
  name: string;
  region: string;
  phone: string;
  email: string;
  specialties: string[];
}


// FEEDBACK
// ----------------------------------------
export const ComplaintCategory = {
  QUALITY: "Quality",
  LOGISTICS: "Logistics",
  PRODUCT: "Product",
  MARKETING: "Marketing",
  OTHER: "Other",
} as const;

export type ComplaintCategory =
  typeof ComplaintCategory[keyof typeof ComplaintCategory];

export type ComplaintStatus =
  | "Open"
  | "In Progress"
  | "Responded"
  | "Closed";

export interface Complaint {
  id: string;
  category: ComplaintCategory;
  description: string;
  contact: string;
  channel: "Mobile App" | "UI" | "Voice";
  status: ComplaintStatus;
  response?: string;
  createdAt: Date;
  updatedAt: Date;
}


// ---------------------------
// USER PROFILE
// ---------------------------
export interface GeoLocation {
  lat: number;
  lng: number;
  accuracy: number;
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  regId: string;
  phone: string;
  email: string;
  address: string;
  storePhotos: string[];
  geoLocation?: GeoLocation;
}

// ---------------------------
// CONTACT DETAILS FORM STATE
// ---------------------------
export interface ContactDetailsFormState {
  phone: string;
  email: string;
  address: string;
  storePhotos: string[];
}
