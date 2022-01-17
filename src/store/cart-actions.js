import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
      dispatch(
        uiActions.showNotification({
          status: "Pending",
          title: "Sending",
          message: "Sending Cart Data",
        })
      );
      const sendRequest = async () => {
        const response = await fetch(
          "https://react-http-5a929-default-rtdb.firebaseio.com/cart.json",
          {
            method: "PUT",
            body: JSON.stringify(cart),
          }
        );
  
        if (!response.ok) {
          throw new Error("Sending Cart Data Failed");
        }
  
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Sent Cart Data Succesfully",
          })
        );
      };
  
      try {
        await sendRequest();
      } catch (err) {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Sending Cart Data failed",
          })
        );
      }
    };
  };


  export const fetchData = () => {
    return async (dispatch) =>{
      
      const getData= async () => {
        const resp = await fetch('https://react-http-5a929-default-rtdb.firebaseio.com/cart.json');
        if(!resp.ok){
          throw new Error("Error in fetchong data");
        }
        const data = resp.json();
        return data;
      }

      try{
        const cartData = await getData();
        dispatch(cartActions.replaceCart({
          items:cartData.items || [],
          totalQuantity:cartData.totalQuantity
        }))

      }catch(err){
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: "Fetching Cart Data failed",
          })
        );
      }

    }
  } 
  