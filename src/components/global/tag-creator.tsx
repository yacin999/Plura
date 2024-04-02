"use client"

import { Tag } from '@prisma/client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { AlertDialog } from '../ui/alert-dialog'
import { Command } from '../ui/command'
import TagComponent from './tag'
import { X } from 'lucide-react'

type Props = {
    subAccountId : string,
    getSelectedTags : (tags: Tag[]) => void,
    defaultTags? : Tag[]
}

const TagColors = ['BLUE', 'ORANGE', 'ROSE', 'PURPLE', 'GREEN'] as const
export type tagColor = (typeof TagColors)[number]

const TagCreator = ({subAccountId, getSelectedTags, defaultTags}: Props) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags || [])
    const [tags, setTags] = useState<Tag[]>([])
    const router = useRouter()
    const [value, setValue] = useState('')
    const [selectedColor, setSelectedColor] = useState("")

    useEffect(()=> {
        getSelectedTags(selectedTags)
    }, [selectedTags])

    const handleDeleteSelection = (tagId:string) => {
        setSelectedTags(selectedTags.filter(tag=> tag.id !== tagId))
    }
    return (
    <AlertDialog>
        <Command className='bg-transparent'>
            {!!selectedTags.length && (
                <div className='flex flex-wrap gap-2 p-2 bg-background border-2 border-border rounded-md'>
                    {selectedTags.map((tag) => (
                        <div 
                            key={tag.id}
                            className='flex items-center'
                        >
                            <TagComponent
                                title={tag.name}
                                colorName={tag.color}
                            />
                            <X
                                size={14}
                                className='text-muted-foreground cursor-pointer'
                                onClick={() => handleDeleteSelection(tag.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
            <div className='flex items-center gap-2 my-2'>
                {TagColors.map(colorName => (
                    <TagComponent
                        key={colorName}
                        selectedColor={setSelectedColor}
                        title=''
                        colorName={colorName}
                    />
                ))}
            </div>
        </Command>
    </AlertDialog>
  )
}

export default TagCreator