"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);



const PayHere = ({params}:{params:{id:string}}) => {
  const {id}=params
  console.log(id)
  const [clientSecret,setClientSecret]=useState("")
  useEffect(()=>{
    const sendId=async()=>{
      const res=await axios.post(`/api/create-intent/${id}`)
      setClientSecret(res.data.clientSecret)

    }
    sendId()

  },[id])




  const options:StripeElementsOptions={
    clientSecret,
    appearance:{
      theme:"stripe"
    }
  }

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm/>
        </Elements>
      )}
    </div>
  );
}

export default PayHere