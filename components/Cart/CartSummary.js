import { Button, Segment, Divider } from "semantic-ui-react";
import React from "react";

function CartSummary({ products }) {
  const [isCartEmpty, setCartEmpty] = React.useState(false);

  React.useEffect(() => {
    setCartEmpty(products.length === 0);
  }, [products]);

  return (
    <>
      <Divider />
      <Segment clearing size="large">
        <strong>Sub total:</strong> $0.00
        <Button
          icon="cart"
          color="teal"
          disabled={isCartEmpty}
          floated="right"
          content="Checkout"
        />
      </Segment>
    </>
  );
}

export default CartSummary;
