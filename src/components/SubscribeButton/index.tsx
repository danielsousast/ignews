import { signIn, useSession } from "next-auth/react";
import React from "react";
import { api } from "../../services/api";
import { stripe } from "../../services/stripe";
import { getStripeJs } from "../../services/stripe-js";

import styles from "./styles.module.scss";

interface SubscribeButton {
  priceId: string;
}

interface SubscribereResponse {
  data: {sessionId: string;}
}

export  function SubscribeButton({ priceId }: SubscribeButton) {
  const { data: session } = useSession();


  async function handleSubscribe() {
    if(!session) {
      signIn('github');
      return;
    }

   try {
     const response: SubscribereResponse = await api.post('/subscribe');
     const {data} = response;
     const stripeJs = await getStripeJs();
     await stripeJs.redirectToCheckout({sessionId: data.sessionId});
   } catch (error) {
     alert(error.message);
     console.log(error)
   }
  }

  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
}
