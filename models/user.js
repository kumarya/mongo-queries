const mongoose = require("mongoose")
const postSchema = require("./posts")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    posts:[postSchema],
    blogPosts:[{
        type:Schema.Types.ObjectId,
        ref:'BlogPost'
    }]
})

userSchema.virtual('postCount').get(function(){
    return this.posts.length;
})

userSchema.pre('remove', function(next){
    const BlogPost = mongoose.model('BlogPost')
    
    BlogPost.remove({_id:{$in:this.blogPosts}})
      .then(()=>next())
})

const User = mongoose.model('User', userSchema)

module.exports = User