import { Role, Notification, Prisma, Lane, Ticket, Tag, User, Contact, Pipeline } from "@prisma/client"
import { _getTicketsWithAllRelations, getAuthUserDetails, getFunnels, getMedia, getPipelineDetails, getTicketsWithTags, getUserPermissions } from "./queries"
import { db } from "./db"
import { z } from "zod"
import Stripe from "stripe"




export type NotificationWithUser = | ({
        User: {
            id: string
            name: string
            avatarUrl: string
            email: string
            createdAt: Date
            updatedAt: Date
            role: Role
            agencyId: string | null
        }
    } & Notification)[]
  | undefined


export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<
  typeof getUserPermissions
>


export type AuthUserWithAgencySigebarOptionsSubAccounts =
  Prisma.PromiseReturnType<typeof getAuthUserDetails>


  const __getUsersWithAgencySubAccountPermissionsSidebarOptions = async (
    agencyId: string
  ) => {
    return await db.user.findFirst({
      where: { Agency: { id: agencyId } },
      include: {
        Agency: { include: { SubAccount: true } },
        Permissions: { include: { SubAccount: true } },
      },
    })
  }


export type UsersWithAgencySubAccountPermissionsSidebarOptions =
  Prisma.PromiseReturnType<
  typeof __getUsersWithAgencySubAccountPermissionsSidebarOptions
>


export type GetMediaFiles = Prisma.PromiseReturnType<typeof getMedia>

export type CreateMediaType = Prisma.MediaCreateWithoutSubaccountInput


export type TicketAndTags = Ticket & {
  Tags: Tag[]
  Assigned: User | null
  Customer: Contact | null
}

export type LaneDetail = Lane & {
  Tickets: TicketAndTags[]
}


export const CreatePipelineFormSchema = z.object({
  name : z.string().min(1)
})


export const CreateFunnelFormSchema = z.object({
  name : z.string().min(1),
  description : z.string(),
  subDomainName : z.string().optional(),
  favicon : z.string().optional()
})


export type PipelineDetailsWithLanesCardsTagsTickets = Prisma.PromiseReturnType<typeof getPipelineDetails>



export const LaneFormSchema = z.object({
  name : z.string().min(1)
})


export type TicketWithTags = Prisma.PromiseReturnType<typeof getTicketsWithTags>

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/
export const TicketFormSchema = z.object({
  name : z.string().min(1),
  description : z.string().optional(),
  value : z.string().refine((value)=> currencyNumberRegex.test(value), {
    message : 'Value must be a valid price',
  })
})


export type TicketDetails = Prisma.PromiseReturnType<typeof _getTicketsWithAllRelations>


export const ContactUserFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email(),
})


// Address type :
export type Address = {
  city : string,
  country : string,
  line1 : string,
  postal_code : string,
  state : string
}


// shipping info type :
export type ShippingInfo = {
  address : Address,
  name : string
}


// stripe customer type :
export type StripeCustomerType = {
  email : string,
  name : string,
  shipping : ShippingInfo,
  address : Address
}


export type PricesList = Stripe.ApiList<Stripe.Price>;


// funnels type
export type FunnelsForSubAccount = Prisma.PromiseReturnType<typeof getFunnels>[0]

export type UpsertFunnelPage = Prisma.FunnelPageCreateWithoutFunnelInput