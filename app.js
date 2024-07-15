const express=require("express")
const dotenv=require ("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
app.use(cors({
    origin:'*'
}))
const categorieRouter=require("./routes/categorie.route")
const scategorieRouter=require("./routes/scategorie.route")
const articleRouter =require("./routes/article.route")
//middleware
app.use(express.json())
dotenv.config()

app.get("/",(req,res)=>{
    res.send("bienvenue dans notre site")
})

// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUD)
.then(() => {console.log("DataBase Successfully Connected");})
.catch(err => { console.log("Unable to connect to database", err);
process.exit(); });
app.use("/api/categories",categorieRouter)
app.use("/api/scategories",scategorieRouter)
app.use('/api/articles', articleRouter)

app.listen(process.env.PORT)
console.log("application run at port "+process.env.PORT)
module.exports = app;