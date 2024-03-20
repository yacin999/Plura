'use client'

import { useParams } from 'next/navigation'
import React from 'react'


type Props = {
  params : {subaccountId : string}
}

const SubAccountDetails = ( {params} : Props) => {
  return (
    <div>subaccount id :{params.subaccountId}</div>
  )
}

export default SubAccountDetails