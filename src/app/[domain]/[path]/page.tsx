import { getDomainContent } from '@/lib/queries'
import React from 'react'

const Page = async ({params} : {params : {domain : string}}) => {
  const domainData = await getDomainContent(params.domain.slice(0, -1))
  
  return (
    <div>subdomain</div>
  )
}

export default Page