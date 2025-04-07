import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// layouts
import { MainLayout } from "../layouts/ProfileLayout";
const ProfileLayout = lazy(() => import("../layouts/ProfileLayout/ProfileLayout"));
// compoenents
import { PageSuspenseFallback } from "src/compoenents/feedback";
// pages
import WishList from "@pages/Wishlist/WishList";
const Home = lazy(() => import("../pages/Home"));
const Categories = lazy(() => import("../pages/Categories/Categories"));
const Product = lazy(() => import("../pages/Products/Products"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const Cart = lazy(() => import("../pages/Cart/Cart"));
const Account = lazy(() => import("../pages/Profile/Account"));
const Orders = lazy(() => import("../pages/Orders/Orders"));
// feedback 

import { Error } from "@pages/index";
import LottieHandler from "../compoenents/feedback/LottieHandler/LottieHandler";

// protected routes
import ProtectedRoute from "src/compoenents/Auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: "10%" }}>
            <LottieHandler type="loading" message="Loading please wait..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspenseFallback>
            <Home />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute>
            <PageSuspenseFallback>
              <Cart />
            </PageSuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute>
            <PageSuspenseFallback>
              <WishList />
            </PageSuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <PageSuspenseFallback>
            <Categories />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "/categories/products/:prefix",
        element: (
          <PageSuspenseFallback>
            <Product />
          </PageSuspenseFallback>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "about-us",
        element: (
          <PageSuspenseFallback>
            <AboutUs />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "login",
        element: (
          <PageSuspenseFallback>
            <Login />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "register",
        element: (
          <PageSuspenseFallback>
            <Register />
          </PageSuspenseFallback>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <PageSuspenseFallback>
              <ProfileLayout />
            </PageSuspenseFallback>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PageSuspenseFallback>
                <Account />
              </PageSuspenseFallback>
            ),
          },
          {
            path: "orders",
            element: (
              <PageSuspenseFallback>
                <Orders />
              </PageSuspenseFallback>
            ),
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
