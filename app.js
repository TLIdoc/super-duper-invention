const express = require("express")
const app = express()

let posts = []

app.use(express.static("static"))
app.use(express.json())
app.set("view engine", "ejs")
app.set("views", "views")

app.get("/", (req, res) =>{
    // res.send("helloworld!")
    res.render("index", { posts})
})


app.post("/add", (req, res) =>{
    let data = req.body
    posts.push(data)
    console.log(data)
    res.status(200).send("ok")
}
)

app.get("/posts", (req, res) =>{
    res.status(200)
    res.setHeader("Content-Type", "application/json")
    res.json(posts)
}
)


app.use((req, res) =>{
    res.status(404)
    res.render("notfound", {title: "404 Not Found"})
})



app.listen(3000, ()=>console.log("oh yeah!"))

