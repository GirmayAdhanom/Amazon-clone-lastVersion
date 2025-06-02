import styles from "./LowerHeader.module.css"
import { MdOutlineMenu } from "react-icons/md";

function Lowerheader() {
  return (
    <div className={styles.lower_container}>
    <ul className={styles.nav_list}>
      <li className= {styles.nav_item}>
      <MdOutlineMenu className={styles.icon} />
        <span>All</span>
      </li>

      <li className= {styles.nav_item}>Today's deal</li>
      <li className= {styles.nav_item}>customer Service</li>
      <li className= {styles.nav_item}> Registery</li>
      <li className= {styles.nav_item}>Gift cards</li>
      <li className= {styles.nav_item}>Sell</li>
     
    </ul>

    </div>
  )
}

export default Lowerheader
