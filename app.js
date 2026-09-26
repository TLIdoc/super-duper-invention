const express = require("express")
const app = express()
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },

    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }})

const upload = multer({storage})

app.use("/uploads", express.static("uploads"))

let posts = []


app.use(express.static("static"))
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "views")
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) =>{
    // res.send("helloworld!")
    res.render("index", { posts})
})


app.post("/add", upload.fields([{name:"image"}]),(req, res)=>{
    let data = req.body
    if(req.files.image) data.image = req.files.image.map(file=>file.filename)
    data.id = posts.length
    posts.push(data)
    console.log(posts)
    res.status(201).send("ok")
})

app.get("/posts", (req, res) =>{
    res.status(200)
    res.setHeader("Content-Type", "application/json")
    res.json(posts)
}
)
app.get("/post/:id",(req,res)=>{
    const postId = Number(req.params.id)
    const post = posts.find(p => p.id === postId)
    if(!posts[postId]){
        return res.status(404).render("notfound")
    }
    res.render("post", {postg:posts[postId]})
})


app.use((req, res) =>{
    res.status(404)
    res.render("notfound", {title: "404 Not Found"})
})



app.listen(3000, ()=>console.log("oh yeah!"))


