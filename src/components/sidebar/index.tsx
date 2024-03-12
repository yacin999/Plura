import { getAuthUserDetails } from '@/lib/queries'
import React from 'react'
import MenuOptions from './menu-options'

type Props = {
    id : string,
    type : "agency" | "subacount"
}

const Sidebar = async({id, type}: Props) => {
    const user = await getAuthUserDetails()
    if(!user) return null
    if (!user.Agency) return 
    // get the details of either agency or subaccount
    const details = type === "agency" ? user.Agency : user.Agency.SubAccount.find(subaccount=> subaccount.id === id)
    const isWhiteLabeledAgency = user.Agency.whiteLabel
  
    if (!details) return 

    let sidebarLogo = user.Agency.agencyLogo || '/assets/plura-logo.svg'
    // check weather the agency whitelabeled to set sidebar logo   
    if (!isWhiteLabeledAgency) {
        if(type === "subacount") {
            sidebarLogo = user.Agency.SubAccount.find(subaccount=> subaccount.id === id)?.subAccountLogo || user.Agency.agencyLogo
        }
    }

    const sidebarOpt = type === "agency" ? user.Agency.SidebarOption || [] :  user.Agency.SubAccount.find(subaccount=> subaccount.id === id)?.SidebarOption || []
    
    // get the permitted subaccounts only 
    const subaccounts = user.Agency.SubAccount.filter(subaccount => user.Permissions.find(permission => permission.subAccountId === subaccount.id && permission.access))


    return (
        <>
            <MenuOptions 
                defaultOpen={true}
                details={details}
                id={id}
                sidebarLogo={sidebarLogo}
                sidebarOpt={sidebarOpt}
                subaccounts={subaccounts}
                user={user}
            />
            <MenuOptions 
                details={details}
                id={id}
                sidebarLogo={sidebarLogo}
                sidebarOpt={sidebarOpt}
                subaccounts={subaccounts}
                user={user}
            />
        </>
  )
}

export default Sidebar