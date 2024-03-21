'use client'

import React from 'react'
import { z } from 'zod'
import { Toast } from '../ui/toast'
import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form } from '../ui/form'

type Props = {
    subaccountId : string
}

const formSchema = z.object({
    link : z.string().min(1, {message : 'Media File is required'}),
    name : z.string().min(1, {message : 'Name is required'})
})

const UploadMediaForm = ({subaccountId}: Props) => {
    const {toast} = useToast()

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        mode : 'onSubmit',
        defaultValues : {
            link : '',
            name : ''
        }
    })

    const onSubmit = async (values : z.infer<typeof formSchema>)=>{
        try {
            
        } catch (error) {
            
        }
    }
  return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle>Media Information</CardTitle>
            <CardDescription>Please enter the details for your file</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>

                </form>
            </Form>
        </CardContent>
    </Card>
  )
}

export default UploadMediaForm