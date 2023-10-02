const express=require("express")
require("./src/db/connection")
const dotenv=require("dotenv")

const app=express()

const authRoutes=require("./src/routes/userRoutes")

app.use(express.json())


app.use("/api",authRoutes)
const PORT=process.env.PORT??5000
app.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`);
})
