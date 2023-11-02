import { getCurrentUser } from "@/app/actions/get-current-user";
import NavbarAdmin from "@/components/NavbarAdmin";
import SidebarAdmin from "@/components/admincomponenst/SidebarAdmin";
 
export default async function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const user=await getCurrentUser()
    return (
      <div className="h-screen w-screen mx-auto overflow-hidden">
        <div className="hidden w-[270px] h-screen   md:flex flex-col shadow-md  md:bg-blue-450 md:border-rose-100 ">
          <div className="flex flex-col mx-5 mt-[100px]">

       <SidebarAdmin/>
      </div>
      
       
       
        </div>
          <div className="w-screen md:mr-[270px]  h-[60px] fixed top-0 right-0px-5 justify-between shadow-xl z-[200] mb-7">
            <NavbarAdmin user={user as any}/>
         
          

        


      
        <div className="pt-[65px] ">
        {children}
          </div>
        </div>
      
      </div>
    );
  };