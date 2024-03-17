'use client'

import { deleteSubAccount, getSubaccountDetails, saveActivityLogsNotification } from '@/lib/queries'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
    subaccountId : string
}

const DeleteButton = ({subaccountId}: Props) => {
    const router = useRouter()
  return (
    <div onClick={async()=>{
        const response = await getSubaccountDetails(subaccountId)
        await saveActivityLogsNotification({
            agencyId : undefined,
            description : `Deleted a subaccount | ${response?.name}`,
            subaccountId : subaccountId
        })
        await deleteSubAccount(subaccountId)
    }}></div>
  )
}

export default DeleteButton