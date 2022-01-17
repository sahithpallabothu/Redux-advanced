import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect } from "react";
//import { uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { sendCartData,fetchData } from './store/cart-actions';

let isInitial = true;

function App() {
  const isShowCart = useSelector((state) => state.uiCart.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.uiCart.notification);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchData());
  },[dispatch]);

  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return;
    }

    if(cart.cartChanged){
      dispatch(sendCartData(cart));
    }
  }, [cart,dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isShowCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
