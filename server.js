const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("Views", {
  express:server,
  autoescape: false,
  noCache: true
})


server.get("/", function(req, res){
  const about = {
    avatar_url : "https://avatars1.githubusercontent.com/u/38931910?s=460&u=68909c7b9c0aa8e1af21dedd52431edfb90e70b6&v=4",
    name : "Wilker França",
    role : "Desenvolvedor - Freelancer",
    description : "Programador FullStack - Objetivo de fazer o mundo melhor através da tecnologia e ajudar o máximo de vidas possíveis!",
    links : [
      {name:"Github", url:"https://github.com/wilkerfran"},
      {name:"Instagram", url:"https://www.instagram.com/_francawil/"},
      {name:"Linkedin", url:"https://www.linkedin.com/in/wilker-fran%C3%A7a-591b9811b/"}
    ]
  }


  return res.render("about", {about})
})

server.get("/portifolio", function(req, res){

  return res.render("portifolio", {items: videos})
})

server.get("/video", function(req, res){
  const id = req.query.id

  const video = videos.find(function(video){
   return video.id == id
  })
    
    if (!video) {
      return res.send("Video Not Found!")
    }

    return res.render("video", { item: video })

  })
  

server.listen(5000, function(){
  console.log("server is running")
})