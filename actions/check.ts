"use server"
import { prismadb } from "@/lib/db";
import { CheckoutTransactionParams } from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { updateCredits } from "./user";


export async function checkoutCredits(transaction:CheckoutTransactionParams) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const amount = Number(transaction.amount) *100;

    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              unit_amount: amount,
              product_data: {
                name: transaction.plan,
              }
            },
            quantity: 1
          }
        ],
        metadata: {
          plan: transaction.plan,
          credits: transaction.credits,
          buyerId: transaction.buyerId,
        },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      })
    
      redirect(session.url!)

    
    
}

export async function createTransaction(transaction:CreateTransactionParams) {

    try {

        const  newTransaction = await prismadb.transaction.create({
            data:{
                ...transaction,
                buyer:transaction.buyerId
            }
        })
    
        await updateCredits(transaction.buyerId, transaction.credits);
    
        return JSON.parse(JSON.stringify(newTransaction));
    
        
    } catch (error) {
        
        console.error('Error fetching images:', error);
        throw new Error('Error fetching images');
    }

   



    
}

