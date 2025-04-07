import styles from './HeaderBasket.module.css'
import Logo from '../../../assets/cart.svg?react'
import { useAppSelector } from '../../../store/hooks'
import { getCartTotalQuanitySelector } from '../../../store/cart/selectors'
import { useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom'

const { container, totalNum, pumpAnimate, iconWrapper } =
  styles;


const HeaderBasket = () => {

  const [isAnimate , setIsAnimate] = useState(false);
const totalQuantity = useAppSelector(getCartTotalQuanitySelector);

  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;


  const navigate = useNavigate();

useEffect(() => {
if(totalQuantity === 0) return;
setIsAnimate(true);

const debonce = setTimeout(() => {
  setIsAnimate(false);}, 300)
return () =>
   { clearTimeout(debonce); }}, // clean up ensure smooth animation without memory leaks

 [totalQuantity])



  return (
    <div className={container} onClick={() => navigate("/cart")}>
      <div className={iconWrapper}>
        <Logo title="basket icon" />
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h3>Cart</h3>
    </div>
  );
}

export default HeaderBasket