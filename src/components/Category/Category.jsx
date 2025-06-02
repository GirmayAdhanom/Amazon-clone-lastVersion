import styles from "./Category.module.css"; // Ensure the filename is also updated to match
import { categoryInfos } from "./categoryFullInfos";
import CategoryCard from "./CategoryCard";

function Category() {
  return (
    <section className={styles.category_container}>
      {categoryInfos.map((data, i) => 
        <CategoryCard data={data} key={i} />
      )}
    </section>
  );
}

export default Category;

