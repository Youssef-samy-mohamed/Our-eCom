import styles from './Category.module.css'
import { Link } from 'react-router-dom'
import { TCategory } from '../../../types/category'





const Category = ({ title, img, prefix }: TCategory) => {
  return (
    <div className={styles.category}>
      <Link to={`/categories/products/${prefix}`}>
        <div className={styles.categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={styles.categoryTitle}>{title}</h4>
      </Link>
    </div>
  );
};

export default Category;