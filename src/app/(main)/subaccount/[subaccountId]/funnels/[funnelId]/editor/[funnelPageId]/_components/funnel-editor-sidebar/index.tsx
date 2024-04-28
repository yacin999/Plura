"use client"

import { Sheet } from '@/components/ui/sheet'
import { useEditor } from '@/providers/editor/editor-provider'
import React from 'react'

type Props = {
  subaccountId : string
}

const FunnelEditorSidebar = ({subaccountId}: Props) => {
  const {state, dispatch} = useEditor()
  return (
    <Sheet
      open={true}
      modal={false}
    ></Sheet>
  )
}

export default FunnelEditorSidebar