'use client'

import BlurPage from '@/components/global/blur-page'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'
import { useParams } from 'next/navigation'
import React from 'react'


type Props = {
  params : {subaccountId : string},
  searchParams : {code : string}
}

const SubaccountPageId = async( {params, searchParams} : Props) => {
  let currency = 'USD'
  let sessions
  let totalClosedSessions
  let totalPendingSessions
  let net = 0
  let potentialIncome = 0
  let closingRate = 0

  const subaccountDetails = await db.subAccount.findUnique({
    where : {id : params.subaccountId}
  })

  const currentYear = new Date().getFullYear()
  const startDate = new Date(`${currentYear}-01-01T00:00:00Z`).getTime() / 1000
  const endDate = new Date(`${currentYear}-12-31T23:59:59Z`).getTime() / 1000

  if (!subaccountDetails) return

  if (subaccountDetails.connectAccountId) {
    const response = await stripe.accounts.retrieve({
      stripeAccount : subaccountDetails.connectAccountId
    })  
    currency = response.default_currency?.toUpperCase() || 'USD'
  }
  return (
    <BlurPage>
      <h1 className='text-center text-2xl'>welcome to your subaccount</h1>
    </BlurPage>
  )
}

export default SubaccountPageId