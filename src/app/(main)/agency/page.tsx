import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { getAuthUserDetails } from '@/lib/queries'

const Page = async() => {
  const authUser = await currentUser()
  if(!authUser) return redirect("/sign-in")

  // const agencyId = await verifyAndAcceptInvitation()

  //get users details
  const user = await getAuthUserDetails()

  return (
    <div>our agency</div>
  )
}

export default Page