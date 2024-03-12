'use client'

import { Agency, User } from '@prisma/client'
import React, {createContext} from 'react'

interface ModalProviderProps {
    children : React.ReactNode
}

export type modalData = {
    user?:User,
    agency?:Agency
}

type modalContextType = {
    data : modalData,
    isOpen : boolean,
    setOpen : (modal:React.ReactNode, fetchData?: ()=>Promise<any>) => void,
    setClose : ()=> void
}

export const modalContext = createContext<modalContextType>({
    data : {},
    isOpen : false,
    setOpen : (modal : React.ReactNode, fetchData?: ()=>Promise<any>) => {},
    setClose : () => {}
})

const ModalProvider: React.FC<ModalProviderProps> = ({children}) => {
  return (
    <div>modal-provider</div>
  )
}

export default ModalProvider