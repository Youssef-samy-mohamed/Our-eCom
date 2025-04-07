import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import  styles from './style.module.css'
import {Header , Footer } from "../../compoenents/common"


const MainLayout = () => {
  return (
    <Container className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        <Outlet/>
        
      </div>
      <Footer />
    </Container>
  );
}

export default MainLayout