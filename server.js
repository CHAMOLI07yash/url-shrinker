const express= require('express')
const app= express()
const mongoose=require('mongoose')
const ShortUrl = require('./models/shortUrl')

mongoose.connect('mongodb://localhost/urlShortener')
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });



app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))

app.get('/',async(req,res)=>{
    const shortu =await ShortUrl.find()
    res.render("index",{shortu:shortu})
})

app.post("/shortUrls",async(req,res)=>{
    await ShortUrl.create({full:req.body.CompleteUrl})
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })
app.listen(8080,()=>{
    console.log("app started")
})