
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to handle resize and set mobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Add event listener for window resize
    window.addEventListener("resize", handleResize)
    
    // Initial check
    handleResize()
    
    // Cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return !!isMobile
}
