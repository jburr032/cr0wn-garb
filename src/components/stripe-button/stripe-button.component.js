import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForSripe = price * 100;
  const publishableKey =
    "pk_test_51GwnzFBAro3M03KjR0Gg22iH70i7q9YLfTZadt1NOCnG2Q6a4ZRoCdwFyVzFdMPzyJSHQs2w81p7nIVyJ4J1F4pj00PZT0GSEs";

  const onToken = (token) => {
    console.log(token);
    alert("Payment successful!");
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForSripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
