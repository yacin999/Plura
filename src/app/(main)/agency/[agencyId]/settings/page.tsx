import { db } from '@/lib/db'
import { currentUser } from '@clerk/nextjs'
import React from 'react'

type Props = {
  params : string
}

const SettingsPage = async({params}: Props) => {
  const authUser = await currentUser()
  if (!authUser) return null

  const userDetails = await db.user.findFirst({
    where : {
      id : authUser.id
    }
  })
  return (
    <div>SettingsPage</div>
  )
}

export default SettingsPage