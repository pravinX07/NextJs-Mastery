import mongoose from "mongoose";


export async function connect(){
    try {
        mongoose.connect(process.env.MONGO_URL!)  // expect string type , ! ensure string type
        const connectiom = mongoose.connection

        connectiom.on("connected",()=>{
            console.log("MongoDB connected");
            
        })

        connectiom.on("error",(err)=>{
            console.log("Mongodb connection error, please make sure db is up and running " + err);
            process.exit()
            

        })
        
    } catch (error) {
        
        console.log("Something went wrong with Db");
        console.log(error);
        
        
    }
}