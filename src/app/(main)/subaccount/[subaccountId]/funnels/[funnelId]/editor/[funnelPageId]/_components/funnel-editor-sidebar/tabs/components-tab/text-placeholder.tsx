import { TypeIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const TextPlaceholder = (props: Props) => {

    const handleDragStart = (e : React.DragEvent, type : string) => {
        if (type === "null") {
          e.dataTransfer.setData("componentType", type)
        }
    }
  return (
    <div 
        draggable
        onDragStart={e=> handleDragStart(e, "text")}
        className='h-14 w-14 bg-muted rounded-lg flex items-center justify-center'
    >
      <TypeIcon
        size={40}
        className='text-muted-foreground'
      />
    </div>
  )
}

export default TextPlaceholder