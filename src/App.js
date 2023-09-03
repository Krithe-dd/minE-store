import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Error from "./pages/Error";
import { Home } from "./pages";
import { Cart } from "./pages/Cart";
import { Styles } from "./pages/Styles";
import Books from "./pages/Books";
import Electronics from "./pages/Electronics";
import SingleItem, { loaderFn as SingleItemLoader } from "./pages/SingleItem";
import WishList from "./pages/WishList";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import MyAddress  from "./pages/MyAddress";
import { useSelector } from "react-redux";
import MyOrders from "./pages/MyOrders";
import Header from "./components/Header";

const pages = [
  { path: "/styles", component: Styles },
  { path: "/books", component: Books },
  { path: "/electronics", component: Electronics },
];
function App() {
  const { user } = useSelector((state) => state.login);
  const router = createBrowserRouter([
    {
      path: "/",
      element:(
          <Root />
      ),
      errorElement:<Error />,
      children: [
        { index: true, element: <Home /> },
        { path: "/cart", element:user ? <Cart /> :<Register/>},
        { path: "/reg", element: <Register /> },
        { path: "/wishlist", element:<WishList /> },
        { path: "/checkout", element:user ? <Checkout />:<Register/> },
        { path: "/address", element:user ? <MyAddress />:<Register/> },
        { path: "/orders", element:user? <MyOrders />:<Register/> },
        ...pages.map((page) => ({
          path: page.path,
          element: <page.component />,
        })),
        ...pages.map((page) => ({
          path: `${page.path}/:id`,
          element: <SingleItem />,
          errorElement:<Error/>,
          loader: SingleItemLoader,
        })),
        {
          path: "/trending/:trendingId",
          element: <><Header/><SingleItem /></>,
          loader: SingleItemLoader,
        },
      ],
    },
    {
      path:'*',
      element:<Error/>
    }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
