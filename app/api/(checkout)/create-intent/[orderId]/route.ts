import { db } from "@/lib/prismaDB";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe("sk_test_51OI7eFHlfD3AHvy9aDDVJ5ljVuYTGoB5Dx7kzagt7561Jp2isDIbu0sQMyGXzcU83opWJCrbEKtq9czdP9eTqOJ200cgYtiBAA");

export async function POST(
    req: Request,
    { params }: { params: { orderId: string } }
  ) {
    
try {
  const order=await db.purchuses.findFirst({
    where:{
      id:params.orderId
    }
  })
  if(!order){
    return NextResponse.json("order doesnt exist",{status:404})
  }
  const paymentIntent=await stripe.paymentIntents.create({
    amount:order.price!,
    currency:"eur",
    automatic_payment_methods: {
      enabled: true,
    },

  })
  await db.purchuses.update({
    where:{
      id:params.orderId,

    },
    data:{
      intent_id:paymentIntent.id
    }
  })
  return NextResponse.json({clientSecret:paymentIntent.client_secret},{status:200})

    
    
} catch (error) {
    
}

}