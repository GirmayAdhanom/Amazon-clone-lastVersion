import { useContext, useEffect, useState } from "react"
import LayOut from "../../components/LayOut/LayOut"
import ProductCard from "../../components/Product/ProductCard"
import styles from "./Orders.module.css"
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore"
import { DataContext } from "../../components/Context/Context"
import { db } from "../../../Firebase/Firebase"

function Orders() {

const [orders, setOrders]=useState([])
const [{user},dispatch]=useContext(DataContext)

useEffect(()=>{

if(user){
// crating query reference 
const ordersQuery=query(
  collection(doc(db, "users",user.uid),"orders"), // to get a reference for "orders" sub collection
  orderBy("created", "desc") // sort them by the created field ( with the most recent first)
)

onSnapshot(ordersQuery,(snapshot)=>{
  setOrders(
    snapshot.docs.map((singleOrder)=> (
      {
        id:singleOrder.id,  //paymentIntenet .id
        data:singleOrder.data() //data()return an acctual content of the document 
         }
  ))
 )

});

} else{
  setOrders([])
}

},[])

  return (
  
    <LayOut>
    
     <section className={styles.container}>

      
     <div className={styles.orders_container}>

    

     <h2>  Your orders </h2>
    

     {orders?.lengeth===0 &&(
      <div className={styles.optional}> you dont have orders yet. </div>
      
     )}


     <div>
      {orders?.map((eachOrder,i)=>{
        return (
          <div key={i}>
              <p> Order ID:{eachOrder?.id}</p>
            {eachOrder?.data?.cart?.map((item,index)=>(
              <ProductCard product={item} key ={index} notDisplayAdd={true} payment={true}/>

      ))}
            <hr/>

          </div>

        );
      })}
      
      
     </div>


     </div>



     </section>

    </LayOut>
    
  )
}

export default Orders
