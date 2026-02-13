import { AuthProvider } from "../../app/providers/AuthProvider";
import { ProfileProvider } from "../../app/providers/ProfileProvider";
import { ProductProvider } from "../../app/providers/ProductProvider";
import { CartProvider } from "../../app/providers/CartProvider";
import { OrderProvider } from "../../app/providers/OrderProvider";
import { AckProvider } from "../../app/providers/AckProvider";
import { InvoiceProvider } from "../../app/providers/InvoiceProvider";
import { PaymentProvider } from "../../app/providers/PaymentProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <ProfileProvider>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <AckProvider>
              <InvoiceProvider>
                <PaymentProvider>{children}</PaymentProvider>
              </InvoiceProvider>
            </AckProvider>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </ProfileProvider>
  </AuthProvider>
);













// import { AuthProvider } from "../../app/providers/AuthProvider";
// import { ProfileProvider } from "../../app/providers/ProfileProvider";
// import { ProductProvider } from "../../app/providers/ProductProvider";
// import { CartProvider } from "../../app/providers/CartProvider";
// import { OrderProvider } from "../../app/providers/OrderProvider";
// import { useAuth } from "../../context/auth/useAuth";

// const AuthenticatedProviders = ({ children }: { children: React.ReactNode }) => {
//   const { isAuth } = useAuth();

//   if (!isAuth) {
//     return <>{children}</>;
//   }

//   return (
//     <ProfileProvider>
//       <ProductProvider>
//         <CartProvider>
//           <OrderProvider>{children}</OrderProvider>
//         </CartProvider>
//       </ProductProvider>
//     </ProfileProvider>
//   );
// };

// export const AppProviders = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <AuthProvider>
//       <AuthenticatedProviders>{children}</AuthenticatedProviders>
//     </AuthProvider>
//   );
// };
