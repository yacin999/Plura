"use client"

import { Badge } from '@/components/ui/badge'
import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
import clsx from 'clsx'
import React from 'react'

type Props = {
    element : EditorElement
}

const VideoComponent = (props: Props) => {
    const {dispatch, state} = useEditor()
    const styles = props.element.styles

    const handleDragStart = (e:React.DragEvent, type : string) => {
        if (type === null) return
        e.dataTransfer.setData("componentType", type)
    }

    const handleOnClick = (e:React.MouseEvent) => {
        e.stopPropagation()
        dispatch({
            type : "CHANGE_CLICKED_ELEMENT",
            payload : {
                elementDetails : props.element
            }
        })
    }
  return (
    <div 
        style={styles}
        draggable
        onDragStart={e=> handleDragStart(e, 'video')}    
        onClick={handleOnClick}
        className={clsx(
            "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
            {
                '!border-blue-500' : state.editor.selectedElement.id === props.element.id,
                '!border-solid' : state.editor.selectedElement.id === props.element.id,
                'border-dashed border-[1px] border-t-slate-300' : !state.editor.liveMode
            }
        )}
    >
        {state.editor.selectedElement.id === props.element.id && !state.editor.liveMode && (
            <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
                {state.editor.selectedElement.name}
            </Badge>
        )}
    </div>
  )
}

export default VideoComponent