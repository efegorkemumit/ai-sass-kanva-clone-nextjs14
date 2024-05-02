
import { createTransaction } from "@/actions/check";
import { NextResponse } from "next/server";
import stripe from "stripe";


export async function POST(request:Request){
    try {

        const body = await request.text();

        const sig = request.headers.get("stripe-signature") as string;
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    
        let event;

        try {
            event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
          } catch (err) {
            console.error("Webhook error:", err);
            return NextResponse.json({ message: "Webhook error", error: err });
          }

        const eventType = event.type;

        console.log("Received webhook event type:", eventType);

        if (eventType === "checkout.session.completed") {
            const { id, amount_total, metadata } = event.data.object;
            console.log("Checkout session completed:", id, amount_total, metadata);
            const transaction = {
              stripeId: id,
              amount: amount_total ? amount_total / 100 : 0,
              plan: metadata?.plan || "",
              credits: Number(metadata?.credits) || 0,
              buyerId: metadata?.buyerId || "",
              createdAt: new Date(),
            };
      
            console.log("Creating transaction:", transaction);
      
            const newTransaction = await createTransaction(transaction);
      
            console.log("Transaction created:", newTransaction);
      
            return NextResponse.json({ message: "OK", transaction: newTransaction });
          }


      
    
          return new Response("", { status: 200 });

        
    } catch (error) {

        console.error("Error processing webhook:", error);
    return NextResponse.json({ message: "Internal server error", error });
        
    }
}