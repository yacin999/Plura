import React from 'react'

type Props = {}

const TextPlaceholder = (props: Props) => {

    const handleDragStart = (e : React.DragEvent, type : string) => {
        e.preventDefault()
    }
  return (
    <div 
        draggable
        onDragStart={e=> handleDragStart(e, "text")}
    ></div>
  )
}

export default TextPlaceholder