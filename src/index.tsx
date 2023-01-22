import React, {Suspense} from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { store } from "./redux/store";
import { Provider } from 'react-redux'

import "./assets/scss/app.scss";

import Default from "./layouts/Default";

import Home from "./pages/Home";
import Loading from "./components/Loading";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Suspense fallback={<Loading />}><Cart /></Suspense>,
      },
      {
        path: '*',
        element: <Suspense fallback={<Loading />}><NotFound /></Suspense> 
      },
    ],
    
  },
]);

const rootElem = document.getElementById("root")

if(rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
}

