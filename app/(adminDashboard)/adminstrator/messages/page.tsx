//here we load alll conversations that has
//maded so far and wecan search for any email here
//we can select a user and send en email or a private mesage to it

import ChattMainContainer from "@/components/admincomponenst/message/chatt-main-container"
import ChattSidebar from "@/components/admincomponenst/message/chatt-sidebar-admin"

const Messages = () => {
  return (
    <div className="px-2   mx-auto flex gap-1 h-screen">
       
      <div className="flex-1 overflow-hidden bg-slate-200">
      <ChattMainContainer/>
      </div>
      <div className="w-3/8 md:w-2/6 bg-blue-100  border-r-black border-solid">
      <ChattSidebar/>
      </div>
    </div>
  )
}

export default Messages