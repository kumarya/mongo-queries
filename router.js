const mongoose = require("mongoose")
const Post = require("./models/posts")
const User = require("./models/user")
const BlogPost = require("./models/blogPost")
const Comment = require("./models/comments")
const Artist = require("./models/artist")



module.exports = (app)=>{
    
app.get('/', (req, res, next)=>{
    
    Artist.find({})
      .then(users=>res.json(users))
    
})

app.get('/search', (req, res, next)=>{
  const min = req.query.min
  const max = req.query.max
  const name = req.query.name
  const criteria = {min, max}
  console.log('query', req.query)
  console.log('body', req.body)
  console.log('params', req.params)
  if(min && max && name){
    Artist.find({$text:{$search:name}, age:{$gte:min, $lte:max}})
  
    .sort({name:-1})
    .then(artists=>{
      res.json(artists)
    })
  
    
  } else if(min && max){
    Artist.find({age:{$gte:min, $lte:max}})
  
    .sort({name:-1})
    .then(artists=>{
      res.json(artists)
    })
    
  }else if(name){
    Artist.find({$text:{$search:name}})
  
    .sort({name:-1})
    .then(artists=>{
      res.json(artists)
    })
    
    
  }
  
    
})

app.get('/:name', (req, res, next)=>{
    Artist.findOne({name:req.params.name})
      .then(user=>res.json(user))
})
app.post('/:name/album', (req, res, next)=>{
    Artist.findOne({name:req.params.name})
      .then(artist=>{
          const album = req.body
          artist.albums.push(album)
          artist.save()
            .then((user)=>res.json(user))
            
        
      })
})

app.post('/new', (req, res, next)=>{
    const name = req.body.name
    Artist.findOne({name:name}, (err, foundUser)=>{
        if(err){return next(err)}
        if(foundUser){
            res.status(422).json('already Artist found')
        }
        const artist = new Artist(req.body)
        artist.save()
          .then((user)=>{
              res.json(user)
          })
    })
})

app.put('/:id/edit', (req, res, next)=>{
    const {name, age} = req.body
    Artist.findByIdAndUpdate(req.params.id, {$set:{name, age}}, {new:true})
      .then((user)=>{
          res.json(user)
      })
})






}


//
