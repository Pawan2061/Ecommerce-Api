const express=require("express")
require("./src/db/connection")
const dotenv=require("dotenv")

const app=express()

const authRoutes=require("./src/routes/userRoutes")
const categoryRoutes=require("./src/routes/categoryRoutes")

app.use(express.json())


app.use("/api/auth",authRoutes)
app.use("/api/category",categoryRoutes)
const PORT=process.env.PORT??5000
app.listen(PORT,()=>{
    console.log(`app is listening at port ${PORT}`);
})
