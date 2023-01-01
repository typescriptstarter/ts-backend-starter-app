import { useEffect } from "react"
import { useRouter } from "next/router"
import { useRelay } from '../../../context/RelayContext'
import { ThreeColumnLayout } from "../../../components"
import { useState } from 'react'
import axios from "axios"

export default function AuthGithubCallback() {

    const { relayPaymail, runOwner } = useRelay()
    const { githubUsername, setGithubUsername } = useState()
    const { githubAuthResult, setGithubAuthResult } = useState()

    const router = useRouter()

    const query = router.query

    console.log({ query })
    
    const { code } = router.query
    
    useEffect(() => {
    
        if (code) {

            ;(async () => {

                const { data: response } = await axios.post(`https://powco.dev/api/v1/github/tokens`, {
                    code,
                    paymail: relayPaymail
                })

                console.log('github.tokens.post.response', response)

                setGithubAuthResult(response)

                setGithubUsername(response.github_user.login)
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
                {githubUsername && <p>github user: {githubUsername}</p>}
                <p>run paymail: {relayPaymail}</p>
                <p>run owner: {runOwner}</p>
        
            </div>           
         </div>
          </div>
        </div>
      </ThreeColumnLayout>

    )
}