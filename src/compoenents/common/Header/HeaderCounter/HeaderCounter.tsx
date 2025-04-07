import styles from "./HeaderBasket.module.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { container, totalNum, pumpAnimate, iconWrapper } = styles;





type HeaderCounterProps = {
  totalQuantity: number;
  svgIcon: React.ReactNode;
  to: string;
  title:string;
};





const HeaderCounter = ({
  totalQuantity,svgIcon,to,title}: HeaderCounterProps) => {

  const [isAnimate, setIsAnimate] = useState(false);

  const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ""}`;

  const navigate = useNavigate();

  useEffect(
    () => {
      if (totalQuantity === 0) return;
      setIsAnimate(true);

      const debonce = setTimeout(() => {
        setIsAnimate(false);
      }, 300);
      return () => {
        clearTimeout(debonce);
      };
    }, // clean up ensure smooth animation without memory leaks

    [totalQuantity]
  );

  return (
    <div className={container} onClick={() => navigate(to)}>
      <div className={iconWrapper}>
        {svgIcon}
        {totalQuantity > 0 && (
          <div className={quantityStyle}>{totalQuantity}</div>
        )}
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default HeaderCounter;
