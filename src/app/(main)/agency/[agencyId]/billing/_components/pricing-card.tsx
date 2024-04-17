'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PricesList } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    features: string[]
    buttonCta: string
    title: string
    description: string
    amt: string
    duration: string
    highlightTitle: string
    highlightDescription: string
    customerId: string
    prices: PricesList['data']
    planExists: boolean
}

const PricingCard = ({
    features,
    buttonCta,
    title,
    description,
    amt,
    duration,
    highlightTitle,
    highlightDescription,
    customerId,
    prices,
    planExists
}: Props) => {
    const {setOpen} = useModal()
    const searchParams = useSearchParams()
    const plan = searchParams.get("plan")
    
    return (
    <Card className='flex flex-col justify-between lg:w-1/2'>
        <div>
            <CardHeader className='flex flex-col md:flex-row justify-between'>
                <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </div>
                <p className='text-6xl font-bold'>
                    {amt}
                    <small className='text-xs font-light text-muted-foreground'>{duration}</small>
                </p>
            </CardHeader>
            <CardContent>
                <ul>
                    {features.map(feature=> (
                        <li 
                            key={feature}
                            className='list-disc ml-4 text-muted-foreground'
                        >{feature}</li>
                    ))}
                </ul>
            </CardContent>
        </div>
    </Card>
  )
}

export default PricingCard