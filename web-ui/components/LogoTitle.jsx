import React from 'react'
import { useTheme } from "next-themes"

const LogoTitle = () => {
  const { theme} = useTheme()
  return <>
  {/* {theme === "light" ? <img className='w-[180px]' src="https://powco.dev/assets/images/powcodev_logo_without_margins_or_background.png" /> : <img className='w-[180px]' src="https://powco.dev/assets/images/powcodev_logo_inverted_without_margins_or_background.png"/>} */}
  <p className='font-bold text-3xl'>PowCo Dev</p>
  </>
}

export default LogoTitle