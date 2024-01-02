const CheckoutForm = ({ price, foodCart }) => {
  console.log(typeof price);

  // this is fro user
  return (
    <div>
      <h2> Ordered Food :{foodCart.length}</h2>
      <p>Total Amount: {price}</p>
    </div>
  );
};

export default CheckoutForm;
