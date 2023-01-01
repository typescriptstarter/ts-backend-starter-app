import { useEffect } from "react"
import { useRouter } from "next/router"
import { useRelay } from '../../../context/RelayContext'
import { ThreeColumnLayout } from "../../../components"
import { useState } from 'react'
import axios from "axios"

export default function AuthGithubCallback() {

    const { relayPaymail, runOwner } = useRelay()
    const { githubToken, setGithubToken } = useState()

    const router = useRouter()

    const query = router.query

    console.log({ query })
    
    const { code } = router.query
    
    useEffect(() => {
    
        if (code) {

            console.log('GITHUB CODE: ', code)

            ;(async () => {

                const { data: { token } } = await axios.post(`http://localhost:5200/api/v1/github/tokens`, {
                    code,
                    paymail: relayPaymail
                })

                  console.log('GITHUB TOKEN', token)

                setGithubToken(token)
            })()


                
        }
    })

    if (!relayPaymail) {
        return (
            <ThreeColumnLayout>
            <div className="col-span-12 lg:col-span-6 min-h-screen">
            <div className="px-4 mt-2">
                <div className="flex my-6">
                  <div className="flex">
    
    
                  </div>
                </div>
              </div>
              <div className="w-full py-5">
                <div className="relative">
                  <p>Please sign in with Relayx</p>
                </div>
              </div>
            </div>
          </ThreeColumnLayout>
        )

    }

    return (

        <ThreeColumnLayout>
        <div className="col-span-12 lg:col-span-6 min-h-screen">
        <div className="px-4 mt-2">
            <div className="flex my-6">
              <div className="flex">
              <div>


              </div>
            </div>
          </div>
          <div className="w-full py-5">
            <div className="relative">
                <h1>AuthGithubCallback</h1>
                {githubToken && <p>github token: {githubToken}</p>}
                <p>github code: {query.code}</p>
                <p>github installation id: {query.installation_id}</p>
                <p>run paymail: {relayPaymail}</p>
                <p>run owner: {runOwner}</p>
        
            </div>           
         </div>
          </div>
        </div>
      </ThreeColumnLayout>

    )
}