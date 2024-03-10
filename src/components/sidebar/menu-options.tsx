import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from '@prisma/client'
import React from 'react'

type Props = {
    defaultOpen? : Boolean,
    subaccounts : SubAccount[],
    sidebarOpt : AgencySidebarOption[] | SubAccountSidebarOption[],
    sidebarLogo : string,
    details : any,
    user : any,
    id : string
}

const MenuOptions = ({
    defaultOpen, 
    subaccounts, 
    sidebarOpt, 
    sidebarLogo, 
    details, 
    user, 
    id}: Props) => {
  return (
    <div>MenuOptions</div>
  )
}

export default MenuOptions