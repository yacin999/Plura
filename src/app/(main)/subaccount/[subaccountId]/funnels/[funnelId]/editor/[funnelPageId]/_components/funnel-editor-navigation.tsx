'use client'

import { Input } from '@/components/ui/input'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useEditor } from '@/providers/editor/editor-provider'
import { FunnelPage } from '@prisma/client'
import clsx from 'clsx'
import { ArrowLeftCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    funnelId : string,
    funnelPageDetails : FunnelPage,
    subaccountId : string
}

const FunnelEditorNavigation = ({funnelId, funnelPageDetails, subaccountId}: Props) => {
    const router = useRouter()
    const {state, dispatch} = useEditor()

    useEffect(()=> {
        dispatch({
            type : "SET_FUNNELPAGE_ID",
            payload : {funnelPageId : funnelPageDetails.id}
        })
    }, [funnelPageDetails])

    const handleOnBlurTitleChnage = () => {

    }
  return (
    <TooltipProvider>
        <nav
            className={clsx(
                'border-b-[1px] flex items-center justify-between p-6 gap-2 transition-all',
                {'!h-0 !p-0 !overflow-hidden' : state.editor.previewMode}
            )}
        >
            <aside
                className='flex items-center gap-4 max-w-[260px] w-[300px]'
            >
                <Link
                    href={`/subaccount/${subaccountId}/funnels/${funnelId}`}
                >
                    <ArrowLeftCircle/>
                </Link>
                <div className='flex flex-col w-full'>
                    <Input
                        defaultValue={funnelPageDetails.name}
                        className='border-none h-5 m-0 p-0 text-lg'
                        onBlur={handleOnBlurTitleChnage}
                    />
                    <span className='text-sm text-muted-foreground'>
                        Path: /{funnelPageDetails.pathName}
                    </span>
                </div>
            </aside>
        </nav>
    </TooltipProvider>
  )
}

export default FunnelEditorNavigation