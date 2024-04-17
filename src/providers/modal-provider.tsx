'use client'

import { PricesList, TicketDetails } from '@/lib/types'
import { Agency, Contact, Plan, Ticket, User } from '@prisma/client'
import React, {useState, useEffect, createContext, useContext} from 'react'

interface ModalProviderProps {
    children : React.ReactNode
}

export type modalData = {
    user?:User,
    agency?:Agency,
    ticket?:TicketDetails[0],
    contact? : Contact,
    plan? : {
        defaultPriceId : Plan,
        plans : PricesList['data']
    }
}

type modalContextType = {
    data : modalData,
    isOpen : boolean,
    setOpen : (modal:React.ReactNode, fetchData?: ()=>Promise<any>) => void,
    setClose : ()=> void
}

export const ModalContext = createContext<modalContextType>({
    data : {},
    isOpen : false,
    setOpen : (modal : React.ReactNode, fetchData?: ()=>Promise<any>) => {},
    setClose : () => {}
})

const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [data, setData] = useState<modalData>({})
    const [showingModal, setshowingModal] = useState<React.ReactNode>(null)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    const setOpen = async (modal : React.ReactNode, fetchData?:()=>Promise<any>)=>{
        if (modal){
            if (fetchData){
                setData({...data, ...(await fetchData())} || {})
            }
            setshowingModal(modal)
            setIsOpen(true)
        }
    }

    const setClose = () => {
        setIsOpen(false)
        setData({})
    }

    if (!isMounted) return null
  return (
    <ModalContext.Provider value={{data, setOpen, setClose, isOpen}}>
        {children}
        {showingModal}
    </ModalContext.Provider>
  )
}

export default ModalProvider


export const useModal = () => {
    const context = useContext(ModalContext)

    if (!context) {
        throw new Error("useModal must be used with the modalProvider")
    }
    
    return context
}