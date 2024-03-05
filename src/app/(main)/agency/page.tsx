import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries'
import { Plan } from '@prisma/client'
import AgencyDetails from '@/components/forms/agency-details'

const Page = async({searchParams } : {
  searchParams : {plan : Plan, state : string, code : string}
}) => {

  // verify and accept the received Invitation:
  const agencyId = await verifyAndAcceptInvitation()
  console.log("agency id from agency page :", agencyId)

  //get users details
  const user = await getAuthUserDetails()

  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount")
    }else if (user?.role === "AGENCY_ADMIN" || user?.role === "AGENCY_OWNER") {
      if (searchParams.plan) {
        return redirect(`/agency/${agencyId}/billing?plan=${searchParams.plan}`)
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split("___")[0]
        const stateAgencyId = searchParams.state.split("___")[1]
        if (!agencyId) return <div>Not Authorized</div>
        return redirect(
          `/agency/${agencyId}/${statePath}?code=${searchParams.code}`
        )
      }else redirect(`/agency/${agencyId}`)
    }else {
      <div>Not Authorized</div>
    }
  }

  const authUser = await currentUser()
  return (
    <div className='flex justify-center items-center mt-4'>
      <div className='max-w-[850px] border-[1px] p-4 rounded-xl'>
        <h1 className='text-4xl'>Create an Agency</h1>
        <AgencyDetails data={{companyEmail : authUser?.emailAddresses[0].emailAddress}}/>
      </div>
    </div>
  )
}

export default Page