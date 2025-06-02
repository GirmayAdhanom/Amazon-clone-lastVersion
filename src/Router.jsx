
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Result from "./Pages/Result/Result"
import ProductDetail from "./Pages/ProductDetail/ProductDetail"
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function Router() {
  const stripePromise=loadStripe(
    "pk_test_51RUMHj4PvcOdgyiW4Kf527Qyn8YpYqYKkPW5KPSZpQFN0kC0j3xxpT6PQMI5iLrovKUFOiDmPOIzuyDLKF6ya9ZU007hWiNHFM"
  );
  return (
    <BrowserRouter>
     <Routes>
    <Route path="/"element={<Home/>}/>
    <Route path="/cart" element={<Cart/>} />
    <Route path="/Auth"element ={<Auth/>}/>
    <Route path="/Payments" element=     {
      <ProtectedRoute msg={"you must log in to pay"} redirect ={"/payments"}>
     <Elements stripe={stripePromise}>
            <Payment/>

      </Elements>
      </ProtectedRoute>
      
       }
       />
    <Route path="/category/:category" element={<Result/>}/>
    <Route path="/products/:id" element={<ProductDetail/>}/>
    <Route path="/orders"element ={
      <ProtectedRoute msg={"you must log in to acces your order"} redirect ={"/orders"} >
      <Elements stripe={stripePromise}>
           
     <Orders/>

     </Elements>



      </ProtectedRoute>
      }/>

     </Routes>
    </BrowserRouter>
  )
}

export default Router
