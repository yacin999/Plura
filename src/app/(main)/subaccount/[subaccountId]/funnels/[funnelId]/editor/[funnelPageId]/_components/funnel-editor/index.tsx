"use client"

import { getfunnelPageDetails } from '@/lib/queries'
import { useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import { stat } from 'fs'
import React, { useEffect } from 'react'

type Props = {
    funnelPageId : string,
    liveMode? : boolean
}

const FunnelEditor = ({funnelPageId, liveMode}: Props) => {
    const {state, dispatch} = useEditor()
    
    useEffect(()=> {
        if (liveMode) {
            dispatch({
                type : "TOGGLE_LIVE_MODE",
                payload : {value : true}
            })
        }
    }, [liveMode])

    // CHALLENGE : make this more performent

    useEffect(()=> {
        const fetchData = async () => {
            const response = await getfunnelPageDetails(funnelPageId)
            if (!response) return

            console.log(response)

            dispatch({
                type : "LOAD_DATA",
                payload : {
                    elements : response.content ? JSON.parse(response.content) : '',
                    withLive : !!liveMode
                }
            })
        }

        fetchData()
    }, [funnelPageId])
    
    return (
        <div 
            className={clsx(
                'use-automation-zoom-in h-full overscroll mr-[385px] bg-background transition-all rounded-md',
                {
                    '!p-0 !mr-0' : state.editor.previewMode === true || state.editor.liveMode === true,
                    '!w-[850px]' : state.editor.device === "Tablet",
                    '!w-[420px]' : state.editor.device === "Mobile",
                    'w-full' : state.editor.device === "Desktop"
                }
            )}
        ></div>
    )
}

export default FunnelEditor