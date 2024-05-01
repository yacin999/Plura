"use client"

import { EditorElement, useEditor } from '@/providers/editor/editor-provider'
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
    ></div>
  )
}

export default VideoComponent