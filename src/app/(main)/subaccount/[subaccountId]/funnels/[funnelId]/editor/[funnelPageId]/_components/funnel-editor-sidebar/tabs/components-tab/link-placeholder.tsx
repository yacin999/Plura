import { Link } from 'lucide-react'
import React from 'react'

type Props = {}

const LinkPlaceholder = (props: Props) => {

    const handleDragStart = (e:React.DragEvent, type:string)=> {
        if (type === null) return
        e.dataTransfer
    }
    return (
        <div
            draggable
            onDragStart={e=> handleDragStart(e, "link")}
            className='h-14 w-14 bg-muted rounded-lg flex items-center justify-center'
        >
            <Link
                size={40}
                className='text-muted-foreground'
            />
        </div>
    )
}

export default LinkPlaceholder