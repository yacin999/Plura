'use client'

import ContactUserForm from '@/components/forms/contact-user-form'
import ContactForm from '@/components/forms/contact-user-form'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import React from 'react'

type Props = {
  subaccountId : string
}

const CreateContactButton = ({subaccountId}: Props) => {
  const {setOpen, setClose} = useModal()


  const handleCreateContact = async () => {
    setOpen(
      <CustomModal
        title='Create or Update Contatct Information'
        subheading='Contact are like Customers.'
      > 
        <ContactUserForm
          subaccountId={subaccountId}
        />
      </CustomModal>
    )
  } 
  return (
    <Button 
      onClick={handleCreateContact}
      className='text-right'  
    >Create Contact</Button>
  )
}

export default CreateContactButton