import { NextResponse } from "next/server"




export async function POST(req:Request){
    const {
        subAccountConnectAccId,
        prices,
        subaccountId
    } : {
        subAccountConnectAccId : string,
        prices : {recurring : boolean, productId : string}[],
        subaccountId : string
    } = await req.json()
    const origin = req.headers.get('origin')
    if (!subAccountConnectAccId || !prices.length)
        return new NextResponse("Stripe account Id or price Id is missing", {
    status : 400})
    
    
}