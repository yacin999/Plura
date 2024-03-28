'use client'

import { getSubaccountTeamMembers, saveActivityLogsNotification, searchContacts, upsetTicket } from '@/lib/queries'
import { TicketFormScheme, TicketWithTags } from '@/lib/types'
import { useModal } from '@/providers/modal-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { Contact, Tag, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Form } from '../ui/form'

type Props = {
    laneId : string,
    subaccountId : string,
    getNewTicket : (ticket : TicketWithTags[0]) => void
}

const TicketForm = ({laneId, subaccountId, getNewTicket}: Props) => {
    const {data : defaultData, setClose} = useModal()
    const router = useRouter()
    const [tags, setTags] = useState<Tag[]>([])
    const [contact, setContact] = useState('')
    const [search, setSearch] = useState("")
    const [contactList, setContactList] = useState<Contact[]>([])
    const saveTimerRef = useRef<ReturnType<typeof setTimeout>>()
    const [allTeamMembers, setAllTeamMembers] = useState<User[]>([])
    const [assignedTo, setAssignedTo] = useState(defaultData.ticket?.Assigned?.id || '')

    const form = useForm<z.infer<typeof TicketFormScheme>>({
        mode : "onChange",
        resolver : zodResolver(TicketFormScheme),
        defaultValues : {
            name : defaultData.ticket?.name || '',
            description : defaultData.ticket?.description || '',
            value : String(defaultData.ticket?.value || 0)
        }
    })
    const isLoading = form.formState.isLoading
    
    useEffect(() => {
      if (subaccountId) {
        const fetchData = async () => {
            const response = await getSubaccountTeamMembers(subaccountId)
            if (response) setAllTeamMembers(response)
        }
        fetchData()
      }
    }, [subaccountId])

    useEffect(() => {
       if(defaultData.ticket) {
        form.reset({
            name : defaultData.ticket.name || "",
            description : defaultData.ticket?.description || "",
            value : String(defaultData.ticket?.value || 0)
        })

        if (defaultData.ticket.customerId) {
            setContact(defaultData.ticket.customerId)
        }
        const fetchData = async () => {
            const response = await searchContacts(
                //@ts-ignore
                defaultData.ticket?.Customer?.name
            )
            setContactList(response)
        }
        fetchData()
       }
      }, [defaultData])
    

    const onSubmit = async (values : z.infer<typeof TicketFormScheme>) => {
        if (!laneId) return
        try {
            const response = await upsetTicket({
                ...values,
                laneId,
                id : defaultData.ticket?.id,
                assignedUserId : assignedTo,
                ...(contact ? {customerId : contact} : {})
            }, tags)

            saveActivityLogsNotification({
                agencyId : undefined,
                description : `updated a ticket | ${response.name}`,
                subaccountId : subaccountId
            })
        } catch (error) {
            
        }
    }
    return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle>Ticket Details</CardTitle>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-4'
                ></form>
            </Form>
        </CardContent>
    </Card>
)
}

export default TicketForm