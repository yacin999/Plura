'use client'

import { AgencySidebarOption, SubAccount, SubAccountSidebarOption } from '@prisma/client'
import React, {useState, useEffect, useMemo} from 'react'
import { Sheet, SheetTrigger } from '../ui/sheet'

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
        const [isMounted, setIsMounted] = useState(false)
        const openState = useMemo(()=> (defaultOpen ? {open : true} : {}), [defaultOpen])

        useEffect(()=>{
            setIsMounted(true)
        }, [])

        if (isMounted) return

  return (
    <Sheet 
        modal={false}
        {...openState}
    >
        <SheetTrigger>
            
        </SheetTrigger>
    </Sheet>
  )
}

export default MenuOptions