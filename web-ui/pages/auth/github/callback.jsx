import { useEffect } from "react"
import { useRouter } from "next/router"

export function AuthGithubCallback() {

    const router = useRouter()

    const query = router.query

    console.log({ query })
    
    const { code } = router.query
    
    useEffect(() => {
    
        if (code) {

            console.log('GITHUB CODE: ', code)
                
        }
    }, [])

    return (
        <div>
            <h1>AuthGithubCallback</h1>
            <p>{query}</p>
        </div>
    )
}