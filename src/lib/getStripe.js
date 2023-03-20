import { loadStripe } from '@stripe/stripe-js';

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe("pk_test_51KG40qE7jIbDinv8gi3HDYthubVs4gc3dGbpBzoyQG47Cddes3hZvy0GokC5nmikjZSwODOLVfzLRg3OEAQG5qpM00f6MvchPX");
    //stripePromise = loadStripe("pk_test_51MdC6xHYvapymDO9uPTwAf3jp3vyrYLCsVAfszQwdF7SaK6d7mCp4owvWHbjQmCmLEIio5Pn7XSTr8v9xTBO39pU000frhtkqo");
  }
  return stripePromise;
};

export default getStripe;