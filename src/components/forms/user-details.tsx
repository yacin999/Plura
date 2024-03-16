'use client'

import { AuthUserWithAgencySigebarOptionsSubAccounts, UserWithPermissionsAndSubAccounts } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { SubAccount, User } from '@prisma/client'
import React, {useState, useEffect} from 'react'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { getAuthUserDetails } from '@/lib/queries'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

type Props = {
    id : string | null,
    type : 'agency' | 'subaccount',
    userData? : Partial<User>,
    subAccounts? : SubAccount[]
}


const UserDetails = ({id, type, userData, subAccounts}: Props) => {
    const [subAccountPermissions, setSubAccountPermissions] = useState<UserWithPermissionsAndSubAccounts | null>(null)

    const {data, setClose} = useModal()
    const [roleState, setRoleState] = useState('')
    const [loadingPermissions, setLoadingPermissions] = useState(false)
    const [authUserData, setAuthUserData] = useState<AuthUserWithAgencySigebarOptionsSubAccounts | null>(null)
    const {toast} = useToast()
    const router = useRouter()


    useEffect(()=>{
        if (data.user) {
            const fetchDetails = async ()=>{
                const response = await getAuthUserDetails()
                if (response) {
                    setAuthUserData(response)
                }
            }
            fetchDetails()
        }
    }, [data])

    const userDataSchema = z.object({
        name : z.string().min(1),
        email : z.string().email(),
        avatarUrl : z.string(),
        role : z.enum([
            'AGENCY_OWNER',
            'AGENCY_ADMIN',
            'SUBACCOUNT_USER',
            'SUBACCOUNT_GUEST'
        ])
    })

    const form = useForm<z.infer<typeof userDataSchema>>({
        resolver : zodResolver(userDataSchema),
        mode : 'onChange',
        defaultValues : {
            name : userData ? userData.name : data?.user?.name,
            
        }
    })

  return (
    <div>userDetails</div>
  )
}

export default UserDetails