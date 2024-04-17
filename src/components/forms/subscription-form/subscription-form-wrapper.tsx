'use client'

import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'
import { useModal } from '@/providers/modal-provider'
import { Plan } from '@prisma/client'
import { StripeElementsOptions } from '@stripe/stripe-js'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'

type Props = {
    customerId : string,
    planExists : boolean
}

const SubscriptionFormWrapper = ({customerId, planExists}: Props) => {
    const {data, setClose} = useModal()
    const router = useRouter()

    const [selectedPriceId, setSelectedPriceId] = useState<Plan | ''>(data?.plans?.defaultPriceId || '')
    const [Subscription, setSubscription] = useState<{
        subscriptionId : string,
        clientSecret : string
    }>({subscriptionId : "", clientSecret : ""})
    
    const options : StripeElementsOptions = useMemo(()=> ({
        clientSecret : Subscription?.clientSecret,
        appearance : {
            theme : "flat",
        }
    }), [Subscription])

    useEffect(()=>{
        if(!selectedPriceId) return
        const createSecret = async () => {
            const subscriptionResponse = await fetch(
                '/api/stripe/create-subscription',
                {
                    method : "POST",
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify({
                        customerId,
                        priceId : selectedPriceId
                    })
                }
            )
            const subscriptionResponseData = await subscriptionResponse.json()

            setSubscription({
                clientSecret : subscriptionResponseData.clientSecret,
                subscriptionId : subscriptionResponseData.subscriptionId
            })

            if (planExists) {
                toast({
                    title : 'Success',
                    description : 'Your plan has been successfully upgraded!'
                })
                setClose()
                router.refresh()
            }
        }

        createSecret()
    }, [data, selectedPriceId, customerId])
    return (
    <div className='border-none transition-all'>
        <div className="flex flex-col gap-4">
            {
                data.plans?.plans.map((price)=>(
                    <Card 
                        key={price.id}
                        className={clsx('relative cursor-pointer transition-all', {
                            'border-primary' : selectedPriceId === price.id
                        })}
                    ></Card>
                ))
            }
        </div>
    </div>
  )
}

export default SubscriptionFormWrapper