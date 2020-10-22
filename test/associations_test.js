const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const Comment = require('../src/comments');

describe('Association between collections test', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'first blog', content: 'Js is amazing' });
        comment = new Comment({ content: 'I agree, JS is amazing' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('association test', (done) => {
        User.findOne({ name: 'Joe' }).populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'first blog');
                done();
            });
    });


    it('association test', (done) => {
        User.findOne({ name: 'Joe' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                console.log(user.blogPosts[0].comments[0]);
                assert(user.blogPosts[0].title === 'first blog');
                assert(user.blogPosts[0].comments[0].content === 'I agree, JS is amazing');
                done();
            });
    });
});