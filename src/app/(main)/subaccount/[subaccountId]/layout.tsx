import BlurPage from '@/components/global/blur-page'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/sidebar'
import Unauthorized from '@/components/unauthorized'
import { getAuthUserDetails, getNotificationAndUser, verifyAndAcceptInvitation } from '@/lib/queries'
import { currentUser } from '@clerk/nextjs'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
    children : React.ReactNode,
    params : {subaccountId : string}
}

const SubaccountLayout = async({children, params}: Props) => {
    const agencyId = await verifyAndAcceptInvitation()
    
    if (!agencyId) return <Unauthorized/>

    const user = await currentUser()
    
    if (!user) {
        return redirect("/")
    }
    
    
    if (!user.privateMetadata.role) {
        return <Unauthorized/>
    }else {
        console.log("test user role 22", user.privateMetadata.role)
        const allPermissions = await getAuthUserDetails()
        const hasPermission = allPermissions?.Permissions.find(permission=>
            permission.access && permission.subAccountId === params.subaccountId
        )
        if (!hasPermission) return <Unauthorized/>
    }

    let notificattions : any = []
    const allNotifications = await getNotificationAndUser(agencyId)
    
    if (user.privateMetadata.role === 'AGENCY_OWNER' || user.privateMetadata.role === "AGENCY_ADMIN") {
        notificattions = allNotifications
    }else {
        const filteredNoti = allNotifications?.filter(item=>{
            item.subAccountId === params.subaccountId
        })
        if (filteredNoti) notificattions = filteredNoti
    }

    return (
        <div className='h-screen overflow-hidden'>
            <Sidebar id={params.subaccountId} type='subacount'/>
            <div className='md:pl-[300px]'>
                <InfoBar 
                    notifications={notificattions}
                    role={user.privateMetadata.role as Role}
                    subAccountId={params.subaccountId as string}
                />
                <div className="relative">
                  <BlurPage> {children}</BlurPage>
                </div>
            </div>
        </div>
    )
}

export default SubaccountLayout