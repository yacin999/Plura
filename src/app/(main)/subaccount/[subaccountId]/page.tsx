'use client'

import BlurPage from '@/components/global/blur-page'
import { useParams } from 'next/navigation'
import React from 'react'


type Props = {
  params : {subaccountId : string}
}

const SubaccountPageId = ( {params} : Props) => {
  return (
    <BlurPage>
      <h1 className='text-center text-2xl'>welcome to your subaccount</h1>
    </BlurPage>
  )
}

export default SubaccountPageId