import { Badge, Navbar, Nav, Container , NavDropdown} from "react-bootstrap";
import styles from "./Header.module.css";
import { NavLink } from "react-router-dom";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import { useAppDispatch , useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";



const Header = () => {



  const dispatch = useAppDispatch();

  const {accessToken , user} = useAppSelector((state) => state.auth);




const capitalize = (str: string | undefined | null) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};


  return (
    <header>
      <div className={styles.headerContainer}>
        <h1 className={styles.headerLogo}>
          <span>Our </span>
          <Badge bg="info">eCom</Badge>
        </h1>

        <HeaderLeftBar />
      </div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="categories">
                Categories
              </Nav.Link>
              <Nav.Link as={NavLink} to="about-us">
                About
              </Nav.Link>
            </Nav>
            <Nav className=""></Nav>
            <Nav>
              {/* drop down menu */}
              {!accessToken ? (
                <>
                  <Nav.Link as={NavLink} to="login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="register">
                    Register
                  </Nav.Link>
                </>
              ) : (
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={`Welcome: ${capitalize(user?.firstName)} ${capitalize(
                    user?.lastName
                  )}`}
                  menuVariant="dark"
                >
                  <NavDropdown.Item as={NavLink} to="profile" end>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="profile/orders">
                    Orders
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to={"/"}
                    onClick={() => dispatch(authLogout())}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
