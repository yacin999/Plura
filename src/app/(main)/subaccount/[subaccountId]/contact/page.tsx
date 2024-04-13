import { db } from '@/lib/db'
import { Contact, SubAccount, Ticket } from '@prisma/client'
import React from 'react'

type Props = {
    params : {
        subaccountId : string
    }
}

const ContactPage = async({params}: Props) => {
    type SubAccountWithContacts = SubAccount & {
        Contact : (Contact & { Ticket : Ticket[]})[]
    }

    const contacts = await db.subAccount.findUnique({
        where : {
            id : params.subaccountId
        },
        include : {
            Contact : {
                include : {
                    Ticket : {
                        select : {value : true}
                    }
                },
                orderBy : {
                    createdAt : "asc"
                }
            }
        }
    }) as SubAccountWithContacts
    return (
        <div>ContactPage</div>
    )
}

export default ContactPage