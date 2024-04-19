import {stripe} from "@/lib/stripe"
import {StripeCustomerType} from "@/lib/types"
import { NextResponse } from "next/server"


export async function POST(req:Request) {
    const {address, email, name, shipping} : StripeCustomerType = await req.json()

    if (! email || !address || !name || !shipping) {
        return new NextResponse("Missing Data", {
            status : 400
        })
    }
    try {
        const customer = await stripe.customers.create({
            email,
            name,
            address,
            shipping
        })
        console.log("test stripe create customer :", customer)
        return Response.json({customerId : customer.id})
    } catch (error) {
        console.log("Error :", error)
        return new NextResponse("Internal server error ", {status : 500})
    }

}



