'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { useEditor } from '@/providers/editor/editor-provider'
import React from 'react'

type Props = {}

const SettingsTab = (props: Props) => {
    const {state, dispatch} = useEditor()

    const handleChnageCustomValues = (e:any) => {
        const settingProperty = e.target.id
        let value = e.target.value
        const styleObject = {
            [settingProperty] : value
        }

        dispatch({
            type : "UPDATE_ELEMENT",
            payload : {
                elementDetails : {
                    ...state.editor.selectedElement,
                    content : {
                        ...state.editor.selectedElement.content,
                        ...styleObject
                    }
                }
            }
        })
    }
  return (
    <Accordion
        type='multiple'
        className='w-full'
        defaultValue={["Typography", "Dimensions", "Decorations", "Flexbox"]}
    > 
        <AccordionItem
            value='Custom'
            className='px-6 py-0'
        >
            <AccordionTrigger   
                className='!no-underline'
            >Custom</AccordionTrigger>
            <AccordionContent>
                {state.editor.selectedElement.type === 'link' && !Array.isArray(state.editor.selectedElement.content) && (
                    <div className='flex flex-col gap-2'>
                        <p className='text-muted-foreground'>Link Path</p>
                        <Input
                            id='href'
                            placeholder='https:domain.example.com/pathname'
                            onChange={handleChnageCustomValues}
                            value={state.editor.selectedElement.content.href}
                        />
                    </div>
                )}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}

export default SettingsTab