
import styles from "./Header.module.css";
import logo from "../../assets/pngimg.png";
import { IoLocationOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
// import cartIcon from "../../assets/cart.jpg";
import { BiCart } from "react-icons/bi";
import Lowerheader from "./Lowerheader";
import { Link } from "react-router-dom";
import { DataContext } from "../Context/Context";
import { useContext } from "react";
import { auth } from '../../../firebase/firebase';


function Header() {

   const [{cart,user}, dispatch] = useContext(DataContext);
   const totalItem = cart?.reduce((amount, item) => item.quantity + amount, 0);
   console.log(totalItem);
   const userFirstName = user?.displayName.split(' ')[0].charAt(0).toUpperCase() + user?.displayName.split(' ')[0].slice(1).toLowerCase()
   
  return (
    <>
    <nav className={styles.upper_header_wrapper}>
      <div className={styles.Header_container}>
        {/* Left Side: Logo, Location, Search */}
        <div className={styles.logo_container}>
          <div className={styles.logo_wraper}>
            <Link to="/">
              <img src={logo} alt="logo" className={styles.logo} />
            </Link>
          </div>

          <div className={styles.delivery}>
            <IoLocationOutline className={styles.icon} />
            <div>
              <p className={styles.label}>Delivery to</p>
              <span className={styles.location}>Ethiopia</span>
            </div>
          </div>
          </div>

          <div className={styles.search}>
            <select name="category" className={`${styles.search_select} no-style`}>
              <option value="">All</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
            </select>
            <input
              type="text"
              placeholder="Search Amazon"
              className={`${styles.search_input} no-style`}
            />
            <button className={`${styles.search_button} no-style`}>
              <FiSearch size={23} />
            </button>
          </div>
        

        {/* Right Side: Language, Account, Orders, Cart */}
        <div className={styles.order_container}>
          <Link to="#" className={styles.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"
              alt="US flag"
              className={styles.flag}
            />
            <select className={`${styles.language_select} no-style`}>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </Link>

            <Link to={!user && '/auth'} className={styles.account}>
              {user ? (
                <>
                  <p className={styles.label}>Hello, {userFirstName}</p>
                  <span className={styles.bold} onClick={() => auth.signOut()}>Sign Out</span>
                </>
              ) : (
                <>
                  <p className={styles.label}>Hello, sign in</p>
                  <span className={styles.bold}>Account & Lists</span>
                </>
              )}
            </Link>

          <Link to="/orders"className={styles.orders}>
            <p className={styles.label}>Returns</p>
            <span className={styles.bold}>& Orders</span>
          </Link>

          <Link to="/cart" className={`${styles.cart} ${styles.cart_container}`}>
            {/* <img src={cartIcon} alt="BiCart" className={styles.icon} /> */}
            <BiCart size={40} />
            <span className={styles.cart_count}>{totalItem}</span>
            <span className={styles.cart_label}>Cart</span>
          </Link>
        </div>
      </div>
    </nav>
    <Lowerheader/>
    </>
  );
}

export default Header;
