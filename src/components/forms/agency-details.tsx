'use client'

import { Agency } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { NumberInput } from '@tremor/react'
import { v4 } from 'uuid'

import { useToast } from '../ui/use-toast'
import { useRouter } from 'next/navigation'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import FileUpload from '../global/file-upload'
import { Input } from '../ui/input'
import { Switch } from '../ui/switch'
import { deleteAgency, initUser, saveActivityLogsNotification, updateAgencyDetails, upsertAgency } from '@/lib/queries'
import { Button } from '../ui/button'
import Loading from '../global/loading'

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
    const  [deletingAgency, setDeletingAgency] = useState(false)
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


    const handleSubmit = async(values : z.infer<typeof FormSchema>)=>{
        try {
            let newUserData;
            // let cusId;
            if(!data?.id){
                const bodyData = {
                    email: values.companyEmail,
                    name: values.name,
                    shipping: {
                      address: {
                        city: values.city,
                        country: values.country,
                        line1: values.address,
                        postal_code: values.zipCode,
                        state: values.zipCode,
                      },
                      name: values.name,
                    },
                    address: {
                      city: values.city,
                      country: values.country,
                      line1: values.address,
                      postal_code: values.zipCode,
                      state: values.zipCode,
                    },
                  }
            }
            //WIP custId
            newUserData = await initUser({role : "AGENCY_OWNER"})
            if (!data?.id) {
                const response = await upsertAgency({
                    id: data?.id ? data.id : v4(),
                    address: values.address,
                    agencyLogo: values.agencyLogo,
                    city: values.city,
                    companyPhone: values.companyPhone,
                    country: values.country,
                    name: values.name,
                    state: values.state,
                    whiteLabel: values.whiteLabel,
                    zipCode: values.zipCode,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    companyEmail: values.companyEmail,
                    connectAccountId: '',
                    goal: 5,
                })
                toast({
                    title : 'Created Agency',
                })
                return router.refresh()
            }
        } catch (error) {
            console.log("error")
            toast({
                variant : 'destructive',
                title : 'Oppse !',
                description : 'could not create your agency'
            })
        }
    }

    const handleDeleteAgency = async() => {
        if (!data?.id) return
        setDeletingAgency(true)
        // WIP: discontinue the subscription
        try {
            const response = await deleteAgency(data?.id)
            toast({
                title : 'Deleted Agency',
                description : 'deleted your agency and all subaccounts'
            })
            router.refresh()
        } catch (error) {
            console.log('error from deleting agency', error)
            toast({
                variant : 'destructive',
                title : 'Oppse !',
                description : 'could not delete your agency'
            })
        }
        setDeletingAgency(false)
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
                                disabled={isLoading}
                                control={form.control}
                                name="whiteLabel"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
                                            <div>
                                                <FormLabel>Whitelabel Agency</FormLabel>
                                                <FormDescription>
                                                Turning on whilelabel mode will show your agency logo
                                                to all sub accounts by default. You can overwrite this
                                                functionality through sub account settings.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )
                                }}
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
                           
                            {data?.id && (<div className='flex flex-col gap-2'>
                                <FormLabel>Create a Goal</FormLabel>
                                <FormDescription>
                                ✨ Create a goal for your agency. As your business grows
                    your goals grow too so dont forget to set the bar higher!
                                </FormDescription>
                                <NumberInput 
                                    defaultValue={data?.goal} 
                                    onValueChange={async(val)=>{
                                        if (!data?.id)return 
                                        await updateAgencyDetails(data.id, {goal : val})
                                        await saveActivityLogsNotification({
                                            agencyId : data.id,
                                            description : `Updated the agency goal to | ${val} SubAccount`,
                                            subaccountId: undefined,
                                        })
                                        router.refresh()
                                    }}
                                    min={1}
                                    className='bg-background !border !border-input'
                                    placeholder='Sub Account Goal'
                                />
                            </div>)}
                            <Button 
                                type='submit'
                                disabled={isLoading}
                            >
                               {isLoading ? <Loading/> : "Save agency Information"} 
                            </Button>
                        </form>
                    </Form>
                    {data?.id && (
                        <div className='flex flex-row items-center justify-between rounded-lg border border-destructive gap-4 mt-4 p-3'>
                        <div>
                            <div>Danger Zone</div>
                        </div>
                        <div className='text-muted-foreground'>
                            Deleting your agency cannot be undone.This will delete also all subaccounts and all data related to sub accounts.Sub accounts will no longer have access to funnels, contacts etc.
                        </div>
                        <AlertDialogTrigger disabled={isLoading || deletingAgency} className='text-red-600 p-2 text-center mt-2 rounded-md hover:gb-red-600 hover:text-white whitespace-nowrap'>
                            {deletingAgency ? 'Deleting...' : 'Delete Agency'}
                        </AlertDialogTrigger>
                    </div>
                    )}
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-left">
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-left">
                                This action cannot be undone. This will permanently delete the
                                Agency account and all related sub accounts.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex items-center">
                            <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                disabled={deletingAgency}
                                className="bg-destructive hover:bg-destructive"
                                onClick={handleDeleteAgency}
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>                    
                </CardContent>
            </Card>
        </AlertDialog>
    )
}

export default AgencyDetails