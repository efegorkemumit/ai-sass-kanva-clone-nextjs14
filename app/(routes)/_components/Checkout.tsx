'use client'

import { useToast } from '@/components/ui/use-toast';
import React, { useEffect } from 'react'
import { loadStripe } from "@stripe/stripe-js";
import { checkoutCredits } from '@/actions/check';
import { Button } from '@/components/ui/button';


interface CheckoutProps{
    plan:string;
    amount:number;
    credits:number;
    buyerId:string;
}

const Checkout = ({amount,buyerId,credits,plan}:CheckoutProps) => {

    const { toast } = useToast();

    useEffect(() => {
        loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      }, []);
    
      useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
          toast({
            title: "Order placed!",
            description: "You will receive an email confirmation",
            duration: 5000,
            variant:'success'
          });
        }
    
        if (query.get("canceled")) {
          toast({
            title: "Order canceled!",
            description: "Continue to shop around and checkout when you're ready",
            duration: 5000,
            variant:'destructive'
          });
        }
      }, []);

      const onCheckout = async () => {
        const transaction = {
          plan,
          amount,
          credits,
          buyerId,
        };
    
        await checkoutCredits(transaction);
      };

  return (
    <form action={onCheckout} method='POST'>
        <section>

            <Button 
            type='submit'
            role='link'>
                Buy Credit


            </Button>
        </section>


    </form>
  )
}

export default Checkout