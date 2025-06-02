import { useNavigate } from "react-router-dom"
import LayOut from "../../components/LayOut/LayOut"
import ProductCard from "../../components/Product/ProductCard"
import styles from "./Payment.module.css"
import { collection, doc, setDoc } from "firebase/firestore"
import { useContext, useState } from "react"
import { DataContext } from "../../components/Context/Context"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { ClipLoader } from "react-spinners"
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat"
import { axiosInstance } from "../../Api/axois"
import { db } from "../../../Firebase/Firebase"
import { Type } from "../../Utility/action.type"
// import ProductCard from "../../product/ProductCard"

function Payment() {
const [{user,cart},dispatch]=useContext(DataContext)

const totalItem=cart?.reduce((amount,item)=>{
  return (amount)+(item.quantity)
},0)

const totalPriceInDollar=cart?.reduce ((amount,item)=>{
  return (amount)+(item.quantity*item.price);
},0)

const totalPriceInCents=totalPriceInDollar*100;

const [processing ,setProcessing]=useState(false)
const [cardError,setCardError]=useState(null)

const stripe=useStripe();
const elements=useElements();

const navigate=useNavigate();

const handleChange =(e)=>{
e?.error?.message ? setCardError(e?.error?.message):setCardError("")
}

const handlePayment= async(e)=>{
  e.preventDefault();
 
 setProcessing(true)

 const response= await axiosInstance ({
  method:"post",
  url:`/payment/create?total=${totalPriceInCents}`,

} );
  
const clientSecret=response.data?.clientSecret;

 console.log(clientSecret);

const confirmation = await stripe.confirmCardPayment(clientSecret,{
payment_method:{
card:elements.getElement(CardElement)
}
})

const {paymentIntent}=confirmation
 console.log(paymentIntent);
// crearing order referece
const orderDocRef= doc(collection (doc(db,"users",user.uid),"orders"), paymentIntent?.id)
await setDoc(orderDocRef,{
  cart:cart,
  quantity:paymentIntent.amount,
  created:paymentIntent.created
});

dispatch (
  {
    type:Type.SET_EMPTY
  }
)

 setProcessing(false)

navigate ("/orders")

}


  return (
    <LayOut> 
        {/* header */}
    <div className={styles.payment_header}>checkout({totalItem}) items </div>
        {/* we have section conatining everything */}
        <section className={styles.payment} >
         {/* Delivery Address  */}
         <div className={styles.flex}>
        <h3>Delivery Address</h3>
         </div>
            <div>{user?.email}</div>
            <div>1175 Steiner</div>
            <div> San francisco, Ca</div>
         {/* product review  */}
      <div className={styles.flex}>
           <h3>review items and delivery</h3>
        
         <div>
         {cart?.map((item,i)=>(
          <ProductCard product={item} flex={true} key={i} payment={true} notDisplayAdd={true}/>
         ))}
         </div>
      </div>
      <hr />
     

         {/* payment related container   */}

        <div className={styles.flex}>
          <h3>payment method</h3>
           <div className={styles.payment_card_container}>
               <div className= {styles.payment_detail}>
                <form onSubmit={handlePayment}>
          { cardError && (<small style={{color :"red"}}>
            {cardError}</small>)}

            <CardElement  onChange={handleChange}/>

            <div className={styles.payment_price}>
               <div>
                <span style={{display:"flex", gap:"10px"}}>
                  <p> Total order</p>
                  <CurrencyFormat amount = {totalPriceInDollar} />
                </span>
            </div>
               <button type="submit">
                {processing ?(<div className={styles.loading}>
                  <ClipLoader color="grey" size={12}/>
                  <p>please wait</p>
                  </div>):("Pay Now") }
               </button>
            </div>



                </form>
               </div>


           </div>

         </div>

        </section>
    </LayOut>
  );
}

export default Payment
