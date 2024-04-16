'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
                    <CardDescription></CardDescription>
                </div>
            </CardHeader>
        </div>
    </Card>
  )
}

export default PricingCard