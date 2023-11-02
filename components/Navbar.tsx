 "use client"
 import MobileNavbar from './MobileNavbar'
import DesktopNavbar from './DesktopNavbar'
import { usePathname } from 'next/navigation'
import { User } from '@prisma/client'
interface Props{
  user:User | null
}
const Navbar = ({user}:Props) => {
  const pathName=usePathname()
     
     
  return (
    <div className=''>
        <div className="hidden md:block">

        <DesktopNavbar/>
        </div>
        <div className="md:hidden">

        <MobileNavbar user={user}/>
        </div>

        

    </div>
  )
}

export default Navbar