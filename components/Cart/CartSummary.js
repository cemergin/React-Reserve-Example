import { Button, Segment, Divider } from "semantic-ui-react";
import React from "react";
import calculateCartTotal from "../../utils/calculateCartTotal";

function CartSummary({ products, handleCheckout }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    const { cartTotal, stripeTotal } = calculateCartTotal(products);
    setCartAmount(cartTotal);
    setStripeAmount(stripeTotal);
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong> Sub total: </strong> ${cartAmount}
        <Button
          icon="cart"
          color="teal"
          disabled={isCartEmpty}
          floated="right"
          content="Checkout"
          onClick={handleCheckout}
        />
      </Segment>{" "}
    </>
  );
}

export default CartSummary;
