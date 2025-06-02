
import styles from "./Product.module.css"
import axios from "axios";
import ProductCard from "./ProductCard";
import { useState,useEffect } from "react";
import { productUrL } from "../../Api/endPoints";
import Loader from "../Loader/Loader";

function Product() {
    const[Products,setProducts]=useState([]);
    const [isLoading,setIsLoading]=useState(false);

    useEffect (()=>{
      setIsLoading(true);
      
        axios
        .get(`${productUrL}/products`)
        .then(res=>{
          setProducts(res.data);
          setIsLoading(false);
          
        }).catch(err=>{
          console.error(`Error on fetching product: ${err}`);
          setIsLoading(false);
        });
        
        },[]);
  return (
    <>
    {isLoading? (
    <Loader/>
    ) : (
    <section className={styles.product_container}>
      {Products.map((product)=>(
        <ProductCard product={product} key={product.id}/>
    ))}
    </section>
  )}
  </>
  );
}

export default Product
