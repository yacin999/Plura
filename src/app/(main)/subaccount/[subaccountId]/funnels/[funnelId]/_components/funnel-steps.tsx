"use client"

import { AlertDialog } from '@/components/ui/alert-dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/components/ui/use-toast'
import { upsertFunnelPage } from '@/lib/queries'
import { FunnelsForSubAccount } from '@/lib/types'
import { FunnelPage } from '@prisma/client'
import { Check } from 'lucide-react'
import React, { useState } from 'react'
import { DragDropContext, DragStart, DropResult, Droppable } from 'react-beautiful-dnd'

type Props = {
    funnel : FunnelsForSubAccount,
    subaccountId : string,
    pages : FunnelPage[]
    funnelId : string
}

const FunnelSteps = ({ funnel, subaccountId, pages, funnelId}: Props) => {
    const [clickedPage, setClickedPage] = useState<FunnelPage | undefined>(pages[0])
    const [pagesState, setPagesState] = useState(pages)

    const onDragStart = (event:DragStart) => {
        // current chosen page
        const {draggableId} = event
        const value = pagesState.find(page=> page.id === draggableId)
    }

    const onDragEnd = (dropResult : DropResult) => {
        const {destination, source} = dropResult
        
        // no destination or some position
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return
        }

        // change state
        const newPageOrder = [...pagesState].toSpliced(source.index, 1).toSpliced(destination.index, 0, pagesState[source.index]).map((page, idx)=> {
            return {...page, order : idx}
        })
        
        setPagesState(newPageOrder)
        newPageOrder.forEach(async(page, index) => {
            try {
                await upsertFunnelPage(
                    subaccountId,
                    {
                        id : page.id,
                        order : index,
                        name : page.name
                    },
                    funnelId
                )
            } catch (error) {
                console.log("error from upsert funnel page")
                toast({
                    variant : "destructive",
                    title : "Failed",
                    description : "Could not save page order"
                })
                return
            }
        });
    }
  return (
    <AlertDialog>
        <div className='flex border-[1px] lg:!flex-row flex-col justify-between'>
        <ScrollArea className="h-full ">
            <div className="flex gap-4 items-center">
              <Check />
              Funnel Steps
            </div>
            {pagesState.length ? (
              <DragDropContext
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
              >
                <Droppable
                  droppableId="funnels"
                  direction="vertical"
                  key="funnels"
                >
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {pagesState.map((page, idx) => (
                        <div
                          className="relative"
                          key={page.id}
                          onClick={() => setClickedPage(page)}
                        >
                          {/* <FunnelStepCard
                            funnelPage={page}
                            index={idx}
                            key={page.id}
                            activePage={page.id === clickedPage?.id}
                          /> */}
                        </div>
                      ))}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="text-center text-muted-foreground py-6">
                No Pages
              </div>
            )}
          </ScrollArea>
        </div>
    </AlertDialog>
  )
}

export default FunnelSteps