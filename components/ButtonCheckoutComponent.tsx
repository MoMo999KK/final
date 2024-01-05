"use client"

import axios from "axios"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
interface Props{
    email:string
    price:number | null
    courseId:string
    teacherId:string



}

const ButtonCheckoutComponent = ( {email,price,courseId,teacherId}:Props) => {
    const router=useRouter()
    const handelCheckout=async()=>{
        const res=await axios.post("/api/orders",{email,price,teacherId,courseId})
        console.log(res)
        router.push(`/pay/${res.data}`)



    }
  return (
    <div>
        <Button onClick={()=>handelCheckout()}>Buy Now</Button>
    </div>
  )
}

export default ButtonCheckoutComponent