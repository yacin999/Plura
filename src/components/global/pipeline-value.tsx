"use client"

import { getPipelines } from '@/lib/queries'
import { Prisma } from '@prisma/client'
import React, { useEffect, useState } from 'react'

type Props = {
    subaccountId : string
}

const PipelineValue = ({subaccountId}: Props) => {
    const [pipelines, setPipelines] = useState<Prisma.PromiseReturnType<typeof getPipelines
    >>([])

    const [setselectedPipelineId, setSelectedPipelineId] = useState('')
    const [pipelineClosedValue, setPipelineClosedValue] = useState(0)

    useEffect(()=> {
        const fetchData = async ()=> {
            
        }
    })
  return (
    <div>PipelineValue</div>
  )
}

export default PipelineValue