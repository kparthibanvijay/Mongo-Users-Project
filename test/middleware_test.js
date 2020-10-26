const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogpost');
const Comment = require('../src/comments')
const { PromiseProvider } = require('mongoose');

describe('middleware', () => {
    let joe, blogPost;
    beforeEach((done) => {
        joe = new User({ name: 'Joe' });
        blogPost = new BlogPost({ title: 'first blog', content: 'some junk' });
        comments = new Comment({content: 'first comment 11'});
        blogPost.comments.push(comments);

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save(), comments.save()])
            .then(() => done());
    });

    it('deleting user should delete blogpost from that user as well', (done) => {
        joe.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });


    xit('deleting user should delete comments attached to that blogpost from the user', (done) => {
        console.log(joe.blogPosts[0].comments[0]);
        joe.remove()
            .then(() => Comment.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    });
});