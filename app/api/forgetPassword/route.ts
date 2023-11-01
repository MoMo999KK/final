import { db } from "@/lib/prismaDB"
import nodemailer from 'nodemailer';
  
import { NextResponse } from "next/server"
 

export async function POST(req:Request){
    const {email}=await req.json()
    
   
    try {
        const user=await db.user.findUnique({
            where:{
                email
            }
        })

        if(!user){
            return NextResponse.json("user with that email doesnt exist",{status:404})
        }

       
        
        const myCode= Math.floor(Math.random() * 1000000)
       const creteTokens=await db.hashedToken.create({
        data:{
            userId:user.id,
            randomgeneratedCode:myCode.toString()
            
        }
       })
       var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "23fcbd9533f5e6",
          pass: "ae8164c02f179c"
        }
      });
      const mailOptions = {
        from: 'admin@gmail.com',
        to: user.email,
        subject: "Reset your password",
        text: `<p> ´hello ${user.name},please click to reset th password <a href="http://localhost:3000/forgetPassword/${creteTokens.randomgeneratedCode}">click</a>´
       
        </p>`
    }

    const mailresponse = await transport.sendMail
    (mailOptions as any);
    return mailresponse;

       return NextResponse.json({mailresponse,creteTokens,mailOptions})


     

        
    } catch (error) {
        return NextResponse.json("server error",{status:501})

        
    }
}