'use client'

import { useModal } from '@/providers/modal-provider'
import { Plan } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type Props = {
    customerId : string,
    planExits : boolean
}

const SubscriptionFormWrapper = ({customerId, planExits}: Props) => {
    const {data, setClose} = useModal()
    const router = useRouter()

    const [selectedPriceId, setSelectedPriceId] = useState<Plan | ''>(data?.plan?.defaultPriceId || '')
    return (
    <div>SubscriptionFormWrapper</div>
  )
}

export default SubscriptionFormWrapper