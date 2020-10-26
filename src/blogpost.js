const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;

BlogPostSchema.pre('remove', function (next) {
    console.log('I am hereaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    const Comment = mongoose.model('comment');

    // remove all commment in the blogpost
    Comment.remove({ _id: {$in: this.comments }})
    .then(() => next());
});
