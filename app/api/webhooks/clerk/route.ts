

import { prismadb } from '@/lib/db';
import { WebhookEvent } from '@clerk/nextjs/server';
import {Webhook} from 'svix'
import { headers } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req:Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error(
          "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");
  
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error occured -- no svix headers", {
        status: 400,
      });
    }


    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);

    let evt : WebhookEvent;


    try {
        evt = wh.verify(body, {
          "svix-id": svix_id,
          "svix-timestamp": svix_timestamp,
          "svix-signature": svix_signature,
        }) as WebhookEvent;
      } catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
          status: 400,
        });
      }

      const { id } = evt.data;
      const eventType = evt.type;

      ///////   Created
      if(eventType==="user.created"){

        await prismadb.user.create({
            data:{
                clerkId: payload.data.id,
                email:payload.data.email_addresses[0].email_address,
                username:payload.data.username,
                photo:payload.data.image_url,
                firstName: payload.data.first_name,
                lastName: payload.data.last_name,
            }
        });

      }


      ///////   Update
      if(eventType==="user.updated"){

        await prismadb.user.update({
            where:{
                clerkId: payload.data.id,
            },
            data:{
                username:payload.data.username,
                photo:payload.data.image_url,
                firstName: payload.data.first_name,
                lastName: payload.data.last_name,
            }
        });

      }

       ///////   Delete
       if(eventType==="user.deleted"){

         const existingUser = await prismadb.user.findUnique({
            where: {
              clerkId: payload.data.id
            }
          });

          if(existingUser){
            await prismadb.user.delete({
                where:{
                    clerkId: payload.data.id
                }
            })



          }
         
      }

      return new Response("", { status: 200 });

}