const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('../src/post');

const UserSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 char'
        },
        required: [true, 'user name is required'],

    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{type: Schema.Types.ObjectId, ref: 'blogPost'}]
});

UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});

// remove all blogpost before removing users
// next moves to the next middlewaare (pre hook) if there is one
UserSchema.pre('remove', function(next){
    // avoid require blogpost here to avoid cyclic requires
    const BlogPost = mongoose.model('blogPost');

    console.log('asdasdasdasdasdadasdasdad');

    // remove all blog post with id in blogPosts
    BlogPost.remove({_id: {$in: this.blogPosts}})
        .then(()=>next());
    
});

const User = mongoose.model('user', UserSchema);

module.exports = User;