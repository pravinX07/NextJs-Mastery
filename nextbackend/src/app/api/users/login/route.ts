import {connect} from '@/dbConfig/dbConfig'
import User from "@/models/userModels"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import {sendMail} from '@/helpers/mailer'

connect();


export async function POSt(request:NextRequest){
    try {
       const reqBody =  request.json()
       const {username, email,password}:any = reqBody
       // validation

       console.log(reqBody);

       const user = await User.findOne({email})

       if(user){
        return NextResponse.json({error:"User already exists"},{status:400})
       }

       const salt = await bcryptjs.genSalt(10)
       const hashedPassword = await bcryptjs.hash(password,salt)
       
       const newUser = new User({
          username,
          email,
          password:hashedPassword
       })


       const savedUser = await newUser.save()
       console.log(savedUser);

       // send Verification
       await sendMail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:"User register successfully",
            success:true,
            savedUser
        })
       
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}