import styles from "./Loader.module.css";
import { PulseLoader } from 'react-spinners'

function loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderContent}>
        
            <PulseLoader  
            color='#F590B' 
            height={6}
            width={200}
         className={styles.loaderBar}
            />
            <p className={styles.loaderText}>loading...</p>
          
      </div>
    </div>
    
  );
}

export default loader
