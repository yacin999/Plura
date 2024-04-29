"use client"

import MediaComponent from '@/components/media'
import { getMedia } from '@/lib/queries'
import { GetMediaFiles } from '@/lib/types'
import React, { useEffect, useState } from 'react'

type Props = {
    subaccountId : string
}

const MediaBucketTab = ({subaccountId}: Props) => {
    const [data, setdata] = useState<GetMediaFiles>(null)
    useEffect(()=> {
        const fetchData = async () => {
            const response = await getMedia(subaccountId)
            setdata(response)
        }
        fetchData()
    }, [subaccountId])
  return (
    <div className='h-[900px] p-4'>
        <MediaComponent
            data={data}
            subaccountId={subaccountId}
        />
    </div>
  )
}

export default MediaBucketTab