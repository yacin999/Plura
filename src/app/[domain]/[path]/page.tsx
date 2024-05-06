import FunnelEditor from '@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor'
import { db } from '@/lib/db'
import { getDomainContent } from '@/lib/queries'
import EditorProvider from '@/providers/editor/editor-provider'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({params} : {params : {domain : string}}) => {
  console.log("test page pathname :", params?.domain)
  const domainData = await getDomainContent(params.domain.slice(0, -1))

  if (!domainData) return notFound()
  
    const pageData = domainData.FunnelPages.find(page=> !page.pathName)

    if (!pageData) return notFound()

    await db.funnelPage.update({
      where : {
        id : pageData.id
      },
      data : {
        visits : {
          increment : 1
        }
      }
    })
  return (  
    <EditorProvider
      subaccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={pageData.funnelId}
    >
      <FunnelEditor 
        funnelPageId={pageData.id}
        liveMode={true}
      />
    </EditorProvider>
  )
}

export default Page