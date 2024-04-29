"use client"

import { useEditor } from '@/providers/editor/editor-provider'
import React from 'react'

type Props = {
    funnelPageId : string
}

const FunnelEditor = ({funnelPageId}: Props) => {
    const {state, dispatch} = useEditor()
  return (
    <div>FunnelEditor</div>
  )
}

export default FunnelEditor