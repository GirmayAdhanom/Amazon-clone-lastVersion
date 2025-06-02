import { useParams } from "react-router-dom";
import LayOut from "../../components/LayOut/LayOut"
import styles from "./Result.module.css"
import { productUrL } from "../../Api/endPoints";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/loader"


function Result() {
 const{category}=useParams();
 const [results,setResults]=useState([]);
 const [isLoading,setIsLoading]=useState(false);
 const formatted= category.toLocaleLowerCase();
 console.log(results,category);

 useEffect(()=>{
  setIsLoading(true);
  // console.log(`${productUrL}/products/category/${formatted}`);

  axios
  .get(`${productUrL}/products/category/${formatted}`)
  .then((res)=>{
    setResults(res.data);
    setIsLoading(false);
  })

  .catch(err=>{
    console.error(`Error on fetching product${err}`);
    setIsLoading(false);
  })
},[]);
  return (
   <LayOut>
    <section className={styles.results_container}>
      <h1>Results</h1>
       <p>Category /{category} </p>
       <hr />

     {isLoading ?(
      <Loader/>
     ):(
          <div className={styles.products_container}>
        {results?.map(product=>(
          <ProductCard key={product.id} product={product}/>
  ))}
       </div>
     )}
      </section>
       </LayOut>
  );
}

export default Result
