'use client'

import { Agency } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { AlertDialog } from '../ui/alert-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'

type Props = {
    data : Partial<Agency>
}

const FormSchema = z.object({
    name: z.string().min(2, { message: 'Agency name must be atleast 2 chars.' }),
    companyEmail: z.string().min(1),
    companyPhone: z.string().min(1),
    whiteLabel: z.boolean(),
    address: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    agencyLogo: z.string().min(1),
})

const AgencyDetails = ({data} : Props) => {
    const {toast} = useToast()
    const router = useRouter()
    const  [deletingAgency, setDeletingAgency] = useState()
    const form = useForm<z.infer<typeof FormSchema>>({
        mode : 'onChange',
        resolver : zodResolver(FormSchema),
        defaultValues : {
            name: data?.name,
            companyEmail: data?.companyEmail,
            companyPhone: data?.companyPhone,
            whiteLabel: data?.whiteLabel || false,       
            address: data?.address,
            city: data?.city,
            zipCode: data?.zipCode,
            state: data?.state,
            country: data?.country,
            agencyLogo: data?.agencyLogo
        }
    })

    const isLoading = form.formState.isSubmitting

    useEffect(()=>{
        if (data) {
            form.reset(data)
        }
    }, [data])


    const handleSubmit = ()=>{

    }
    return (
        <AlertDialog>
            <Card className='w-full'>
                <CardHeader>
                    <CardTitle>Agency Information</CardTitle>
                    <CardDescription>
                        Let's create an agency for your business. You can edit agency settings later from the agency settings tab.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form action="" onSubmit={form.handleSubmit(handleSubmit)}>
                            {/* agency logo field */}
                            <FormField 
                                disabled = {isLoading}
                                control={form.control}
                                name="agencyLogo"
                                render={(({field})=>(
                                    <FormItem className='mb-4'>
                                        <FormLabel>Agency Logo</FormLabel>
                                        <FormControl>
                                            <FileUpload
                                                apiEndpoint='agencyLogo'
                                                onChange={field.onChange}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ))}
                            />
                            {/* agency name and email fields  */}
                            <div className='flex md:flex-row gap-4 mb-3'>
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name='name'
                                    render={({field})=>(
                                        <FormItem className='flex-1'>
                                            <FormLabel>Agency Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Your agency name'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name='companyEmail'
                                    render={({field})=>(
                                        <FormItem className='flex-1'>
                                            <FormLabel>Agency Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Your agency Email'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            {/* phone number field */}
                            <FormField 
                                disabled = {isLoading}
                                control={form.control}
                                name="companyPhone"
                                render={(({field})=>(
                                    <FormItem className='mb-3'>
                                        <FormLabel>Agency Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Phone'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ))}
                            />
                            {/* whiteLabel field */}
                            <FormField 
                                disabled = {isLoading}
                                control={form.control}
                                name="whiteLabel"
                                render={(({field})=>(
                                    <FormItem  className='flex flex-row items-center justify-between rounded-lg border gap-4 p-4 mb-3'>
                                        <div>
                                            <FormLabel>Whiteabel Agency</FormLabel>
                                            <FormDescription>
                                                Turning on whitelabel mode will show your agency logo to all subaccounts by default. You can overwrite this functionality through subaccount sutttings.
                                            </FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch
                                                checked={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ))}
                            />

                            {/* agency address */}
                            <FormField 
                                disabled = {isLoading}
                                control={form.control}
                                name="address"
                                render={(({field})=>(
                                    <FormItem className='mb-3'>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='123 at...'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ))}
                            />

                            {/* city, state and zicode */}
                            <div className='flex md:flex-row gap-4 mb-3'>
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name='city'
                                    render={({field})=>(
                                        <FormItem className='flex-1'>
                                            <FormLabel>City</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='City'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name='state'
                                    render={({field})=>(
                                        <FormItem className='flex-1'>
                                            <FormLabel>State</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='State'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    disabled={isLoading}
                                    control={form.control}
                                    name='zipCode'
                                    render={({field})=>(
                                        <FormItem className='flex-1'>
                                            <FormLabel>Zipcode</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Zipcode'
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* country */}
                            <FormField 
                                disabled = {isLoading}
                                control={form.control}
                                name="country"
                                render={(({field})=>(
                                    <FormItem className='mb-3'>
                                        <FormLabel>Country</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Country'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                ))}
                            />
                            {data?.id && 
                            <div className='flex flex-col gap-2'>
                                
                            </div>}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </AlertDialog>
    )
}

export default AgencyDetails