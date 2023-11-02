import { db } from "@/lib/prismaDB"

interface Porps{
    initialData:string | undefined
}

const NUmberOfBuyers = async({initialData}:Porps) => {
    const buyers=await db.user.findMany({
        where:{
            boughtCourses:{
                has:initialData
            }
        }
    })


  return (
    <div className="bg-slate-400">
        {buyers.length}
    </div>
  )
}

export default NUmberOfBuyers